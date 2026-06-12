import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';
const COOKIE_NAME = 'admin_token';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * Sign a JWT token for the admin user.
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

/**
 * Verify a JWT token. Returns payload or null.
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Get the current admin session from cookies (server-side).
 * Returns the decoded payload or null.
 */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Build the Set-Cookie header string for setting the admin token.
 */
export function buildAuthCookie(token) {
  return `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${COOKIE_MAX_AGE}${
    process.env.NODE_ENV === 'production' ? '; Secure' : ''
  }`;
}

/**
 * Build the Set-Cookie header string for clearing the admin token.
 */
export function buildClearCookie() {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`;
}
