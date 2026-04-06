"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Star } from "lucide-react";
import { PORTFOLIO_TOTALS, PORTFOLIO_HEALTH, GAMES } from "@/lib/mockPublisherData";
import { clsx } from "clsx";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

// Build a portfolio-level CCU sparkline by summing all games
const portfolioCCU = GAMES[0].ccu.map((_, i) => ({
  date: GAMES[0].ccu[i].date,
  value: GAMES.reduce((sum, g) => sum + (g.ccu[i]?.value ?? 0), 0),
}));

const HEALTH_AURA = {
  optimal: { color: "#ABF790", label: "Optimal", bg: "bg-[#ABF790]/08", border: "border-[#ABF790]/25" },
  warning: { color: "#FAFD7E", label: "Warning", bg: "bg-[#FAFD7E]/08", border: "border-[#FAFD7E]/25" },
  critical: { color: "#FF637F", label: "Critical", bg: "bg-[#FF637F]/08", border: "border-[#FF637F]/25" },
};

const KPIs = [
  {
    label: "MTD Revenue",
    value: `$${(PORTFOLIO_TOTALS.totalRevenueMTD / 1_000_000).toFixed(2)}M`,
    delta: `+${PORTFOLIO_TOTALS.revenueDelta}%`,
    positive: true,
    icon: <DollarSign className="w-4 h-4" />,
    color: "#F191FA",
  },
  {
    label: "Total DAU",
    value: `${(PORTFOLIO_TOTALS.totalDAU / 1000).toFixed(1)}K`,
    delta: `+${PORTFOLIO_TOTALS.dauDelta}%`,
    positive: true,
    icon: <Users className="w-4 h-4" />,
    color: "#36E0F8",
  },
  {
    label: "Live CCU",
    value: `${(PORTFOLIO_TOTALS.totalCCU / 1000).toFixed(1)}K`,
    delta: null,
    positive: true,
    icon: <Activity className="w-4 h-4" />,
    color: "#ABF790",
  },
  {
    label: "Avg Rating",
    value: `${PORTFOLIO_TOTALS.avgSteamRating}`,
    delta: null,
    positive: true,
    icon: <Star className="w-4 h-4" />,
    color: "#FAFD7E",
  },
];

export default function ExecutiveSummary() {
  const health = HEALTH_AURA[PORTFOLIO_HEALTH];

  return (
    <div className="grid grid-cols-12 gap-4 mb-4">
      {/* ── Left: Health + KPIs ── */}
      <div className="col-span-5 flex flex-col gap-3">
        {/* Portfolio health */}
        <div className={clsx("glass-card rounded-2xl p-4 flex items-center gap-4 border", health.bg, health.border)}>
          {/* Animated aura */}
          <div className="relative flex-shrink-0">
            <div
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{ background: health.color, opacity: 0.25, transform: "scale(1.8)" }}
            />
            <div
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{ background: health.color, opacity: 0.12, transform: "scale(2.6)", animationDelay: "0.4s" }}
            />
            <div
              className="relative w-5 h-5 rounded-full"
              style={{ background: health.color, boxShadow: `0 0 16px ${health.color}80` }}
            />
          </div>
          <div>
            <p className="text-[10px] text-brand-4 uppercase tracking-widest mb-0.5">Portfolio Health</p>
            <p className="text-[20px] font-bold" style={{ color: health.color, letterSpacing: "-0.02em" }}>
              {health.label}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[11px] text-brand-4">{PORTFOLIO_TOTALS.reportPeriod}</p>
            <p className="text-[11px] text-brand-4">{PORTFOLIO_TOTALS.publisherName}</p>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-3">
          {KPIs.map((kpi) => (
            <div key={kpi.label} className="glass-card rounded-xl p-3.5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest text-brand-4">{kpi.label}</span>
                <span style={{ color: kpi.color }}>{kpi.icon}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="mono-num text-[22px] font-bold text-brand-1 leading-none" style={{ letterSpacing: "-0.02em" }}>
                  {kpi.value}
                </span>
                {kpi.delta && (
                  <span className={clsx(
                    "mono-num text-[11px] font-semibold flex items-center gap-0.5 mb-0.5",
                    kpi.positive ? "text-status-success" : "text-status-error"
                  )}>
                    {kpi.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.delta}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Center: Portfolio CCU sparkline ── */}
      <div className="col-span-4 glass-card rounded-2xl p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] text-brand-4 uppercase tracking-widest">Portfolio CCU Trend</p>
            <p className="mono-num text-[18px] font-bold text-brand-1 mt-0.5">
              {(PORTFOLIO_TOTALS.totalCCU / 1000).toFixed(1)}K <span className="text-[12px] text-status-success font-normal">peak today</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-status-success pulse-dot" />
            <span className="text-[9px] text-status-success uppercase tracking-wider font-bold">Live</span>
          </div>
        </div>
        <div className="flex-1 min-h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioCCU} margin={{ top: 4, right: 4, bottom: 0, left: -32 }}>
              <defs>
                <linearGradient id="execGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#36E0F8" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#36E0F8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: "#B6B6B6", fontSize: 9, fontFamily: "var(--font-geist-mono,monospace)" }} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ stroke: "rgba(54,224,248,0.4)", strokeWidth: 1, strokeDasharray: "3 2" }}
                contentStyle={{ background: "rgba(19,19,19,0.96)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 11 }}
                formatter={(v) => [`${Number(v).toLocaleString()} CCU`, "Portfolio"]}
              />
              <Area type="monotone" dataKey="value" stroke="#36E0F8" strokeWidth={2} fill="url(#execGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Right: Genre breakdown (computed from GAMES data) ── */}
      <div className="col-span-3 glass-card rounded-2xl p-4 flex flex-col gap-3">
        <p className="text-[10px] text-brand-4 uppercase tracking-widest">Revenue by Genre</p>
        {(() => {
          const genreTotals: Record<string, { rev: number; color: string }> = {};
          GAMES.forEach((g) => {
            if (!genreTotals[g.genre]) genreTotals[g.genre] = { rev: 0, color: g.accentColor };
            genreTotals[g.genre].rev += g.totalRevenueMTD;
          });
          const total = Object.values(genreTotals).reduce((s, v) => s + v.rev, 0);
          return Object.entries(genreTotals).map(([genre, { rev, color }]) => ({
            genre, pct: Math.round((rev / total) * 100), color, rev,
          }));
        })().map((g) => (
          <div key={g.genre} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                  style={{ color: g.color, background: `${g.color}15`, border: `1px solid ${g.color}30` }}
                >
                  {g.genre}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="mono-num text-[11px] text-brand-3">${(g.rev / 1_000_000).toFixed(2)}M</span>
                <span className="mono-num text-[11px] font-bold" style={{ color: g.color }}>{g.pct}%</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/06">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${g.color}80, ${g.color})` }}
                initial={{ width: 0 }}
                animate={{ width: `${g.pct}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}

        {/* Cross-sell arrow */}
        <div className="mt-auto pt-3 border-t border-white/05">
          <p className="text-[9px] text-brand-4 mb-1.5">Active Cross-Sell Funnel</p>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="font-semibold" style={{ color: "#FAFD7E" }}>RPG</span>
            <span className="text-[#36E0F8]">→</span>
            <span className="font-semibold" style={{ color: "#F191FA" }}>TCG</span>
            <span className="mono-num ml-auto text-status-success font-bold">8.4K fired</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] mt-1">
            <span className="font-semibold" style={{ color: "#61ADEB" }}>FPS</span>
            <span className="text-brand-4">⊘</span>
            <span className="text-brand-4 font-semibold">TCG</span>
            <span className="mono-num ml-auto text-brand-4">isolated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
