'use client';

import { useState, useEffect } from 'react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
}

const TOOLS: Tool[] = [
  {
    id: 'permit-finder',
    name: 'Permit Finder',
    description: 'Enter your project details and zip code. AI tells you exactly which permits you need, from which department, with fees and processing times.',
    icon: '🔍',
    href: '/tools/permit-finder'
  },
  {
    id: 'application-drafter',
    name: 'Application Drafter',
    description: 'Upload photos, describe your project. AI fills out forms with correct technical terminology.',
    icon: '📝',
    href: '/tools/application-drafter'
  },
  {
    id: 'compliance-checker',
    name: 'Code Compliance Checker',
    description: 'AI checks your project against local building codes before submission. Flags issues that would cause rejections.',
    icon: '✅',
    href: '/tools/compliance-checker'
  },
  {
    id: 'document-checklist',
    name: 'Smart Document Checklist',
    description: 'Customized list of required documents with explanations of what each needs to contain.',
    icon: '📋',
    href: '/tools/document-checklist'
  }
];

export default function ToolsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      } else {
        window.location.href = '/login';
      }
    } catch (err) {
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '2px solid #222', borderTopColor: '#c0fe04', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .tools-container { max-width: 1200px; margin: 0 auto; padding: 120px 40px 80px; }
        .tools-header { margin-bottom: 60px; }
        .tools-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; display: block; }
        .tools-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 16px; }
        .tools-subtitle { color: #888; font-size: 1.125rem; max-width: 600px; line-height: 1.7; }
        .tools-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .tool-card { border: 1px solid #222; padding: 32px; transition: all 0.3s; background: #0a0a0a; text-decoration: none; color: inherit; display: block; }
        .tool-card:hover { border-color: #fafafa; transform: translateY(-4px); }
        .tool-icon { font-size: 2.5rem; margin-bottom: 20px; }
        .tool-name { font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; color: #fafafa; }
        .tool-description { color: #888; font-size: 0.9375rem; line-height: 1.6; }
        .tool-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 20px; color: #c0fe04; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .user-info { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #555; margin-bottom: 40px; }
        @media (max-width: 640px) { .tools-container { padding: 100px 20px 60px; } }
      `}</style>

      <div className="tools-container">
        <div className="tools-header">
          <span className="tools-label">// Tools</span>
          <h1 className="tools-title">Permit Tools</h1>
          <p className="tools-subtitle">AI-powered tools to streamline your permit process. Select a tool below to get started.</p>
          {user && <div className="user-info">Signed in as: {user.email}</div>}
        </div>

        <div className="tools-grid">
          {TOOLS.map((tool) => (
            <a key={tool.id} href={tool.href} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <h3 className="tool-name">{tool.name}</h3>
              <p className="tool-description">{tool.description}</p>
              <div className="tool-link">
                Open tool →
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
