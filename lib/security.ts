import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function securityHeaders(request: NextRequest): NextResponse {
  const response = NextResponse.next();
  const isProduction = process.env.NODE_ENV === 'production';

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (isProduction) {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.stripe.com https://api.pwnedpasswords.com; frame-ancestors 'none';"
    );
  }

  return response;
}
