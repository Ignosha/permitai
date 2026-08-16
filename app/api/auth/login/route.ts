import { supabase } from '../../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '../../../../lib/rate-limit';
import { logAuditEvent } from '../../../../lib/audit';

const rateLimit = withRateLimit(5, 15 * 60 * 1000);

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rateLimitResponse = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { email, password } = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    if (!email || !password) {
      await logAuditEvent({
        action: 'login_failed',
        ipAddress,
        userAgent,
        metadata: { reason: 'missing_fields' }
      });
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      await logAuditEvent({
        action: 'login_failed',
        ipAddress,
        userAgent,
        metadata: { reason: error.message, email }
      });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data.user) {
      await logAuditEvent({
        userId: data.user.id,
        action: 'login_success',
        ipAddress,
        userAgent,
        resourceType: 'user',
        resourceId: data.user.id
      });
    }

    return NextResponse.json({ 
      success: true, 
      user: data.user,
      session: data.session
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
