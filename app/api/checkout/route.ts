import Stripe from 'stripe';
import { getSession } from '../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const PLANS: Record<string, { name: string; priceId: string }> = {
  diy: {
    name: 'DIY Homeowner',
    priceId: process.env.STRIPE_PRICE_DIY!,
  },
  solo: {
    name: 'Solo Contractor',
    priceId: process.env.STRIPE_PRICE_SOLO!,
  },
  team: {
    name: 'Small Team',
    priceId: process.env.STRIPE_PRICE_TEAM!,
  },
  pro: {
    name: 'Pro',
    priceId: process.env.STRIPE_PRICE_PRO!,
  },
};

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const { plan } = await request.json();

    if (!plan || !PLANS[plan]) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const selectedPlan = PLANS[plan];
    const customerEmail = session?.user?.email || undefined;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&plan=${plan}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        plan: plan,
        userId: session?.user?.id || 'guest',
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
