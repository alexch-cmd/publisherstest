"use client";

import { Download, Monitor, Settings, ChevronDown, Layers } from "lucide-react";
import { PORTFOLIO_TOTALS, PORTFOLIO_HEALTH, type HealthStatus } from "@/lib/mockPublisherData";
import { clsx } from "clsx";
import CommandPalette from "./CommandPalette";
import { type ActionChip } from "@/lib/mockPublisherData";

const HEALTH_COLOR: Record<HealthStatus, string> = {
  optimal: "#ABF790",
  warning: "#FAFD7E",
  critical: "#FF637F",
};

// Mesh gradient that shifts based on health — CSS animation
const MESH_STYLE: Record<HealthStatus, React.CSSProperties> = {
  optimal: {
    background: `
      radial-gradient(ellipse at 20% 50%, rgba(171,247,144,0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 20%, rgba(54,224,248,0.12) 0%, transparent 55%),
      rgba(171,247,144,0.06)
    `,
    border: "1px solid rgba(171,247,144,0.25)",
  },
  warning: {
    background: `
      radial-gradient(ellipse at 20% 50%, rgba(250,253,126,0.15) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 20%, rgba(241,145,250,0.10) 0%, transparent 55%),
      rgba(250,253,126,0.05)
    `,
    border: "1px solid rgba(250,253,126,0.22)",
  },
  critical: {
    background: `
      radial-gradient(ellipse at 20% 50%, rgba(255,99,127,0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 20%, rgba(250,253,126,0.08) 0%, transparent 55%),
      rgba(255,99,127,0.06)
    `,
    border: "1px solid rgba(255,99,127,0.25)",
  },
};

interface DashboardHeaderProps {
  presentationMode: boolean;
  onTogglePresentation: () => void;
  onNavigate: (id: string) => void;
  onHighlightGame: (gameId: string) => void;
  onChipClick: (chip: ActionChip) => void;
}

export default function DashboardHeader({
  presentationMode, onTogglePresentation, onNavigate, onHighlightGame,
}: DashboardHeaderProps) {
  const health = PORTFOLIO_HEALTH;
  const color = HEALTH_COLOR[health];
  const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${(n / 1_000).toFixed(0)}K`;

  return (
    <header className="flex flex-col gap-3 mb-5">
      <div className="flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#F191FA]/20 to-[#36E0F8]/20 border border-white/10">
            <Layers className="w-5 h-5 text-[#36E0F8]" />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-brand-1" style={{ letterSpacing: "-0.02em" }}>
              {PORTFOLIO_TOTALS.publisherName}
            </h1>
            <p className="text-[10px] text-brand-4 uppercase tracking-widest">
              Publisher Command Center — {PORTFOLIO_TOTALS.reportPeriod}
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <CommandPalette
            onNavigate={onNavigate}
            onTogglePresentation={onTogglePresentation}
            presentationMode={presentationMode}
            onHighlightGame={onHighlightGame}
          />
          <button className="flex items-center justify-center w-9 h-9 rounded-lg glass-card border border-white/08 hover:border-white/20 transition-colors">
            <Settings className="w-4 h-4 text-brand-4" />
          </button>
          <button
            onClick={onTogglePresentation}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all border",
              presentationMode
                ? "bg-[#F191FA]/15 border-[#F191FA]/40 text-[#F191FA]"
                : "glass-card border-white/10 text-brand-4 hover:text-brand-1 hover:border-white/20"
            )}
          >
            <Monitor className="w-3.5 h-3.5" />
            {presentationMode ? "Exit Deck" : "Board Deck"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold bg-gradient-to-r from-[#F191FA] to-[#83E3F0] text-[#0D0D0D] hover:opacity-90 transition-opacity">
            <Download className="w-3.5 h-3.5" />
            Export <ChevronDown className="w-3 h-3 opacity-70" />
          </button>
        </div>
      </div>

      {/* Mesh gradient health bar */}
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-700"
        style={{ ...MESH_STYLE[health], backdropFilter: "blur(12px)" }}
      >
        {/* Animated aura dot */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full animate-pulse-glow"
            style={{ background: color, opacity: 0.3, transform: "scale(2.2)" }} />
          <div className="w-2.5 h-2.5 rounded-full relative" style={{ background: color }} />
        </div>

        <span className="text-[12px] font-bold" style={{ color }}>Portfolio: {health.charAt(0).toUpperCase() + health.slice(1)}</span>

        <div className="w-px h-4 bg-white/10" />

        {/* KPI pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: "Revenue", value: fmt(PORTFOLIO_TOTALS.totalRevenueMTD), delta: `+${PORTFOLIO_TOTALS.revenueDelta}%`, ok: true },
            { label: "DAU", value: `${(PORTFOLIO_TOTALS.totalDAU / 1000).toFixed(1)}K`, delta: `+${PORTFOLIO_TOTALS.dauDelta}%`, ok: true },
            { label: "MAU", value: `${(PORTFOLIO_TOTALS.totalMAU / 1000).toFixed(0)}K`, delta: null, ok: true },
            { label: "CCU", value: `${(PORTFOLIO_TOTALS.totalCCU / 1000).toFixed(1)}K`, delta: null, ok: true },
            { label: "Avg Refund", value: `${PORTFOLIO_TOTALS.avgRefundRate}%`, delta: null, ok: false },
          ].map((kpi) => (
            <div key={kpi.label} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/04 border border-white/07">
              <span className="text-[9px] text-brand-4 uppercase tracking-wider">{kpi.label}</span>
              <span className="mono-num text-[12px] font-bold text-brand-1">{kpi.value}</span>
              {kpi.delta && (
                <span className={`mono-num text-[9px] font-bold ${kpi.ok ? "text-status-success" : "text-status-error"}`}>
                  {kpi.delta}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
