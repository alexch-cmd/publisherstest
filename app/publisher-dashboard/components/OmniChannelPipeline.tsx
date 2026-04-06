"use client";

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";
import { Radio, GitBranch, Play, Pause, CircleDot, Clock } from "lucide-react";
import {
  SENTIMENT_DATA,
  SENTIMENT_OVERALL,
  SENTIMENT_LABEL,
  SENTIMENT_DELTA,
  TRIGGER_RULES,
  type TriggerRule,
} from "@/lib/mockPublisherData";
import BentoCard from "./BentoCard";
import { clsx } from "clsx";

// ─── Sentiment Radar ──────────────────────────────────────────────────────────

function SentimentRadarChart({ presentationMode }: { presentationMode: boolean }) {
  const bullishColor = "#ABF790";
  const overallColor =
    SENTIMENT_OVERALL >= 75 ? "#ABF790" : SENTIMENT_OVERALL >= 50 ? "#FAFD7E" : "#FF637F";

  return (
    <BentoCard
      title="Sentiment Radar"
      subtitle="Real-time social pulse across channels"
      icon={<Radio />}
      accentColor="#ABF790"
      presentationMode={presentationMode}
      className="h-full"
      headerRight={
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-status-success pulse-dot" />
        </div>
      }
    >
      {/* Overall score */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="px-3 py-1 rounded-lg font-bold text-[14px] mono-num"
            style={{
              background: `${overallColor}15`,
              border: `1px solid ${overallColor}40`,
              color: overallColor,
            }}
          >
            {SENTIMENT_OVERALL}
          </div>
          <div>
            <p className="text-[12px] font-semibold text-brand-1">{SENTIMENT_LABEL}</p>
            <p className="text-[10px] text-status-success">+{SENTIMENT_DELTA}% WoW</p>
          </div>
        </div>
        {/* Bullish/bearish badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
          style={{
            background: `${bullishColor}10`,
            borderColor: `${bullishColor}30`,
          }}
        >
          <span className="text-[20px]">🐂</span>
          <div>
            <p className="text-[10px] font-bold text-status-success uppercase tracking-wider">
              Bullish
            </p>
            <p className="text-[9px] text-brand-4">Market sentiment</p>
          </div>
        </div>
      </div>

      {/* Radar chart */}
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={SENTIMENT_DATA}>
          <PolarGrid
            stroke="rgba(255,255,255,0.08)"
            gridType="polygon"
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#B6B6B6", fontSize: 10, fontFamily: "var(--font-geist-mono)" }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Sentiment"
            dataKey="score"
            stroke="#36E0F8"
            strokeWidth={1.5}
            fill="#36E0F8"
            fillOpacity={0.12}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(19,19,19,0.96)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              fontSize: 12,
              color: "#F3F3F3",
            }}
            formatter={(value) => [`${value}/100`, "Sentiment"]}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Channel scores */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        {SENTIMENT_DATA.map((d) => {
          const c = d.score >= 75 ? "#ABF790" : d.score >= 55 ? "#36E0F8" : "#FF637F";
          return (
            <div
              key={d.subject}
              className="rounded-lg bg-white/02 border border-white/06 px-2 py-1.5 text-center"
            >
              <p className="mono-num text-[12px] font-bold" style={{ color: c }}>
                {d.score}
              </p>
              <p className="text-[8px] text-brand-4 truncate">{d.subject}</p>
            </div>
          );
        })}
      </div>
    </BentoCard>
  );
}

// ─── Reward Trigger Console ───────────────────────────────────────────────────

const STATUS_CONFIG = {
  active: { color: "#ABF790", label: "Active", icon: <Play className="w-2.5 h-2.5" /> },
  pending: { color: "#FAFD7E", label: "Pending", icon: <Clock className="w-2.5 h-2.5" /> },
  paused: { color: "#B6B6B6", label: "Paused", icon: <Pause className="w-2.5 h-2.5" /> },
};

function TriggerCard({ rule }: { rule: TriggerRule }) {
  const s = STATUS_CONFIG[rule.status];
  return (
    <div className="rounded-xl border border-white/07 bg-white/02 p-3 relative overflow-hidden">
      {/* Status glow line */}
      {rule.status === "active" && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${s.color}50, transparent)` }}
        />
      )}

      {/* Condition → Action flow */}
      <div className="flex items-start gap-2 mb-2">
        {/* IF block */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#36E0F8]/15 text-[#36E0F8]">
              IF
            </span>
          </div>
          <p className="text-[10px] text-brand-3 leading-snug font-mono">{rule.condition}</p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 mt-3">
          <svg width="20" height="12" viewBox="0 0 20 12">
            <line
              x1="0" y1="6" x2="14" y2="6"
              stroke="#36E0F8" strokeWidth="1.5"
              strokeDasharray="3 2"
              className="flow-animated"
            />
            <polyline
              points="10,2 16,6 10,10"
              fill="none"
              stroke="#36E0F8"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* THEN block */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#F191FA]/15 text-[#F191FA]">
              THEN
            </span>
          </div>
          <p className="text-[10px] text-brand-3 leading-snug">{rule.action}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/05">
        <div className="flex items-center gap-1.5">
          {/* Status pill */}
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-semibold"
            style={{
              background: `${s.color}10`,
              borderColor: `${s.color}30`,
              color: s.color,
            }}
          >
            {s.icon}
            {s.label}
          </div>
          <span className="text-[9px] text-brand-4">→ {rule.targetGame}</span>
        </div>
        <div className="text-right">
          <p className="mono-num text-[10px] font-bold text-brand-1">
            {rule.firedCount.toLocaleString()}
          </p>
          <p className="text-[8px] text-brand-4">fired · {rule.lastFired}</p>
        </div>
      </div>
    </div>
  );
}

function RewardTriggerConsole({ presentationMode }: { presentationMode: boolean }) {
  const activeCount = TRIGGER_RULES.filter((r) => r.status === "active").length;

  return (
    <BentoCard
      title="Automation Pipeline"
      subtitle="Re-engagement trigger rules"
      icon={<GitBranch />}
      accentColor="#FAFD7E"
      presentationMode={presentationMode}
      className="h-full"
      headerRight={
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#ABF790]/10 border border-[#ABF790]/25">
          <CircleDot className="w-3 h-3 text-status-success" />
          <span className="text-[10px] font-semibold text-status-success mono-num">
            {activeCount} active
          </span>
        </div>
      }
    >
      <div className="space-y-2.5 overflow-y-auto max-h-[480px]" style={{ scrollbarWidth: "thin" }}>
        {TRIGGER_RULES.map((rule) => (
          <TriggerCard key={rule.id} rule={rule} />
        ))}
      </div>
    </BentoCard>
  );
}

// ─── Combined Export ──────────────────────────────────────────────────────────

interface OmniChannelPipelineProps {
  presentationMode: boolean;
}

export default function OmniChannelPipeline({ presentationMode }: OmniChannelPipelineProps) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-5">
        <SentimentRadarChart presentationMode={presentationMode} />
      </div>
      <div className="col-span-7">
        <RewardTriggerConsole presentationMode={presentationMode} />
      </div>
    </div>
  );
}
