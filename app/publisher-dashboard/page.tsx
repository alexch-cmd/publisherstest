"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { type ActionChip } from "@/lib/mockPublisherData";

import AIInsightsBar from "./components/AIInsightsBar";
import DashboardHeader from "./components/DashboardHeader";
import ExecutiveSummary from "./components/ExecutiveSummary";
import WeeklyInsightsSection from "./components/WeeklyInsightsSection";
import PortfolioMap from "./components/PortfolioMap";
import LiveTicker from "./components/LiveTicker";
import GamePerformanceGrid from "./components/GamePerformanceGrid";
import IndustryBenchmark from "./components/IndustryBenchmark";
import OmniChannelPipeline from "./components/OmniChannelPipeline";
import RegionalRevenueMap from "./components/RegionalRevenueMap";
import LocalizationSentinel from "./components/LocalizationSentinel";

// ─── Scroll-reveal section wrapper ───────────────────────────────────────────

function RevealSection({
  children,
  className,
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PublisherDashboard() {
  const [presentationMode, setPresentationMode] = useState(false);
  const [highlightedGameId, setHighlightedGameId] = useState<string | null>(null);
  const [sentinelOpen, setSentinelOpen] = useState(false);

  // Highlight a game card: scroll to it, pulse it for 2.5 s
  const handleChipClick = useCallback((chip: ActionChip) => {
    // Scroll to the games section
    const gamesSection = document.getElementById("section-games");
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // After scroll settles, highlight the specific card
    setHighlightedGameId(chip.gameId);
    setTimeout(() => setHighlightedGameId(null), 2500);
  }, []);

  const handleHighlightGame = useCallback((gameId: string) => {
    const card = document.getElementById(`game-card-${gameId}`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setHighlightedGameId(gameId);
    setTimeout(() => setHighlightedGameId(null), 2500);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSentinelOpen = useCallback((gameId: string) => {
    setSentinelOpen(true);
  }, []);

  return (
    <div
      className={clsx(
        "min-h-screen bg-[#0D0D0D] px-6 py-6",
        presentationMode && "presentation-mode"
      )}
    >
      {/* Background ambient gradients */}
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

      {/* Dot grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, #F3F3F3 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto">

        {/* ── AI Insights Bar (above fold, always visible) ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <AIInsightsBar onChipClick={handleChipClick} />
        </motion.div>

        {/* ── Dashboard Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <DashboardHeader
            presentationMode={presentationMode}
            onTogglePresentation={() => setPresentationMode((p) => !p)}
            onNavigate={handleNavigate}
            onHighlightGame={handleHighlightGame}
            onChipClick={handleChipClick}
          />
        </motion.div>

        {/* ── Executive Summary (above fold, instant reveal) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <ExecutiveSummary />
        </motion.div>

        {/* ── Weekly Pulse Insights (above fold anchor) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          <WeeklyInsightsSection />
        </motion.div>

        {/* ── Live Ticker (above fold) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mb-4"
          id="section-ticker"
        >
          <LiveTicker presentationMode={presentationMode} />
        </motion.div>

        {/* ═══════════════════════════════════════════════════
            Scroll-revealed sections below the fold
        ═══════════════════════════════════════════════════ */}

        {/* ── Audience Flow + Whale Heatmap ── */}
        <RevealSection id="section-audience" className="mb-4">
          <PortfolioMap presentationMode={presentationMode} />
        </RevealSection>

        {/* ── Game Performance Grid ── */}
        <RevealSection id="section-games" className="mb-4" delay={0.04}>
          <GamePerformanceGrid
            presentationMode={presentationMode}
            highlightedGameId={highlightedGameId}
            onSentinelOpen={handleSentinelOpen}
          />
        </RevealSection>

        {/* ── Industry Benchmark ── */}
        <RevealSection id="section-benchmarks" className="mb-4" delay={0.04}>
          <IndustryBenchmark presentationMode={presentationMode} />
        </RevealSection>

        {/* ── Automation Pipeline (full-width) ── */}
        <RevealSection className="mb-4" delay={0.04}>
          <OmniChannelPipeline presentationMode={presentationMode} />
        </RevealSection>

        {/* ── Global Revenue Heatmap ── */}
        <RevealSection className="mb-4" delay={0.04}>
          <RegionalRevenueMap presentationMode={presentationMode} />
        </RevealSection>

        {/* ── Footer ── */}
        <RevealSection>
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
        </RevealSection>
      </div>

      {/* ── Localization Sentinel slide-over ── */}
      <LocalizationSentinel open={sentinelOpen} onClose={() => setSentinelOpen(false)} />
    </div>
  );
}
