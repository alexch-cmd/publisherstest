"use client";

import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TrendingUp, TrendingDown, Zap, AlertTriangle, Lightbulb,
  ShoppingCart, Users, RotateCcw, Star,
} from "lucide-react";
import { GAMES, type Game } from "@/lib/mockPublisherData";
import { clsx } from "clsx";
import BentoCard from "./BentoCard";

const AI_TYPE_CONFIG = {
  opportunity: {
    icon: <Lightbulb className="w-3 h-3" />,
    color: "#ABF790",
    bg: "bg-[#ABF790]/10",
    border: "border-[#ABF790]/25",
    label: "AI Opportunity",
  },
  warning: {
    icon: <Zap className="w-3 h-3" />,
    color: "#FAFD7E",
    bg: "bg-[#FAFD7E]/10",
    border: "border-[#FAFD7E]/25",
    label: "AI Warning",
  },
  critical: {
    icon: <AlertTriangle className="w-3 h-3" />,
    color: "#FF637F",
    bg: "bg-[#FF637F]/10",
    border: "border-[#FF637F]/25",
    label: "AI Critical",
  },
};

function CustomTooltip({ active, payload, label, game }: {
  active?: boolean; payload?: Array<{ value: number }>; label?: string; game: Game;
}) {
  if (!active || !payload?.length) return null;
  const current = payload[0].value;
  const prev = game.ccu.find((_, i) => game.ccu[i]?.date === label)
    ? game.ccu.find((d) => d.date === label)?.value ?? current
    : current;
  const pct = Math.round(((current - prev) / (prev || 1)) * 100);

  return (
    <div className="rounded-xl border border-white/12 bg-[#131313]/96 p-3 shadow-elevation-2 min-w-[140px]">
      <p className="text-[10px] text-brand-4 mb-1">{label}</p>
      <p className="mono-num text-[15px] font-bold" style={{ color: game.accentColor }}>
        {current.toLocaleString()}
      </p>
      <p className="text-[10px] text-brand-4 mt-0.5">CCU</p>
      {/* Quick action */}
      <button
        className="mt-2 w-full text-[9px] font-semibold uppercase tracking-wider px-2 py-1.5 rounded-lg border transition-colors"
        style={{
          background: `${game.accentColor}18`,
          borderColor: `${game.accentColor}35`,
          color: game.accentColor,
        }}
      >
        → View Full Analytics
      </button>
    </div>
  );
}

function GameCard({ game, presentationMode }: { game: Game; presentationMode: boolean }) {
  const ai = AI_TYPE_CONFIG[game.aiAction.type];
  const isPositiveRevenue = game.revenueDelta > 0;

  const gradientId = `grad-${game.id}`;

  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-70"
        style={{ background: `linear-gradient(90deg, ${game.accentColor}, ${game.secondaryColor})` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            {game.platform.map((p) => (
              <span
                key={p}
                className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/05 text-brand-4"
              >
                {p}
              </span>
            ))}
          </div>
          <h4
            className="text-[13px] font-bold text-brand-1 leading-tight"
            style={{ letterSpacing: "-0.015em" }}
          >
            {game.name}
          </h4>
          <p className="text-[10px] text-brand-4 mt-0.5">{game.genre}</p>
        </div>
        {/* Steam rating badge */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Star className="w-3 h-3 text-[#FAFD7E]" />
          <span className="mono-num text-[12px] font-bold text-brand-1">{game.steamRating}</span>
          <span className="text-[10px] text-brand-4">/100</span>
        </div>
      </div>

      {/* Mini CCU chart */}
      <div className="h-[60px] -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={game.ccu} margin={{ top: 2, right: 2, left: -40, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={game.accentColor} stopOpacity={0.4} />
                <stop offset="60%" stopColor={game.accentColor} stopOpacity={0.1} />
                <stop offset="100%" stopColor={game.accentColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip content={<CustomTooltip game={game} />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={game.accentColor}
              strokeWidth={1.5}
              fill={`url(#${gradientId})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-3 gap-2">
        {/* Wishlist Conversion */}
        <div className="rounded-lg bg-white/02 border border-white/05 px-2.5 py-2">
          <div className="flex items-center gap-1 mb-0.5">
            <ShoppingCart className="w-2.5 h-2.5 text-brand-4" />
            <span className="text-[8px] text-brand-4 uppercase tracking-wider">WL Conv.</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="mono-num text-[14px] font-bold" style={{ color: game.accentColor }}>
              {game.wishlistConversionRate}%
            </span>
            <span
              className={clsx(
                "mono-num text-[9px] font-semibold",
                game.wishlistConversionDelta > 0 ? "text-status-success" : "text-status-error"
              )}
            >
              {game.wishlistConversionDelta > 0 ? "+" : ""}{game.wishlistConversionDelta}%
            </span>
          </div>
        </div>

        {/* DAU/MAU */}
        <div className="rounded-lg bg-white/02 border border-white/05 px-2.5 py-2">
          <div className="flex items-center gap-1 mb-0.5">
            <Users className="w-2.5 h-2.5 text-brand-4" />
            <span className="text-[8px] text-brand-4 uppercase tracking-wider">DAU/MAU</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="mono-num text-[14px] font-bold" style={{ color: game.accentColor }}>
              {game.dauMauRatio.toFixed(1)}%
            </span>
            <span
              className={clsx(
                "mono-num text-[9px] font-semibold",
                game.dauDelta > 0 ? "text-status-success" : "text-status-error"
              )}
            >
              {game.dauDelta > 0 ? "+" : ""}{game.dauDelta}%
            </span>
          </div>
        </div>

        {/* Refund Rate */}
        <div className="rounded-lg bg-white/02 border border-white/05 px-2.5 py-2">
          <div className="flex items-center gap-1 mb-0.5">
            <RotateCcw className="w-2.5 h-2.5 text-brand-4" />
            <span className="text-[8px] text-brand-4 uppercase tracking-wider">Refund</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className={clsx(
                "mono-num text-[14px] font-bold",
                game.refundRate > 5 ? "text-status-error" : game.refundRate > 3 ? "text-status-warning" : "text-status-success"
              )}
            >
              {game.refundRate}%
            </span>
            <span
              className={clsx(
                "mono-num text-[9px] font-semibold",
                game.refundRateDelta < 0 ? "text-status-success" : "text-status-error"
              )}
            >
              {game.refundRateDelta > 0 ? "+" : ""}{game.refundRateDelta}%
            </span>
          </div>
        </div>
      </div>

      {/* Revenue + trend */}
      <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-white/02 border border-white/05">
        <div>
          <p className="text-[9px] text-brand-4 uppercase tracking-wider mb-0.5">MTD Revenue</p>
          <span className="mono-num text-[16px] font-bold text-brand-1">
            ${(game.totalRevenueMTD / 1_000_000).toFixed(2)}M
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isPositiveRevenue ? (
            <TrendingUp className="w-4 h-4 text-status-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-status-error" />
          )}
          <span
            className={clsx(
              "mono-num text-[13px] font-bold",
              isPositiveRevenue ? "text-status-success" : "text-status-error"
            )}
          >
            {isPositiveRevenue ? "+" : ""}{game.revenueDelta}%
          </span>
        </div>
      </div>

      {/* AI Action badge */}
      <div
        className={clsx(
          "flex items-start gap-2 rounded-xl border px-3 py-2.5",
          ai.bg, ai.border
        )}
      >
        <span style={{ color: ai.color }} className="flex-shrink-0 mt-0.5">
          {ai.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: ai.color }}>
            {ai.label}
          </p>
          <p className="text-[10px] text-brand-3 leading-snug">{game.aiAction.message}</p>
        </div>
        <button
          className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border whitespace-nowrap"
          style={{
            background: `${ai.color}15`,
            borderColor: `${ai.color}35`,
            color: ai.color,
          }}
        >
          {game.aiAction.cta}
        </button>
      </div>
    </div>
  );
}

interface GamePerformanceGridProps {
  presentationMode: boolean;
}

export default function GamePerformanceGrid({ presentationMode }: GamePerformanceGridProps) {
  return (
    <BentoCard
      title="Game Performance & AI Actions"
      subtitle="Live metrics for all portfolio titles"
      icon={<TrendingUp />}
      accentColor="#F191FA"
      presentationMode={presentationMode}
    >
      <div className="grid grid-cols-5 gap-3">
        {GAMES.map((game) => (
          <GameCard key={game.id} game={game} presentationMode={presentationMode} />
        ))}
      </div>
    </BentoCard>
  );
}
