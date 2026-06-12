/**
 * scripts/create-admin.js
 * Run once to create your admin account:
 *
 *   node scripts/create-admin.js
 *
 * Make sure MONGODB_URI is set in .env.local first.
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import readline from 'readline';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI not set. Create a .env.local file first.');
  process.exit(1);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  console.log('\n=== Pankaj Studio — Create Admin User ===\n');

  const name = await ask('Your name (e.g. Pankaj): ');
  const username = await ask('Username (e.g. admin): ');
  const password = await ask('Password (min 6 chars): ');

  if (!username || !password || password.length < 6) {
    console.error('Error: Username and password (min 6 chars) are required.');
    rl.close();
    process.exit(1);
  }

  console.log('\nConnecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);

  // Define inline to avoid import issues in script context
  const AdminUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Admin' },
    lastLogin: { type: Date, default: null },
  }, { timestamps: true, collection: 'admin_users' });

  const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);

  // Check if already exists
  const existing = await AdminUser.findOne({ username: username.toLowerCase() });
  if (existing) {
    console.log(`\nUser "${username}" already exists. Updating password...`);
    existing.password = await bcrypt.hash(password, 12);
    existing.name = name || existing.name;
    await existing.save();
    console.log('Password updated.\n');
  } else {
    const hashed = await bcrypt.hash(password, 12);
    await AdminUser.create({ username: username.toLowerCase(), password: hashed, name });
    console.log(`\nAdmin user "${username}" created successfully!\n`);
  }

  console.log('You can now log in at: http://localhost:3000/admin/login');
  console.log(`Username: ${username.toLowerCase()}`);
  console.log('Password: [what you entered]\n');

  await mongoose.disconnect();
  rl.close();
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
