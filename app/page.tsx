'use client';

import { useEffect, useState } from 'react';
import WaveDivider from '@/components/wave-divider';
import AnalyticsTracker from '@/components/analytics-tracker';
import SEOHead from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const bar = document.getElementById('loading-bar');
    if (bar) {
      bar.style.width = '100%';
      setTimeout(() => { bar.style.opacity = '0'; }, 500);
    }

    const hashAttr = 'href';
    const hashVal = '#';
    document.querySelectorAll('a[' + hashAttr + '^="' + hashVal + '"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute(hashAttr);
        if (href && href.startsWith(hashVal) && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
      resize();
      window.addEventListener('resize', resize);
      const draw = () => {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.03)';
        const spacing = 40;
        for (let x = 0; x < canvas.width; x += spacing) {
          for (let y = 0; y < canvas.height; y += spacing) {
            ctx!.beginPath();
            ctx!.arc(x, y, 1, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
        requestAnimationFrame(draw);
      };
      draw();
    }
  }, []);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0a0a0a'
      }}>
        <div style={{ width: '40px', height: '40px', border: '2px solid #222', borderTopColor: '#C0FE04', borderRadius: '50%', animation: 'spin 1s linear infinite' }} aria-label="Loading" role="status" />
      </div>
    );
  }

  return (
    <>
      <SEOHead />
      <AnalyticsTracker />
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa' }}>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { font-family: var(--font-sans); background-color: var(--color-background); color: var(--color-foreground); -webkit-font-smoothing: antialiased; }
          .mono { font-family: 'JetBrains Mono', monospace; }
          ::selection { background: #C0FE04; color: #000; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #0a0a0a; }
          ::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
          .skip-link { position: absolute; top: -40px; left: 0; background: #c0fe04; color: #000; padding: 8px 16px; z-index: 100; text-decoration: none; font-weight: 600; font-size: 0.875rem; transition: top 0.2s; }
          .skip-link:focus { top: 0; }
          .header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; background: rgba(10,10,10,0.8); backdrop-filter: blur(10px); border-bottom: 1px solid #222; }
          .logo { font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; letter-spacing: -0.02em; text-transform: uppercase; }
          .nav-links { display: flex; gap: 32px; align-items: center; }
          .nav-links a { color: #888; text-decoration: none; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; transition: color 0.2s; }
          .nav-links a:hover, .nav-links a:focus { color: #fafafa; outline: 2px solid #c0fe04; outline-offset: 4px; }
          .nav-cta { padding: 10px 24px; background: #fafafa; color: #0a0a0a; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; transition: all 0.2s; border: none; }
          .nav-cta:hover, .nav-cta:focus { background: #C0FE04; outline: 2px solid #c0fe04; outline-offset: 4px; }
          .nav-cta-secondary { padding: 10px 24px; background: transparent; color: #fafafa; border: 1px solid #222; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; transition: all 0.2s; }
          .nav-cta-secondary:hover, .nav-cta-secondary:focus { border-color: #fafafa; background: rgba(255,255,255,0.02); outline: 2px solid #c0fe04; outline-offset: 4px; }
          .hero { min-height: 100vh; display: grid; grid-template-columns: repeat(12, 1fr); padding: 120px 40px 80px; position: relative; }
          .hero-left { grid-column: 1 / 6; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 40px; }
          .hero-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
          .hero-label::before { content: ''; width: 8px; height: 8px; background: #C0FE04; border-radius: 50%; animation: pulse 2s infinite; }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
          .hero-title { font-size: clamp(3rem, 8vw, 7rem); font-weight: 900; line-height: 0.95; letter-spacing: -0.03em; text-transform: uppercase; margin-bottom: 32px; }
          .hero-title .accent { color: #C0FE04; font-style: italic; }
          .hero-description { font-size: 1rem; color: #888; max-width: 400px; line-height: 1.7; margin-bottom: 40px; }
          .hero-cta-group { display: flex; gap: 16px; flex-wrap: wrap; }
          .hero-right { grid-column: 7 / 13; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 40px; }
          .hero-3d { position: relative; min-height: 400px; border-radius: 1rem; overflow: hidden; border: 1px solid #222; background: linear-gradient(135deg, #0a0a0a 0%, #111 100%); }
          .hero-3d-inner { position: absolute; inset: 0; display: flex; align-items: center; justifyContent: center; }
          .hero-3d-cube { width: 120px; height: 120px; position: relative; transform-style: preserve-3d; animation: rotate3d 10s infinite linear; }
          @keyframes rotate3d { from { transform: rotateX(0deg) rotateY(0deg); } to { transform: rotateX(360deg) rotateY(360deg); } }
          .hero-3d-face { position: absolute; width: 120px; height: 120px; border: 2px solid #c0fe04; background: rgba(192,254,4,0.05); display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #c0fe04; }
          .hero-3d-face:nth-child(1) { transform: translateZ(60px); }
          .hero-3d-face:nth-child(2) { transform: rotateY(180deg) translateZ(60px); }
          .hero-3d-face:nth-child(3) { transform: rotateY(90deg) translateZ(60px); }
          .hero-3d-face:nth-child(4) { transform: rotateY(-90deg) translateZ(60px); }
          .hero-3d-face:nth-child(5) { transform: rotateX(90deg) translateZ(60px); }
          .hero-3d-face:nth-child(6) { transform: rotateX(-90deg) translateZ(60px); }
          .marquee { border-top: 1px solid #222; border-bottom: 1px solid #222; padding: 20px 0; overflow: hidden; white-space: nowrap; }
          .marquee-content { display: inline-flex; animation: marquee 30s linear infinite; }
          .marquee-item { font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: #555; text-transform: uppercase; letter-spacing: 0.1em; padding: 0 40px; display: inline-flex; align-items: center; gap: 40px; }
          .marquee-item::after { content: '✦'; color: #C0FE04; font-size: 0.75rem; }
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .stats { padding: 120px 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; border-bottom: 1px solid #222; }
          .stat-number { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; letter-spacing: -0.02em; line-height: 1; margin-bottom: 12px; }
          .stat-number .accent { color: #C0FE04; }
          .stat-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; }
          .section-header { margin-bottom: 80px; }
          .section-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; display: block; }
          .section-title { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 16px; }
          .section-desc { color: #888; font-size: 0.9375rem; line-height: 1.7; max-width: 600px; }
          .features { padding: 120px 40px; }
          .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
          .feature-card { border: 1px solid #222; padding: 32px; transition: all 0.3s; background: #0a0a0a; }
          .feature-card:hover { border-color: #fafafa; transform: translateY(-4px); }
          .feature-tag { display: inline-block; padding: 4px 12px; background: #C0FE04; color: #000; font-family: 'JetBrains Mono', monospace; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
          .feature-card h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; }
          .feature-card p { color: #888; font-size: 0.9375rem; line-height: 1.6; }
          .testimonials { padding: 120px 40px; border-top: 1px solid #222; }
          .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #222; border: 1px solid #222; }
          .testimonial { background: #0a0a0a; padding: 40px; }
          .testimonial-text { font-size: 1.125rem; line-height: 1.7; color: #888; margin-bottom: 24px; }
          .testimonial-author { font-weight: 700; font-size: 0.9375rem; margin-bottom: 4px; }
          .testimonial-role { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #555; text-transform: uppercase; letter-spacing: 0.05em; }
          .faq { padding: 120px 40px; border-top: 1px solid #222; }
          .faq-item { border-bottom: 1px solid #222; padding: 24px 0; }
          .faq-question { font-size: 1.125rem; font-weight: 600; margin-bottom: 12px; color: #fafafa; }
          .faq-answer { color: #888; font-size: 0.9375rem; line-height: 1.7; }
          .cta-section { padding: 160px 40px; text-align: center; border-top: 1px solid #222; position: relative; }
          .cta-title { font-size: clamp(3rem, 8vw, 8rem); font-weight: 900; line-height: 0.95; letter-spacing: -0.03em; text-transform: uppercase; margin-bottom: 40px; }
          .cta-title .accent { color: #C0FE04; font-style: italic; }
          .cta-subtitle { font-size: 1.125rem; color: #888; max-width: 600px; margin: 0 auto 48px; line-height: 1.7; }
          footer { padding: 80px 40px 40px; border-top: 1px solid #222; }
          .footer-grid { display: grid; grid-template-columns: 2fr 3fr; gap: 60px; margin-bottom: 60px; }
          .footer-brand .logo { display: block; margin-bottom: 20px; }
          .footer-brand p { color: #888; font-size: 0.9375rem; line-height: 1.7; max-width: 300px; }
          .footer-links { display: flex; justify-content: space-between; gap: 40px; }
          .footer-column h4 { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
          .footer-column a { display: block; color: #888; text-decoration: none; font-size: 0.9375rem; padding: 6px 0; transition: color 0.2s; }
          .footer-column a:hover, .footer-column a:focus { color: #C0FE04; outline: 2px solid #c0fe04; outline-offset: 4px; }
          .footer-bottom { padding-top: 40px; border-top: 1px solid #222; display: flex; justify-content: space-between; align-items: center; }
          .footer-bottom p { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #555; text-transform: uppercase; letter-spacing: 0.05em; }
          .footer-status { display: flex; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #555; text-transform: uppercase; letter-spacing: 0.05em; }
          .footer-status::before { content: ''; width: 6px; height: 6px; background: #C0FE04; border-radius: 50%; animation: pulse 2s infinite; }
          @media (max-width: 1024px) {
            .hero { grid-template-columns: 1fr; }
            .hero-left, .hero-right { grid-column: 1; }
            .stats { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 640px) {
            .hero { padding: 100px 20px 60px; }
            .stats { padding: 80px 20px; grid-template-columns: 1fr; }
            .features { padding: 80px 20px; }
            .testimonials { padding: 80px 20px; }
            .faq { padding: 80px 20px; }
            .cta-section { padding: 120px 20px; }
            footer { padding: 60px 20px 30px; }
            .nav-links { display: none; }
          }
        `}</style>

        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div id="loading-bar" style={{ width: '100%' }} role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} aria-label="Page loading" />
        <canvas id="bg-canvas" aria-hidden="true" />

        <header className="header" role="banner">
          <div className="logo">PermitAI</div>
          <nav className="nav-links" role="navigation" aria-label="Main navigation">
            <a href="#features">Capabilities</a>
            <a href="#proof">Proof</a>
            <a href="#faq">FAQ</a>
            <a href="/login" className="nav-cta-secondary">Sign In</a>
            <a href="/signup" className="nav-cta">Start Free Trial</a>
          </nav>
        </header>

        <main id="main-content">
          <div id="top" aria-hidden="true" style={{ position: 'absolute', top: 0 }}></div>
          
          {/* Hero */}
          <section className="hero relative" aria-labelledby="hero-title">
            <div className="hero-left">
              <div className="hero-label">Now serving 500+ US cities</div>
              <h1 id="hero-title" className="hero-title">
                Permit<br />
                <span className="accent">Intelligence</span>,<br />
                Reimagined
              </h1>
              <p className="hero-description">
                AI that reads local codes, drafts applications, and checks compliance before you submit. Cut permit time from 15 hours to 15 minutes. 92% first-pass approval rate.
              </p>
              <div className="hero-cta-group">
                <a href="/signup" className="btn btn-primary">Start Free Trial</a>
                <a href="#features" className="btn btn-secondary">Explore Capabilities</a>
              </div>
            </div>
            <div className="hero-right" style={{ position: 'relative', minHeight: '400px' }}>
              <div className="hero-3d" role="img" aria-label="3D visualization of permit intelligence">
                <div className="hero-3d-inner">
                  <div className="hero-3d-cube">
                    <div className="hero-3d-face">AI</div>
                    <div className="hero-3d-face">PERMIT</div>
                    <div className="hero-3d-face">FAST</div>
                    <div className="hero-3d-face">EASY</div>
                    <div className="hero-3d-face">SMART</div>
                    <div className="hero-3d-face">2026</div>
                  </div>
                </div>
              </div>
            </div>
            <WaveDivider color="#0a0a0a" height={60} />
          </section>

          {/* Marquee */}
          <div className="marquee" role="marquee" aria-label="Featured capabilities">
            <div className="marquee-content">
              <span className="marquee-item">Permit Finder</span>
              <span className="marquee-item">Application Drafter</span>
              <span className="marquee-item">Code Compliance</span>
              <span className="marquee-item">Document Checklist</span>
              <span className="marquee-item">Instant Revisions</span>
              <span className="marquee-item">Plain English</span>
              <span className="marquee-item">Historical Data</span>
              <span className="marquee-item">Team Workspace</span>
              <span className="marquee-item">Auto-Submission</span>
            </div>
          </div>

          {/* Stats */}
          <section className="stats" aria-label="Statistics">
            <div>
              <div className="stat-number">15<span className="accent">+</span></div>
              <div className="stat-label">Hours saved per project</div>
            </div>
            <div>
              <div className="stat-number">48<span className="accent">hrs</span></div>
              <div className="stat-label">Average approval time</div>
            </div>
            <div>
              <div className="stat-number">92<span className="accent">%</span></div>
              <div className="stat-label">First-pass approval rate</div>
            </div>
            <div>
              <div className="stat-number">$5K<span className="accent">+</span></div>
              <div className="stat-label">Avg. project value saved</div>
            </div>
          </section>

          <WaveDivider color="#0a0a0a" height={40} />

          {/* Features */}
          <section id="features" className="features" aria-labelledby="features-title">
            <div className="section-header">
              <span className="section-label">// Capabilities</span>
              <h2 id="features-title" className="section-title">Everything you need to get permits faster.</h2>
              <p className="section-desc">Six core capabilities designed to eliminate the permit bottleneck. From research to submission, AI handles the heavy lifting.</p>
            </div>

            <div className="features-grid">
              <article className="feature-card">
                <span className="feature-tag">Core Feature</span>
                <h3>Permit Finder</h3>
                <p>Enter project details and zip code. AI returns exactly which permits you need, from which department, with fees and processing times.</p>
              </article>
              <article className="feature-card">
                <span className="feature-tag">AI Drafting</span>
                <h3>Application Drafter</h3>
                <p>Upload photos, describe your project. AI fills out forms with correct technical terminology.</p>
              </article>
              <article className="feature-card">
                <span className="feature-tag">Compliance</span>
                <h3>Code Compliance Checker</h3>
                <p>AI checks your project against local building codes before submission. Flags issues that would cause rejections.</p>
              </article>
              <article className="feature-card">
                <span className="feature-tag">Documents</span>
                <h3>Smart Document Checklist</h3>
                <p>Customized list of required documents with explanations of what each needs to contain.</p>
              </article>
              <article className="feature-card">
                <span className="feature-tag">Translation</span>
                <h3>Plain English Translator</h3>
                <p>Building codes rewritten in plain English. No more lawyer-speak, no more confusion.</p>
              </article>
              <article className="feature-card">
                <span className="feature-tag">Speed</span>
                <h3>Instant Revisions</h3>
                <p>Reviewer requests changes? AI instantly revises and explains what changed and why.</p>
              </article>
            </div>
          </section>

          {/* Testimonials */}
          <section id="proof" className="testimonials" aria-labelledby="proof-title">
            <div className="section-header">
              <span className="section-label">// Proof</span>
              <h2 id="proof-title" className="section-title">Trusted by contractors & homeowners.</h2>
            </div>
            <div className="testimonials-grid">
              <blockquote className="testimonial">
                <p className="testimonial-text">"I used to spend half a day every week on permit research. PermitAI cut that to 20 minutes. First-time approval rate went from 60% to 95%. This tool pays for itself on the first project."</p>
                <footer>
                  <div className="testimonial-author">Mike R.</div>
                  <div className="testimonial-role">Licensed General Contractor, Austin TX</div>
                </footer>
              </blockquote>
              <blockquote className="testimonial">
                <p className="testimonial-text">"As a DIYer, permits terrified me. The language, the forms, the fear of getting it wrong. PermitAI walked me through my kitchen remodel step-by-step. Permit approved in 3 days with zero corrections."</p>
                <footer>
                  <div className="testimonial-author">Sarah K.</div>
                  <div className="testimonial-role">Homeowner, Denver CO</div>
                </footer>
              </blockquote>
              <blockquote className="testimonial">
                <p className="testimonial-text">"We run 15-20 projects a month. PermitAI saves my project managers 10+ hours each week. That's $3,000+ in recovered labor every month. Best tool we've added this year."</p>
                <footer>
                  <div className="testimonial-author">David T.</div>
                  <div className="testimonial-role">Owner, Summit Construction, Phoenix AZ</div>
                </footer>
              </blockquote>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="faq" aria-labelledby="faq-title">
            <div className="section-header">
              <span className="section-label">// FAQ</span>
              <h2 id="faq-title" className="section-title">Common questions answered.</h2>
              <p className="section-desc">Everything you need to know about PermitAI. Can't find the answer? <a href="mailto:support@permitai.co" style={{ color: '#c0fe04' }}>Contact us</a>.</p>
            </div>

            <div>
              {[
                { q: 'How does PermitAI know local permit requirements?', a: 'PermitAI is trained on thousands of municipal building codes, permit applications, and approval patterns across 500+ US cities.' },
                { q: 'Is my project data secure?', a: 'Absolutely. We use bank-level encryption (AES-256) for all data at rest and in transit. Your project details are never shared with third parties.' },
                { q: 'What if my permit application gets rejected?', a: 'If rejected, PermitAI analyzes the rejection reason, makes corrections, and resubmits. Most customers see first-pass approval rates go from 60% to 95%.' },
                { q: 'Do I need construction experience to use PermitAI?', a: 'Not at all. PermitAI is designed for everyone - from first-time DIY homeowners to seasoned general contractors.' },
                { q: 'Can I cancel my subscription anytime?', a: 'Yes. All plans are month-to-month with no contracts. You can cancel in one click from your account settings.' },
              ].map((faq, i) => (
                <div key={i} className="faq-item">
                  <h3 className="faq-question">{faq.q}</h3>
                  <p className="faq-answer">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <WaveDivider color="#0a0a0a" height={60} />

          {/* CTA */}
          <section id="cta" className="cta-section" aria-labelledby="cta-title">
            <h2 id="cta-title" className="cta-title">
              Stop waiting<br />
              <span className="accent">on permits.</span>
            </h2>
            <p className="cta-subtitle">Join 2,000+ contractors and homeowners who cut their permit time by 80%. Start your free trial today.</p>
            <a href="/signup" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }} aria-label="Start your free trial">
              Start Your Free Trial
            </a>
          </section>

          {/* Footer */}
          <footer role="contentinfo">
            <div className="footer-grid">
              <div className="footer-brand">
                <span className="logo">PermitAI</span>
                <p>AI-powered permit applications for the modern contractor. Built with craft and care.</p>
              </div>
              <div className="footer-links">
                <div className="footer-column">
                  <h4>Product</h4>
                  <a href="#features">Capabilities</a>
                  <a href="/pricing">Pricing</a>
                  <a href="#proof">Proof</a>
                  <a href="#faq">FAQ</a>
                </div>
                <div className="footer-column">
                  <h4>Company</h4>
                  <a href="#">About</a>
                  <a href="#">Contact</a>
                  <a href="/accessibility">Accessibility</a>
                  <a href="/legal/privacy">Privacy Policy</a>
                  <a href="/legal/terms">Terms of Service</a>
                </div>
                <div className="footer-column">
                  <h4>Connect</h4>
                  <a href="#">Twitter / X</a>
                  <a href="#">LinkedIn</a>
                  <a href="#">GitHub</a>
                  <a href="mailto:support@permitai.co">Email</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 PermitAI. All rights reserved.</p>
              <div className="footer-status">All systems operational</div>
            </div>
            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #222', textAlign: 'center' }}>
              <a href="#top" style={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', fontFamily: "'JetBrains Mono', monospace" }}>
                ↑ Back to top
              </a>
            </div>
          </footer>
        </main>

        <canvas id="bg-canvas" aria-hidden="true" />
      </div>
    </>
  );
}
