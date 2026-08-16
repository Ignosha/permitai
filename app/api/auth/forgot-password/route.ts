import { supabase } from '../../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '../../../../lib/rate-limit';
import { logAuditEvent } from '../../../../lib/audit';

const rateLimit = withRateLimit(3, 60 * 60 * 1000);

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rateLimitResponse = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { email } = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    if (!email) {
      await logAuditEvent({
        action: 'password_reset_failed',
        ipAddress,
        userAgent,
        metadata: { reason: 'missing_email' }
      });
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if (error) {
      await logAuditEvent({
        action: 'password_reset_failed',
        ipAddress,
        userAgent,
        metadata: { reason: error.message, email }
      });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await logAuditEvent({
      action: 'password_reset_requested',
      ipAddress,
      userAgent,
      metadata: { email }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Password reset email sent. Please check your inbox.'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
