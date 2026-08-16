import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/supabase';
import { securityHeaders } from './lib/security';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const protectedPaths = ['/dashboard', '/tools', '/api/chat'];
  const apiPaths = ['/api/chat', '/api/checkout', '/api/admin'];

  const isProtected = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  const isApiProtected = apiPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if ((isProtected || isApiProtected) && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = securityHeaders(request);
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/tools/:path*', '/api/:path*'],
};
