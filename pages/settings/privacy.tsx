'use client';

import { useState, useEffect } from 'react';
import { supabase, getSession } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Trash2, Eye, Shield, FileText, AlertTriangle } from 'lucide-react';

export default function PrivacySettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const session = await getSession();
      if (!session) {
        window.location.href = '/login';
        return;
      }
      setUser(session.user);
    } catch (err) {
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  }

  async function handleExportData() {
    setActionLoading('export');
    setMessage(null);

    try {
      const response = await fetch('/api/user/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'export' }),
      });

      const data = await response.json();

      if (data.success) {
        const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `permitai-data-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setMessage({ type: 'success', text: 'Your data has been exported successfully.' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to export data' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to export data. Please try again.' });
    } finally {
      setActionLoading(null);
    }
  }

  async function handleAnonymize() {
    setActionLoading('anonymize');
    setMessage(null);

    try {
      const response = await fetch('/api/user/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'anonymize' }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Your personal data has been anonymized.' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to anonymize data' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to anonymize data. Please try again.' });
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirmText !== 'DELETE') {
      setMessage({ type: 'error', text: 'Please type DELETE to confirm' });
      return;
    }

    setActionLoading('delete');
    setMessage(null);

    try {
      const response = await fetch('/api/user/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete' }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to delete account' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete account. Please try again.' });
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="w-8 h-8 border-2 border-[#222] border-t-[#c0fe04] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa' }}>
      <style>{`
        .settings-container { max-width: 800px; margin: 0 auto; padding: 120px 40px 80px; }
        .settings-header { margin-bottom: 40px; }
        .settings-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; display: block; }
        .settings-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 16px; }
        .settings-subtitle { color: #888; font-size: 1rem; line-height: 1.7; }
        .settings-card { border: 1px solid #222; padding: 32px; margin-bottom: 20px; background: #0a0a0a; }
        .settings-card-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px; }
        .settings-card-icon { width: 40px; height: 40px; border-radius: 8px; background: rgba(192,254,4,0.1); border: 1px solid rgba(192,254,4,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .settings-card-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; }
        .settings-card-desc { color: #888; font-size: 0.9375rem; line-height: 1.6; }
        .settings-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px; }
        .settings-info { padding: 16px; background: #111; border-left: 3px solid #888; margin-top: 16px; color: #888; font-size: 0.875rem; line-height: 1.7; }
        .delete-confirm { margin-top: 20px; padding: 20px; background: rgba(255,68,68,0.05); border: 1px solid #ff4444; }
        .delete-confirm-input { width: 100%; padding: 12px 16px; background: #111; border: 1px solid #ff4444; color: #fafafa; font-size: 0.9375rem; font-family: 'JetBrains Mono', monospace; margin-top: 12px; }
        .delete-confirm-input:focus { outline: none; border-color: #ff4444; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #888; text-decoration: none; font-size: 0.875rem; margin-bottom: 32px; transition: color 0.2s; }
        .back-link:hover { color: #c0fe04; }
        .user-email { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #555; margin-bottom: 40px; }
        @media (max-width: 640px) { .settings-container { padding: 100px 20px 60px; } .settings-actions { flex-direction: column; } }
      `}</style>

      <div className="settings-container">
        <a href="/dashboard" className="back-link">← Back to dashboard</a>

        <div className="settings-header">
          <span className="settings-label">// Privacy & Data</span>
          <h1 className="settings-title">Privacy Settings</h1>
          <p className="settings-subtitle">
            Manage your personal data and privacy preferences. You have full control over your information.
          </p>
          {user && <div className="user-email">Signed in as: {user.email}</div>}
        </div>

        {message && (
          <div style={{
            padding: '16px',
            background: message.type === 'success' ? 'rgba(192,254,4,0.1)' : 'rgba(255,68,68,0.1)',
            border: `1px solid ${message.type === 'success' ? '#c0fe04' : '#ff4444'}`,
            color: message.type === 'success' ? '#c0fe04' : '#ff4444',
            fontSize: '0.875rem',
            marginBottom: '24px',
            borderRadius: '4px'
          }} role="alert" aria-live="assertive">
            {message.text}
          </div>
        )}

        {/* Data Export */}
        <Card>
          <CardHeader>
            <div className="settings-card-header">
              <div className="settings-card-icon">
                <Download size={20} color="#c0fe04" />
              </div>
              <div>
                <CardTitle>Export Your Data</CardTitle>
                <CardDescription>Download a complete copy of your PermitAI data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p style={{ color: '#888', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Export all your data including profile information, activity history, and audit logs. 
              This is your right under GDPR and CCPA regulations.
            </p>
            <div className="settings-info">
              <strong>What's included:</strong> Profile data, account activity, permit history, and audit logs. 
              Data is provided in JSON format for portability.
            </div>
            <div className="settings-actions">
              <Button
                onClick={handleExportData}
                disabled={actionLoading === 'export'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Download size={16} />
                {actionLoading === 'export' ? 'Exporting...' : 'Export My Data'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Anonymization */}
        <Card>
          <CardHeader>
            <div className="settings-card-header">
              <div className="settings-card-icon">
                <Eye size={20} color="#c0fe04" />
              </div>
              <div>
                <CardTitle>Anonymize Your Data</CardTitle>
                <CardDescription>Remove personal identifiers while keeping your account active</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p style={{ color: '#888', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Anonymize your personal information while maintaining access to your account. 
              Your email and name will be replaced with anonymous identifiers.
            </p>
            <div className="settings-info">
              <strong>Note:</strong> This action is reversible by contacting support. 
              Your permit history and usage data will remain intact.
            </div>
            <div className="settings-actions">
              <Button
                variant="outline"
                onClick={handleAnonymize}
                disabled={actionLoading === 'anonymize'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #222', color: '#fafafa' }}
              >
                <Eye size={16} />
                {actionLoading === 'anonymize' ? 'Processing...' : 'Anonymize My Data'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Deletion */}
        <Card style={{ borderColor: 'rgba(255,68,68,0.3)' }}>
          <CardHeader>
            <div className="settings-card-header">
              <div className="settings-card-icon" style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgbaba(255,68,68,0.3)' }}>
                <Trash2 size={20} color="#ff4444" />
              </div>
              <div>
                <CardTitle style={{ color: '#ff4444' }}>Delete Account</CardTitle>
                <CardDescription>Permanently delete your account and all associated data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Alert style={{ background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.3)', marginBottom: '20px' }}>
              <AlertTriangle size={16} color="#ff4444" style={{ marginRight: '8px' }} />
              <AlertDescription style={{ color: '#ff4444', fontSize: '0.875rem' }}>
                This action is irreversible. All your data will be permanently deleted within 30 days.
              </AlertDescription>
            </Alert>

            <p style={{ color: '#888', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Request permanent deletion of your account and all associated data. This includes:
            </p>
            <ul style={{ color: '#888', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '20px', paddingLeft: '20px' }}>
              <li>Profile information and settings</li>
              <li>Permit applications and drafts</li>
              <li>Usage history and audit logs</li>
              <li>All uploaded documents and files</li>
            </ul>

            {!showDeleteConfirm ? (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ff4444', color: '#fff' }}
              >
                <Trash2 size={16} />
                Delete My Account
              </Button>
            ) : (
              <div className="delete-confirm">
                <p style={{ color: '#ff4444', fontSize: '0.875rem', fontWeight: 600, marginBottom: '12px' }}>
                  Type DELETE to confirm account deletion:
                </p>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE here"
                  className="delete-confirm-input"
                  autoComplete="off"
                />
                <div className="settings-actions" style={{ marginTop: '16px' }}>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={actionLoading === 'delete' || deleteConfirmText !== 'DELETE'}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ff4444', color: '#fff' }}
                  >
                    <Trash2 size={16} />
                    {actionLoading === 'delete' ? 'Deleting...' : 'Confirm Delete'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }}
                    style={{ color: '#888' }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Privacy Information */}
        <Card>
          <CardHeader>
            <div className="settings-card-header">
              <div className="settings-card-icon">
                <Shield size={20} color="#c0fe04" />
              </div>
              <div>
                <CardTitle>Your Privacy Rights</CardTitle>
                <CardDescription>Understanding your data protection rights</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ color: '#888', fontSize: '0.9375rem', lineHeight: 1.7 }}>
              <p style={{ marginBottom: '16px' }}>
                Under GDPR, CCPA, and other privacy regulations, you have the following rights:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                <li><strong style={{ color: '#fafafa' }}>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong style={{ color: '#fafafa' }}>Right to Rectification:</strong> Correct inaccurate personal data</li>
                <li><strong style={{ color: '#fafafa' }}>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong style={{ color: '#fafafa' }}>Right to Data Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong style={{ color: '#fafafa' }}>Right to Object:</strong> Object to processing of your personal data</li>
                <li><strong style={{ color: '#fafafa' }}>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p>
                For questions about your privacy rights, contact us at{' '}
                <a href="mailto:privacy@permitai.co" style={{ color: '#c0fe04' }}>privacy@permitai.co</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
