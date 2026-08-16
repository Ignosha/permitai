export default function PrivacyPage() {
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
          <h1 className="legal-title">Privacy Policy</h1>
          <div className="legal-meta">Last updated: August 16, 2026</div>
        </div>

        <div className="legal-content">
          <p>
            PermitAI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect information about you in a variety of ways, including:</p>
          <ul>
            <li><strong>Personal Data</strong>: Name, email address, phone number, and other contact information you provide when creating an account or contacting us.</li>
            <li><strong>Project Data</strong>: Information about your permit projects, including descriptions, addresses, and uploaded documents.</li>
            <li><strong>Usage Data</strong>: Information about how you use our website, including pages visited, time spent, and actions taken.</li>
            <li><strong>Device Data</strong>: Information about your device, including IP address, browser type, and operating system.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Process transactions and send you related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns to improve our services</li>
            <li>Prevent fraud and abuse</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We use third-party services including Supabase (database), Stripe (payments), and Groq (AI). These services have their own privacy policies, and we encourage you to review them.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at <a href="mailto:support@permitai.co">support@permitai.co</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
