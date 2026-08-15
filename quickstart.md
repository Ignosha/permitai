# PermitAI — Quick Start

Get PermitAI running in 15 minutes.

## Prerequisites
- Node.js 18+ installed
- A Stripe account
- A Supabase account

---

## Step 1: Clone & Install (2 min)

```bash
cd /Users/joshuapreslyedmond/Desktop/saas/permitai
npm install
```

---

## Step 2: Set Up Supabase (5 min)

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project (use your own credentials)
3. Once created, go to **Project Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. Go to **SQL Editor** → **New query**
6. Open `supabase-schema.sql` and paste the entire contents
7. Click **Run** → You should see "Success. No rows returned"
8. Verify: Go to **Table Editor** → You should see 4 tables: `profiles`, `projects`, `applications`, `documents`

---

## Step 3: Set Up Environment (3 min)

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual values in `.env.local`:

   ```env
   # Supabase (from Step 2)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

   # AI (free tier: console.groq.com)
   GROQ_API_KEY=gsk_...

   # Stripe (from Step 4)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Stripe Price IDs (already set for you)
   STRIPE_PRICE_DIY=prod_V4pvLrvLYoIm0x
   STRIPE_PRICE_SOLO=prod_V4puGc2Q0bzT82
   STRIPE_PRICE_TEAM=prod_V4ptqPGamobG0p
   STRIPE_PRICE_PRO=prod_V4pnekv3bwE6l6

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   **Your Stripe Price IDs are already configured.** Just add your publishable key, secret key, and webhook secret.

---

## Step 4: Set Up Stripe (5 min)

### 4a. Get Stripe Keys
1. Go to [dashboard.stripe.com/developers](https://dashboard.stripe.com/developers)
2. Under **API keys**, copy:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

### 4b. Set Up Webhooks (Local)
1. Install Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login:
   ```bash
   stripe login
   ```
3. Forward webhooks to localhost:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook secret (starts with `whsec_...`) and add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### 4c. Set Up Webhooks (Production - Vercel)
1. In Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**
2. URL: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook secret to your Vercel environment variables

---

## Step 5: Run Locally (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 6: Test Payment Flow (2 min)

1. Go to [http://localhost:3000/pricing](http://localhost:3000/pricing)
2. Click **Start Free Trial** on any plan
3. Use Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
4. Complete checkout
5. Verify in your terminal that the webhook was received
6. Check Supabase **Table Editor** → `profiles` table → You should see your user with `subscription_status: active`

---

## Step 7: Deploy to Production (5 min)

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Add Environment Variables
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add all variables from your `.env.local`
3. Redeploy

### Update Stripe Webhook
1. In Stripe Dashboard → **Webhooks**
2. Update endpoint URL to your production domain: `https://your-domain.com/api/webhooks/stripe`

### Switch to Live Mode
1. In Stripe Dashboard, toggle **Test mode** → **Live mode**
2. Copy live API keys
3. Update Vercel environment variables with live keys
4. Test with a real card

---

## What You Built

- ✅ **Landing page** — Dark theme, animated stats, feature grid, testimonials, CTA
- ✅ **Pricing page** — 4-tier pricing with Stripe checkout
- ✅ **Dashboard** — User auth, project management, AI integration
- ✅ **AI endpoints** — Permit finder, application drafter, compliance checker, document checklist
- ✅ **Stripe integration** — Checkout sessions, webhooks, subscription management
- ✅ **Supabase database** — Users, projects, applications, documents tables with RLS
- ✅ **Responsive design** — Mobile-friendly, dark theme, smooth animations

## Next Steps

1. **Customize branding** — Replace "PermitAI" with your own name/logo
2. **Add real permit data** — Scrape 3-5 target city permit websites
3. **Write cold outreach** — Use the templates in `/outreach/`
4. **Test with real users** — Send to 10 contractors, get feedback
5. **Iterate** — Fix bugs, add features, improve conversion

## Support

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Stripe Docs**: [https://stripe.com/docs](https://stripe.com/docs)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Groq Docs**: [https://console.groq.com/docs](https://console.groq.com/docs)

---

**Your Stripe price IDs are already configured:**
- DIY: `prod_V4pvLrvLYoIm0x` ($9.99/mo)
- Solo: `prod_V4puGc2Q0bzT82` ($49/mo)
- Team: `prod_V4ptqPGamobG0p` ($149/mo)
- Pro: `prod_V4pnekv3bwE6l6` ($299/mo)

Just add your Stripe publishable key, secret key, and webhook secret to `.env.local` and you're ready to go.
