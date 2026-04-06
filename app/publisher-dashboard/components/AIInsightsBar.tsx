"use client";

import { Sparkles, TrendingUp } from "lucide-react";
import { AI_SUMMARY } from "@/lib/mockPublisherData";

export default function AIInsightsBar() {
  return (
    <div className="shimmer-border-wrapper mb-6">
      <div className="shimmer-border-inner px-5 py-3 flex items-center gap-3">
        {/* Sparkle icon */}
        <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#F191FA]/20 to-[#36E0F8]/20 border border-[#F191FA]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#F191FA]" />
        </div>

        {/* Label */}
        <span className="flex-shrink-0 text-[10px] font-semibold tracking-[0.15em] uppercase text-[#F191FA]/80">
          AI Insights
        </span>

        {/* Divider */}
        <div className="w-px h-4 bg-white/10 flex-shrink-0" />

        {/* Summary text */}
        <p className="text-[13px] text-brand-3/90 leading-relaxed flex-1 min-w-0 truncate">
          {AI_SUMMARY}
        </p>

        {/* Trend badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-[#ABF790]/10 border border-[#ABF790]/25 rounded-full px-3 py-1">
          <TrendingUp className="w-3 h-3 text-status-success" />
          <span className="text-[11px] font-semibold text-status-success mono-num">+12% WoW</span>
        </div>
      </div>
    </div>
  );
}
