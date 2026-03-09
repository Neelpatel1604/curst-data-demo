export interface Company {
  domain: string;
  name: string;
  headcount: number;
  yoyGrowth: number;
  lastFunding: string;
  signals: string[];
  industry: string;
  location: string;
  keyPeople: string[];
}

export interface Person {
  name: string;
  title: string;
  linkedinUrl: string;
  summary: string;
  recentActivity: string;
}

export const MOCK_COMPANIES: Record<string, Company> = {
  "anthropic.com": {
    domain: "anthropic.com",
    name: "Anthropic",
    headcount: 500,
    yoyGrowth: 60,
    lastFunding: "Dec 2025 - $750M Series C",
    signals: [
      "Hiring 50+ AI researchers",
      "Launched Claude 3.5",
      "Partnership with Amazon",
    ],
    industry: "AI",
    location: "San Francisco, CA",
    keyPeople: ["Dario Amodei - CEO"],
  },
  "openai.com": {
    domain: "openai.com",
    name: "OpenAI",
    headcount: 800,
    yoyGrowth: 45,
    lastFunding: "Jan 2025 - Strategic investment",
    signals: ["GPT-5 rollout", "Enterprise deals", "Office expansion"],
    industry: "AI",
    location: "San Francisco, CA",
    keyPeople: ["Sam Altman - CEO"],
  },
  "perplexity.ai": {
    domain: "perplexity.ai",
    name: "Perplexity AI",
    headcount: 120,
    yoyGrowth: 90,
    lastFunding: "Apr 2025 - $250M Series B",
    signals: ["Search growth", "B2B launch", "Hiring in NYC"],
    industry: "AI / Search",
    location: "San Francisco, CA",
    keyPeople: ["Aravind Srinivas - CEO"],
  },
  "vercel.com": {
    domain: "vercel.com",
    name: "Vercel",
    headcount: 400,
    yoyGrowth: 55,
    lastFunding: "Mar 2025 - $150M Series D",
    signals: ["Next.js adoption", "Enterprise tier", "AI SDK"],
    industry: "Developer tools",
    location: "San Francisco, CA",
    keyPeople: ["Guillermo Rauch - CEO"],
  },
  "stripe.com": {
    domain: "stripe.com",
    name: "Stripe",
    headcount: 9000,
    yoyGrowth: 25,
    lastFunding: "2024 - Secondary round",
    signals: ["Global expansion", "Banking products", "AI for fraud"],
    industry: "Fintech",
    location: "San Francisco, CA",
    keyPeople: ["Patrick Collison - CEO"],
  },
  "replicate.com": {
    domain: "replicate.com",
    name: "Replicate",
    headcount: 35,
    yoyGrowth: 120,
    lastFunding: "Feb 2025 - $40M Series B",
    signals: ["Open source models", "YC W24", "API usage spike"],
    industry: "AI Infrastructure",
    location: "San Francisco, CA",
    keyPeople: ["Ben Firshman - CEO"],
  },
  "langchain.com": {
    domain: "langchain.com",
    name: "LangChain",
    headcount: 80,
    yoyGrowth: 70,
    lastFunding: "Oct 2024 - $25M Series A",
    signals: ["LangGraph launch", "Enterprise adoption", "Hiring"],
    industry: "AI / Developer tools",
    location: "San Francisco, CA",
    keyPeople: ["Harrison Chase - CEO"],
  },
  "chroma.ai": {
    domain: "chroma.ai",
    name: "Chroma",
    headcount: 25,
    yoyGrowth: 95,
    lastFunding: "Jan 2025 - $18M Series A",
    signals: ["Vector DB growth", "YC alumni", "Open source traction"],
    industry: "AI / Data",
    location: "San Francisco, CA",
    keyPeople: ["Anton Troynikov - CEO"],
  },
  "x.ai": {
    domain: "x.ai",
    name: "xAI",
    headcount: 200,
    yoyGrowth: 200,
    lastFunding: "May 2025 - $6B Series B",
    signals: ["Grok 2", "Data center buildout", "Hiring spree"],
    industry: "AI",
    location: "Austin, TX",
    keyPeople: ["Elon Musk - CEO"],
  },
  "cursor.com": {
    domain: "cursor.com",
    name: "Cursor",
    headcount: 60,
    yoyGrowth: 180,
    lastFunding: "Mar 2025 - $100M Series B",
    signals: ["AI IDE growth", "Enterprise waitlist", "Agent features"],
    industry: "Developer tools / AI",
    location: "San Francisco, CA",
    keyPeople: ["Amjad Masad - CEO"],
  },
};

export const MOCK_PEOPLE: Record<string, Person[]> = {
  "anthropic.com": [
    {
      name: "Dario Amodei",
      title: "CEO",
      linkedinUrl: "https://linkedin.com/in/darioamodei",
      summary: "Co-founder of Anthropic, former OpenAI VP Research.",
      recentActivity: "Posted about safe AGI development.",
    },
    {
      name: "Daniela Amodei",
      title: "President",
      linkedinUrl: "https://linkedin.com/in/danielaamodei",
      summary: "Co-founder, operations and policy.",
      recentActivity: "Spoke at AI safety conference.",
    },
  ],
  "openai.com": [
    {
      name: "Sam Altman",
      title: "CEO",
      linkedinUrl: "https://linkedin.com/in/samaltman",
      summary: "CEO of OpenAI, former Y Combinator president.",
      recentActivity: "Announced new product roadmap.",
    },
  ],
  "perplexity.ai": [
    {
      name: "Aravind Srinivas",
      title: "CEO",
      linkedinUrl: "https://linkedin.com/in/aravindsrinivas",
      summary: "Ex-OpenAI, ex-Google. Founded Perplexity.",
      recentActivity: "Tweeted about B2B launch.",
    },
  ],
  "vercel.com": [
    {
      name: "Guillermo Rauch",
      title: "CEO",
      linkedinUrl: "https://linkedin.com/in/rauchg",
      summary: "Creator of Next.js, CEO of Vercel.",
      recentActivity: "Shipped AI SDK updates.",
    },
  ],
  "stripe.com": [
    {
      name: "Patrick Collison",
      title: "CEO",
      linkedinUrl: "https://linkedin.com/in/patrickcollison",
      summary: "Co-founder of Stripe.",
      recentActivity: "Announced Stripe Atlas expansion.",
    },
  ],
  "replicate.com": [
    {
      name: "Ben Firshman",
      title: "CEO",
      linkedinUrl: "https://linkedin.com/in/bfirsh",
      summary: "Ex-Docker. Running Replicate.",
      recentActivity: "Open source model releases.",
    },
  ],
  "langchain.com": [
    {
      name: "Harrison Chase",
      title: "CEO",
      linkedinUrl: "https://linkedin.com/in/harrison-chase",
      summary: "Creator of LangChain.",
      recentActivity: "LangGraph launch blog post.",
    },
  ],
  "chroma.ai": [
    {
      name: "Anton Troynikov",
      title: "CEO",
      linkedinUrl: "https://linkedin.com/in/troynikov",
      summary: "Building Chroma vector DB.",
      recentActivity: "Conference talk on embeddings.",
    },
  ],
  "x.ai": [
    {
      name: "Elon Musk",
      title: "CEO",
      linkedinUrl: "https://linkedin.com/in/elonmusk",
      summary: "Founder of xAI, Tesla, SpaceX.",
      recentActivity: "Grok 2 announcement.",
    },
  ],
  "cursor.com": [
    {
      name: "Amjad Masad",
      title: "CEO",
      linkedinUrl: "https://linkedin.com/in/amjadmasad",
      summary: "Ex-Facebook. Built Cursor AI IDE.",
      recentActivity: "Agent mode launch.",
    },
  ],
};

export const MOCK_SERP: Record<string, string[]> = {
  "anthropic.com": [
    "Recent news: Raised $750M from investors",
    "Hiring spree in SF Bay Area",
    "Claude 3.5 tops benchmarks",
  ],
  "openai.com": [
    "Strategic partnership announced",
    "Enterprise adoption up 40%",
    "New office in London",
  ],
  "perplexity.ai": [
    "Series B funding $250M",
    "B2B product launch",
    "Search traffic doubling",
  ],
  "vercel.com": [
    "Series D $150M",
    "Next.js 15 release",
    "AI SDK for React",
  ],
  "stripe.com": [
    "Banking-as-a-service launch",
    "Global payout expansion",
    "Fraud AI improvements",
  ],
  "replicate.com": [
    "Open source model hosting growth",
    "YC W24 standout",
    "API usage 3x YoY",
  ],
  "langchain.com": [
    "LangGraph GA",
    "Enterprise customers",
    "New funding round",
  ],
  "chroma.ai": [
    "Vector DB adoption",
    "Embeddings API",
    "Open source community growth",
  ],
  "x.ai": [
    "Grok 2 release",
    "$6B funding",
    "Data center investments",
  ],
  "cursor.com": [
    "Agent mode launch",
    "$100M Series B",
    "Enterprise waitlist",
  ],
};
