"use client";

import { Zap, CheckCircle, Clock, PauseCircle, TrendingUp, Activity } from "lucide-react";
import { TRIGGER_RULES, type TriggerRule } from "@/lib/mockPublisherData";
import BentoCard from "./BentoCard";
import { clsx } from "clsx";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CFG = {
  active: {
    icon: <CheckCircle className="w-3 h-3" />,
    color: "#ABF790", bg: "rgba(171,247,144,0.12)", border: "rgba(171,247,144,0.30)",
    label: "Active",
  },
  pending: {
    icon: <Clock className="w-3 h-3" />,
    color: "#FAFD7E", bg: "rgba(250,253,126,0.12)", border: "rgba(250,253,126,0.30)",
    label: "Pending Review",
  },
  paused: {
    icon: <PauseCircle className="w-3 h-3" />,
    color: "#B6B6B6", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)",
    label: "Paused",
  },
};

// ── Syntax colour for condition tokens ───────────────────────────────────────
function ConditionCode({ text }: { text: string }) {
  // Colourize keywords and values
  const parts = text.split(/(\b(?:AND|OR|NOT|IF|THEN|any|all)\b|[≥≤><]=?|→|\d+[\w%]*)/g);
  return (
    <code className="text-[10px] leading-relaxed font-mono block bg-white/03 rounded-lg px-3 py-2 border border-white/06 whitespace-normal break-words">
      {parts.map((part, i) => {
        if (/^(AND|OR|NOT|IF|THEN|any|all)$/.test(part))
          return <span key={i} style={{ color: "#36E0F8", fontWeight: 700 }}>{part}</span>;
        if (/^[≥≤><]=?$/.test(part) || part === "→")
          return <span key={i} style={{ color: "#F191FA", fontWeight: 700 }}>{part}</span>;
        if (/^\d+[\w%]*$/.test(part))
          return <span key={i} style={{ color: "#FAFD7E" }}>{part}</span>;
        return <span key={i} className="text-brand-3">{part}</span>;
      })}
    </code>
  );
}

// ── Sparkbar (7 daily fire counts) ───────────────────────────────────────────
function Sparkbar({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-0.5 h-5">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-2 rounded-sm flex-shrink-0"
          style={{
            height: `${Math.max(15, Math.round((v / max) * 100))}%`,
            background: `${color}${v === 0 ? "20" : "80"}`,
            border: `1px solid ${color}40`,
          }}
        />
      ))}
    </div>
  );
}

// ── Single trigger rule card ──────────────────────────────────────────────────
function TriggerCard({ rule }: { rule: TriggerRule }) {
  const cfg = STATUS_CFG[rule.status];

  return (
    <div className="relative rounded-xl border border-white/06 bg-white/01 p-4 hover:bg-white/02 transition-colors">
      {/* Active indicator bar */}
      {rule.status === "active" && (
        <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-[#ABF790]/60" />
      )}

      <div className="grid grid-cols-12 gap-4 items-start">
        {/* IF condition — 4 cols */}
        <div className="col-span-4">
          <p className="text-[8px] font-bold text-brand-4 uppercase tracking-wider mb-1.5">IF</p>
          <ConditionCode text={rule.condition} />
        </div>

        {/* Arrow — 1 col */}
        <div className="col-span-1 flex items-center justify-center pt-6">
          <div className="flex flex-col items-center gap-1">
            <svg width="28" height="14" viewBox="0 0 28 14">
              <path
                d="M2 7 H24 M18 2 L24 7 L18 12"
                stroke="#36E0F8"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="3 2"
                className="flow-animated"
              />
            </svg>
          </div>
        </div>

        {/* THEN action — 4 cols */}
        <div className="col-span-4">
          <p className="text-[8px] font-bold text-brand-4 uppercase tracking-wider mb-1.5">THEN</p>
          <p className="text-[10px] text-brand-2 leading-snug">{rule.action}</p>
        </div>

        {/* Stats — 3 cols */}
        <div className="col-span-3 flex flex-col gap-2">
          {/* Status + target */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="flex items-center gap-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full border"
              style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
            >
              {cfg.icon}
              {cfg.label}
            </span>
          </div>
          <p className="text-[8px] text-brand-4 truncate">{rule.targetGame}</p>

          {/* Fire stats */}
          <div className="flex items-baseline gap-1.5">
            <span className="mono-num text-[11px] font-bold text-brand-1">
              {rule.firedCount.toLocaleString()}
            </span>
            <span className="text-[8px] text-brand-4">fires total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-2.5 h-2.5 text-brand-4" />
            <span className="text-[8px] text-brand-4">Last: {rule.lastFired}</span>
          </div>

          {/* 7-day sparkbar */}
          <div>
            <p className="text-[7px] text-brand-4 mb-1">7-day activity</p>
            <Sparkbar data={rule.firesLastWeek} color={cfg.color} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Pending review callout ────────────────────────────────────────────────────
function PendingCallout({ rules }: { rules: TriggerRule[] }) {
  if (!rules.length) return null;
  return (
    <div className="mt-3 rounded-xl border border-[#FAFD7E]/20 bg-[#FAFD7E]/05 p-3.5 flex items-start gap-3">
      <Clock className="w-4 h-4 text-[#FAFD7E] flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-[10px] font-bold text-[#FAFD7E] mb-1">
          {rules.length} rule{rules.length > 1 ? "s" : ""} pending review before activation
        </p>
        {rules.map((r) => (
          <p key={r.id} className="text-[9px] text-brand-4 mt-0.5">
            <span className="font-mono text-brand-3">{r.targetGame}</span> — {r.condition}
          </p>
        ))}
        <button className="mt-2 text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-[#FAFD7E]/30 bg-[#FAFD7E]/10 text-[#FAFD7E] hover:bg-[#FAFD7E]/15 transition-colors">
          Review &amp; Activate
        </button>
      </div>
    </div>
  );
}

interface OmniChannelPipelineProps {
  presentationMode: boolean;
}

export default function OmniChannelPipeline({ presentationMode }: OmniChannelPipelineProps) {
  const active = TRIGGER_RULES.filter((r) => r.status === "active");
  const pending = TRIGGER_RULES.filter((r) => r.status === "pending");
  const totalFiredToday = active.reduce((s, r) => s + r.firesLastWeek[r.firesLastWeek.length - 1], 0);

  return (
    <BentoCard
      title="Automation Pipeline"
      subtitle="Trigger-based re-engagement and ops rules · real-time execution"
      icon={<Zap />}
      accentColor="#FAFD7E"
      presentationMode={presentationMode}
      id="section-automation"
      headerRight={
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ABF790]/10 border border-[#ABF790]/25">
            <CheckCircle className="w-3 h-3 text-[#ABF790]" />
            <span className="text-[9px] font-bold text-[#ABF790]">{active.length} active</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/04 border border-white/10">
            <TrendingUp className="w-3 h-3 text-brand-4" />
            <span className="text-[9px] text-brand-4">{totalFiredToday.toLocaleString()} fires today</span>
          </div>
          {pending.length > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAFD7E]/10 border border-[#FAFD7E]/25">
              <Clock className="w-3 h-3 text-[#FAFD7E]" />
              <span className="text-[9px] font-bold text-[#FAFD7E]">{pending.length} pending</span>
            </div>
          )}
        </div>
      }
    >
      {/* Column headers */}
      <div className="grid grid-cols-12 gap-4 px-4 mb-2">
        <div className="col-span-4 text-[8px] font-bold text-brand-4 uppercase tracking-widest">Condition</div>
        <div className="col-span-1" />
        <div className="col-span-4 text-[8px] font-bold text-brand-4 uppercase tracking-widest">Action</div>
        <div className="col-span-3 text-[8px] font-bold text-brand-4 uppercase tracking-widest">Stats</div>
      </div>

      {/* Active rules */}
      <div className="space-y-2">
        {TRIGGER_RULES.filter((r) => r.status !== "pending").map((rule) => (
          <TriggerCard key={rule.id} rule={rule} />
        ))}
      </div>

      {/* Pending review section */}
      <PendingCallout rules={pending} />
    </BentoCard>
  );
}
