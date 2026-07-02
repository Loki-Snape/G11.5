// middleware.ts – protect /admin route
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session-token')?.value;
  const { pathname } = request.nextUrl;

  // Protect admin route specifically
  if (!token && pathname.startsWith('/admin')) {
    const url = request.nextUrl.clone();
    url.pathname = '/clearance'; // redirect to admin clearance screen
    return NextResponse.redirect(url);
  }

  // All other requests continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
