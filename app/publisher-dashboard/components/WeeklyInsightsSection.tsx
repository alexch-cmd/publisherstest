"use client";

import { motion } from "framer-motion";
import { Zap, Lightbulb, AlertTriangle, ArrowRight } from "lucide-react";
import { GAMES } from "@/lib/mockPublisherData";
import { clsx } from "clsx";

const URGENCY_CONFIG = {
  critical: {
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    color: "#FF637F",
    bg: "rgba(255,99,127,0.08)",
    border: "rgba(255,99,127,0.25)",
    label: "Critical",
  },
  warning: {
    icon: <Zap className="w-3.5 h-3.5" />,
    color: "#FAFD7E",
    bg: "rgba(250,253,126,0.08)",
    border: "rgba(250,253,126,0.25)",
    label: "Action Needed",
  },
  opportunity: {
    icon: <Lightbulb className="w-3.5 h-3.5" />,
    color: "#ABF790",
    bg: "rgba(171,247,144,0.08)",
    border: "rgba(171,247,144,0.25)",
    label: "Opportunity",
  },
};

const GENRE_COLORS: Record<string, string> = {
  TCG: "#F191FA",
  RPG: "#FAFD7E",
  FPS: "#61ADEB",
};

export default function WeeklyInsightsSection() {
  return (
    <div
      id="section-insights"
      className="glass-card rounded-2xl border border-white/06 overflow-hidden mb-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/06">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#36E0F8]/12 border border-[#36E0F8]/25">
            <Zap className="w-3 h-3 text-[#36E0F8]" />
          </div>
          <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-brand-1">
            Weekly Pulse
          </span>
          <span className="text-[10px] text-brand-4">·  Week of Apr 7, 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-status-success pulse-dot" />
          <span className="text-[9px] uppercase tracking-wider text-status-success font-bold">Live</span>
        </div>
      </div>

      {/* Game rows */}
      <div className="divide-y divide-white/04">
        {GAMES.map((game, idx) => {
          const insight = game.weeklyInsights;
          const cfg = URGENCY_CONFIG[insight.urgency];
          const genreColor = GENRE_COLORS[game.genre];

          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="grid grid-cols-12 gap-4 px-5 py-3.5 hover:bg-white/01 transition-colors group"
            >
              {/* Game identity — 3 cols */}
              <div className="col-span-3 flex items-start gap-2.5 min-w-0">
                <div
                  className="w-1 h-full min-h-[36px] rounded-full flex-shrink-0 mt-0.5"
                  style={{ background: game.accentColor }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                    <span
                      className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        color: genreColor,
                        background: `${genreColor}15`,
                        border: `1px solid ${genreColor}30`,
                      }}
                    >
                      {game.genre}
                    </span>
                  </div>
                  <p className="text-[12px] font-semibold text-brand-1 leading-tight truncate">
                    {game.shortName}
                  </p>
                </div>
              </div>

              {/* Developments — 6 cols */}
              <div className="col-span-6 space-y-1">
                {insight.developments.map((dev, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span
                      className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: game.accentColor, opacity: 0.7 }}
                    />
                    <p className="text-[11px] text-brand-3 leading-snug">{dev}</p>
                  </div>
                ))}
              </div>

              {/* Recommendation — 3 cols */}
              <div className="col-span-3 flex items-center justify-end">
                <div
                  className="rounded-xl px-3 py-2 flex items-start gap-2 max-w-full"
                  style={{
                    background: cfg.bg,
                    border: `1px solid ${cfg.border}`,
                  }}
                >
                  <span style={{ color: cfg.color }} className="flex-shrink-0 mt-0.5">
                    {cfg.icon}
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-[8px] font-bold uppercase tracking-wider mb-0.5"
                      style={{ color: cfg.color }}
                    >
                      {cfg.label}
                    </p>
                    <p className="text-[10px] text-brand-3 leading-snug">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
