import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../lib/supabase';

const rateLimits = new Map<string, { count: number; firstAttempt: number }>();

export function withRateLimit(maxAttempts: number, windowMs: number) {
  return async (request: NextRequest) => {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const key = `${request.nextUrl.pathname}:${ip}`;
    const now = Date.now();
    const record = rateLimits.get(key);

    if (!record || now - record.firstAttempt > windowMs) {
      rateLimits.set(key, { count: 1, firstAttempt: now });
      return null;
    }

    record.count++;

    if (record.count > maxAttempts) {
      const remaining = Math.ceil((windowMs - (now - record.firstAttempt)) / 1000);
      return NextResponse.json(
        { error: `Too many attempts. Please try again in ${remaining} seconds.` },
        { status: 429 }
      );
    }

    return null;
  };
}
