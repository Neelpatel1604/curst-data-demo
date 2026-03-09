import { Card, CardContent } from "@/components/ui/card";

export interface InsightCardProps {
  name: string;
  headcount?: number;
  yoyGrowth?: number;
  lastFunding?: string;
  signals?: string[];
  serpContext?: string[];
}

export function InsightCard({
  name,
  headcount,
  yoyGrowth,
  lastFunding,
  signals = [],
  serpContext = [],
}: InsightCardProps) {
  const stats = [
    headcount != null
      ? { label: "Employees", value: headcount.toLocaleString() }
      : null,
    yoyGrowth != null
      ? {
          label: "YoY Growth",
          value: `${yoyGrowth > 0 ? "+" : ""}${yoyGrowth}%`,
          positive: yoyGrowth > 0,
          negative: yoyGrowth < 0,
        }
      : null,
    lastFunding != null ? { label: "Last Funding", value: lastFunding } : null,
  ].filter(Boolean) as {
    label: string;
    value: string;
    positive?: boolean;
    negative?: boolean;
  }[];

  return (
    <Card className="border-border bg-card text-card-foreground shadow-sm transition hover:-translate-y-px hover:shadow-md">
      <CardContent className="flex flex-col gap-4 py-5">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold tracking-tight sm:text-base">
            {name}
          </h3>

          {/* Stat pills */}
          {stats.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {stats.map((stat, i) => (
                <span
                  key={i}
                  className="inline-flex flex-col items-center rounded-md border border-border bg-muted/50 px-2.5 py-1 text-center"
                >
                  <span
                    className={` text-[12px] font-semibold leading-tight tracking-tight ${
                      stat.positive
                        ? "text-green-500"
                        : stat.negative
                        ? "text-red-400"
                        : "text-card-foreground"
                    }`}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {stat.label}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Signals */}
        {signals.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1.5">
            {signals.slice(0, 3).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/50" />
                {s}
              </li>
            ))}
          </ul>
        )}

        {/* SERP context */}
        {serpContext.length > 0 && (
          <p className="border-t border-border pt-3 text-[11px] text-muted-foreground/75 leading-relaxed">
            {serpContext.join(" · ")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}