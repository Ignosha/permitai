import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

export function securityHeaders(request: NextRequest): NextResponse {
  const response = NextResponse.next();
  const isProduction = process.env.NODE_ENV === 'production';

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
  );

  if (isProduction) {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

    const nonce = getNonce(request);
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}'`,
        `style-src 'self' 'nonce-${nonce}'`,
        `img-src 'self' data: https:`,
        `font-src 'self' data:`,
        `connect-src 'self' https://*.supabase.co https://*.stripe.com https://api.pwnedpasswords.com`,
        `frame-src 'none'`,
        `frame-ancestors 'none'`,
        `base-uri 'self'`,
        `form-action 'self'`,
        `upgrade-insecure-requests`,
      ].join('; ')
    );
  }

  return response;
}

function getNonce(request: NextRequest): string {
  const existingNonce = request.headers.get('x-nonce');
  if (existingNonce) {
    return existingNonce;
  }
  return Buffer.from(crypto.randomUUID()).toString('base64').slice(0, 32);
}
