import { supabase } from '../../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { logAuditEvent } from '../../../../lib/audit';

export async function POST(request: NextRequest) {
  try {
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;

    const { error } = await supabase.auth.signOut();

    if (error) {
      await logAuditEvent({
        userId: userId || undefined,
        action: 'logout_failed',
        ipAddress,
        metadata: { reason: error.message }
      });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await logAuditEvent({
      userId: userId || undefined,
      action: 'logout_success',
      ipAddress,
      resourceType: 'user',
      resourceId: userId
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
