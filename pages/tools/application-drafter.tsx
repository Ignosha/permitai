'use client';

import { useState } from 'react';

interface ApplicationDraft {
  applicantName: string;
  projectAddress: string;
  projectDescription: string;
  estimatedCost: string;
  contractorInfo: {
    name: string;
    licenseNumber: string;
    phone: string;
    email: string;
  };
  scopeOfWork: string;
  complianceNotes: string;
}

export default function ApplicationDrafterPage() {
  const [projectDescription, setProjectDescription] = useState('');
  const [permitType, setPermitType] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApplicationDraft | null>(null);
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
          action: 'draftApplication',
          projectDescription,
          permitType,
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
      setError('Failed to draft application. Please try again.');
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
        .result { margin-top: 40px; border: 1px solid #222; padding: 32px; background: #0a0a0a; }
        .result-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 24px; color: #fafafa; }
        .result-section { margin-bottom: 24px; }
        .result-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .result-value { color: #fafafa; font-size: 0.9375rem; line-height: 1.7; }
        .error { padding: 12px; background: rgba(255,68,68,0.1); border: 1px solid #ff4444; color: #ff4444; font-size: 0.875rem; margin-top: 20px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #888; text-decoration: none; font-size: 0.875rem; margin-bottom: 32px; transition: color 0.2s; }
        .back-link:hover { color: #c0fe04; }
        @media (max-width: 640px) { .tool-container { padding: 100px 20px 60px; } }
      `}</style>

      <div className="tool-container">
        <a href="/tools" className="back-link">← Back to tools</a>

        <div className="tool-header">
          <span className="tool-label">// Tool</span>
          <h1 className="tool-title">Application Drafter</h1>
          <p className="tool-description">
            Describe your project and permit type. AI will draft a complete permit application 
            with the correct technical details and terminology.
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
              placeholder="Describe your project in detail..."
              className="form-input form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="permitType">Permit Type</label>
            <input
              id="permitType"
              type="text"
              value={permitType}
              onChange={(e) => setPermitType(e.target.value)}
              required
              placeholder="e.g., Building Permit, Electrical Permit, Plumbing Permit"
              className="form-input"
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
            {loading ? 'Drafting application...' : 'Draft Application'}
          </button>
        </form>

        {error && <div className="error" role="alert">{error}</div>}

        {result && (
          <div className="result">
            <h2 className="result-title">Application Draft</h2>
            
            <div className="result-section">
              <div className="result-label">Applicant Name</div>
              <div className="result-value">{result.applicantName}</div>
            </div>

            <div className="result-section">
              <div className="result-label">Project Address</div>
              <div className="result-value">{result.projectAddress}</div>
            </div>

            <div className="result-section">
              <div className="result-label">Project Description</div>
              <div className="result-value">{result.projectDescription}</div>
            </div>

            <div className="result-section">
              <div className="result-label">Estimated Cost</div>
              <div className="result-value">{result.estimatedCost}</div>
            </div>

            <div className="result-section">
              <div className="result-label">Contractor Info</div>
              <div className="result-value">
                Name: {result.contractorInfo.name}<br />
                License: {result.contractorInfo.licenseNumber}<br />
                Phone: {result.contractorInfo.phone}<br />
                Email: {result.contractorInfo.email}
              </div>
            </div>

            <div className="result-section">
              <div className="result-label">Scope of Work</div>
              <div className="result-value">{result.scopeOfWork}</div>
            </div>

            <div className="result-section">
              <div className="result-label">Compliance Notes</div>
              <div className="result-value">{result.complianceNotes}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
