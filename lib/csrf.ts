import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || crypto.randomBytes(32).toString('hex');
const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function verifyCsrfToken(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  if (!cookieToken || !headerToken) {
    return false;
  }

  try {
    const expected = crypto
      .createHmac('sha256', CSRF_SECRET)
      .update(cookieToken)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(headerToken),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}

export function setCsrfCookie(response: NextResponse, token: string): void {
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

export function csrfProtection() {
  return async (request: NextRequest) => {
    const method = request.method.toLowerCase();
    
    if (['get', 'head', 'options'].includes(method)) {
      return null;
    }

    const isValid = verifyCsrfToken(request);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }

    return null;
  };
}
