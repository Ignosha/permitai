import { NextRequest, NextResponse } from 'next/server';
import { findPermits, draftApplication, checkCompliance, generateDocumentChecklist } from '../../../lib/ai';
import { getSession } from '../../../lib/supabase';
import { logAuditEvent } from '../../../lib/audit';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, ...params } = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    let result;
    switch (action) {
      case 'findPermits':
        result = await findPermits(params.projectDescription, params.zipCode);
        break;
      case 'draftApplication':
        result = await draftApplication(params.projectDescription, params.permitType, params.zipCode);
        break;
      case 'checkCompliance':
        result = await checkCompliance(params.projectDescription, params.zipCode);
        break;
      case 'generateChecklist':
        result = await generateDocumentChecklist(params.projectDescription, params.permitType);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await logAuditEvent({
      userId: session.user.id,
      action: `ai_${action}`,
      ipAddress,
      resourceType: 'ai_request',
      metadata: { projectDescription: params.projectDescription?.substring(0, 100) }
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
