import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model, models } = mongoose;

const AdminUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      trim: true,
      default: 'Admin',
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, collection: 'admin_users' }
);

// Hash password before saving
AdminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
AdminUserSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

const AdminUser = models.AdminUser || model('AdminUser', AdminUserSchema);
export default AdminUser;
