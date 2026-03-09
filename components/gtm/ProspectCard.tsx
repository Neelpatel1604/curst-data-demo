import { Card, CardContent } from "@/components/ui/card";

export interface ProspectCardProps {
  name: string;
  reason: string;
  score: number;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color =
    score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <svg className="absolute h-14 w-14 -rotate-90">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="z-10 text-[13px] font-bold tracking-tight" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

export function ProspectCard({ name, reason, score }: ProspectCardProps) {
  const tier =
    score >= 75
      ? { label: "Hot", bg: "#451a1a", text: "#fecaca", dot: "#f97373" }
      : score >= 50
      ? { label: "Warm", bg: "#422006", text: "#fed7aa", dot: "#fb923c" }
      : { label: "Cold", bg: "#111827", text: "#bfdbfe", dot: "#60a5fa" };

  return (
    <Card className="border-border bg-card text-card-foreground shadow-sm transition hover:-translate-y-px hover:shadow-md">
      <CardContent className="flex items-center justify-between gap-4 py-5 sm:gap-5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              {name}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
              style={{ backgroundColor: tier.bg, color: tier.text }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: tier.dot }}
              />
              {tier.label}
            </span>
          </div>
          <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
            {reason}
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-col items-center gap-1">
          <ScoreRing score={score} />
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Intent
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
