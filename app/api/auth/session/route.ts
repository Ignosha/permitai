import { supabase } from '../../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { logAuditEvent } from '../../../../lib/audit';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ user: null, session: null });
    }

    const token = authHeader.replace('Bearer ', '');
    
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json({ user: null, session: null });
    }

    await logAuditEvent({
      userId: user.id,
      action: 'session_checked',
      resourceType: 'user',
      resourceId: user.id
    });

    return NextResponse.json({ user, session: { user } });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ user: null, session: null });
  }
}
