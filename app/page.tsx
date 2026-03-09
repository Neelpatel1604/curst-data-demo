"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProspectCard } from "@/components/gtm/ProspectCard";
import { InsightCard } from "@/components/gtm/InsightCard";

type TabId = "prospects" | "insights" | "outreach" | "alerts";

interface RankedProspect {
  name: string;
  score: number;
  reason: string;
}

interface Outreach {
  company: string;
  subject: string;
  body: string;
}

interface AgentResult {
  enriched: unknown[];
  ranked: RankedProspect[];
  outreaches: Outreach[];
  alerts: string[];
  error: string | null;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [minGrowth, setMinGrowth] = useState(20);
  const [minHeadcount, setMinHeadcount] = useState(0);
  const [results, setResults] = useState<AgentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("prospects");
  const [error, setError] = useState<string | null>(null);

  const runAgent = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query || "AI",
          icpFilters: { minGrowth: minGrowth, minHeadcount: minHeadcount },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResults(data);
      setActiveTab("prospects");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const setAlert = async (alert: string) => {
    try {
      await fetch("/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alert, label: "Watcher" }),
      });
      window.alert(`Simulated Watcher alert set:\n${alert}`);
    } catch {
      window.alert("Could not set alert (simulated).");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-medium text-primary">
            GTM Agent · Powered by mock Crustdata + AI
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-[2.4rem]">
            AI GTM Research & Lead Prioritization Agent
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Discover prospects, enrich with signals, rank by buyer intent, and
            generate outreach and Watcher-style alerts — ready to swap to
            Crustdata APIs.
          </p>
        </header>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-4 sm:pb-3">
            <CardTitle className="text-base sm:text-lg">
              Run GTM agent
            </CardTitle>
            <CardDescription>
              Define your ICP and query. The agent will fetch mock prospects,
              enrich them, rank by intent, and draft outreach.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Label htmlFor="query">Search query</Label>
              <Input
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mt-2"
                placeholder="e.g. YC AI startups with recent funding, Vercel-like dev tools"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="minGrowth">Min YoY growth (%)</Label>
                <Input
                  id="minGrowth"
                  type="number"
                  min={0}
                  value={minGrowth}
                  className="mt-2"
                  onChange={(e) =>
                    setMinGrowth(Number(e.target.value) || 0)
                  }
                />
              </div>
              <div>
                <Label htmlFor="minHeadcount">Min headcount</Label>
                <Input
                  id="minHeadcount"
                  type="number"
                  min={0}
                  value={minHeadcount}
                  className="mt-2"
                  onChange={(e) =>
                    setMinHeadcount(Number(e.target.value) || 0)
                  }
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button onClick={runAgent} disabled={loading}>
                {loading ? "Running agent…" : "Run GTM Agent"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Uses mock data now. Swap{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
                  data/mocks.ts
                </code>{" "}
                +{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
                  /api/agent
                </code>{" "}
                with real Crustdata endpoints later.
              </p>
            </div>
            {error && (
              <div className="mt-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {results && (
          <section className="space-y-4">
            <Tabs
              defaultValue="prospects"
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as TabId)}
              className="w-full"
            >
              <TabsList>
                <TabsTrigger value="prospects">Prioritized prospects</TabsTrigger>
                <TabsTrigger value="insights">Signals & insights</TabsTrigger>
                <TabsTrigger value="outreach">Outreach drafts</TabsTrigger>
                <TabsTrigger value="alerts">Watcher alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="prospects">
                <div className="space-y-3">
                  {results.ranked.map((pros) => (
                    <ProspectCard
                      key={pros.name}
                      name={pros.name}
                      reason={pros.reason}
                      score={pros.score}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="insights">
                <div className="space-y-3">
                  {results.enriched.map((item: unknown, i: number) => {
                    const e = item as {
                      name?: string;
                      domain?: string;
                      headcount?: number;
                      yoyGrowth?: number;
                      lastFunding?: string;
                      signals?: string[];
                      serpContext?: string[];
                    };
                    return (
                      <InsightCard
                        key={e.domain ?? i}
                        name={e.name ?? ""}
                        headcount={e.headcount}
                        yoyGrowth={e.yoyGrowth}
                        lastFunding={e.lastFunding}
                        signals={e.signals}
                        serpContext={e.serpContext}
                      />
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="outreach">
                <div className="space-y-4">
                  {results.outreaches.map((o) => (
                    <Card
                      key={o.company}
                      className="border-border bg-card"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm sm:text-base">
                          {o.company}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Subject: {o.subject}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-md bg-muted/40 p-3 text-xs text-foreground sm:text-sm">
                          {o.body}
                        </pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="alerts">
                <div className="flex flex-wrap gap-2">
                  {results.alerts.map((alert, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => setAlert(alert)}
                      className="border-primary/30 bg-background/80 text-xs sm:text-sm"
                    >
                      Set alert: {alert.slice(0, 40)}…
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        )}
      </div>
    </main>
  );
}
