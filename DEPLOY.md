# Deploy to Vercel

## Step 1: Push to GitHub

1. Initialize git if you haven't:
   ```bash
   cd /Users/joshuapreslyedmond/Desktop/saas/permitai
   git init
   git add .
   git commit -m "Initial commit: PermitAI MVP"
   ```

2. Create a new repo on GitHub (e.g., `permitai`)
3. Push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/permitai.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** your `permitai` repo
3. Vercel auto-detects Next.js — keep all default settings
4. Click **Deploy**
5. Wait ~2 minutes — you'll get a URL like `https://permitai-xxxx.vercel.app`

## Step 3: Add Environment Variables

In Vercel:
1. Go to your project → **Settings** → **Environment Variables**
2. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GROQ_API_KEY=your-groq-api-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_DIY=price_...
STRIPE_PRICE_SOLO=price_...
STRIPE_PRICE_TEAM=price_...
STRIPE_PRICE_PRO=price_...
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
STRIPE_WEBHOOK_SECRET=whsec_...
```

3. Replace placeholders with your actual values from `.env.local`
4. Click **Save** on each variable
5. Redeploy: Vercel → Deployments → **Redeploy** on the latest commit

## Step 4: Set Up Stripe Webhook

1. In Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**
2. URL: `https://your-project.vercel.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the **webhook secret** (`whsec_...`)
5. Add it to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
6. Redeploy

## Step 5: Test Live

1. Visit your Vercel URL
2. Go to `/pricing`
3. Click a plan → Sign up → Complete checkout with a real card
4. Check Supabase `profiles` table to confirm subscription is active

## Step 6: Add Custom Domain (Optional)

1. Buy a domain (e.g., `permitai.co`) from Namecheap/Cloudflare (~$10/year)
2. In Vercel → **Settings** → **Domains** → Add your domain
3. Update DNS nameservers at your registrar to point to Vercel
4. Update `NEXT_PUBLIC_APP_URL` to `https://permitai.co`
5. Update Stripe webhook URL to `https://permitai.co/api/webhooks/stripe`

## Post-Deployment Checklist

- [ ] All pages load without errors
- [ ] Sign up flow works
- [ ] Checkout completes successfully
- [ ] Webhook fires and updates Supabase
- [ ] Email confirmation arrives (from Supabase)
- [ ] Mobile responsive
- [ ] SSL certificate active (automatic on Vercel)

## Monitoring

- **Vercel Analytics**: Built into Vercel dashboard — see traffic, errors
- **Supabase**: Table Editor to see users, projects, subscriptions
- **Stripe**: Dashboard → Payments to see transactions
- **Uptime**: Use UptimeRobot (free) to ping your site every 5 min
