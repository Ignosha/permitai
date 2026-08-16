import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/audit';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    switch (action) {
      case 'export': {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        const { data: auditLogs } = await supabase
          .from('audit_logs')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1000);

        const exportData = {
          profile: {
            id: profile?.id,
            email: session.user.email,
            full_name: profile?.full_name,
            created_at: profile?.created_at,
            updated_at: profile?.updated_at,
          },
          audit_logs: auditLogs || [],
          export_date: new Date().toISOString(),
          format_version: '1.0',
        };

        await logAuditEvent({
          userId: session.user.id,
          action: 'data_export',
          ipAddress,
          userAgent,
          resourceType: 'user_data',
          metadata: { recordCount: auditLogs?.length || 0 },
        });

        return NextResponse.json({ success: true, data: exportData });
      }

      case 'delete': {
        await logAuditEvent({
          userId: session.user.id,
          action: 'account_deletion_requested',
          ipAddress,
          userAgent,
          resourceType: 'user_account',
          metadata: { email: session.user.email },
        });

        const { error } = await supabase
          .from('profiles')
          .update({ deleted: true, deleted_at: new Date().toISOString() })
          .eq('id', session.user.id);

        if (error) {
          console.error('Account deletion error:', error);
          return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          message: 'Your account has been scheduled for deletion. All data will be permanently removed within 30 days.',
        });
      }

      case 'anonymize': {
        const anonymizedEmail = `deleted_${crypto.randomBytes(8).toString('hex')}@deleted.com`;

        await supabase
          .from('profiles')
          .update({
            email: anonymizedEmail,
            full_name: 'Deleted User',
            anonymized: true,
            anonymized_at: new Date().toISOString(),
          })
          .eq('id', session.user.id);

        await logAuditEvent({
          userId: session.user.id,
          action: 'data_anonymization',
          ipAddress,
          userAgent,
          resourceType: 'user_data',
          metadata: { email: session.user.email },
        });

        return NextResponse.json({
          success: true,
          message: 'Your personal data has been anonymized.',
        });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('User data API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
