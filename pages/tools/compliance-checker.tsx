'use client';

import { useState } from 'react';

interface ComplianceIssue {
  severity: 'error' | 'warning' | 'info';
  code: string;
  description: string;
  recommendation: string;
}

interface ComplianceResult {
  overallStatus: 'pass' | 'conditional' | 'fail';
  issues: ComplianceIssue[];
  summary: string;
}

export default function ComplianceCheckerPage() {
  const [projectDescription, setProjectDescription] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComplianceResult | null>(null);
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
          action: 'checkCompliance',
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
      setError('Failed to check compliance. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return '#ff4444';
      case 'warning': return '#ffaa00';
      case 'info': return '#c0fe04';
      default: return '#888';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return '#c0fe04';
      case 'conditional': return '#ffaa00';
      case 'fail': return '#ff4444';
      default: return '#888';
    }
  };

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
        .result-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .status-badge { padding: 8px 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; }
        .status-pass { background: rgba(192,254,4,0.1); color: #c0fe04; border: 1px solid #c0fe04; }
        .status-conditional { background: rgba(255,170,0,0.1); color: #ffaa00; border: 1px solid #ffaa00; }
        .status-fail { background: rgba(255,68,68,0.1); color: #ff4444; border: 1px solid #ff4444; }
        .issue-card { border: 1px solid #222; padding: 20px; margin-bottom: 12px; background: #0a0a0a; }
        .issue-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .issue-severity { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 8px; border-radius: 2px; }
        .issue-code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; }
        .issue-description { color: #fafafa; font-size: 0.9375rem; margin-bottom: 8px; line-height: 1.6; }
        .issue-recommendation { color: #888; font-size: 0.875rem; line-height: 1.6; padding-left: 12px; border-left: 2px solid #222; }
        .summary { color: #fafafa; font-size: 1rem; line-height: 1.7; margin-bottom: 24px; padding: 16px; background: #111; border-left: 3px solid #c0fe04; }
        .error { padding: 12px; background: rgba(255,68,68,0.1); border: 1px solid #ff4444; color: #ff4444; font-size: 0.875rem; margin-top: 20px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #888; text-decoration: none; font-size: 0.875rem; margin-bottom: 32px; transition: color 0.2s; }
        .back-link:hover { color: #c0fe04; }
        @media (max-width: 640px) { .tool-container { padding: 100px 20px 60px; } }
      `}</style>

      <div className="tool-container">
        <a href="/tools" className="back-link">← Back to tools</a>

        <div className="tool-header">
          <span className="tool-label">// Tool</span>
          <h1 className="tool-title">Code Compliance Checker</h1>
          <p className="tool-description">
            AI checks your project against local building codes before submission. 
            Flags issues that would cause rejections and provides recommendations.
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
              placeholder="Describe your project in detail, including materials, dimensions, and scope..."
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
            {loading ? 'Checking compliance...' : 'Check Compliance'}
          </button>
        </form>

        {error && <div className="error" role="alert">{error}</div>}

        {result && (
          <div className="result">
            <div className="result-header">
              <div className={`status-badge status-${result.overallStatus}`}>
                {result.overallStatus === 'pass' && '✓ Pass'}
                {result.overallStatus === 'conditional' && '⚠ Conditional'}
                {result.overallStatus === 'fail' && '✗ Fail'}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#888' }}>
                {result.issues.length} issue{result.issues.length !== 1 ? 's' : ''} found
              </div>
            </div>

            <div className="summary">{result.summary}</div>

            {result.issues.map((issue, index) => (
              <div key={index} className="issue-card">
                <div className="issue-header">
                  <div className="issue-severity" style={{ 
                    background: `${getSeverityColor(issue.severity)}15`,
                    color: getSeverityColor(issue.severity),
                    border: `1px solid ${getSeverityColor(issue.severity)}40`
                  }}>
                    {issue.severity}
                  </div>
                  <div className="issue-code">{issue.code}</div>
                </div>
                <div className="issue-description">{issue.description}</div>
                <div className="issue-recommendation">
                  <strong>Recommendation:</strong> {issue.recommendation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
