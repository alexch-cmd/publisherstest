// ─────────────────────────────────────────────────────────────────────────────
// Publisher Command Center — Mock Data v2
// 5 games: 2 TCG, 2 RPG, 1 FPS — Nexus Interactive
// Key narrative: RPG players migrate TO TCG; FPS is isolated silo
// ─────────────────────────────────────────────────────────────────────────────

export type HealthStatus = "optimal" | "warning" | "critical";

export interface TimeSeriesPoint { date: string; value: number }

export interface RegionRevenue {
  region: string; code: string; revenue: number;
  pppAdjusted: number; growth: number; currency: string;
  countryIds: number[]; // ISO 3166-1 numeric
  dau: number; // daily active users in this region
}

export interface AiAction {
  type: "opportunity" | "warning" | "critical";
  message: string; cta: string; gameId: string;
}

export interface Game {
  id: string; name: string; shortName: string;
  genre: "TCG" | "RPG" | "FPS"; platform: string[];
  releaseDate: string; accentColor: string; secondaryColor: string;
  wishlistTotal: number; wishlistConversionRate: number; wishlistConversionDelta: number;
  steamRating: number; steamReviewCount: number;
  dau: number; mau: number; dauMauRatio: number; dauDelta: number;
  refundRate: number; refundRateDelta: number;
  arpdau: number; totalRevenueMTD: number; revenueDelta: number;
  ccu: TimeSeriesPoint[];          // 12 daily CCU points
  revenueHistory: TimeSeriesPoint[]; // 12 months
  dauHistory: TimeSeriesPoint[];     // 12 months
  retentionD1: number; retentionD7: number; retentionD30: number;
  aiAction: AiAction;
  whaleCount: number; whaleRevenuePct: number;
  eventMarkers: EventMarker[];
  weeklyInsights: WeeklyInsight;
}

// ─── 12-month labels ─────────────────────────────────────────────────────────
const MONTHS = ["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr"];

// ─── Event Marker type ────────────────────────────────────────────────────────
export interface EventMarker {
  month: string; // must match a MONTHS entry
  label: string;
  type: "viral" | "patch" | "launch" | "alert";
  source?: string;
}

// ─── Weekly Insights type ─────────────────────────────────────────────────────
export interface WeeklyInsight {
  developments: string[];
  recommendation: string;
  urgency: "critical" | "warning" | "opportunity";
}

// ─── 5 Games ─────────────────────────────────────────────────────────────────
export const GAMES: Game[] = [
  // ── TCG 1 ────────────────────────────────────────────────────────────────
  {
    id: "nexus-cards",
    name: "Nexus Cards: Ascendant",
    shortName: "Nexus Cards",
    genre: "TCG",
    platform: ["Steam","Epic","Mobile"],
    releaseDate: "2024-01-18",
    accentColor: "#F191FA",
    secondaryColor: "#C9A2F6",
    wishlistTotal: 312_000,
    wishlistConversionRate: 21.4,
    wishlistConversionDelta: 3.2,
    steamRating: 91,
    steamReviewCount: 18_640,
    dau: 58_400,
    mau: 214_000,
    dauMauRatio: 27.3,
    dauDelta: 11.4,
    refundRate: 2.1,
    refundRateDelta: -0.3,
    arpdau: 0.92,
    totalRevenueMTD: 1_840_000,
    revenueDelta: 18.6,
    ccu: MONTHS.slice(-12).map((d, i) => ({
      date: d,
      value: 9200 + i * 1400 + (i > 7 ? 4800 : 0) + Math.sin(i) * 800
    })).map((p, i) => ({ ...p, value: Math.round(p.value) })),
    revenueHistory: MONTHS.map((d, i) => ({
      date: d, value: Math.round(820_000 + i * 92_000 + (i > 8 ? 140_000 : 0))
    })),
    dauHistory: MONTHS.map((d, i) => ({
      date: d, value: Math.round(28_000 + i * 2800 + (i > 7 ? 8_000 : 0))
    })),
    retentionD1: 72, retentionD7: 51, retentionD30: 34,
    aiAction: {
      type: "opportunity",
      message: "Wishlist spike +31% in JP this week — trigger a localized launch sale (-20%)",
      cta: "Launch JP Sale",
      gameId: "nexus-cards",
    },
    whaleCount: 2_840, whaleRevenuePct: 63,
    eventMarkers: [
      { month: "Sep", label: "Set 2 Launch", type: "launch", source: "Steam" },
      { month: "Feb", label: "JP Viral TikTok", type: "viral", source: "TikTok" },
      { month: "Apr", label: "Set 3 Reveal", type: "viral", source: "Twitter/X" },
    ],
    weeklyInsights: {
      developments: [
        "Set 3 reveal event drove CCU +58% to all-time peak of 32K",
        "Japan wishlists up 31% — JP player base responding to anime art direction",
        "Whale retention at 94% engagement score — highest in portfolio",
      ],
      recommendation: "Launch JP localised 20% sale within 72h to convert wishlist spike",
      urgency: "opportunity",
    },
  },

  // ── TCG 2 ────────────────────────────────────────────────────────────────
  {
    id: "riftbound",
    name: "Riftbound TCG",
    shortName: "Riftbound",
    genre: "TCG",
    platform: ["Steam","Epic"],
    releaseDate: "2024-09-04",
    accentColor: "#C9A2F6",
    secondaryColor: "#99A8EA",
    wishlistTotal: 184_000,
    wishlistConversionRate: 16.8,
    wishlistConversionDelta: 1.4,
    steamRating: 84,
    steamReviewCount: 9_210,
    dau: 31_200,
    mau: 142_000,
    dauMauRatio: 22.0,
    dauDelta: 6.8,
    refundRate: 3.4,
    refundRateDelta: 0.2,
    arpdau: 0.74,
    totalRevenueMTD: 980_000,
    revenueDelta: 9.2,
    ccu: MONTHS.slice(-12).map((d, i) => ({
      date: d, value: Math.round(4_800 + i * 820 + Math.sin(i * 0.8) * 600)
    })),
    revenueHistory: MONTHS.map((d, i) => ({
      date: d, value: Math.round(460_000 + i * 46_000)
    })),
    dauHistory: MONTHS.map((d, i) => ({
      date: d, value: Math.round(14_000 + i * 1_500)
    })),
    retentionD1: 61, retentionD7: 38, retentionD30: 22,
    aiAction: {
      type: "warning",
      message: "Riftbound Set 2 pre-orders underperforming vs. Nexus — differentiate card mechanics messaging",
      cta: "Update Store Page",
      gameId: "riftbound",
    },
    whaleCount: 1_240, whaleRevenuePct: 57,
    eventMarkers: [
      { month: "Jan", label: "Set 2 Pre-order", type: "launch", source: "Steam" },
      { month: "Mar", label: "Balance Patch 1.4", type: "patch", source: "Steam" },
    ],
    weeklyInsights: {
      developments: [
        "Set 2 pre-orders tracking 34% below Nexus Cards Set 2 at same milestone",
        "Balance patch 1.4 improved DAU:MAU ratio from 19% to 22%",
        "Reddit Set 2 spoiler leak generated organic buzz — 4.2K upvotes",
      ],
      recommendation: "Differentiate card mechanic messaging from Nexus — update store page hero",
      urgency: "warning",
    },
  },

  // ── RPG 1 ────────────────────────────────────────────────────────────────
  {
    id: "starfield-drifters",
    name: "Starfield Drifters",
    shortName: "SF Drifters",
    genre: "RPG",
    platform: ["Steam","Epic"],
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
    ccu: MONTHS.slice(-12).map((d, i) => ({
      date: d, value: Math.round(11_400 + i * 1_020 + (i > 9 ? 6_200 : 0) + Math.cos(i) * 900)
    })),
    revenueHistory: MONTHS.map((d, i) => ({
      date: d, value: Math.round(1_380_000 + i * 68_000)
    })),
    dauHistory: MONTHS.map((d, i) => ({
      date: d, value: Math.round(38_000 + i * 1_500 + (i > 9 ? 8_000 : 0))
    })),
    retentionD1: 71, retentionD7: 48, retentionD30: 31,
    aiAction: {
      type: "opportunity",
      message: "Twitch trending +180% past 48h — push influencer seeding now for max conversion",
      cta: "Activate Seeding",
      gameId: "starfield-drifters",
    },
    whaleCount: 3_210, whaleRevenuePct: 58,
    eventMarkers: [
      { month: "Aug", label: "DLC: Void Expanse", type: "launch", source: "Steam" },
      { month: "Dec", label: "Winter Sale", type: "viral", source: "Steam" },
      { month: "Apr", label: "Twitch Trending #2", type: "viral", source: "Twitch" },
    ],
    weeklyInsights: {
      developments: [
        "Twitch trending #2 with 42.8K concurrent viewers — organic community event",
        "Post-DLC DAU spike +22% is holding 3 weeks after release",
        "Steam RPG→TCG cross-sell widget converting at 6.4% — above 4% target",
      ],
      recommendation: "Activate influencer seeding budget now while Twitch momentum is live",
      urgency: "opportunity",
    },
  },

  // ── RPG 2 ────────────────────────────────────────────────────────────────
  {
    id: "verdant-chronicles",
    name: "Verdant Chronicles",
    shortName: "Verdant Chron.",
    genre: "RPG",
    platform: ["Steam"],
    releaseDate: "2023-04-12",
    accentColor: "#ABF790",
    secondaryColor: "#6FD6F2",
    wishlistTotal: 398_000,
    wishlistConversionRate: 19.8,
    wishlistConversionDelta: 2.6,
    steamRating: 94,
    steamReviewCount: 24_180,
    dau: 62_800,
    mau: 228_000,
    dauMauRatio: 27.5,
    dauDelta: 9.1,
    refundRate: 1.4,
    refundRateDelta: -0.1,
    arpdau: 0.68,
    totalRevenueMTD: 1_620_000,
    revenueDelta: 14.4,
    ccu: MONTHS.slice(-12).map((d, i) => ({
      date: d, value: Math.round(16_200 + i * 1_180 + Math.sin(i * 1.2) * 1_200)
    })),
    revenueHistory: MONTHS.map((d, i) => ({
      date: d, value: Math.round(820_000 + i * 68_000)
    })),
    dauHistory: MONTHS.map((d, i) => ({
      date: d, value: Math.round(36_000 + i * 2_400)
    })),
    retentionD1: 76, retentionD7: 58, retentionD30: 41,
    aiAction: {
      type: "opportunity",
      message: "D30 retention (41%) leads portfolio — ideal candidates to cross-sell Nexus Cards TCG",
      cta: "Create Cross-Sell",
      gameId: "verdant-chronicles",
    },
    whaleCount: 1_980, whaleRevenuePct: 48,
    eventMarkers: [
      { month: "Jul", label: "Community 1M milestone", type: "viral", source: "Discord" },
      { month: "Nov", label: "Expansion: Thornwall", type: "launch", source: "Steam" },
      { month: "Mar", label: "TikTok speedrun viral", type: "viral", source: "TikTok" },
    ],
    weeklyInsights: {
      developments: [
        "D30 retention 41% leads entire portfolio — cohort quality is exceptional",
        "TikTok speedrun clip hit 9.4M views — strongest organic moment this quarter",
        "RPG→TCG cross-sell funnel firing 8.4K triggers/week from this title",
      ],
      recommendation: "Identify top D30 cohort and target them with Nexus Cards cross-sell campaign",
      urgency: "opportunity",
    },
  },

  // ── FPS ──────────────────────────────────────────────────────────────────
  {
    id: "iron-front",
    name: "Iron Front: Siege",
    shortName: "Iron Front",
    genre: "FPS",
    platform: ["Steam","Epic","Console"],
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
    ccu: MONTHS.slice(-12).map((d, i) => ({
      date: d, value: Math.round(9_200 - i * 260 + Math.sin(i * 0.6) * 400)
    })),
    revenueHistory: MONTHS.map((d, i) => ({
      date: d, value: Math.round(1_180_000 - i * 42_000)
    })),
    dauHistory: MONTHS.map((d, i) => ({
      date: d, value: Math.round(41_000 - i * 1_100)
    })),
    retentionD1: 52, retentionD7: 28, retentionD30: 14,
    aiAction: {
      type: "critical",
      message: "Refund rate +7.4% in DE/FR: localization sync errors detected in voice acting",
      cta: "Review Localization",
      gameId: "iron-front",
    },
    whaleCount: 840, whaleRevenuePct: 38,
    eventMarkers: [
      { month: "Oct", label: "Patch 1.6 Backlash", type: "alert", source: "Steam" },
      { month: "Feb", label: "DE Review Bomb", type: "alert", source: "Steam" },
      { month: "Apr", label: "Localization Crisis", type: "alert", source: "Steam" },
    ],
    weeklyInsights: {
      developments: [
        "Refund rate spiked to 7.4% in DE/FR — voice acting sync errors confirmed",
        "DAU declining -3.6% WoW as negative reviews suppress organic discovery",
        "Revenue trajectory -8.4% — at risk of falling below break-even by June",
      ],
      recommendation: "Pause DACH/Francophone paid ads immediately and issue community statement",
      urgency: "critical",
    },
  },
];

// ─── Portfolio Health ─────────────────────────────────────────────────────────
export const PORTFOLIO_HEALTH: HealthStatus = "warning";

// ─── AI Summary & Action Chips ───────────────────────────────────────────────
export const AI_SUMMARY =
  "Portfolio revenue +12% WoW — RPG→TCG cross-sell is working (Verdant→Nexus Cards funnel at 38%), but Iron Front localization crisis is eroding refund rate in DACH/France.";

export interface ActionChip {
  id: string; gameId: string; gameName: string;
  type: "opportunity" | "warning" | "critical";
  label: string; cta: string;
}

export const ACTION_CHIPS: ActionChip[] = [
  {
    id: "chip-1", gameId: "nexus-cards", gameName: "Nexus Cards",
    type: "opportunity", label: "JP Wishlist spike +31%", cta: "Launch Sale",
  },
  {
    id: "chip-2", gameId: "iron-front", gameName: "Iron Front",
    type: "critical", label: "DE/FR refund crisis +7.4%", cta: "Review L10N",
  },
  {
    id: "chip-3", gameId: "starfield-drifters", gameName: "SF Drifters",
    type: "opportunity", label: "Twitch trending +180%", cta: "Seed Now",
  },
  {
    id: "chip-4", gameId: "verdant-chronicles", gameName: "Verdant Chron.",
    type: "opportunity", label: "D30 retention leads — cross-sell TCG", cta: "Create Funnel",
  },
];

// ─── Sankey: Player Migration ─────────────────────────────────────────────────
// Narrative: RPG → TCG strong; FPS isolated; TCG ↔ TCG within genre
export const SANKEY_DATA = {
  nodes: [
    { name: "Nexus Cards",     color: "#F191FA" }, // 0 TCG
    { name: "Riftbound TCG",   color: "#C9A2F6" }, // 1 TCG
    { name: "SF Drifters",     color: "#FAFD7E" }, // 2 RPG
    { name: "Verdant Chron.",  color: "#ABF790" }, // 3 RPG
    { name: "Iron Front",      color: "#61ADEB" }, // 4 FPS
  ],
  links: [
    // RPG → TCG (strong — the designed funnel)
    { source: 2, target: 0, value: 12_400 },
    { source: 2, target: 1, value: 7_800 },
    { source: 3, target: 0, value: 14_200 },
    { source: 3, target: 1, value: 6_600 },
    // TCG ↔ TCG (within-genre switching)
    { source: 0, target: 1, value: 3_800 },
    { source: 1, target: 0, value: 4_400 },
    // FPS → RPG only (very small — curious players)
    { source: 4, target: 2, value: 1_600 },
    // RPG → FPS (near zero — the isolation)
    { source: 2, target: 4, value: 600 },
    { source: 3, target: 4, value: 400 },
    // TCG → RPG (small — lapsed TCG players trying RPG)
    { source: 0, target: 2, value: 2_200 },
  ],
};

// ─── Whale Activity Matrix ────────────────────────────────────────────────────
export const WHALE_HEATMAP = [
  {
    cohort: "High Spenders ($500+/mo)",
    games: { "nexus-cards": 94, "riftbound": 62, "starfield-drifters": 78, "verdant-chronicles": 51, "iron-front": 14 },
  },
  {
    cohort: "Mid Spenders ($200–500/mo)",
    games: { "nexus-cards": 81, "riftbound": 71, "starfield-drifters": 68, "verdant-chronicles": 74, "iron-front": 22 },
  },
  {
    cohort: "Low Spenders ($50–200/mo)",
    games: { "nexus-cards": 64, "riftbound": 58, "starfield-drifters": 72, "verdant-chronicles": 81, "iron-front": 38 },
  },
  {
    cohort: "Casual ($10–50/mo)",
    games: { "nexus-cards": 48, "riftbound": 44, "starfield-drifters": 56, "verdant-chronicles": 62, "iron-front": 54 },
  },
];

// ─── Live Ticker ──────────────────────────────────────────────────────────────
export type TickerEventType = "mention" | "review" | "ccu_spike" | "viral" | "review_bomb";
export interface TickerEvent {
  id: string; type: TickerEventType; game: string; gameId: string;
  message: string; timestamp: string; sentiment: "positive"|"negative"|"neutral";
  source: string; value?: string; isViral?: boolean;
}

export const INITIAL_TICKER_EVENTS: TickerEvent[] = [
  {
    id: "t1", type: "viral", game: "Starfield Drifters", gameId: "starfield-drifters",
    message: "Trending #2 on Twitch — 42,800 concurrent viewers watching new build",
    timestamp: "just now", sentiment: "positive", source: "Twitch", value: "42.8K viewers", isViral: true,
  },
  {
    id: "t2", type: "review", game: "Verdant Chronicles", gameId: "verdant-chronicles",
    message: '"Best RPG of the year. The world-building is unmatched. 100 hours in and still discovering."',
    timestamp: "2m ago", sentiment: "positive", source: "Steam", value: "★★★★★",
  },
  {
    id: "t3", type: "ccu_spike", game: "Nexus Cards", gameId: "nexus-cards",
    message: "Set 3 reveal event: CCU +58% — breaking all-time peak",
    timestamp: "6m ago", sentiment: "positive", source: "Steam API", value: "+58% CCU",
  },
  {
    id: "t4", type: "review", game: "Iron Front: Siege", gameId: "iron-front",
    message: '"Deutsches Voice-Acting ist vollständig falsch — klingt wie maschinell übersetzt"',
    timestamp: "9m ago", sentiment: "negative", source: "Steam", value: "★★☆☆☆",
  },
  {
    id: "t5", type: "mention", game: "Riftbound TCG", gameId: "riftbound",
    message: "Set 2 card spoilers leaked on Reddit — 4.2K upvotes, mostly positive",
    timestamp: "14m ago", sentiment: "positive", source: "Reddit", value: "4.2K upvotes",
  },
  {
    id: "t6", type: "viral", game: "Verdant Chronicles", gameId: "verdant-chronicles",
    message: "TikTok speedrun clip — 9.4M views in 8h, #VerdantChronicles trending",
    timestamp: "21m ago", sentiment: "positive", source: "TikTok", value: "9.4M views", isViral: true,
  },
  {
    id: "t7", type: "review", game: "Iron Front: Siege", gameId: "iron-front",
    message: '"Les sous-titres ne correspondent pas aux dialogues. Traduction bâclée."',
    timestamp: "28m ago", sentiment: "negative", source: "Steam", value: "★☆☆☆☆",
  },
  {
    id: "t8", type: "ccu_spike", game: "Nexus Cards", gameId: "nexus-cards",
    message: "JP afternoon peak — 28,400 CCU, up from 19K baseline yesterday",
    timestamp: "35m ago", sentiment: "positive", source: "Steam API", value: "28.4K",
  },
];

export const SYNTHETIC_TICKER: TickerEvent[] = [
  {
    id: "s1", type: "ccu_spike", game: "Verdant Chronicles", gameId: "verdant-chronicles",
    message: "Weekend peak CCU: 42,100 — new all-time record", timestamp: "now",
    sentiment: "positive", source: "Steam API", value: "42.1K CCU",
  },
  {
    id: "s2", type: "mention", game: "Nexus Cards", gameId: "nexus-cards",
    message: "Set 3 card reveal thread: 18K Twitter mentions in 2h",
    timestamp: "now", sentiment: "positive", source: "Twitter / X", value: "18K mentions",
  },
  {
    id: "s3", type: "review_bomb", game: "Iron Front: Siege", gameId: "iron-front",
    message: "DE region review score dropped to 58% — localization thread viral on Steam forums",
    timestamp: "now", sentiment: "negative", source: "Steam", value: "58% DE rating",
  },
];

// ─── Industry Benchmarks ──────────────────────────────────────────────────────
export interface BenchmarkMetric {
  label: string; publisherValue: number; industryMedian: number;
  topQuartile: number; unit: string; genre: string; delta: number;
}
export const BENCHMARKS: BenchmarkMetric[] = [
  { label: "D1 Retention",       publisherValue: 66.4, industryMedian: 42,   topQuartile: 65,   unit: "%", genre: "TCG",    delta: 4.2 },
  { label: "D7 Retention",       publisherValue: 43.8, industryMedian: 24,   topQuartile: 42,   unit: "%", genre: "RPG",    delta: 2.1 },
  { label: "D30 Retention",      publisherValue: 32.0, industryMedian: 14,   topQuartile: 30,   unit: "%", genre: "RPG",    delta: 1.8 },
  { label: "Wishlist→Purchase",  publisherValue: 17.3, industryMedian: 10,   topQuartile: 18,   unit: "%", genre: "TCG",    delta: 1.1 },
  { label: "ARPDAU",             publisherValue: 0.74, industryMedian: 0.48, topQuartile: 0.92, unit: "$", genre: "Mixed",  delta: 0.08 },
  { label: "Refund Rate",        publisherValue: 3.70, industryMedian: 3.2,  topQuartile: 1.6,  unit: "%", genre: "FPS",    delta: 0.62 },
];

// ─── Sentiment ────────────────────────────────────────────────────────────────
export const SENTIMENT_DATA = [
  { subject: "Twitter / X", score: 74, fullMark: 100 },
  { subject: "Reddit",       score: 68, fullMark: 100 },
  { subject: "Steam",        score: 86, fullMark: 100 },
  { subject: "Discord",      score: 80, fullMark: 100 },
  { subject: "TikTok",       score: 92, fullMark: 100 },
  { subject: "YouTube",      score: 71, fullMark: 100 },
];
export const SENTIMENT_OVERALL = 79;
export const SENTIMENT_LABEL = "Bullish";
export const SENTIMENT_DELTA = 5.1;

// ─── Trigger Rules ────────────────────────────────────────────────────────────
export interface TriggerRule {
  id: string; condition: string; action: string;
  status: "active"|"pending"|"paused"; firedCount: number; lastFired: string; targetGame: string;
  firesLastWeek: number[]; // 7 daily fire counts (Mon–Sun)
}
export const TRIGGER_RULES: TriggerRule[] = [
  {
    id: "r1", condition: "RPG hours ≥ 40 AND any TCG owned = false",
    action: "Send 20% discount for Nexus Cards + Riftbound bundle",
    status: "active", firedCount: 8_420, lastFired: "2 min ago", targetGame: "RPG → TCG Funnel",
    firesLastWeek: [1180, 1240, 980, 1420, 1380, 960, 1260],
  },
  {
    id: "r2", condition: "CCU spike > 1.8x 7-day avg",
    action: "Scale server capacity + notify Community team",
    status: "active", firedCount: 42, lastFired: "just now", targetGame: "Starfield Drifters",
    firesLastWeek: [4, 6, 3, 8, 7, 5, 9],
  },
  {
    id: "r3", condition: "Refund rate > 6% in region",
    action: "Pause paid ads + flag localization team",
    status: "active", firedCount: 8, lastFired: "4 min ago", targetGame: "Iron Front (DE/FR)",
    firesLastWeek: [0, 1, 0, 2, 2, 1, 2],
  },
  {
    id: "r4", condition: "High Spender inactivity > 7 days",
    action: "Send personalised re-engagement offer with exclusive item",
    status: "active", firedCount: 1_240, lastFired: "38 min ago", targetGame: "All Titles",
    firesLastWeek: [168, 142, 198, 176, 184, 156, 216],
  },
  {
    id: "r5", condition: "TCG card reveal event live",
    action: "Auto-boost social ads budget by 40% for 48h",
    status: "pending", firedCount: 0, lastFired: "never", targetGame: "Nexus Cards / Riftbound",
    firesLastWeek: [0, 0, 0, 0, 0, 0, 0],
  },
];

// ─── Regional Revenue ─────────────────────────────────────────────────────────
export const REGIONAL_REVENUE: RegionRevenue[] = [
  { region: "North America",     code: "NA",   revenue: 2_480_000, pppAdjusted: 2_480_000, growth: 8.4,  currency: "USD",     countryIds: [840, 124], dau: 88_400 },
  { region: "Western Europe",    code: "WEU",  revenue: 1_840_000, pppAdjusted: 2_180_000, growth: 12.1, currency: "EUR",     countryIds: [276, 826, 250, 380, 724, 528, 752, 756, 40, 56, 208, 246, 620, 372, 578], dau: 64_200 },
  { region: "East Asia",         code: "EA",   revenue: 1_240_000, pppAdjusted: 2_040_000, growth: 28.6, currency: "JPY/KRW", countryIds: [156, 392, 410], dau: 42_800 },
  { region: "Southeast Asia",    code: "SEA",  revenue: 480_000,   pppAdjusted: 1_140_000, growth: 42.3, currency: "SGD/THB", countryIds: [702, 764, 360, 458, 608, 704], dau: 28_600 },
  { region: "Eastern Europe",    code: "EEU",  revenue: 340_000,   pppAdjusted: 880_000,   growth: 18.9, currency: "PLN/CZK", countryIds: [616, 203, 348, 642, 100, 703, 804], dau: 18_400 },
  { region: "Latin America",     code: "LATAM",revenue: 290_000,   pppAdjusted: 780_000,   growth: 34.8, currency: "BRL/MXN", countryIds: [76, 484, 32, 152, 170, 604], dau: 21_200 },
  { region: "South Asia",        code: "SA",   revenue: 180_000,   pppAdjusted: 640_000,   growth: 56.2, currency: "INR",     countryIds: [356, 586, 50], dau: 32_800 },
  { region: "Middle East/Africa",code: "MEA",  revenue: 210_000,   pppAdjusted: 520_000,   growth: 21.4, currency: "AED/ZAR", countryIds: [682, 784, 818, 710, 404], dau: 14_600 },
  { region: "Oceania",           code: "OCE",  revenue: 320_000,   pppAdjusted: 360_000,   growth: 6.2,  currency: "AUD",     countryIds: [36, 554], dau: 11_400 },
  { region: "Central Asia",      code: "CAS",  revenue: 80_000,    pppAdjusted: 240_000,   growth: 14.7, currency: "KZT",     countryIds: [398, 860], dau: 4_200 },
  { region: "Russia",            code: "RU",   revenue: 120_000,   pppAdjusted: 420_000,   growth: 3.2,  currency: "RUB",     countryIds: [643], dau: 8_800 },
];

// ─── Localization Sentinel ────────────────────────────────────────────────────
export interface LocalizationRegion {
  region: string; code: string; flag: string;
  reviewVolume: number; negativeRate: number;
  keywords: string[]; sampleReview: string; refundImpact: number;
}
export const LOCALIZATION_SENTINEL = {
  gameId: "iron-front",
  gameName: "Iron Front: Siege",
  totalFlaggedReviews: 2_847,
  estimatedRefundImpact: "$42,000",
  regions: [
    {
      region: "Germany", code: "DE", flag: "🇩🇪",
      reviewVolume: 1_248, negativeRate: 44,
      keywords: ["Sync-Error", "Unnatürlich", "KI-Übersetzung", "Falsche Dialekte"],
      sampleReview: '"Die Synchronisierung stimmt hinten und vorne nicht. Klingt wie billige KI-Übersetzung aus den 90ern."',
      refundImpact: 28,
    },
    {
      region: "France", code: "FR", flag: "🇫🇷",
      reviewVolume: 892, negativeRate: 36,
      keywords: ["Sous-titres incorrects", "Voix désync.", "Traduction robot", "Termes militaires faux"],
      sampleReview: '"Les sous-titres ne correspondent absolument pas aux dialogues. La traduction des termes militaires est incorrecte."',
      refundImpact: 18,
    },
    {
      region: "Brazil", code: "BR", flag: "🇧🇷",
      reviewVolume: 707, negativeRate: 29,
      keywords: ["Tradução péssima", "Dublagem artificial", "Erros de texto", "Gírias erradas"],
      sampleReview: '"A tradução parece feita por máquina. As gírias militares estão completamente erradas."',
      refundImpact: 11,
    },
  ] as LocalizationRegion[],
  recommendedActions: [
    "Engage certified military-terminology translation studio for DE/FR",
    "Pause paid ads in DACH and Francophone markets immediately",
    "Issue community update acknowledging the issue within 24h",
    "Prioritise lip-sync fix for German VA in Patch 1.8.2",
  ],
};

// ─── Portfolio Aggregates ─────────────────────────────────────────────────────
export const PORTFOLIO_TOTALS = {
  totalRevenueMTD: 7_300_000,
  revenueDelta: 12.4,
  totalDAU: 235_400,
  dauDelta: 6.8,
  totalMAU: 942_000,
  totalCCU: 92_600,
  avgRefundRate: 3.70,
  avgSteamRating: 85.0,
  totalWishlists: 1_607_000,
  publisherName: "Nexus Interactive",
  reportPeriod: "April 2026",
};
