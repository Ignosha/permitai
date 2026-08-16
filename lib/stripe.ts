import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const PLANS = {
  diy: {
    name: 'DIY Homeowner',
    price: 999,
    priceId: process.env.STRIPE_PRICE_DIY,
    features: ['1 active project', 'Permit finder', 'Application drafter', 'Document checklist', 'Email support'],
  },
  solo: {
    name: 'Solo Contractor',
    price: 4900,
    priceId: process.env.STRIPE_PRICE_SOLO,
    features: ['5 active projects', 'Everything in DIY', 'Code compliance checker', 'Priority support', 'Team sharing (2 users)'],
  },
  team: {
    name: 'Small Team',
    price: 14900,
    priceId: process.env.STRIPE_PRICE_TEAM,
    features: ['Unlimited projects', 'Everything in Solo', 'Instant revisions', 'Priority support', 'Team sharing (10 users)'],
  },
  pro: {
    name: 'Pro',
    price: 29900,
    priceId: process.env.STRIPE_PRICE_PRO,
    features: ['Everything in Small Team', 'Unlimited users', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
  },
};

export async function createCheckoutSession(priceId: string, customerEmail: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
  });

  return session;
}
