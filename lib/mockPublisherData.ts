// ─────────────────────────────────────────────────────────────────────────────
// Publisher Command Center — Mock Data
// 5 fictional games for Nexus Interactive (indie/mid-market publisher)
// ─────────────────────────────────────────────────────────────────────────────

export type HealthStatus = "optimal" | "warning" | "critical";

export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export interface RegionRevenue {
  region: string;
  code: string;
  revenue: number;
  pppAdjusted: number;
  growth: number;
  currency: string;
}

export interface AiAction {
  type: "opportunity" | "warning" | "critical";
  message: string;
  cta: string;
}

export interface Game {
  id: string;
  name: string;
  shortName: string;
  genre: string;
  platform: string[];
  releaseDate: string;
  accentColor: string;
  secondaryColor: string;
  // Steam metrics
  wishlistTotal: number;
  wishlistConversionRate: number; // % that purchased
  wishlistConversionDelta: number; // vs prev period
  steamRating: number; // 0-100
  steamReviewCount: number;
  // Engagement
  dau: number;
  mau: number;
  dauMauRatio: number;
  dauDelta: number;
  // Revenue
  refundRate: number; // %
  refundRateDelta: number;
  arpdau: number;
  totalRevenueMTD: number;
  revenueDelta: number;
  // Audience
  ccu: TimeSeriesPoint[];
  revenueHistory: TimeSeriesPoint[];
  retentionD1: number;
  retentionD7: number;
  retentionD30: number;
  // AI Action
  aiAction: AiAction;
  // Top Players
  whaleCount: number;
  whaleRevenuePct: number;
}

// ─── 5 Games ─────────────────────────────────────────────────────────────────

export const GAMES: Game[] = [
  {
    id: "neon-abyss",
    name: "Neon Abyss: Ascendant",
    shortName: "Neon Abyss",
    genre: "Roguelike",
    platform: ["Steam", "Epic"],
    releaseDate: "2023-09-14",
    accentColor: "#F191FA",
    secondaryColor: "#C9A2F6",
    wishlistTotal: 284_000,
    wishlistConversionRate: 18.4,
    wishlistConversionDelta: 2.1,
    steamRating: 89,
    steamReviewCount: 14_230,
    dau: 42_800,
    mau: 187_000,
    dauMauRatio: 22.9,
    dauDelta: 8.3,
    refundRate: 3.1,
    refundRateDelta: -0.4,
    arpdau: 0.82,
    totalRevenueMTD: 1_240_000,
    revenueDelta: 14.2,
    ccu: [
      { date: "Apr 1", value: 8400 },
      { date: "Apr 2", value: 9200 },
      { date: "Apr 3", value: 11800 },
      { date: "Apr 4", value: 10600 },
      { date: "Apr 5", value: 13200 },
      { date: "Apr 6", value: 15900 },
      { date: "Apr 7", value: 21400 },
      { date: "Apr 8", value: 19800 },
      { date: "Apr 9", value: 17200 },
      { date: "Apr 10", value: 22600 },
      { date: "Apr 11", value: 28400 },
      { date: "Apr 12", value: 26800 },
    ],
    revenueHistory: [
      { date: "Jan", value: 820000 },
      { date: "Feb", value: 940000 },
      { date: "Mar", value: 1080000 },
      { date: "Apr", value: 1240000 },
    ],
    retentionD1: 68,
    retentionD7: 42,
    retentionD30: 26,
    aiAction: {
      type: "opportunity",
      message: "Wishlist Spike +23% in JP: Trigger localized sale (-20%)",
      cta: "Launch JP Sale",
    },
    whaleCount: 2140,
    whaleRevenuePct: 61,
  },
  {
    id: "cozy-harbor",
    name: "Cozy Harbor",
    shortName: "Cozy Harbor",
    genre: "Cozy",
    platform: ["Steam"],
    releaseDate: "2024-02-14",
    accentColor: "#ABF790",
    secondaryColor: "#6FD6F2",
    wishlistTotal: 416_000,
    wishlistConversionRate: 22.7,
    wishlistConversionDelta: 4.8,
    steamRating: 96,
    steamReviewCount: 22_480,
    dau: 68_200,
    mau: 241_000,
    dauMauRatio: 28.3,
    dauDelta: 12.7,
    refundRate: 1.2,
    refundRateDelta: -0.2,
    arpdau: 0.61,
    totalRevenueMTD: 1_820_000,
    revenueDelta: 22.8,
    ccu: [
      { date: "Apr 1", value: 14200 },
      { date: "Apr 2", value: 15800 },
      { date: "Apr 3", value: 18400 },
      { date: "Apr 4", value: 17200 },
      { date: "Apr 5", value: 21600 },
      { date: "Apr 6", value: 24800 },
      { date: "Apr 7", value: 32400 },
      { date: "Apr 8", value: 30100 },
      { date: "Apr 9", value: 28600 },
      { date: "Apr 10", value: 31200 },
      { date: "Apr 11", value: 38400 },
      { date: "Apr 12", value: 36800 },
    ],
    revenueHistory: [
      { date: "Jan", value: 1100000 },
      { date: "Feb", value: 1380000 },
      { date: "Mar", value: 1620000 },
      { date: "Apr", value: 1820000 },
    ],
    retentionD1: 74,
    retentionD7: 56,
    retentionD30: 38,
    aiAction: {
      type: "opportunity",
      message: "High D30 retention (38%). Introduce Season Pass to boost ARPU",
      cta: "Design Season Pass",
    },
    whaleCount: 1820,
    whaleRevenuePct: 44,
  },
  {
    id: "iron-front",
    name: "Iron Front: Siege",
    shortName: "Iron Front",
    genre: "FPS",
    platform: ["Steam", "Epic", "Console"],
    releaseDate: "2023-03-22",
    accentColor: "#61ADEB",
    secondaryColor: "#99A8EA",
    wishlistTotal: 192_000,
    wishlistConversionRate: 12.1,
    wishlistConversionDelta: -1.8,
    steamRating: 74,
    steamReviewCount: 8_920,
    dau: 28_400,
    mau: 148_000,
    dauMauRatio: 19.2,
    dauDelta: -3.6,
    refundRate: 7.4,
    refundRateDelta: 2.1,
    arpdau: 0.44,
    totalRevenueMTD: 680_000,
    revenueDelta: -8.4,
    ccu: [
      { date: "Apr 1", value: 6200 },
      { date: "Apr 2", value: 5800 },
      { date: "Apr 3", value: 6400 },
      { date: "Apr 4", value: 5600 },
      { date: "Apr 5", value: 5200 },
      { date: "Apr 6", value: 4800 },
      { date: "Apr 7", value: 7200 },
      { date: "Apr 8", value: 6800 },
      { date: "Apr 9", value: 5400 },
      { date: "Apr 10", value: 4900 },
      { date: "Apr 11", value: 4600 },
      { date: "Apr 12", value: 4200 },
    ],
    revenueHistory: [
      { date: "Jan", value: 920000 },
      { date: "Feb", value: 840000 },
      { date: "Mar", value: 760000 },
      { date: "Apr", value: 680000 },
    ],
    retentionD1: 52,
    retentionD7: 28,
    retentionD30: 14,
    aiAction: {
      type: "critical",
      message: "High refund rate (+7.4%) in DE/FR: Localization issues detected",
      cta: "Review Localization",
    },
    whaleCount: 840,
    whaleRevenuePct: 38,
  },
  {
    id: "starfield-drifters",
    name: "Starfield Drifters",
    shortName: "SF Drifters",
    genre: "Space RPG",
    platform: ["Steam", "Epic"],
    releaseDate: "2024-07-08",
    accentColor: "#FAFD7E",
    secondaryColor: "#F191FA",
    wishlistTotal: 521_000,
    wishlistConversionRate: 16.2,
    wishlistConversionDelta: 1.4,
    steamRating: 82,
    steamReviewCount: 11_640,
    dau: 54_600,
    mau: 210_000,
    dauMauRatio: 26.0,
    dauDelta: 5.8,
    refundRate: 4.2,
    refundRateDelta: 0.6,
    arpdau: 0.94,
    totalRevenueMTD: 2_180_000,
    revenueDelta: 9.6,
    ccu: [
      { date: "Apr 1", value: 12400 },
      { date: "Apr 2", value: 14200 },
      { date: "Apr 3", value: 16800 },
      { date: "Apr 4", value: 15400 },
      { date: "Apr 5", value: 18200 },
      { date: "Apr 6", value: 21400 },
      { date: "Apr 7", value: 28600 },
      { date: "Apr 8", value: 26400 },
      { date: "Apr 9", value: 23800 },
      { date: "Apr 10", value: 27200 },
      { date: "Apr 11", value: 32400 },
      { date: "Apr 12", value: 30800 },
    ],
    revenueHistory: [
      { date: "Jan", value: 1680000 },
      { date: "Feb", value: 1820000 },
      { date: "Mar", value: 2020000 },
      { date: "Apr", value: 2180000 },
    ],
    retentionD1: 71,
    retentionD7: 48,
    retentionD30: 31,
    aiAction: {
      type: "opportunity",
      message: "Twitch trending +180% past 48h. Push influencer seeding now",
      cta: "Activate Seeding",
    },
    whaleCount: 3210,
    whaleRevenuePct: 58,
  },
  {
    id: "pixel-legends",
    name: "Pixel Legends Arena",
    shortName: "Pixel Legends",
    genre: "Battle Royale",
    platform: ["Steam", "Epic", "Console", "Mobile"],
    releaseDate: "2022-11-03",
    accentColor: "#FF637F",
    secondaryColor: "#F2B7DA",
    wishlistTotal: 98_000,
    wishlistConversionRate: 8.6,
    wishlistConversionDelta: -3.2,
    steamRating: 68,
    steamReviewCount: 19_840,
    dau: 34_800,
    mau: 198_000,
    dauMauRatio: 17.6,
    dauDelta: -8.1,
    refundRate: 5.8,
    refundRateDelta: 1.4,
    arpdau: 0.38,
    totalRevenueMTD: 480_000,
    revenueDelta: -14.6,
    ccu: [
      { date: "Apr 1", value: 9400 },
      { date: "Apr 2", value: 8800 },
      { date: "Apr 3", value: 8200 },
      { date: "Apr 4", value: 7600 },
      { date: "Apr 5", value: 7200 },
      { date: "Apr 6", value: 6800 },
      { date: "Apr 7", value: 8600 },
      { date: "Apr 8", value: 8200 },
      { date: "Apr 9", value: 7400 },
      { date: "Apr 10", value: 6900 },
      { date: "Apr 11", value: 6400 },
      { date: "Apr 12", value: 6100 },
    ],
    revenueHistory: [
      { date: "Jan", value: 780000 },
      { date: "Feb", value: 680000 },
      { date: "Mar", value: 560000 },
      { date: "Apr", value: 480000 },
    ],
    retentionD1: 44,
    retentionD7: 21,
    retentionD30: 9,
    aiAction: {
      type: "critical",
      message: "D30 retention critical (9%). Content drought — ship new map ASAP",
      cta: "Escalate Roadmap",
    },
    whaleCount: 620,
    whaleRevenuePct: 52,
  },
];

// ─── Portfolio Health ─────────────────────────────────────────────────────────

export const PORTFOLIO_HEALTH: HealthStatus = "warning"; // amber

export const AI_SUMMARY =
  "Portfolio revenue up 12% WoW driven by Cozy Harbor's viral TikTok moment and Starfield Drifters' Twitch breakout — however Iron Front and Pixel Legends show declining retention that requires immediate action.";

// ─── Sankey: Player Migration Between Titles ─────────────────────────────────

export const SANKEY_DATA = {
  nodes: [
    { name: "Neon Abyss" },    // 0
    { name: "Cozy Harbor" },   // 1
    { name: "Iron Front" },    // 2
    { name: "SF Drifters" },   // 3
    { name: "Pixel Legends" }, // 4
  ],
  links: [
    // Neon Abyss → others
    { source: 0, target: 3, value: 8200 },  // Roguelike → RPG crossover
    { source: 0, target: 2, value: 4100 },  // Roguelike → FPS
    { source: 0, target: 1, value: 2800 },  // Roguelike → Cozy
    // Cozy Harbor → others
    { source: 1, target: 0, value: 3400 },  // Cozy → Roguelike
    { source: 1, target: 3, value: 5600 },  // Cozy → RPG
    // Iron Front → others
    { source: 2, target: 4, value: 6200 },  // FPS → Battle Royale
    { source: 2, target: 0, value: 2100 },  // FPS → Roguelike
    // SF Drifters → others
    { source: 3, target: 0, value: 4800 },  // RPG → Roguelike
    { source: 3, target: 1, value: 3200 },  // RPG → Cozy
    // Pixel Legends → others
    { source: 4, target: 2, value: 5100 },  // BR → FPS
    { source: 4, target: 3, value: 3600 },  // BR → RPG
  ],
};

// ─── Whale Activity Matrix ────────────────────────────────────────────────────
// Rows = whale cohorts (top spenders), Cols = games
// Value = activity score 0-100

export const WHALE_HEATMAP = [
  {
    cohort: "Ultra Whales ($500+/mo)",
    games: { "neon-abyss": 82, "cozy-harbor": 44, "iron-front": 21, "starfield-drifters": 94, "pixel-legends": 18 },
  },
  {
    cohort: "Whales ($200–500/mo)",
    games: { "neon-abyss": 71, "cozy-harbor": 68, "iron-front": 34, "starfield-drifters": 78, "pixel-legends": 29 },
  },
  {
    cohort: "Dolphins ($50–200/mo)",
    games: { "neon-abyss": 58, "cozy-harbor": 81, "iron-front": 48, "starfield-drifters": 62, "pixel-legends": 41 },
  },
  {
    cohort: "Minnows ($10–50/mo)",
    games: { "neon-abyss": 44, "cozy-harbor": 72, "iron-front": 56, "starfield-drifters": 48, "pixel-legends": 63 },
  },
];

// ─── Live Ticker Feed ─────────────────────────────────────────────────────────

export type TickerEventType = "mention" | "review" | "ccu_spike" | "viral" | "review_bomb";

export interface TickerEvent {
  id: string;
  type: TickerEventType;
  game: string;
  gameId: string;
  message: string;
  timestamp: string;
  sentiment: "positive" | "negative" | "neutral";
  source: string;
  value?: string;
  isViral?: boolean;
}

export const INITIAL_TICKER_EVENTS: TickerEvent[] = [
  {
    id: "t1",
    type: "viral",
    game: "Starfield Drifters",
    gameId: "starfield-drifters",
    message: "Trending #2 on Twitch — 42,800 concurrent viewers",
    timestamp: "just now",
    sentiment: "positive",
    source: "Twitch",
    value: "42.8K viewers",
    isViral: true,
  },
  {
    id: "t2",
    type: "review",
    game: "Cozy Harbor",
    gameId: "cozy-harbor",
    message: '"This game saved my mental health. 10/10 absolutely perfect."',
    timestamp: "2m ago",
    sentiment: "positive",
    source: "Steam",
    value: "★★★★★",
  },
  {
    id: "t3",
    type: "ccu_spike",
    game: "Neon Abyss",
    gameId: "neon-abyss",
    message: "CCU spike +38% — new patch 2.4.1 live",
    timestamp: "5m ago",
    sentiment: "positive",
    source: "Steam API",
    value: "+38% CCU",
  },
  {
    id: "t4",
    type: "review",
    game: "Iron Front: Siege",
    gameId: "iron-front",
    message: '"German voice acting is completely wrong — feels machine translated"',
    timestamp: "8m ago",
    sentiment: "negative",
    source: "Steam",
    value: "★★☆☆☆",
  },
  {
    id: "t5",
    type: "mention",
    game: "Pixel Legends Arena",
    gameId: "pixel-legends",
    message: "245 Reddit mentions — #3 trending in r/gaming",
    timestamp: "12m ago",
    sentiment: "neutral",
    source: "Reddit",
    value: "245 mentions",
  },
  {
    id: "t6",
    type: "viral",
    game: "Cozy Harbor",
    gameId: "cozy-harbor",
    message: "TikTok clip hit 8.2M views — #cozygaming trending",
    timestamp: "18m ago",
    sentiment: "positive",
    source: "TikTok",
    value: "8.2M views",
    isViral: true,
  },
  {
    id: "t7",
    type: "review",
    game: "Starfield Drifters",
    gameId: "starfield-drifters",
    message: '"Patch 1.8 completely broke ship combat. Unplayable."',
    timestamp: "24m ago",
    sentiment: "negative",
    source: "Steam",
    value: "★☆☆☆☆",
  },
  {
    id: "t8",
    type: "mention",
    game: "Neon Abyss",
    gameId: "neon-abyss",
    message: "IGN featured in 'Best Roguelikes of 2025' list",
    timestamp: "31m ago",
    sentiment: "positive",
    source: "IGN",
    value: "Featured",
  },
];

// ─── Industry Benchmarks ──────────────────────────────────────────────────────

export interface BenchmarkMetric {
  label: string;
  publisherValue: number;
  industryMedian: number;
  topQuartile: number;
  unit: string;
  genre: string;
  delta: number;
}

export const BENCHMARKS: BenchmarkMetric[] = [
  {
    label: "D1 Retention",
    publisherValue: 61.8,
    industryMedian: 42,
    topQuartile: 65,
    unit: "%",
    genre: "Roguelike",
    delta: 3.2,
  },
  {
    label: "D7 Retention",
    publisherValue: 39.0,
    industryMedian: 22,
    topQuartile: 40,
    unit: "%",
    genre: "Roguelike",
    delta: 1.4,
  },
  {
    label: "D30 Retention",
    publisherValue: 23.6,
    industryMedian: 11,
    topQuartile: 24,
    unit: "%",
    genre: "Cozy",
    delta: -0.8,
  },
  {
    label: "Wishlist→Purchase",
    publisherValue: 15.6,
    industryMedian: 10,
    topQuartile: 20,
    unit: "%",
    genre: "RPG",
    delta: 0.9,
  },
  {
    label: "ARPDAU",
    publisherValue: 0.64,
    industryMedian: 0.48,
    topQuartile: 0.95,
    unit: "$",
    genre: "Mixed",
    delta: 0.06,
  },
  {
    label: "Refund Rate",
    publisherValue: 4.34,
    industryMedian: 3.2,
    topQuartile: 1.8,
    unit: "%",
    genre: "FPS",
    delta: 0.74,
  },
];

// ─── Social Sentiment ─────────────────────────────────────────────────────────

export const SENTIMENT_DATA = [
  { subject: "Twitter / X", score: 72, fullMark: 100 },
  { subject: "Reddit", score: 64, fullMark: 100 },
  { subject: "Steam", score: 83, fullMark: 100 },
  { subject: "Discord", score: 78, fullMark: 100 },
  { subject: "TikTok", score: 91, fullMark: 100 },
  { subject: "YouTube", score: 69, fullMark: 100 },
];

export const SENTIMENT_OVERALL = 76; // bullish
export const SENTIMENT_LABEL = "Bullish";
export const SENTIMENT_DELTA = 4.2;

// ─── Reward Trigger Rules ─────────────────────────────────────────────────────

export interface TriggerRule {
  id: string;
  condition: string;
  action: string;
  status: "active" | "pending" | "paused";
  firedCount: number;
  lastFired: string;
  targetGame: string;
}

export const TRIGGER_RULES: TriggerRule[] = [
  {
    id: "r1",
    condition: "Game A hours ≥ 50 AND Game B owned = false",
    action: "Send 20% discount for Game B",
    status: "active",
    firedCount: 4820,
    lastFired: "3 min ago",
    targetGame: "Neon Abyss → Cozy Harbor",
  },
  {
    id: "r2",
    condition: "DAU drop > 15% over 3 days",
    action: "Push re-engagement email + in-game event",
    status: "active",
    firedCount: 1240,
    lastFired: "1h ago",
    targetGame: "Pixel Legends Arena",
  },
  {
    id: "r3",
    condition: "CCU spike > 2x 7-day avg",
    action: "Scale servers + notify CM team",
    status: "active",
    firedCount: 38,
    lastFired: "just now",
    targetGame: "Starfield Drifters",
  },
  {
    id: "r4",
    condition: "Review sentiment < 70 in region",
    action: "Flag localization team + pause paid ads",
    status: "pending",
    firedCount: 0,
    lastFired: "never",
    targetGame: "Iron Front: Siege",
  },
  {
    id: "r5",
    condition: "Whale inactivity > 7 days",
    action: "Send personalized re-engagement offer",
    status: "active",
    firedCount: 892,
    lastFired: "45 min ago",
    targetGame: "All Titles",
  },
];

// ─── Regional Revenue ─────────────────────────────────────────────────────────

export const REGIONAL_REVENUE: RegionRevenue[] = [
  { region: "North America", code: "NA", revenue: 2_480_000, pppAdjusted: 2_480_000, growth: 8.4, currency: "USD" },
  { region: "Western Europe", code: "WEU", revenue: 1_840_000, pppAdjusted: 2_180_000, growth: 12.1, currency: "EUR" },
  { region: "East Asia", code: "EA", revenue: 1_240_000, pppAdjusted: 2_040_000, growth: 28.6, currency: "JPY/KRW" },
  { region: "Southeast Asia", code: "SEA", revenue: 480_000, pppAdjusted: 1_140_000, growth: 42.3, currency: "SGD/THB" },
  { region: "Eastern Europe", code: "EEU", revenue: 340_000, pppAdjusted: 880_000, growth: 18.9, currency: "PLN/RUB" },
  { region: "Latin America", code: "LATAM", revenue: 290_000, pppAdjusted: 780_000, growth: 34.8, currency: "BRL/MXN" },
  { region: "South Asia", code: "SA", revenue: 180_000, pppAdjusted: 640_000, growth: 56.2, currency: "INR" },
  { region: "Middle East & Africa", code: "MEA", revenue: 210_000, pppAdjusted: 520_000, growth: 21.4, currency: "AED/ZAR" },
  { region: "Oceania", code: "OCE", revenue: 320_000, pppAdjusted: 360_000, growth: 6.2, currency: "AUD" },
  { region: "Central Asia", code: "CAS", revenue: 80_000, pppAdjusted: 240_000, growth: 14.7, currency: "KZT" },
];

// ─── Portfolio Aggregates ─────────────────────────────────────────────────────

export const PORTFOLIO_TOTALS = {
  totalRevenueMTD: 6_400_000,
  revenueDelta: 8.2,
  totalDAU: 228_800,
  dauDelta: 4.6,
  totalMAU: 984_000,
  totalCCU: 86_400,
  avgRefundRate: 4.34,
  avgSteamRating: 81.8,
  totalWishlists: 1_511_000,
  publisherName: "Nexus Interactive",
  reportPeriod: "April 2026",
};
