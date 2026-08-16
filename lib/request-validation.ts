import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './supabase';
import { logAuditEvent } from './audit';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};
const CLEANUP_INTERVAL = 60 * 1000;

setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, CLEANUP_INTERVAL);

export async function withRateLimit(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>,
  options?: { limit?: number; windowMs?: number; keyPrefix?: string }
) {
  const key = `${options?.keyPrefix || 'global'}:${getClientIdentifier(request)}`;
  const now = Date.now();
  const windowMs = options?.windowMs || 10 * 1000;
  const limit = options?.limit || 10;

  if (!store[key]) {
    store[key] = {
      count: 0,
      resetTime: now + windowMs,
    };
  }

  if (now > store[key].resetTime) {
    store[key] = {
      count: 0,
      resetTime: now + windowMs,
    };
  }

  store[key].count++;

  if (store[key].count > limit) {
    await logAuditEvent({
      action: 'rate_limit_exceeded',
      ipAddress: getClientIp(request),
      resourceType: 'rate_limit',
      metadata: { 
        path: request.nextUrl.pathname, 
        limit, 
        remaining: 0, 
        reset: store[key].resetTime 
      },
    });

    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(store[key].resetTime).toISOString(),
          'Retry-After': Math.ceil((store[key].resetTime - now) / 1000).toString(),
        },
      }
    );
  }

  const response = await handler(request);
  
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', (limit - store[key].count).toString());

  return response;
}

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}:${Buffer.from(userAgent).toString('base64').slice(0, 16)}`;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}

export function validateContentType(request: NextRequest, allowedTypes: string[] = ['application/json']): NextResponse | null {
  const contentType = request.headers.get('content-type') || '';
  const isAllowed = allowedTypes.some(type => contentType.includes(type));
  
  if (!isAllowed && request.method !== 'GET' && request.method !== 'DELETE') {
    return NextResponse.json(
      { error: 'Invalid content type' },
      { status: 415 }
    );
  }

  return null;
}

export function validateRequestSize(request: NextRequest, maxSize: number = 10 * 1024 * 1024): NextResponse | null {
  const contentLength = parseInt(request.headers.get('content-length') || '0');
  
  if (contentLength > maxSize) {
    return NextResponse.json(
      { error: 'Request too large' },
      { status: 413 }
    );
  }

  return null;
}

export function validateOrigin(request: NextRequest, allowedOrigins: string[] = []): NextResponse | null {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  if (!origin && !referer && request.method !== 'GET') {
    return NextResponse.json(
      { error: 'Missing origin or referer header' },
      { status: 403 }
    );
  }

  if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: 'Invalid origin' },
      { status: 403 }
    );
  }

  return null;
}
