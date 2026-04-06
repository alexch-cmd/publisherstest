"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

import AIInsightsBar from "./components/AIInsightsBar";
import DashboardHeader from "./components/DashboardHeader";
import PortfolioMap from "./components/PortfolioMap";
import LiveTicker from "./components/LiveTicker";
import GamePerformanceGrid from "./components/GamePerformanceGrid";
import IndustryBenchmark from "./components/IndustryBenchmark";
import OmniChannelPipeline from "./components/OmniChannelPipeline";
import RegionalRevenueMap from "./components/RegionalRevenueMap";

// ─── Stagger animation variants ───────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PublisherDashboard() {
  const [presentationMode, setPresentationMode] = useState(false);

  return (
    <div
      className={clsx(
        "min-h-screen bg-[#0D0D0D] px-6 py-6",
        presentationMode && "presentation-mode"
      )}
    >
      {/* Background texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 0%, rgba(241,145,250,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 0%, rgba(54,224,248,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 50% 100%, rgba(97,173,235,0.03) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid dot pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, #F3F3F3 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* ── AI Insights Bar ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <AIInsightsBar />
        </motion.div>

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <DashboardHeader
            presentationMode={presentationMode}
            onTogglePresentation={() => setPresentationMode((p) => !p)}
          />
        </motion.div>

        {/* ── Main bento grid ── */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* ── Row 1: Portfolio Map (8col) + Live Ticker (4col) ── */}
          <Section>
            <div className="grid grid-cols-12 gap-4">
              {/* Portfolio Map: 8 cols */}
              <div className="col-span-8">
                <PortfolioMap presentationMode={presentationMode} />
              </div>

              {/* Live Ticker: 4 cols */}
              <div className="col-span-4" style={{ minHeight: 420 }}>
                <LiveTicker presentationMode={presentationMode} />
              </div>
            </div>
          </Section>

          {/* ── Row 2: Game Performance Grid (full width) ── */}
          <Section>
            <GamePerformanceGrid presentationMode={presentationMode} />
          </Section>

          {/* ── Row 3: Industry Benchmark (7col) + Omni-Channel (5col) ── */}
          <Section>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7">
                <IndustryBenchmark presentationMode={presentationMode} />
              </div>
              <div className="col-span-5">
                <OmniChannelPipeline presentationMode={presentationMode} />
              </div>
            </div>
          </Section>

          {/* ── Row 4: Regional Revenue Map (full width) ── */}
          <Section>
            <RegionalRevenueMap presentationMode={presentationMode} />
          </Section>

          {/* ── Footer ── */}
          <Section>
            <div className="flex items-center justify-between px-4 py-3 rounded-xl glass-card border border-white/05">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success pulse-dot" />
                <span className="text-[10px] text-brand-4">
                  All systems operational · Data refreshed 30s ago
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-brand-4">
                  Nexus Interactive Publisher Command Center
                </span>
                <span className="text-[10px] text-brand-4/50">v2.4.0</span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded bg-white/04 border border-white/08"
                  style={{ color: "#36E0F8" }}
                >
                  BIOME Design System
                </span>
              </div>
            </div>
          </Section>
        </motion.div>
      </div>
    </div>
  );
}
