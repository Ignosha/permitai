import { supabase } from '../../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '../../../../lib/rate-limit';
import { logAuditEvent } from '../../../../lib/audit';

const rateLimit = withRateLimit(5, 15 * 60 * 1000);

function validatePasswordStrength(password: string): { valid: boolean; feedback: string[] } {
  const feedback: string[] = [];

  if (password.length < 8) feedback.push('Password must be at least 8 characters long');
  if (!/[a-z]/.test(password)) feedback.push('Password must contain lowercase letters');
  if (!/[A-Z]/.test(password)) feedback.push('Password must contain uppercase letters');
  if (!/[0-9]/.test(password)) feedback.push('Password must contain numbers');
  if (!/[^a-zA-Z0-9]/.test(password)) feedback.push('Password must contain special characters');

  return {
    valid: feedback.length === 0,
    feedback
  };
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { email, password } = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    if (!email || !password) {
      await logAuditEvent({
        action: 'signup_failed',
        ipAddress,
        userAgent,
        metadata: { reason: 'missing_fields' }
      });
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const strength = validatePasswordStrength(password);
    if (!strength.valid) {
      await logAuditEvent({
        action: 'signup_failed',
        ipAddress,
        userAgent,
        metadata: { reason: 'weak_password', feedback: strength.feedback }
      });
      return NextResponse.json({ 
        error: 'Password does not meet requirements: ' + strength.feedback.join(', ') 
      }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      },
    });

    if (error) {
      await logAuditEvent({
        action: 'signup_failed',
        ipAddress,
        userAgent,
        metadata: { reason: error.message }
      });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data.user) {
      await logAuditEvent({
        userId: data.user.id,
        action: 'signup_success',
        ipAddress,
        userAgent,
        resourceType: 'user',
        resourceId: data.user.id
      });
    }

    return NextResponse.json({ 
      success: true, 
      user: data.user,
      message: 'Check your email to confirm your account'
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
