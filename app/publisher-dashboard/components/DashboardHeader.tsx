"use client";

import { useState } from "react";
import { Download, Monitor, Bell, Settings, ChevronDown, Layers } from "lucide-react";
import { PORTFOLIO_TOTALS, PORTFOLIO_HEALTH, type HealthStatus } from "@/lib/mockPublisherData";
import { clsx } from "clsx";

const HEALTH_CONFIG: Record<
  HealthStatus,
  { label: string; color: string; glowClass: string; pulse: string; bg: string }
> = {
  optimal: {
    label: "Optimal",
    color: "#ABF790",
    glowClass: "shadow-glow-green",
    pulse: "bg-status-success",
    bg: "bg-[#ABF790]/10 border-[#ABF790]/30",
  },
  warning: {
    label: "Warning",
    color: "#FAFD7E",
    glowClass: "shadow-glow-amber",
    pulse: "bg-status-warning",
    bg: "bg-[#FAFD7E]/10 border-[#FAFD7E]/30",
  },
  critical: {
    label: "Critical",
    color: "#FF637F",
    glowClass: "shadow-glow-red",
    pulse: "bg-status-error",
    bg: "bg-[#FF637F]/10 border-[#FF637F]/30",
  },
};

interface DashboardHeaderProps {
  presentationMode: boolean;
  onTogglePresentation: () => void;
}

export default function DashboardHeader({
  presentationMode,
  onTogglePresentation,
}: DashboardHeaderProps) {
  const health = HEALTH_CONFIG[PORTFOLIO_HEALTH];
  const [notifOpen, setNotifOpen] = useState(false);

  const fmt = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(2)}M`
      : `$${(n / 1_000).toFixed(0)}K`;

  return (
    <header className="flex flex-col gap-4 mb-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        {/* Brand + title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#F191FA]/20 to-[#36E0F8]/20 border border-white/10">
            <Layers className="w-5 h-5 text-[#36E0F8]" />
          </div>
          <div>
            <h1
              className="text-xl font-bold tracking-tight text-brand-1"
              style={{ letterSpacing: "-0.02em" }}
            >
              {PORTFOLIO_TOTALS.publisherName}
            </h1>
            <p className="text-[11px] text-brand-4 uppercase tracking-widest">
              Publisher Command Center — {PORTFOLIO_TOTALS.reportPeriod}
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg glass-card border border-white/08 hover:border-[#36E0F8]/40 transition-colors"
          >
            <Bell className="w-4 h-4 text-brand-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF637F] rounded-full" />
          </button>

          {/* Settings */}
          <button className="flex items-center justify-center w-9 h-9 rounded-lg glass-card border border-white/08 hover:border-white/20 transition-colors">
            <Settings className="w-4 h-4 text-brand-4" />
          </button>

          {/* Presentation mode */}
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
            {presentationMode ? "Exit Deck Mode" : "Board Deck"}
          </button>

          {/* Export button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold bg-gradient-to-r from-[#F191FA] to-[#83E3F0] text-[#0D0D0D] hover:opacity-90 transition-opacity">
            <Download className="w-3.5 h-3.5" />
            Export
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>
        </div>
      </div>

      {/* KPI strip + Master Pulse */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Master Pulse */}
        <div
          className={clsx(
            "flex items-center gap-2.5 px-4 py-2 rounded-xl border text-[13px] font-semibold",
            health.bg
          )}
        >
          {/* Aura glow dot */}
          <div className="relative flex items-center justify-center">
            <span
              className={clsx(
                "absolute w-4 h-4 rounded-full opacity-40 animate-pulse-glow",
                health.pulse
              )}
            />
            <span
              className={clsx("w-2.5 h-2.5 rounded-full", health.pulse)}
            />
          </div>
          <span style={{ color: health.color }}>
            Portfolio: {health.label}
          </span>
        </div>

        {/* KPI pills */}
        {[
          {
            label: "MTD Revenue",
            value: fmt(PORTFOLIO_TOTALS.totalRevenueMTD),
            delta: `+${PORTFOLIO_TOTALS.revenueDelta}%`,
            positive: true,
          },
          {
            label: "Total DAU",
            value: (PORTFOLIO_TOTALS.totalDAU / 1000).toFixed(1) + "K",
            delta: `+${PORTFOLIO_TOTALS.dauDelta}%`,
            positive: true,
          },
          {
            label: "MAU",
            value: (PORTFOLIO_TOTALS.totalMAU / 1000).toFixed(0) + "K",
            delta: null,
            positive: true,
          },
          {
            label: "Live CCU",
            value: (PORTFOLIO_TOTALS.totalCCU / 1000).toFixed(1) + "K",
            delta: null,
            positive: true,
          },
          {
            label: "Avg Refund",
            value: PORTFOLIO_TOTALS.avgRefundRate + "%",
            delta: null,
            positive: false,
          },
          {
            label: "Avg Rating",
            value: PORTFOLIO_TOTALS.avgSteamRating + "/100",
            delta: null,
            positive: true,
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg glass-card border border-white/08"
          >
            <span className="text-[10px] text-brand-4 uppercase tracking-wider">
              {kpi.label}
            </span>
            <span className="mono-num text-[13px] font-bold text-brand-1">
              {kpi.value}
            </span>
            {kpi.delta && (
              <span
                className={clsx(
                  "mono-num text-[10px] font-semibold",
                  kpi.positive ? "text-status-success" : "text-status-error"
                )}
              >
                {kpi.delta}
              </span>
            )}
          </div>
        ))}
      </div>
    </header>
  );
}
