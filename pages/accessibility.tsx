export default function AccessibilityPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa' }}>
      <style>{`
        .accessibility-container { max-width: 800px; margin: 0 auto; padding: 120px 40px 80px; }
        .accessibility-header { margin-bottom: 60px; }
        .accessibility-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; display: block; }
        .accessibility-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 24px; line-height: 1.1; }
        .accessibility-meta { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #555; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 40px; }
        .accessibility-content { color: #888; line-height: 1.8; }
        .accessibility-content h2 { font-size: 1.5rem; font-weight: 800; margin: 48px 0 20px; color: #fafafa; }
        .accessibility-content p { margin-bottom: 20px; }
        .accessibility-content ul { margin: 20px 0 20px 24px; }
        .accessibility-content li { margin-bottom: 10px; }
        .accessibility-content a { color: #c0fe04; text-decoration: none; }
        .accessibility-content a:hover { text-decoration: underline; }
        .accessibility-content strong { color: #fafafa; font-weight: 600; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #888; text-decoration: none; font-size: 0.875rem; margin-bottom: 32px; transition: color 0.2s; }
        .back-link:hover { color: #c0fe04; }
        @media (max-width: 640px) { .accessibility-container { padding: 100px 20px 60px; } }
      `}</style>

      <div className="accessibility-container">
        <a href="/" className="back-link">← Back to home</a>
        
        <div className="accessibility-header">
          <span className="accessibility-label">// Legal</span>
          <h1 className="accessibility-title">Accessibility Statement</h1>
          <div className="accessibility-meta">Last updated: August 16, 2026</div>
        </div>

        <div className="accessibility-content">
          <p>
            PermitAI is committed to ensuring digital accessibility for people with disabilities. We continuously improve the user experience for everyone and apply relevant accessibility standards.
          </p>

          <h2>Conformance Status</h2>
          <p>
            PermitAI aims to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> standards. These guidelines explain how to make web content more accessible for people with disabilities.
          </p>

          <h2>Accessibility Features</h2>
          <p>Our website includes the following accessibility features:</p>
          <ul>
            <li><strong>Keyboard Navigation</strong>: All interactive elements are accessible via keyboard</li>
            <li><strong>Screen Reader Support</strong>: Proper ARIA labels and semantic HTML structure</li>
            <li><strong>Color Contrast</strong>: Text meets minimum contrast ratios for readability</li>
            <li><strong>Resizable Text</strong>: Content remains usable at 200% zoom</li>
            <li><strong>Focus Indicators</strong>: Visible focus states for keyboard navigation</li>
            <li><strong>Alternative Text</strong>: Meaningful descriptions for visual content</li>
            <li><strong>Consistent Navigation</strong>: Predictable layout and navigation across pages</li>
          </ul>

          <h2>Known Limitations</h2>
          <p>While we strive for full accessibility, some limitations may exist:</p>
          <ul>
            <li><strong>PDF Documents</strong>: Some downloadable forms may not be fully accessible to screen readers</li>
            <li><strong>Third-Party Content</strong>: Embedded content from third-party services may have varying accessibility levels</li>
            <li><strong>Video Content</strong>: Video tutorials may not all have closed captions (we are working to add them)</li>
          </ul>

          <h2>Feedback and Contact</h2>
          <p>
            We welcome your feedback on the accessibility of PermitAI. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
          </p>
          <ul>
            <li><strong>Email</strong>: <a href="mailto:support@permitai.co">support@permitai.co</a></li>
            <li><strong>Subject line</strong>: "Accessibility Feedback"</li>
          </ul>
          <p>
            We aim to respond to accessibility feedback within 3 business days.
          </p>

          <h2>Accessibility Statement Updates</h2>
          <p>
            This accessibility statement was last reviewed and updated on August 16, 2026. We review this statement annually and update it as needed to reflect changes to our website and services.
          </p>

          <h2>Technical Specifications</h2>
          <p>
            PermitAI's accessibility is based on the following technologies:
          </p>
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript (React/Next.js)</li>
            <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
          </ul>

          <h2>Assessment</h2>
          <p>
            PermitAI has been assessed for accessibility using:
          </p>
          <ul>
            <li>Automated testing tools (WAVE, axe DevTools)</li>
            <li>Manual keyboard navigation testing</li>
            <li>Screen reader testing with NVDA and VoiceOver</li>
            <li>Color contrast analysis</li>
          </ul>

          <h2>Ongoing Efforts</h2>
          <p>
            We are continuously working to improve the accessibility of our website. Our efforts include:
          </p>
          <ul>
            <li>Regular accessibility audits</li>
            <li>Staff training on accessibility best practices</li>
            <li>Incorporating accessibility into our design and development processes</li>
            <li>Testing with users who have disabilities</li>
          </ul>

          <h2>Additional Resources</h2>
          <p>For more information on web accessibility, visit:</p>
          <ul>
            <li><a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">Web Content Accessibility Guidelines (WCAG)</a></li>
            <li><a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer">Web Accessibility Initiative (WAI)</a></li>
            <li><a href="https://adata.org/" target="_blank" rel="noopener noreferrer">ADA National Network</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
