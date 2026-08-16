import { supabase } from '../supabase';

export async function logAuditEvent(data: {
  userId?: string;
  action: string;
  resourceType?: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}) {
  try {
    await supabase.from('audit_logs').insert({
      user_id: data.userId,
      action: data.action,
      resource_type: data.resourceType,
      resource_id: data.resourceId,
      ip_address: data.ipAddress,
      user_agent: data.userAgent,
      metadata: data.metadata || {},
    });
  } catch (error) {
    console.error('Audit log error:', error);
  }
}
