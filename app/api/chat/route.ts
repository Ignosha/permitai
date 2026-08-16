import { NextRequest, NextResponse } from 'next/server';
import { findPermits, draftApplication, checkCompliance, generateDocumentChecklist } from '../../../lib/ai';
import { getSession } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, ...params } = await request.json();

    switch (action) {
      case 'findPermits':
        const permits = await findPermits(params.projectDescription, params.zipCode);
        return NextResponse.json({ success: true, data: permits });

      case 'draftApplication':
        const application = await draftApplication(params.projectDescription, params.permitType, params.zipCode);
        return NextResponse.json({ success: true, data: application });

      case 'checkCompliance':
        const compliance = await checkCompliance(params.projectDescription, params.zipCode);
        return NextResponse.json({ success: true, data: compliance });

      case 'generateChecklist':
        const checklist = await generateDocumentChecklist(params.projectDescription, params.permitType);
        return NextResponse.json({ success: true, data: checklist });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
