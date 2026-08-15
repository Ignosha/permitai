# Stripe Setup Guide

## Your Price IDs

Here are your Stripe price IDs (already configured in the app):

| Plan | Price ID |
|------|----------|
| DIY Homeowner | `prod_V4pvLrvLYoIm0x` |
| Solo Contractor | `prod_V4puGc2Q0bzT82` |
| Small Team | `prod_V4ptqPGamobG0p` |
| Pro | `prod_V4pnekv3bwE6l6` |

## Step 1: Create a Stripe Account

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Sign up with your email and password
3. Fill in your business details (you can use personal info if you're a sole proprietor)
4. Verify your email address

## Step 2: Get Your API Keys

1. In the Stripe Dashboard, go to **Developers** → **API keys**
2. You'll see two sets of keys: **Publishable** and **Secret**
3. Copy the following keys:
   - **Publishable key** (starts with `pk_test_...` or `pk_live_...`)
   - **Secret key** (starts with `sk_test_...` or `sk_live_...`)

**Important**: Never share your secret key. Keep it secure.

## Step 3: Create Products and Prices

You need to create 4 products in Stripe (one for each pricing tier).

### Create DIY Homeowner Product ($9.99/month)
1. Go to **Products** → **Add Product**
2. Name: `DIY Homeowner`
3. Pricing:
   - Price: `$9.99`
   - Billing period: `Monthly`
   - Save as: `permitai_diy`
4. Copy the **Price ID** (starts with `price_...`)

### Create Solo Contractor Product ($49/month)
1. Repeat the above process:
   - Name: `Solo Contractor`
   - Price: `$49.00`
   - Billing period: `Monthly`
   - Save as: `permitai_solo`
2. Copy the **Price ID**

### Create Small Team Product ($149/month)
1. Repeat:
   - Name: `Small Team`
   - Price: `$149.00`
   - Billing period: `Monthly`
   - Save as: `permitai_team`
2. Copy the **Price ID**

### Create Pro Product ($299/month)
1. Repeat:
   - Name: `Pro`
   - Price: `$299.00`
   - Billing period: `Monthly`
   - Save as: `permitai_pro`
2. Copy the **Price ID**

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root (copy from `.env.example`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# AI
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_...)
STRIPE_SECRET_KEY=sk_test_... (or sk_live_...)
STRIPE_PRICE_DIY=price_... (from Step 3)
STRIPE_PRICE_SOLO=price_... (from Step 3)
STRIPE_PRICE_TEAM=price_... (from Step 3)
STRIPE_PRICE_PRO=price_... (from Step 3)

# Stripe Webhook
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Add `.env.local` to your `.gitignore` file. Never commit secrets to git.

## Step 5: Set Up Stripe Webhooks

Webhooks allow Stripe to notify your app when events happen (payment succeeded, subscription canceled, etc.).

### For Local Development (using Stripe CLI)

1. Install Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login to your Stripe account:
   ```bash
   stripe login
   ```
3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook secret (starts with `whsec_...`) and add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET`

### For Production (Vercel)

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. URL: `https://your-domain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook secret and add it to your Vercel environment variables

## Step 6: Test the Integration

### Test Mode vs Live Mode

Stripe has two modes:
- **Test mode** (starts with `pk_test_...` / `sk_test_...`): Use for testing, no real charges
- **Live mode** (starts with `pk_live_...` / `sk_live_...`): Use for real payments

**Recommendation**: Start in test mode, test thoroughly, then switch to live mode.

### Test Payment Flow

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3000/pricing`
3. Click "Start Free Trial" on any plan
4. Use Stripe test card numbers: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
5. Complete the checkout
6. Verify the webhook was received (check your terminal running `stripe listen`)
7. Check your Supabase `profiles` table to see the subscription status updated

### Verify Webhook Events

In your Stripe Dashboard → **Developers** → **Webhooks**, you should see events being received.

## Step 7: Deploy to Production

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com) and import your repo
3. Add all environment variables from `.env.local` to Vercel:
   - Go to **Settings** → **Environment Variables**
   - Add each variable (use live Stripe keys for production)
4. Deploy

### Update Stripe Webhook URL

1. In Stripe Dashboard → **Developers** → **Webhooks**
2. Update your endpoint URL to your production domain: `https://your-domain.com/api/webhooks/stripe`
3. Or use Vercel's built-in Stripe integration (recommended)

## Step 8: Switch to Live Mode

Once you're ready to accept real payments:

1. In Stripe Dashboard, toggle from **Test mode** to **Live mode**
2. Get your live API keys
3. Update your environment variables with live keys
4. Update your webhook endpoint to use live mode
5. Test with a real card (use a small amount like $1)

## Common Issues & Troubleshooting

### "No such price: price_..."
- Make sure you copied the correct Price ID from Stripe
- Price IDs start with `price_`

### Webhook not receiving events
- Make sure your webhook endpoint is publicly accessible
- Check that the webhook secret matches
- Use Stripe CLI for local testing

### "Invalid signature"
- Your webhook secret is incorrect
- Make sure you're using the right secret for test/live mode

### Checkout session not creating
- Verify your Stripe secret key is correct
- Check that the price ID exists in your Stripe account
- Make sure you're using the correct API version

## Revenue Tracking

### View Subscriptions in Stripe
- Go to **Customers** → **All customers**
- You'll see all subscribers
- Click on a customer to see their subscription details

### View Revenue
- Go to **Payments** → **All payments**
- Filter by date range to see revenue
- Or go to **Analytics** → **Revenue**

### Monthly Recurring Revenue (MRR)
- Go to **Analytics** → **Revenue**
- Select "MRR" view
- This shows your monthly recurring revenue

## Next Steps

1. Set up email notifications for new signups (use Resend or SendGrid)
2. Add a customer portal for users to manage subscriptions
3. Set up Stripe Tax for automatic tax calculation
4. Configure Stripe Invoices for billing
5. Add analytics to track conversion rates

## Support

- Stripe Docs: [https://stripe.com/docs](https://stripe.com/docs)
- Stripe Support: [https://support.stripe.com](https://support.stripe.com)
- PermitAI Support: support@permitai.co
