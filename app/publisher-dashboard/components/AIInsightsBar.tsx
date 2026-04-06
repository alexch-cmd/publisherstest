"use client";

import { motion } from "framer-motion";
import { Sparkles, Lightbulb, AlertTriangle, Zap, ArrowRight } from "lucide-react";
import { ACTION_CHIPS, AI_SUMMARY, type ActionChip } from "@/lib/mockPublisherData";
import { clsx } from "clsx";

const CHIP_CONFIG = {
  opportunity: {
    icon: <Lightbulb className="w-3 h-3" />,
    color: "#ABF790",
    bg: "bg-[#ABF790]/10",
    border: "border-[#ABF790]/30",
    hover: "hover:border-[#ABF790]/60 hover:bg-[#ABF790]/15",
  },
  warning: {
    icon: <Zap className="w-3 h-3" />,
    color: "#FAFD7E",
    bg: "bg-[#FAFD7E]/10",
    border: "border-[#FAFD7E]/30",
    hover: "hover:border-[#FAFD7E]/60 hover:bg-[#FAFD7E]/15",
  },
  critical: {
    icon: <AlertTriangle className="w-3 h-3" />,
    color: "#FF637F",
    bg: "bg-[#FF637F]/10",
    border: "border-[#FF637F]/30",
    hover: "hover:border-[#FF637F]/60 hover:bg-[#FF637F]/15",
  },
};

interface AIInsightsBarProps {
  onChipClick: (chip: ActionChip) => void;
}

export default function AIInsightsBar({ onChipClick }: AIInsightsBarProps) {
  return (
    <div className="shimmer-border-wrapper mb-5">
      <div className="shimmer-border-inner px-4 py-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#F191FA]/15 border border-[#F191FA]/30">
              <Sparkles className="w-3 h-3 text-[#F191FA]" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#F191FA]/80">
              AI Insights
            </span>
          </div>

          <div className="w-px h-4 bg-white/10 flex-shrink-0" />

          {/* Summary — truncated */}
          <p className="text-[11px] text-brand-4 hidden lg:block flex-1 min-w-0 truncate">
            {AI_SUMMARY}
          </p>

          {/* Action Chips */}
          <div className="flex items-center gap-2 flex-wrap ml-auto">
            {ACTION_CHIPS.map((chip, i) => {
              const cfg = CHIP_CONFIG[chip.type];
              return (
                <motion.button
                  key={chip.id}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => onChipClick(chip)}
                  className={clsx(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all",
                    cfg.bg, cfg.border, cfg.hover
                  )}
                  style={{ color: cfg.color }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {cfg.icon}
                  <span className="hidden sm:inline text-[#B6B6B6] font-normal mr-0.5">
                    {chip.gameName}:
                  </span>
                  {chip.label}
                  <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
