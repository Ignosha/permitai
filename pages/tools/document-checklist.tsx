'use client';

import { useState } from 'react';

interface DocumentItem {
  name: string;
  description: string;
  required: boolean;
  tips: string;
}

interface DocumentChecklistResult {
  permitType: string;
  documents: DocumentItem[];
  notes: string;
}

export default function DocumentChecklistPage() {
  const [projectType, setProjectType] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DocumentChecklistResult | null>(null);
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
          action: 'generateDocumentChecklist',
          projectType,
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
      setError('Failed to generate document checklist. Please try again.');
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
        .form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; padding-right: 40px; }
        .btn { padding: 14px 32px; background: #c0fe04; color: #000; border: none; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.02em; cursor: pointer; transition: all 0.2s; }
        .btn:hover { background: #a8d904; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .result { margin-top: 40px; border: 1px solid #222; padding: 32px; background: #0a0a0a; }
        .result-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 24px; color: #fafafa; }
        .document-card { border: 1px solid #222; padding: 20px; margin-bottom: 12px; background: #0a0a0a; }
        .document-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
        .document-checkbox { margin-top: 4px; width: 18px; height: 18px; accent-color: #c0fe04; cursor: pointer; }
        .document-name { font-size: 1rem; font-weight: 600; color: #fafafa; flex: 1; }
        .document-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 8px; border-radius: 2px; }
        .badge-required { background: rgba(255,68,68,0.1); color: #ff4444; border: 1px solid #ff444440; }
        .badge-optional { background: rgba(136,136,136,0.1); color: #888; border: 1px solid #88840; }
        .document-description { color: #fafafa; font-size: 0.9375rem; line-height: 1.6; margin-bottom: 8px; }
        .document-tips { color: #888; font-size: 0.875rem; line-height: 1.6; padding: 12px; background: #111; border-left: 2px solid #c0fe04; }
        .notes { margin-top: 24px; padding: 16px; background: #111; border-left: 3px solid #888; color: #fafafa; font-size: 0.9375rem; line-height: 1.7; }
        .error { padding: 12px; background: rgba(255,68,68,0.1); border: 1px solid #ff4444; color: #ff4444; font-size: 0.875rem; margin-top: 20px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #888; text-decoration: none; font-size: 0.875rem; margin-bottom: 32px; transition: color 0.2s; }
        .back-link:hover { color: #c0fe04; }
        @media (max-width: 640px) { .tool-container { padding: 100px 20px 60px; } }
      `}</style>

      <div className="tool-container">
        <a href="/tools" className="back-link">← Back to tools</a>

        <div className="tool-header">
          <span className="tool-label">// Tool</span>
          <h1 className="tool-title">Smart Document Checklist</h1>
          <p className="tool-description">
            Get a customized list of required documents for your permit application, 
            with explanations of what each document needs to contain.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="projectType">Project Type</label>
            <select
              id="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              required
              className="form-input form-select"
            >
              <option value="">Select a project type...</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="renovation">Renovation / Remodel</option>
              <option value="new_construction">New Construction</option>
              <option value="addition">Addition / Extension</option>
              <option value="electrical">Electrical Work</option>
              <option value="plumbing">Plumbing Work</option>
              <option value="hvac">HVAC / Mechanical</option>
              <option value="demolition">Demolition</option>
              <option value="landscape">Landscape / Grading</option>
              <option value="signage">Signage</option>
            </select>
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
            {loading ? 'Generating checklist...' : 'Generate Checklist'}
          </button>
        </form>

        {error && <div className="error" role="alert">{error}</div>}

        {result && (
          <div className="result">
            <h2 className="result-title">Document Checklist for {result.permitType}</h2>

            {result.documents.map((doc, index) => (
              <div key={index} className="document-card">
                <div className="document-header">
                  <input
                    type="checkbox"
                    className="document-checkbox"
                    id={`doc-${index}`}
                  />
                  <label htmlFor={`doc-${index}`} className="document-name" style={{ cursor: 'pointer' }}>
                    {doc.name}
                  </label>
                  <span className={`document-badge ${doc.required ? 'badge-required' : 'badge-optional'}`}>
                    {doc.required ? 'Required' : 'Optional'}
                  </span>
                </div>
                <div className="document-description">{doc.description}</div>
                {doc.tips && (
                  <div className="document-tips">
                    <strong>💡 Tip:</strong> {doc.tips}
                  </div>
                )}
              </div>
            ))}

            {result.notes && (
              <div className="notes">
                <strong>📝 Additional Notes:</strong><br />
                {result.notes}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
