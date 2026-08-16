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
        .highlight-box { padding: 20px; background: #111; border-left: 3px solid #c0fe04; margin: 24px 0; }
        .highlight-box-title { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #c0fe04; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .toc { padding: 20px; background: #111; border: 1px solid #222; margin-bottom: 40px; }
        .toc-title { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
        .toc a { display: block; color: #888; text-decoration: none; padding: 4px 0; font-size: 0.875rem; }
        .toc a:hover { color: #c0fe04; }
        @media (max-width: 640px) { .legal-container { padding: 100px 20px 60px; } }
      `}</style>

      <div className="legal-container">
        <a href="/" className="back-link">← Back to home</a>
        
        <div className="legal-header">
          <span className="legal-label">// Legal</span>
          <h1 className="legal-title">Privacy Policy</h1>
          <div className="legal-meta">Last updated: August 16, 2026 | Effective date: August 16, 2026</div>
        </div>

        <div className="toc">
          <div className="toc-title">Table of Contents</div>
          <a href="#information-we-collect">1. Information We Collect</a>
          <a href="#how-we-use">2. How We Use Your Information</a>
          <a href="#data-sharing">3. Data Sharing & Disclosure</a>
          <a href="#data-security">4. Data Security</a>
          <a href="#your-rights">5. Your Privacy Rights (GDPR/CCPA)</a>
          <a href="#data-retention">6. Data Retention</a>
          <a href="#cookies">7. Cookies & Tracking</a>
          <a href="#international">8. International Data Transfers</a>
          <a href="#changes">9. Changes to This Policy</a>
          <a href="#contact">10. Contact Us</a>
        </div>

        <div className="legal-content">
          <p>
            PermitAI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. We comply with GDPR, CCPA, and other applicable privacy regulations.
          </p>

          <div className="highlight-box">
            <div className="highlight-box-title">Your Rights Summary</div>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              You have the right to access, correct, delete, and export your personal data. You can also anonymize your data or request its deletion. To exercise these rights, visit your <a href="/settings/privacy" style={{ color: '#c0fe04' }}>Privacy Settings</a> page.
            </p>
          </div>

          <h2 id="information-we-collect">1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways, including:</p>
          <ul>
            <li><strong>Personal Data</strong>: Name, email address, phone number, and other contact information you provide when creating an account or contacting us.</li>
            <li><strong>Project Data</strong>: Information about your permit projects, including descriptions, addresses, and uploaded documents.</li>
            <li><strong>Usage Data</strong>: Information about how you use our website, including pages visited, time spent, and actions taken.</li>
            <li><strong>Device Data</strong>: Information about your device, including IP address, browser type, and operating system.</li>
            <li><strong>Payment Data</strong>: Payment information is processed securely by Stripe. We do not store your credit card details.</li>
          </ul>

          <h2 id="how-we-use">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Process transactions and send you related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns to improve our services</li>
            <li>Prevent fraud and abuse</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 id="data-sharing">3. Data Sharing & Disclosure</h2>
          <p>
            We do not sell your personal data. We may share your information with:
          </p>
          <ul>
            <li><strong>Service Providers</strong>: Third-party vendors who assist us in providing our services (e.g., hosting, payment processing, AI services).</li>
            <li><strong>Legal Requirements</strong>: When required by law or to protect our rights, property, or safety.</li>
            <li><strong>Business Transfers</strong>: In connection with a merger, acquisition, or sale of assets.</li>
          </ul>

          <h2 id="data-security">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. This includes encryption at rest and in transit, regular security audits, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 id="your-rights">5. Your Privacy Rights (GDPR/CCPA)</h2>
          <p>You have the following rights under GDPR, CCPA, and other privacy regulations:</p>
          <ul>
            <li><strong>Right to Access</strong>: Request a copy of your personal data in a portable format.</li>
            <li><strong>Right to Rectification</strong>: Correct inaccurate or incomplete personal data.</li>
            <li><strong>Right to Erasure</strong>: Request deletion of your personal data ("right to be forgotten").</li>
            <li><strong>Right to Data Portability</strong>: Receive your data in a machine-readable format.</li>
            <li><strong>Right to Object</strong>: Object to processing of your personal data.</li>
            <li><strong>Right to Withdraw Consent</strong>: Withdraw consent at any time.</li>
            <li><strong>Right to Non-Discrimination</strong>: Exercise your privacy rights without discrimination.</li>
          </ul>

          <div className="highlight-box">
            <div className="highlight-box-title">How to Exercise Your Rights</div>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              You can exercise these rights through your <a href="/settings/privacy" style={{ color: '#c0fe04' }}>Privacy Settings</a> page, or by contacting us at <a href="mailto:privacy@permitai.co" style={{ color: '#c0fe04' }}>privacy@permitai.co</a>. We will respond to your request within 30 days.
            </p>
          </div>

          <h2 id="data-retention">6. Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary to provide our services and comply with legal obligations. When you delete your account, your data will be permanently removed within 30 days. Some data may be retained longer if required by law.
          </p>

          <h2 id="cookies">7. Cookies & Tracking</h2>
          <p>
            We use essential cookies to maintain your session and preferences. We do not use tracking cookies for advertising purposes. You can manage cookie preferences in your browser settings.
          </p>

          <h2 id="international">8. International Data Transfers</h2>
          <p>
            Your data may be transferred to and processed in countries other than your own, including the United States. We ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2 id="changes">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 id="contact">10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at:
          </p>
          <ul>
            <li>Email: <a href="mailto:privacy@permitai.co">privacy@permitai.co</a></li>
            <li>Support: <a href="mailto:support@permitai.co">support@permitai.co</a></li>
            <li>Security: <a href="mailto:security@permitai.co">security@permitai.co</a></li>
          </ul>

          <div className="highlight-box">
            <div className="highlight-box-title">Data Protection Officer</div>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              For GDPR-related inquiries, you can contact our Data Protection Officer at <a href="mailto:dpo@permitai.co" style={{ color: '#c0fe04' }}>dpo@permitai.co</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
