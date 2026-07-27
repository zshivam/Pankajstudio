import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in .env.local');
}

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { 
        bufferCommands: false, 
        maxPoolSize: 10,
        family: 4 // 🌟 FIX 1: Forces IPv4 to stop the querySrv ECONNREFUSED error
      })
      .then((m) => { 
        console.log('✅ MongoDB connected'); 
        return m; 
      });
  } 
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    
    // 🌟 FIX 2: Stop Next.js Stack Overflow crash by throwing a simple string, not the raw object
    console.error("❌ MongoDB Error:", e.message);
    throw new Error("Database connection failed. Check terminal for details."); 
  }
  return cached.conn;
}