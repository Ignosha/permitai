import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/supabase';
import { securityHeaders } from './lib/security';
import { validateRequestSize, validateOrigin } from './lib/request-validation';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const protectedPaths = ['/dashboard', '/tools', '/settings'];
  const apiPaths = ['/api/chat', '/api/checkout', '/api/admin', '/api/user'];

  const isProtected = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  const isApiProtected = apiPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if ((isProtected || isApiProtected) && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const sizeError = validateRequestSize(request);
  if (sizeError) return sizeError;

  const originError = validateOrigin(request);
  if (originError) return originError;

  const response = securityHeaders(request);
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/tools/:path*', '/settings/:path*', '/api/:path*'],
};
