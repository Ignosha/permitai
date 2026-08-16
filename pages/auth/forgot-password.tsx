'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMessage(data.message);
        setEmail('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <style>{`
        .auth-container { max-width: 400px; width: 100%; }
        .auth-header { margin-bottom: 40px; text-align: center; }
        .auth-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; display: block; }
        .auth-title { font-size: 2rem; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 8px; }
        .auth-subtitle { color: #888; font-size: 0.9375rem; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 12px 16px; background: #111; border: 1px solid #222; color: #fafafa; font-size: 0.9375rem; font-family: 'Inter', sans-serif; transition: border-color 0.2s; }
        .form-input:focus { outline: none; border-color: #c0fe04; }
        .btn { width: 100%; padding: 14px 24px; background: #c0fe04; color: #000; border: none; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.02em; cursor: pointer; transition: all 0.2s; }
        .btn:hover { background: #a8d904; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .auth-footer { text-align: center; margin-top: 24px; color: #888; font-size: 0.875rem; }
        .auth-footer a { color: #c0fe04; text-decoration: none; }
        .auth-footer a:hover { text-decoration: underline; }
        .error { padding: 12px; background: rgba(255,68,68,0.1); border: 1px solid #ff4444; color: #ff4444; font-size: 0.875rem; margin-bottom: 20px; }
        .success { padding: 12px; background: rgba(192,254,4,0.1); border: 1px solid #c0fe04; color: #c0fe04; font-size: 0.875rem; margin-bottom: 20px; }
      `}</style>

      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-label">// Reset Password</span>
          <h1 className="auth-title">Forgot password?</h1>
          <p className="auth-subtitle">Enter your email and we'll send you a reset link.</p>
        </div>

        {error && <div className="error" role="alert">{error}</div>}
        {message && <div className="success" role="status">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="form-input"
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="auth-footer">
          <a href="/login">← Back to sign in</a>
        </div>
      </div>
    </div>
  );
}
