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
        .highlight-box { padding: 20px; background: #111; border-left: 3px solid #c0fe04; margin: 24px 0; }
        .highlight-box-title { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #c0fe04; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        @media (max-width: 640px) { .legal-container { padding: 100px 20px 60px; } }
      `}</style>

      <div className="legal-container">
        <a href="/" className="back-link">← Back to home</a>
        
        <div className="legal-header">
          <span className="legal-label">// Legal</span>
          <h1 className="legal-title">Terms of Service</h1>
          <div className="legal-meta">Last updated: August 16, 2026 | Effective date: August 16, 2026</div>
        </div>

        <div className="legal-content">
          <p>
            Welcome to PermitAI. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account or using any part of the PermitAI service, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            PermitAI provides AI-powered permit application assistance tools including permit finder, application drafter, compliance checker, and document checklist generator. We do not guarantee permit approval and are not affiliated with any government agency.
          </p>

          <h2>3. User Accounts</h2>
          <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
            <li>Ensuring your use of the service complies with applicable laws</li>
          </ul>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the integrity of our service</li>
            <li>Use the service to submit false or misleading permit applications</li>
            <li>Reverse engineer or attempt to extract our AI models</li>
            <li>Resell or redistribute our services without authorization</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            All content, features, and functionality of the PermitAI service are owned by PermitAI and are protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            PermitAI is not liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses. Our total liability shall not exceed the amount you paid us in the past 12 months.
          </p>

          <div className="highlight-box">
            <div className="highlight-box-title">Important Disclaimer</div>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              PermitAI provides AI-generated suggestions only. We do not guarantee the accuracy, completeness, or legality of generated content. Always review all permit applications with a qualified professional before submission.
            </p>
          </div>

          <h2>7. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless PermitAI from any claims, damages, losses, and expenses arising from your use of the service or violation of these terms.
          </p>

          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the service will immediately cease.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will provide notice of material changes by posting the new Terms of Service on this page and updating the "Last updated" date.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@permitai.co">support@permitai.co</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
