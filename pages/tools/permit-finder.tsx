'use client';

import { useState } from 'react';

interface Permit {
  name: string;
  department: string;
  fee: string;
  processingTime: string;
  requiredDocuments: string[];
  directLink: string;
}

export default function PermitFinderPage() {
  const [projectDescription, setProjectDescription] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Permit[] | null>(null);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'findPermits',
          projectDescription,
          zipCode
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.data);
      }
    } catch (err) {
      setError('Failed to find permits. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa' }}>
      <style>{`
        .tool-container { max-width: 800px; margin: 0 auto; padding: 120px 40px 80px; }
        .tool-header { margin-bottom: 40px; }
        .tool-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; display: block; }
        .tool-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 16px; }
        .tool-description { color: #888; font-size: 1rem; line-height: 1.7; margin-bottom: 32px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 12px 16px; background: #111; border: 1px solid #222; color: #fafafa; font-size: 0.9375rem; font-family: 'Inter', sans-serif; transition: border-color 0.2s; }
        .form-input:focus { outline: none; border-color: #c0fe04; }
        .form-textarea { min-height: 120px; resize: vertical; }
        .btn { padding: 14px 32px; background: #c0fe04; color: #000; border: none; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.02em; cursor: pointer; transition: all 0.2s; }
        .btn:hover { background: #a8d904; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .result { margin-top: 40px; }
        .permit-card { border: 1px solid #222; padding: 24px; margin-bottom: 16px; background: #0a0a0a; }
        .permit-name { font-size: 1.125rem; font-weight: 700; margin-bottom: 12px; color: #fafafa; }
        .permit-meta { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; margin-bottom: 8px; }
        .permit-docs { margin-top: 12px; }
        .permit-docs-title { font-size: 0.875rem; font-weight: 600; margin-bottom: 8px; color: #fafafa; }
        .permit-doc { padding: 4px 0; color: #888; font-size: 0.875rem; }
        .error { padding: 12px; background: rgba(255,68,68,0.1); border: 1px solid #ff4444; color: #ff4444; font-size: 0.875rem; margin-top: 20px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #888; text-decoration: none; font-size: 0.875rem; margin-bottom: 32px; transition: color 0.2s; }
        .back-link:hover { color: #c0fe04; }
        @media (max-width: 640px) { .tool-container { padding: 100px 20px 60px; } }
      `}</style>

      <div className="tool-container">
        <a href="/tools" className="back-link">← Back to tools</a>

        <div className="tool-header">
          <span className="tool-label">// Tool</span>
          <h1 className="tool-title">Permit Finder</h1>
          <p className="tool-description">
            Enter your project details and zip code. AI will tell you exactly which permits you need, 
            from which department, with fees and processing times.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="projectDescription">Project Description</label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
              placeholder="e.g., Kitchen remodel with new electrical and plumbing, adding a deck, bathroom renovation..."
              className="form-input form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="zipCode">Zip Code</label>
            <input
              id="zipCode"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              placeholder="78701"
              className="form-input"
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Finding permits...' : 'Find Permits'}
          </button>
        </form>

        {error && <div className="error" role="alert">{error}</div>}

        {result && result.length > 0 && (
          <div className="result">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px' }}>
              Found {result.length} permit(s)
            </h2>
            {result.map((permit, index) => (
              <div key={index} className="permit-card">
                <div className="permit-name">{permit.name}</div>
                <div className="permit-meta">Department: {permit.department}</div>
                <div className="permit-meta">Fee: {permit.fee}</div>
                <div className="permit-meta">Processing Time: {permit.processingTime}</div>
                {permit.requiredDocuments && permit.requiredDocuments.length > 0 && (
                  <div className="permit-docs">
                    <div className="permit-docs-title">Required Documents:</div>
                    {permit.requiredDocuments.map((doc, i) => (
                      <div key={i} className="permit-doc">• {doc}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
