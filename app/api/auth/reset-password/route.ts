import { supabase } from '../../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { logAuditEvent } from '../../../../lib/audit';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    if (!password) {
      await logAuditEvent({
        action: 'password_reset_failed',
        ipAddress,
        userAgent,
        metadata: { reason: 'missing_password' }
      });
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      await logAuditEvent({
        action: 'password_reset_failed',
        ipAddress,
        userAgent,
        metadata: { reason: error.message }
      });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data.user) {
      await logAuditEvent({
        userId: data.user.id,
        action: 'password_reset_success',
        ipAddress,
        userAgent,
        resourceType: 'user',
        resourceId: data.user.id
      });
    }

    return NextResponse.json({ 
      success: true, 
      user: data.user,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
