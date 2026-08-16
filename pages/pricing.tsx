'use client';

import { useState } from 'react';
import styles from './pricing.module.css';

const PLANS = [
  {
    id: 'diy',
    name: 'DIY Homeowner',
    price: 9.99,
    period: 'per month',
    features: [
      '1 active project',
      'Permit finder',
      'Application drafter',
      'Document checklist',
      'Email support',
    ],
    cta: 'Start Free Trial',
    featured: false,
  },
  {
    id: 'solo',
    name: 'Solo Contractor',
    price: 49,
    period: 'per month',
    features: [
      '5 active projects',
      'Everything in DIY',
      'Code compliance checker',
      'Priority support',
      'Team sharing (2 users)',
    ],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    id: 'team',
    name: 'Small Team',
    price: 149,
    period: 'per month',
    features: [
      'Unlimited projects',
      'Everything in Solo',
      'Instant revisions',
      'Priority support',
      'Team sharing (10 users)',
    ],
    cta: 'Start Free Trial',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    period: 'per month',
    features: [
      'Everything in Small Team',
      'Unlimited users',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  async function handleCheckout(planId: string) {
    if (planId === 'pro') {
      alert('Contact sales at sales@permitai.co');
      return;
    }

    setLoading(planId);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to start checkout');
        setLoading(null);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
      setLoading(null);
    }
  }

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const endpoint = authMode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });

      const data = await response.json();

      if (data.error) {
        setAuthError(data.error);
      } else {
        if (selectedPlan) {
          handleCheckout(selectedPlan);
        } else {
          setAuthMode(null);
          setAuthEmail('');
          setAuthPassword('');
        }
      }
    } catch (error) {
      setAuthError('Something went wrong. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  }

  function openAuth(planId: string) {
    setSelectedPlan(planId);
    setAuthMode('signin');
    setAuthError('');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa' }}>
      <div className={styles.pricingContainer}>
        <div className={styles.pricingHeader}>
          <span className={styles.pricingLabel}>// Pricing</span>
          <h1 className={styles.pricingTitle}>Simple, transparent pricing.</h1>
          <p className={styles.pricingSubtitle}>Start free. Upgrade when ready. No contracts, cancel anytime. All plans include a 14-day free trial.</p>
        </div>

        <div className={styles.pricingGrid}>
          {PLANS.map((plan) => (
            <div key={plan.id} className={`${styles.pricingCard} ${plan.featured ? `${styles.pricingCardFeatured}` : ''}`}>
              <h3>{plan.name}</h3>
              <div className={styles.pricingAmount}>
                <span className={styles.currency}>$</span>
                {plan.price}
              </div>
              <div className={styles.pricingPeriod}>{plan.period}</div>
              <ul className={styles.pricingFeatures}>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button
                className={`${plan.featured ? 'btn-primary' : 'btn-secondary'} ${styles.fullWidth}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: plan.featured ? '#c0fe04' : 'transparent',
                  color: plan.featured ? '#000' : '#fafafa',
                }}
                onClick={() => openAuth(plan.id)}
                disabled={loading === plan.id}
                aria-label={`${plan.cta} for ${plan.name} plan`}
              >
                {loading === plan.id ? 'Loading...' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.guarantee}>
          <p className={styles.guaranteeText}>
            All plans include a 14-day free trial. No credit card required. Cancel anytime. Questions? <a href="mailto:support@permitai.co" style={{ color: '#c0fe04' }}>support@permitai.co</a>
          </p>
        </div>
      </div>

      {authMode && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: 20
        }} onClick={() => setAuthMode(null)} role="presentation">
          <div style={{
            background: '#0a0a0a',
            border: '1px solid #222',
            padding: '40px',
            maxWidth: '400px',
            width: '100%'
          }} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <h2 id="auth-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
              {authMode === 'signup' ? 'Create account' : 'Welcome back'}
            </h2>
            <p style={{ color: '#888', marginBottom: '32px', fontSize: '0.9375rem' }}>
              {authMode === 'signup' 
                ? 'Start your 14-day free trial. No credit card required.' 
                : 'Sign in to continue to checkout.'}
            </p>

            <form onSubmit={handleAuth}>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="auth-email" style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}>
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                  autoComplete="email"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: '#111',
                    border: '1px solid #222',
                    color: '#fafafa',
                    fontSize: '0.9375rem',
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="auth-password" style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}>
                  Password
                </label>
                <input
                  id="auth-password"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: '#111',
                    border: '1px solid #222',
                    color: '#fafafa',
                    fontSize: '0.9375rem',
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
              </div>

              {authError && (
                <div style={{
                  padding: '12px',
                  background: 'rgba(255,68,68,0.1)',
                  border: '1px solid #ff4444',
                  color: '#ff4444',
                  fontSize: '0.875rem',
                  marginBottom: '20px'
                }} role="alert" aria-live="assertive">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: '#c0fe04',
                  color: '#000',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  cursor: authLoading ? 'not-allowed' : 'pointer',
                  opacity: authLoading ? 0.6 : 1,
                  marginBottom: '16px'
                }}
              >
                {authLoading ? 'Please wait...' : authMode === 'signup' ? 'Start Free Trial' : 'Sign In'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#888' }}>
                {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => { setAuthMode(authMode === 'signup' ? 'signin' : 'signup'); setAuthError(''); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#c0fe04',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    textDecoration: 'underline'
                  }}
                >
                  {authMode === 'signup' ? 'Sign in' : 'Sign up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
