# PermitAI

**AI-powered permit application assistant for contractors and homeowners.**

---

## The Problem

Every renovation, electrical job, plumbing install, or deck build requires permits. But permit offices are bureaucratic labyrinths:

- **Contractors waste 5-15 hours per project** researching requirements, filling out forms, and making correction cycles.
- **DIY homeowners get rejected 30%+ of the time** on first submission because they missed a requirement.
- **Projects stall 2-6 weeks** waiting for permits, killing cash flow and momentum.
- **Mistakes cost thousands** in re-submission fees and delayed starts.

Existing solutions are either:
- Expensive enterprise software ($500+/month) designed for large GCs
- Manual permit expeditor services ($1,000+ per project)
- Generic form builders that don't understand local codes

**There is no AI-first, consumer-friendly permit assistant.**

---

## The Solution

PermitAI uses free LLM APIs + scraped public permit data to provide:

1. **Permit Finder**: Enter project details + zip code → AI tells you exactly which permits you need, from which department, with direct links and fees.
2. **Application Drafter**: AI fills out permit application forms based on your project description and photos.
3. **Code Compliance Checker**: AI checks your project against local building codes and flags issues before submission.
4. **Document Checklist**: AI generates a customized list of required documents (plans, surveys, calculations) and explains what each needs to contain.
5. **Plain English Translator**: AI explains complex code requirements in simple terms.

---

## Revenue Model

### Pricing Tiers

| Tier | Price | Target Customer |
|------|-------|----------------|
| DIY Homeowner | $9.99/month | Homeowners doing major renovations |
| Solo Contractor | $49/month | 1-2 person trade businesses |
| Small Team | $149/month | 3-10 person contractors |
| Pro | $299/month | 10+ person companies with multiple projects |

### Path to $10,000/Month

| Customer Segment | Count | Avg Revenue | Monthly Total |
|------------------|-------|-------------|---------------|
| DIY Homeowners | 150 | $10 | $1,500 |
| Solo Contractors | 50 | $49 | $2,450 |
| Small Teams | 30 | $149 | $4,470 |
| Pro Teams | 10 | $299 | $2,990 |
| **TOTAL** | **240** | **~$42** | **$11,410** |

**Key insight**: 240 customers. That's fewer than 1 new customer per day for 8 months. At $10k/month, hosting costs are essentially zero (free tiers on Vercel + free LLM APIs).

---

## Tech Stack (100% Free at Scale)

| Component | Tool | Free Tier Limits | Cost at $10k MRR |
|-----------|------|------------------|-----------------|
| Frontend | HTML/CSS/JS (or Webflow free) | Unlimited | $0 |
| Hosting | Vercel / Netlify | 100GB bandwidth, serverless functions | $0 |
| AI / LLM | Google Gemini API (free tier) or Groq | Generous free limits | $0 |
| Database | Supabase (free tier) | 500MB storage, 10k MAU | $0 |
| Email | Gmail + Google Sheets (CRM) | Free | $0 |
| Outreach | LinkedIn + Email | Free | $0 |
| Domain | Namecheap / Cloudflare | ~$10/year | $0.83/month |

**Total infrastructure cost at $10k/month: $0.83/month**

---

## Market Size & Opportunity

- **80% of US homes are 20+ years old** → massive renovation demand
- **$400B+ US residential renovation market**
- **2M+ licensed contractors** in the US
- **Average contractor wastes 15+ hours/month** on permit research
- Permit delays cost the average project **$5,000+** in indirect costs

Even capturing **0.01% of this market** = 200 customers = $10k/month.

---

## Go-To-Market Strategy

### Phase 1: Cold Outreach (Months 1-2)
- Target 100 contractors/day on LinkedIn and via email
- Use templates in `/outreach/`
- Expected conversion: 1-2% → 60-120 leads → 20-40 customers

### Phase 2: Content + SEO (Months 3-4)
- Write "How to get a permit in [City]" blog posts
- Rank for long-tail keywords
- Expected: 500-1,000 organic visitors/month → 10-20 customers

### Phase 3: Partnerships (Months 5-6)
- Partner with hardware stores, lumber yards, and material suppliers
- Co-marketing to contractors
- Expected: 50-100 additional customers

### Phase 4: Referrals (Ongoing)
- 10% discount for referrals
- Expected: 20-30% organic growth

---

## Competitive Advantage

| Competitor | Price | AI-First? | Target |
|------------|-------|-----------|--------|
| PermitSure | $500+/mo | No | Large GCs |
| FastPermit | $1,000/project | No | Commercial |
| Jobber / Housecall Pro | $29-$249/mo | No | Scheduling/forms |
| **PermitAI** | **$9.99-$299/mo** | **Yes** | **Everyone else** |

**We win on price, AI quality, and simplicity.**

---

## Why This Works

1. **Pain is acute**: Contractors hate permits more than almost anything.
2. **No good alternatives**: The market is underserved.
3. **High willingness to pay**: Saving 10 hours = $1,000+ in labor. A $49/month subscription is a no-brainer.
4. **Low churn**: Once integrated into workflow, contractors won't leave.
5. **Zero hosting costs**: Free tiers scale to 1,000+ users.
6. **Passive income**: After initial outreach, content + referrals drive recurring revenue.

---

## Next Steps

1. Build MVP landing page (see `/landing/`)
2. Set up Vercel + Supabase free tiers
3. Connect Groq or Gemini free API
4. Scrape 1-2 county permit websites for demo data
5. Send 100 cold outreach emails/day
6. Close first 10 customers
7. Iterate based on feedback
8. Scale to $10k/month
