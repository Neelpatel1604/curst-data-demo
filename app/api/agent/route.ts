import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import filter from "lodash/filter";
import { MOCK_COMPANIES, MOCK_PEOPLE, MOCK_SERP } from "@/data/mocks";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

export interface EnrichedCompany {
  domain: string;
  name: string;
  headcount: number;
  yoyGrowth: number;
  lastFunding: string;
  signals: string[];
  industry: string;
  location: string;
  keyPeople: string[];
  people: { name: string; title: string; linkedinUrl: string; summary: string; recentActivity: string }[];
  serpContext: string[];
}

function parseJsonFromText(text: string): unknown {
  const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (match) {
    try {
      return JSON.parse(match[0]) as unknown;
    } catch {
      return null;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = (body.query as string)?.trim() || "AI";
    const icpFilters = body.icpFilters ?? {};
    const minGrowth = Number(icpFilters.minGrowth) || 0;
    const minHeadcount = Number(icpFilters.minHeadcount) || 0;

    const queryLower = query.toLowerCase();
    const keywords = queryLower.split(/\s+/).filter(Boolean);

    // Step 1: Mock Search – filter companies by query and ICP
    const filteredCompanies = filter(
      Object.values(MOCK_COMPANIES),
      (comp) =>
        comp.yoyGrowth >= minGrowth &&
        comp.headcount >= minHeadcount &&
        (keywords.length === 0 ||
          keywords.some(
            (k) =>
              comp.name.toLowerCase().includes(k) ||
              comp.industry.toLowerCase().includes(k) ||
              comp.signals.some((s) => s.toLowerCase().includes(k)) ||
              comp.domain.includes(k)
          ))
    );

    // Step 2: Mock Enrichment – add people + SERP context
    const enriched: EnrichedCompany[] = filteredCompanies.map((comp) => ({
      ...comp,
      people: MOCK_PEOPLE[comp.domain] ?? [],
      serpContext: MOCK_SERP[comp.domain] ?? [],
    }));

    // Simulate real-time delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (enriched.length === 0) {
      return NextResponse.json({
        enriched: [],
        ranked: [],
        outreaches: [],
        alerts: [],
        error: null,
      });
    }

    // Step 3: AI Prioritization – rank by buyer intent
    const rankPrompt = `You are a GTM analyst. Rank these B2B SaaS prospects by buyer intent (score 0-100). Consider: recent funding, headcount growth, hiring/news signals. Output ONLY a valid JSON array, no markdown or extra text. Format: [{"name": "Company Name", "score": number, "reason": "one sentence"}] for each company. Prospects: ${JSON.stringify(enriched.map((e) => ({ name: e.name, headcount: e.headcount, yoyGrowth: e.yoyGrowth, lastFunding: e.lastFunding, signals: e.signals })))}`;

    let ranked: { name: string; score: number; reason: string }[] = [];
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const rankResponse = await anthropic.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          messages: [{ role: "user", content: rankPrompt }],
        });
        const text =
          rankResponse.content[0].type === "text"
            ? rankResponse.content[0].text
            : "";
        const parsed = parseJsonFromText(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          ranked = parsed
            .filter(
              (p: unknown): p is { name: string; score: number; reason: string } =>
                typeof p === "object" &&
                p !== null &&
                "name" in p &&
                "score" in p &&
                "reason" in p
            )
            .map((p) => ({
              name: String(p.name),
              score: Number(p.score),
              reason: String(p.reason),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
        }
      } catch (e) {
        console.error("Rank API error:", e);
      }
    }

    if (ranked.length === 0) {
      ranked = enriched.slice(0, 5).map((e, i) => ({
        name: e.name,
        score: 85 - i * 10,
        reason: `Strong growth (${e.yoyGrowth}% YoY), ${e.lastFunding}. ${e.signals[0] ?? ""}`,
      }));
    }

    const top3 = ranked.slice(0, 3);
    const top3Enriched = top3.map(
      (r) => enriched.find((e) => e.name === r.name) ?? enriched[0]
    );

    // Step 4: Outreach generation for top 3
    let outreaches: { company: string; subject: string; body: string }[] = [];
    if (process.env.ANTHROPIC_API_KEY && top3Enriched.length > 0) {
      try {
        const outreachPrompt = `Generate exactly ${top3Enriched.length} personalized B2B InMail/email drafts for these companies. For each: output "company", "subject", "body" (2-3 short paragraphs). Reference their signals and one key person. Output ONLY a valid JSON array: [{"company":"Name","subject":"...","body":"..."}] no other text. Companies and contacts: ${JSON.stringify(top3Enriched.map((e) => ({ name: e.name, signals: e.signals, people: e.people })))}`;
        const outreachResponse = await anthropic.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          messages: [{ role: "user", content: outreachPrompt }],
        });
        const text =
          outreachResponse.content[0].type === "text"
            ? outreachResponse.content[0].text
            : "";
        const parsed = parseJsonFromText(text);
        if (Array.isArray(parsed)) {
          outreaches = parsed
            .filter(
              (p: unknown): p is { company: string; subject: string; body: string } =>
                typeof p === "object" &&
                p !== null &&
                "company" in p &&
                "subject" in p &&
                "body" in p
            )
            .map((p) => ({
              company: String(p.company),
              subject: String(p.subject),
              body: String(p.body),
            }));
        }
      } catch (e) {
        console.error("Outreach API error:", e);
      }
    }

    if (outreaches.length === 0) {
      outreaches = top3Enriched.map((e) => ({
        company: e.name,
        subject: `Quick question about ${e.signals[0] ?? "your growth"} at ${e.name}`,
        body: `Hi,\n\nI noticed ${e.signals[0] ?? "recent news"} at ${e.name}. We help companies like yours with GTM intelligence. Would you be open to a 15-min call?\n\nBest`,
      }));
    }

    // Step 5: Mock Watcher – suggested alerts
    const alerts = enriched.map(
      (comp) =>
        `Watch for job changes or funding at ${comp.name} (${comp.domain})`
    );

    return NextResponse.json({
      enriched,
      ranked,
      outreaches,
      alerts,
      error: null,
    });
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json(
      {
        enriched: [],
        ranked: [],
        outreaches: [],
        alerts: [],
        error: error instanceof Error ? error.message : "Agent run failed",
      },
      { status: 500 }
    );
  }
}
