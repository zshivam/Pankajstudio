import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username, password } = body;

    // 🌟 Secure approach: Strictly read from env, NO hardcoded fallbacks
    const expectedUser = process.env.ADMIN_USERNAME;
    const expectedPass = process.env.ADMIN_PASSWORD;
    const secretText = process.env.JWT_SECRET;

    // Safety check: If env variables are missing, stop immediately
    if (!expectedUser || !expectedPass || !secretText) {
      console.error('CRITICAL ERROR: Missing Environment Variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify credentials
    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json(
        { success: false, error: 'Incorrect Username or Password' },
        { status: 401 }
      );
    }

    // 🌟 Encode the secret and create JWT
    const secret = new TextEncoder().encode(secretText);

    const token = await new SignJWT({ username, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h') // 24 ghante ke liye valid
      .sign(secret);

    // Using await here as it is standard for Next.js 15+
    const cookieStore = await cookies();
    
    // 🌟 Set the secure cookie
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