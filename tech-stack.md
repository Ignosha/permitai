# PermitAI Tech Stack — 100% Free Resources

## Architecture Overview

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Frontend   │    │   Backend    │    │     AI      │
│  (Landing)   │◄──►│  (API/DB)    │◄──►│  (LLM)      │
│  HTML/JS     │    │  Supabase    │    │  Groq/Gemini│
└─────────────┘    └──────────────┘    └─────────────┘
        │                   │
        ▼                   ▼
   ┌─────────┐       ┌──────────┐
   │ Vercel  │       │  Scraper │
   │ (Host)  │       │  (Data)  │
   └─────────┘       └──────────┘
```

---

## Frontend

### MVP: Static Landing Page
- **Tool**: Plain HTML/CSS/JS
- **Hosting**: Vercel (free tier)
- **Why**: Zero cost, instant deployment, no build step
- **Limits**: Unlimited bandwidth on free tier

### V2: Full Dashboard (When Needed)
- **Tool**: Next.js + shadcn/ui
- **Hosting**: Vercel (free tier)
- **Database**: Supabase (free tier)
- **Why**: Serverless functions, built-in auth, generous free tier

---

## Backend & Database

### Database: Supabase
- **Free tier**: 500MB storage, 10k MAU, 2GB bandwidth
- **Use for**: User accounts, project data, application drafts
- **Limits at $10k MRR**: ~200-300 users → well within free tier

### Backend: Vercel Serverless Functions
- **Free tier**: 100GB-hours compute, 125k requests/day
- **Use for**: AI API calls, webhook endpoints, scraping triggers
- **Limits at $10k MRR**: ~200 users making 10 requests/day = 2k requests/day → well within free tier

---

## AI / LLM

### Primary: Google Gemini API (Free Tier)
- **Limits**: 15 RPM (requests per minute), 1,500 requests/day
- **Model**: Gemini 2.0 Flash (fast, smart, free)
- **Cost at scale**: $0 (free tier sufficient for MVP)

### Alternative: Groq (Free Tier)
- **Limits**: 30 requests/minute
- **Models**: Llama 3.1, Mixtral
- **Why**: Faster inference, good for high-volume use
- **Cost at scale**: $0 (free tier)

### When You Need More
- **Upgrade path**: Google AI Studio paid tier ($0.035/M input tokens) or Groq paid tier ($0.05/M tokens)
- **At $10k MRR**: You'd spend ~$50-100/month on AI → still profitable

---

## Data Sources (Permit Information)

### Free Public Data
- **County/City Permit Websites**: Most publish permit requirements, fees, and forms publicly
- **Building Code Databases**: State and local building codes are public record
- **USPTO Trademark Data**: Free bulk downloads (if you need trademark-related features)

### Scraping Strategy
1. **Start manually**: Copy-paste key data for 5-10 target cities
2. **Build a scraper**: Use Python + Beautiful Soup to scrape permit pages
3. **Store in Supabase**: Cache scraped data to reduce API calls
4. **Update monthly**: Re-scrape to catch changes in fees/requirements

### Code Compliance Data
- **International Building Code (IBC)**: Free PDF available
- **International Residential Code (IRC)**: Free PDF available
- **State/Local Amendments**: Usually published on state government websites
- **Strategy**: Extract key sections, store in vector database (or just chunk and embed with AI)

---

## Email & CRM

### Gmail (Free)
- **Use for**: Customer support, outreach, transactional emails
- **Limits**: 500 emails/day (free Gmail) → sufficient for outreach
- **Alternative**: SendGrid free tier (100 emails/day)

### Google Sheets (Free CRM)
- **Use for**: Lead tracking, customer onboarding, revenue tracking
- **Structure**:
  - Tab 1: Leads (name, email, company, source, status)
  - Tab 2: Customers (name, plan, MRR, signup date)
  - Tab 3: Outreach (date, template, recipient, response)

---

## Hosting

### Vercel (Free Tier)
- **What you get**: 100GB bandwidth, serverless functions, automatic HTTPS, preview deployments
- **What to host**: Landing page, API routes, webhooks
- **Limits at $10k MRR**: ~1,000 users → 100GB bandwidth is plenty

### Netlify (Alternative)
- **Same limits**: 100GB bandwidth, serverless functions
- **Use case**: If you prefer Netlify's UI or need Netlify Functions

---

## Domain & Email

### Domain
- **Registrar**: Namecheap, Cloudflare, or Google Domains
- **Cost**: ~$10-15/year
- **Monthly**: ~$1.00

### Custom Email
- **Option 1**: Zoho Mail Free (up to 5 users, 5GB each)
- **Option 2**: Forward to Gmail (free)
- **Option 3**: Cloudflare Email Routing (free)

---

## Payment Processing

### Stripe (Free to Start)
- **Fees**: 2.9% + $0.30 per transaction
- **No monthly fee**: Only pay when you get paid
- **Why**: Industry standard, great docs, easy to integrate
- **At $10k MRR**: ~$300/month in fees → you keep ~$9,700

### LemonSqueezy (Alternative)
- **Fees**: 5% + Stripe fees
- **Why**: Handles taxes, simpler for SaaS
- **At $10k MRR**: ~$800/month total → you keep ~$9,200

**Recommendation**: Start with Stripe. Move to LemonSqueezy later if you want simpler tax handling.

---

## Authentication

### Supabase Auth (Free)
- **Email/password**: Built-in
- **OAuth**: Google, GitHub, etc.
- **Row-level security**: Built into Supabase
- **Limits**: 50k MAU on free tier

---

## Monitoring & Analytics

### Vercel Analytics (Free)
- **What**: Page views, performance metrics
- **Why**: Built into Vercel, zero config

### Google Analytics (Free)
- **What**: Detailed traffic analysis, conversion tracking
- **Why**: Industry standard, powerful

### Sentry (Free Tier)
- **What**: Error tracking
- **Why**: Catch bugs before customers notice
- **Limits**: 5k errors/month free

---

## Design & Assets

### Landing Page Design
- **Tool**: Plain HTML/CSS (as built in `/landing/`)
- **Alternative**: Webflow (free tier) if you prefer visual editing
- **Icons**: Font Awesome (free CDN) or inline SVGs

### Logo
- **Tool**: Canva (free) or Figma (free)
- **AI-generated**: Use Midjourney/DALL-E free trials, or hire on Fiverr for $5

### Mockups
- **Tool**: Figma (free) or pen and paper
- **Product screenshots**: Build the MVP first, then screenshot

---

## Total Monthly Cost at $10k MRR

| Item | Cost |
|------|------|
| Vercel Hosting | $0 |
| Supabase | $0 |
| Google Gemini / Groq | $0 |
| Domain | $1 |
| Email | $0 |
| Stripe Fees | $300 |
| **TOTAL** | **$301** |

**Net profit at $10k MRR: ~$9,700/month**

---

## Scaling Path

### When to Upgrade

| Trigger | Upgrade To | Cost |
|---------|-----------|------|
| > 500 MAU | Supabase Pro | $25/month |
| > 1M API calls/month | Groq/Gemini Paid | $50-100/month |
| > 500GB bandwidth | Vercel Pro | $20/month |
| > 10k emails/month | SendGrid Pro | $15/month |
| Need advanced auth | Auth0 (free tier) | $0 |

**Even with all upgrades: ~$150/month total cost. Still 98.5% profit margin.**

---

## Development Timeline

### Week 1: MVP Landing Page
- [ ] Copy landing.html to Vercel
- [ ] Add email capture form
- [ ] Set up Google Analytics

### Week 2: Backend Setup
- [ ] Create Supabase project
- [ ] Set up database tables (users, projects, applications)
- [ ] Add authentication

### Week 3: AI Integration
- [ ] Connect Gemini/Groq API
- [ ] Build "Permit Finder" feature
- [ ] Build "Application Drafter" feature

### Week 4: Data & Polish
- [ ] Scrape 5 target cities
- [ ] Add code compliance checker
- [ ] Test end-to-end

### Week 5: Outreach
- [ ] Send 100 cold emails/day
- [ ] Post on LinkedIn 3x/week
- [ ] Close first 10 customers

**Total time to first revenue: 5-6 weeks**
