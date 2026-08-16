'use client';

import { useState, useEffect } from 'react';
import { getSession } from '@/lib/supabase';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const session = await getSession();
        setIsAuthenticated(!!session);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, []);

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

  function openSignup() {
    window.location.href = '/signup';
  }

  if (checkingAuth) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '2px solid #222', borderTopColor: '#C0FE04', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa' }}>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          .gate-container { max-width: 600px; margin: 0 auto; padding: 120px 40px 80px; text-align: center; }
          .gate-icon { font-size: 4rem; margin-bottom: 24px; }
          .gate-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 16px; }
          .gate-subtitle { color: #888; font-size: 1rem; line-height: 1.7; margin-bottom: 40px; }
          .gate-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
          .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase; text-decoration: none; border: none; cursor: pointer; transition: all 0.2s; }
          .btn-primary { background: #c0fe04; color: #000; }
          .btn-primary:hover { background: #a8d904; }
          .btn-secondary { background: transparent; color: #fafafa; border: 1px solid #222; }
          .btn-secondary:hover { border-color: #fafafa; }
        `}</style>

        <div className="gate-container">
          <div className="gate-icon">🔒</div>
          <h1 className="gate-title">Pricing Plans</h1>
          <p className="gate-subtitle">
            Sign up or sign in to view pricing plans and start your free trial. 
            No credit card required.
          </p>
          <div className="gate-actions">
            <a href="/signup" className="btn btn-primary">Create Free Account</a>
            <a href="/login" className="btn btn-secondary">Sign In</a>
          </div>
        </div>
      </div>
    );
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
                onClick={plan.cta === 'Contact Sales' ? () => alert('Contact sales at sales@permitai.co') : openSignup}
                disabled={loading === plan.id}
                aria-label={`Start free trial for ${plan.name} plan`}
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
    </div>
  );
}
