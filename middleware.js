import { NextResponse } from 'next/server';

// Routes that require admin authentication
const PROTECTED_ADMIN_PATHS = ['/admin/dashboard', '/admin/projects'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected admin route
  const isProtected = PROTECTED_ADMIN_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtected) return NextResponse.next();

  // Check for admin session token in cookies
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    // No token — redirect to login
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists — let the request through
  // The actual JWT verification happens in the API routes and page components
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
