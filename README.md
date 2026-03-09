# Crustdata GTM Research & Lead Prioritization Agent Demo

Mock AI agent that automates GTM workflows: prospect discovery, enrichment, buyer-intent ranking, outreach drafts, and Watcher-style alerts. Built to demo Crustdata-style APIs; swap mocks for real `Authorization: Token` calls when you have an API key.

## Run locally

```bash
npm install
cp .env.local.example .env.local   # add ANTHROPIC_API_KEY for LLM ranking/outreach
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Enter a query (e.g. "YC AI startups", "funding", "Vercel"), set optional ICP filters (min growth %, min headcount), then click **Run GTM Agent**. Use the tabs to view prioritized prospects, insights, outreach drafts, and set simulated Watcher alerts.

## Stack

- **Next.js** (App Router), **Tailwind**, **TypeScript**
- **Mock data** in `data/mocks.ts` (10 companies, people, SERP context)
- **API routes**: `POST /api/agent` (discovery → enrich → rank → outreach → alerts), `POST /api/alert` (simulated Watcher)
- **Claude** (Anthropic) for ranking and outreach when `ANTHROPIC_API_KEY` is set; fallback logic runs without it

## Real Crustdata integration

Replace mock filtering in `app/api/agent/route.ts` with:

```ts
const headers = { Authorization: `Token ${process.env.CRUSTDATA_API_KEY}` };
const res = await fetch('https://api.crustdata.com/screener/screen/', { method: 'POST', headers, body: JSON.stringify(filters) });
```

Same pattern for enrich and watcher endpoints per Crustdata docs.