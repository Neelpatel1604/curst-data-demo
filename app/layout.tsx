import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Crustdata GTM Agent Demo",
  description: "AI GTM Research & Lead Prioritization Agent — prospect discovery, enrichment, ranking, outreach, Watcher alerts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark font-sans", geist.variable)}>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
