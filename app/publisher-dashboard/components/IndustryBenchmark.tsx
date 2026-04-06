"use client";

import { BarChart2, TrendingUp, TrendingDown } from "lucide-react";
import { BENCHMARKS } from "@/lib/mockPublisherData";
import BentoCard from "./BentoCard";
import { clsx } from "clsx";

// Custom Bullet Graph component
function BulletGraph({
  label,
  publisherValue,
  industryMedian,
  topQuartile,
  unit,
  genre,
  delta,
  maxValue,
}: {
  label: string;
  publisherValue: number;
  industryMedian: number;
  topQuartile: number;
  unit: string;
  genre: string;
  delta: number;
  maxValue: number;
}) {
  const isLowerBetter = label === "Refund Rate";
  const pctPublisher = Math.min((publisherValue / maxValue) * 100, 100);
  const pctMedian = Math.min((industryMedian / maxValue) * 100, 100);
  const pctTopQ = Math.min((topQuartile / maxValue) * 100, 100);

  // Beat industry median?
  const beatMedian = isLowerBetter
    ? publisherValue <= industryMedian
    : publisherValue >= industryMedian;

  const beatTopQ = isLowerBetter
    ? publisherValue <= topQuartile
    : publisherValue >= topQuartile;

  const barColor = beatTopQ
    ? "#ABF790"
    : beatMedian
    ? "#36E0F8"
    : "#FF637F";

  const formatVal = (v: number) =>
    unit === "$" ? `$${v.toFixed(2)}` : `${v}${unit}`;

  return (
    <div className="space-y-2">
      {/* Header row */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-[12px] font-semibold text-brand-1">{label}</span>
          <span
            className="ml-2 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ background: "#F191FA18", color: "#F191FA" }}
          >
            {genre}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="mono-num text-[14px] font-bold" style={{ color: barColor }}>
            {formatVal(publisherValue)}
          </span>
          <span
            className={clsx(
              "mono-num text-[10px] font-semibold flex items-center gap-0.5",
              delta > 0 === !isLowerBetter ? "text-status-success" : "text-status-error"
            )}
          >
            {delta > 0 ? (
              <TrendingUp className="w-2.5 h-2.5" />
            ) : (
              <TrendingDown className="w-2.5 h-2.5" />
            )}
            {delta > 0 ? "+" : ""}{delta}{unit}
          </span>
        </div>
      </div>

      {/* Bullet graph track */}
      <div className="relative h-5 rounded-lg overflow-hidden bg-white/04 border border-white/06">
        {/* Qualitative background ranges */}
        {/* Poor zone: 0 → median */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${pctMedian}%`,
            background: isLowerBetter
              ? "rgba(171,247,144,0.08)"
              : "rgba(255,99,127,0.1)",
          }}
        />
        {/* Satisfactory zone: median → top quartile */}
        <div
          className="absolute top-0 h-full"
          style={{
            left: `${Math.min(pctMedian, pctTopQ)}%`,
            width: `${Math.abs(pctTopQ - pctMedian)}%`,
            background: "rgba(54,224,248,0.1)",
          }}
        />
        {/* Good zone: top quartile → max */}
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            left: `${pctTopQ}%`,
            right: 0,
            background: isLowerBetter
              ? "rgba(255,99,127,0.06)"
              : "rgba(171,247,144,0.08)",
          }}
        />

        {/* Publisher performance bar */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2.5 rounded-full transition-all duration-700"
          style={{
            width: `${pctPublisher}%`,
            background: `linear-gradient(90deg, ${barColor}90, ${barColor})`,
            boxShadow: `0 0 8px ${barColor}60`,
          }}
        />

        {/* Industry median marker */}
        <div
          className="absolute top-0.5 bottom-0.5 w-0.5 rounded-full bg-[#B6B6B6]/60"
          style={{ left: `${pctMedian}%` }}
        />

        {/* Top quartile marker */}
        <div
          className="absolute top-0.5 bottom-0.5 w-0.5 rounded-full"
          style={{
            left: `${pctTopQ}%`,
            background: "#36E0F8",
            boxShadow: "0 0 4px #36E0F860",
          }}
        />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="w-4 h-1 rounded-full bg-[#B6B6B6]/50" />
          <span className="text-[9px] text-brand-4">Median: {formatVal(industryMedian)}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-1 rounded-full bg-[#36E0F8]" />
          <span className="text-[9px] text-brand-4">Top 25%: {formatVal(topQuartile)}</span>
        </div>
        <div className="ml-auto">
          {beatTopQ ? (
            <span className="text-[9px] font-bold text-status-success">▲ Top Quartile</span>
          ) : beatMedian ? (
            <span className="text-[9px] font-bold text-status-info">● Above Median</span>
          ) : (
            <span className="text-[9px] font-bold text-status-error">▼ Below Median</span>
          )}
        </div>
      </div>
    </div>
  );
}

interface IndustryBenchmarkProps {
  presentationMode: boolean;
}

export default function IndustryBenchmark({ presentationMode }: IndustryBenchmarkProps) {
  // Compute max values per metric for bullet graph scale
  const getMax = (label: string) => {
    const b = BENCHMARKS.find((x) => x.label === label);
    if (!b) return 100;
    return Math.max(b.publisherValue, b.industryMedian, b.topQuartile) * 1.3;
  };

  const beats = BENCHMARKS.filter((b) => {
    const isLower = b.label === "Refund Rate";
    return isLower ? b.publisherValue <= b.industryMedian : b.publisherValue >= b.industryMedian;
  }).length;

  return (
    <BentoCard
      title="Global Industry Benchmarking"
      subtitle="Publisher vs. genre medians & top quartile"
      icon={<BarChart2 />}
      accentColor="#36E0F8"
      presentationMode={presentationMode}
      headerRight={
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-[#ABF790]/10 border border-[#ABF790]/25">
            <span className="mono-num text-[12px] font-bold text-status-success">
              {beats}/{BENCHMARKS.length}
            </span>
            <span className="text-[10px] text-brand-4 ml-1.5">above median</span>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {BENCHMARKS.map((b) => (
          <BulletGraph
            key={b.label}
            {...b}
            maxValue={getMax(b.label)}
          />
        ))}
      </div>

      {/* Genre breakdown note */}
      <div className="mt-5 pt-4 border-t border-white/05 flex items-center gap-4 flex-wrap">
        <span className="text-[10px] text-brand-4">Benchmarks sourced from:</span>
        {["Roguelike", "Cozy", "FPS", "Space RPG", "Battle Royale"].map((genre) => (
          <span
            key={genre}
            className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-[#F191FA]/20 text-[#F191FA]/80"
          >
            {genre}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
