import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose'; // 🌟 Next.js 15 standard edge-safe JWT library

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username, password } = body;

    const expectedUser = process.env.ADMIN_USERNAME || 'pankaj';
    const expectedPass = process.env.ADMIN_PASSWORD || 'pankaj';

    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json(
        { success: false, error: 'Username ya Password galat hai!' },
        { status: 401 }
      );
    }

    // 🌟 1. .env.local se JWT_SECRET read karke encode karna
    const secretText = process.env.JWT_SECRET || '4a2f8b9c1d0e7f3a6b5c9d2e8f1a0b3c4d7e6f9a2b5c8d1e0f3a6b9c2d5e8f1a';
    const secret = new TextEncoder().encode(secretText);

    // 🌟 2. Ek asli cryptographically signed JWT Token taiyar karna
    const token = await new SignJWT({ username, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h') // 24 ghante ke liye valid
      .sign(secret);

    const cookieStore = await cookies();
    
    // 🌟 3. Asli token ko cookie me set karna
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, 
      path: '/',
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}