import { supabase } from '../../../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { logAuditEvent } from '../../../../../lib/audit';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { factorId, code, challengeId } = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    if (!factorId || !code || !challengeId) {
      return NextResponse.json({ error: 'Factor ID, code, and challenge ID are required' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.mfa.verify({
      factorId,
      challengeId,
      code,
    });

    if (error) {
      await logAuditEvent({
        userId: user.id,
        action: '2fa_verify_failed',
        ipAddress,
        userAgent,
        metadata: { reason: error.message }
      });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await logAuditEvent({
      userId: user.id,
      action: '2fa_verify_success',
      ipAddress,
      userAgent,
      resourceType: 'user',
      resourceId: user.id
    });

    return NextResponse.json({ 
      success: true, 
      message: '2FA verified successfully'
    });
  } catch (error) {
    console.error('2FA verify error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
