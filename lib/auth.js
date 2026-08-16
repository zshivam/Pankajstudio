import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// 🌟 Security: Never use a hardcoded fallback in production
const getSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('JWT_SECRET is missing from environment variables!');
    // Provide a dummy key for dev, but this should be caught in prod
    return new TextEncoder().encode('change-this-secret-in-production'); 
  }
  return new TextEncoder().encode(secret);
};

const COOKIE_NAME = 'admin_token';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * Sign a JWT token for the admin user using edge-compatible jose.
 */
export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecretKey());
}

/**
 * Verify a JWT token. Returns payload or null.
 * Note: Because jose uses cryptography APIs, this must be async.
 */
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch (error) {
    // Token is invalid, expired, or tampered with
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
  
  return await verifyToken(token);
}

/**
 * Build the Set-Cookie header string for setting the admin token.
 */
export function buildAuthCookie(token) {
  return `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}${
    process.env.NODE_ENV === 'production' ? '; Secure' : ''
  }`;
}

/**
 * Build the Set-Cookie header string for clearing the admin token.
 */
export function buildClearCookie() {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`;
}