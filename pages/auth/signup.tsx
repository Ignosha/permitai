'use client';

import { useState, useEffect } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<{ valid: boolean; score: number; feedback: string[] } | null>(null);
  const [passwordLeaked, setPasswordLeaked] = useState(false);

  useEffect(() => {
    if (password) {
      const strength = validatePasswordStrength(password);
      setPasswordStrength(strength);
    }
  }, [password]);

  function validatePasswordStrength(password: string): { valid: boolean; score: number; feedback: string[] } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');

    if (password.length >= 12) score += 1;

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Lowercase letter');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Uppercase letter');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Number');

    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    else feedback.push('Special character');

    return {
      valid: score >= 4,
      score: Math.min(score, 5),
      feedback
    };
  }

  async function checkPasswordLeak(password: string): Promise<boolean> {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      const prefix = hashHex.substring(0, 5);
      const suffix = hashHex.substring(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const text = await response.text();
      const lines = text.split('\n');
      return lines.some(line => {
        const [hash, count] = line.split(':');
        return hash === suffix && parseInt(count) > 0;
      });
    } catch {
      return false;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!passwordStrength?.valid) {
      setError('Password does not meet requirements: ' + passwordStrength?.feedback.join(', '));
      setLoading(false);
      return;
    }

    const leaked = await checkPasswordLeak(password);
    setPasswordLeaked(leaked);
    if (leaked) {
      setError('This password has been exposed in a data breach. Please choose a different password.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        window.location.href = '/dashboard?welcome=true';
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
        .strength-meter { margin-top: 12px; }
        .strength-bars { display: flex; gap: 4px; margin-bottom: 8px; }
        .strength-bar { flex: 1; height: 4px; background: #222; border-radius: 2px; transition: background 0.2s; }
        .strength-bar.active { background: #c0fe04; }
        .strength-feedback { font-size: 0.75rem; color: #888; font-family: 'JetBrains Mono', monospace; }
        .leak-warning { margin-top: 8px; padding: 8px 12px; background: rgba(255,68,68,0.1); border: 1px solid #ff4444; color: #ff4444; font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-label">// Get Started</span>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Start your 14-day free trial. No credit card required.</p>
        </div>

        {error && <div className="error" role="alert">{error}</div>}

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

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="form-input"
            />
            {passwordStrength && (
              <div className="strength-meter">
                <div className="strength-bars">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`strength-bar ${level <= passwordStrength.score ? 'active' : ''}`}
                    />
                  ))}
                </div>
                {passwordStrength.feedback.length > 0 && (
                  <div className="strength-feedback">
                    {passwordStrength.feedback.map((item, i) => (
                      <div key={i}>• {item}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {passwordLeaked && (
              <div className="leak-warning">
                ⚠️ This password has been exposed in a data breach. Please choose a different password.
              </div>
            )}
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Start Free Trial'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}
