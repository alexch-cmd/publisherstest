"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import {
  TrendingUp, TrendingDown, Zap, AlertTriangle, Lightbulb,
  ShoppingCart, Users, RotateCcw, Star, ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GAMES, type Game } from "@/lib/mockPublisherData";
import { clsx } from "clsx";
import BentoCard from "./BentoCard";

const AI_CFG = {
  opportunity: {
    icon: <Lightbulb className="w-3 h-3" />, color: "#ABF790",
    bg: "bg-[#ABF790]/10", border: "border-[#ABF790]/25", label: "AI Opportunity",
  },
  warning: {
    icon: <Zap className="w-3 h-3" />, color: "#FAFD7E",
    bg: "bg-[#FAFD7E]/10", border: "border-[#FAFD7E]/25", label: "AI Warning",
  },
  critical: {
    icon: <AlertTriangle className="w-3 h-3" />, color: "#FF637F",
    bg: "bg-[#FF637F]/10", border: "border-[#FF637F]/25", label: "AI Critical",
  },
};

// Crosshair tooltip with % change + quick action
function ChartTooltip({ active, payload, label, game }: {
  active?: boolean; payload?: Array<{ value: number }>; label?: string; game: Game;
}) {
  if (!active || !payload?.length) return null;
  const curr = payload[0].value;
  const idx = game.revenueHistory.findIndex((d) => d.date === label);
  const prev = idx > 0 ? game.revenueHistory[idx - 1].value : curr;
  const pct = prev ? ((curr - prev) / prev * 100).toFixed(1) : "0.0";

  return (
    <div className="rounded-xl border border-white/12 p-3 min-w-[150px] shadow-elevation-2"
      style={{ background: "rgba(13,13,13,0.98)", backdropFilter: "blur(16px)" }}>
      <p className="text-[9px] text-brand-4 mb-1.5 uppercase tracking-wider">{label}</p>
      <p className="mono-num text-[15px] font-bold" style={{ color: game.accentColor }}>
        ${(curr / 1000).toFixed(0)}K
      </p>
      <p className={clsx("mono-num text-[10px] font-semibold mt-0.5", Number(pct) >= 0 ? "text-status-success" : "text-status-error")}>
        {Number(pct) >= 0 ? "▲" : "▼"} {Math.abs(Number(pct))}% vs prev
      </p>
      <button
        className="mt-2 w-full text-[9px] font-bold uppercase tracking-wider px-2 py-1.5 rounded-lg border flex items-center justify-center gap-1 transition-colors"
        style={{ background: `${game.accentColor}15`, borderColor: `${game.accentColor}35`, color: game.accentColor }}
      >
        <ExternalLink className="w-2.5 h-2.5" /> Full Analytics
      </button>
    </div>
  );
}

function GameCard({
  game, presentationMode, highlighted, onSentinelOpen,
}: {
  game: Game; presentationMode: boolean; highlighted: boolean;
  onSentinelOpen?: (gameId: string) => void;
}) {
  const ai = AI_CFG[game.aiAction.type];
  const gradId = `grv-${game.id}`;

  return (
    <motion.div
      id={`game-card-${game.id}`}
      layout
      animate={highlighted ? {
        boxShadow: [`0 0 0px ${game.accentColor}00`, `0 0 32px ${game.accentColor}80`, `0 0 0px ${game.accentColor}00`],
        borderColor: [`rgba(255,255,255,0.06)`, game.accentColor, `rgba(255,255,255,0.06)`],
      } : {}}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="glass-card rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden border border-white/06"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${game.accentColor}, ${game.secondaryColor})` }} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1 mb-1">
            {/* Genre badge */}
            <span
              className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border"
              style={{ color: game.accentColor, borderColor: `${game.accentColor}40`, background: `${game.accentColor}12` }}
            >
              {game.genre}
            </span>
            {game.platform.slice(0, 2).map((p) => (
              <span key={p} className="text-[7px] font-bold uppercase tracking-widest px-1 py-0.5 rounded bg-white/05 text-brand-4">{p}</span>
            ))}
          </div>
          <h4 className="text-[12px] font-bold text-brand-1 leading-tight" style={{ letterSpacing: "-0.015em" }}>
            {game.name}
          </h4>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Star className="w-3 h-3 text-[#FAFD7E]" />
          <span className="mono-num text-[11px] font-bold text-brand-1">{game.steamRating}</span>
        </div>
      </div>

      {/* 12-month revenue sparkline */}
      <div className="h-[58px] -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={game.revenueHistory} margin={{ top: 2, right: 2, left: -40, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={game.accentColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={game.accentColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip
              cursor={{ stroke: `${game.accentColor}60`, strokeWidth: 1, strokeDasharray: "3 2" }}
              content={<ChartTooltip game={game} />}
            />
            <Area type="monotone" dataKey="value" stroke={game.accentColor} strokeWidth={1.5}
              fill={`url(#${gradId})`} dot={false} activeDot={{ r: 3, fill: game.accentColor }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { icon: <ShoppingCart className="w-2.5 h-2.5" />, label: "WL Conv.", value: `${game.wishlistConversionRate}%`, delta: game.wishlistConversionDelta, positiveGood: true },
          { icon: <Users className="w-2.5 h-2.5" />, label: "DAU/MAU", value: `${game.dauMauRatio.toFixed(1)}%`, delta: game.dauDelta, positiveGood: true },
          { icon: <RotateCcw className="w-2.5 h-2.5" />, label: "Refund", value: `${game.refundRate}%`, delta: game.refundRateDelta, positiveGood: false },
        ].map((m) => (
          <div key={m.label} className="rounded-lg bg-white/02 border border-white/05 px-2 py-1.5">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-brand-4">{m.icon}</span>
              <span className="text-[7px] text-brand-4 uppercase tracking-wider">{m.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="mono-num text-[12px] font-bold"
                style={{
                  color: m.label === "Refund"
                    ? m.delta > 1 ? "#FF637F" : m.delta > 0 ? "#FAFD7E" : "#ABF790"
                    : game.accentColor
                }}
              >
                {m.value}
              </span>
              <span className={clsx("mono-num text-[8px] font-semibold",
                (m.delta > 0) === m.positiveGood ? "text-status-success" : "text-status-error"
              )}>
                {m.delta > 0 ? "+" : ""}{m.delta}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue row */}
      <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-white/02 border border-white/05">
        <div>
          <p className="text-[8px] text-brand-4 uppercase tracking-wider mb-0.5">MTD Revenue</p>
          <span className="mono-num text-[15px] font-bold text-brand-1">
            ${(game.totalRevenueMTD / 1_000_000).toFixed(2)}M
          </span>
        </div>
        <div className="flex items-center gap-1">
          {game.revenueDelta > 0 ? <TrendingUp className="w-4 h-4 text-status-success" /> : <TrendingDown className="w-4 h-4 text-status-error" />}
          <span className={`mono-num text-[12px] font-bold ${game.revenueDelta > 0 ? "text-status-success" : "text-status-error"}`}>
            {game.revenueDelta > 0 ? "+" : ""}{game.revenueDelta}%
          </span>
        </div>
      </div>

      {/* AI Action */}
      <div className={clsx("flex items-start gap-2 rounded-xl border px-2.5 py-2.5", ai.bg, ai.border)}>
        <span style={{ color: ai.color }} className="flex-shrink-0 mt-0.5">{ai.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[8px] font-black uppercase tracking-wider mb-0.5" style={{ color: ai.color }}>{ai.label}</p>
          <p className="text-[9px] text-brand-3 leading-snug">{game.aiAction.message}</p>
        </div>
        <button
          onClick={() => game.aiAction.type === "critical" && onSentinelOpen?.(game.id)}
          className="flex-shrink-0 text-[8px] font-bold uppercase tracking-wider px-1.5 py-1 rounded-lg border whitespace-nowrap transition-colors"
          style={{ background: `${ai.color}15`, borderColor: `${ai.color}35`, color: ai.color }}
        >
          {game.aiAction.cta}
        </button>
      </div>
    </motion.div>
  );
}

interface GamePerformanceGridProps {
  presentationMode: boolean;
  highlightedGameId: string | null;
  onSentinelOpen: (gameId: string) => void;
}

export default function GamePerformanceGrid({ presentationMode, highlightedGameId, onSentinelOpen }: GamePerformanceGridProps) {
  return (
    <BentoCard
      title="Game Performance & AI Actions"
      subtitle="12-month revenue trend · Live metrics · AI signals for all titles"
      icon={<TrendingUp />}
      accentColor="#F191FA"
      presentationMode={presentationMode}
      id="section-games"
    >
      <div className="grid grid-cols-5 gap-3">
        {GAMES.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            presentationMode={presentationMode}
            highlighted={highlightedGameId === game.id}
            onSentinelOpen={onSentinelOpen}
          />
        ))}
      </div>
    </BentoCard>
  );
}
