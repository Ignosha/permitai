import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/supabase';
import { securityHeaders } from './lib/security';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const protectedPaths = ['/dashboard', '/api/chat'];

  const isProtected = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = securityHeaders(request);
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/chat/:path*'],
};
