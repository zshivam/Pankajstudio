import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // 🌟 Added jose for Edge runtime verification

const PROTECTED_ADMIN_PATHS = ['/admin/dashboard', '/admin/projects'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected admin route
  const isProtected = PROTECTED_ADMIN_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtected) return NextResponse.next();

  // Check for admin session token in cookies
  const token = request.cookies.get('admin_token')?.value;

  // No token — redirect to login
  if (!token) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // 🌟 THE UPGRADE: Actually verify the token isn't fake or expired
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    
    // Token is real — let the request through
    return NextResponse.next();
  } catch (error) {
    // Token is fake or expired — delete it and redirect to login
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('admin_token'); // Clear the bad ticket
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};