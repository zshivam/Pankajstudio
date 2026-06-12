import dns from 'dns';
// 🌟 Yeh line Node.js ko pure computer me Google ka super-fast DNS use karne par majboor kar degi
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
      .connect(MONGODB_URI, { bufferCommands: false, maxPoolSize: 10 })
      .then((m) => { console.log('✅ MongoDB connected'); return m; });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
