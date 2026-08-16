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
