export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa' }}>
      <style>{`
        .legal-container { max-width: 800px; margin: 0 auto; padding: 120px 40px 80px; }
        .legal-header { margin-bottom: 60px; }
        .legal-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; display: block; }
        .legal-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 24px; line-height: 1.1; }
        .legal-meta { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #555; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 40px; }
        .legal-content { color: #888; line-height: 1.8; }
        .legal-content h2 { font-size: 1.5rem; font-weight: 800; margin: 48px 0 20px; color: #fafafa; }
        .legal-content p { margin-bottom: 20px; }
        .legal-content ul { margin: 20px 0 20px 24px; }
        .legal-content li { margin-bottom: 10px; }
        .legal-content a { color: #c0fe04; text-decoration: none; }
        .legal-content a:hover { text-decoration: underline; }
        .legal-content strong { color: #fafafa; font-weight: 600; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #888; text-decoration: none; font-size: 0.875rem; margin-bottom: 32px; transition: color 0.2s; }
        .back-link:hover { color: #c0fe04; }
        @media (max-width: 640px) { .legal-container { padding: 100px 20px 60px; } }
      `}</style>

      <div className="legal-container">
        <a href="/" className="back-link">← Back to home</a>
        
        <div className="legal-header">
          <span className="legal-label">// Legal</span>
          <h1 className="legal-title">Terms of Service</h1>
          <div className="legal-meta">Last updated: August 16, 2026</div>
        </div>

        <div className="legal-content">
          <p>
            By accessing or using PermitAI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>Acceptance of Terms</h2>
          <p>
            By creating an account or using our services, you agree to these Terms of Service and our Privacy Policy. If you are using our services on behalf of an organization, you represent that you have authority to bind that organization to these terms.
          </p>

          <h2>Description of Service</h2>
          <p>
            PermitAI provides AI-powered permit application assistance. We do not guarantee permit approval, and our services are not a substitute for professional legal, architectural, or engineering advice.
          </p>

          <h2>User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and complete information when using our services</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access to your account</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not use our services for any illegal or unauthorized purpose</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content, features, and functionality of PermitAI are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, PermitAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of our services.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless PermitAI and its officers, directors, employees, and agents from any claims, damages, losses, and expenses arising from your use of our services or violation of these terms.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We may modify these terms at any time. We will notify you of significant changes by posting the new terms on our website or via email. Your continued use of our services after changes constitutes acceptance of the new terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have questions about these Terms of Service, please contact us at <a href="mailto:support@permitai.co">support@permitai.co</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
