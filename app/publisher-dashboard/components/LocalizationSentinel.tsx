"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, TrendingDown, Globe, MessageSquare, Wrench, ChevronRight } from "lucide-react";
import { LOCALIZATION_SENTINEL } from "@/lib/mockPublisherData";

interface LocalizationSentinelProps {
  open: boolean;
  onClose: () => void;
}

export default function LocalizationSentinel({ open, onClose }: LocalizationSentinelProps) {
  const data = LOCALIZATION_SENTINEL;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-over panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[520px] flex flex-col overflow-hidden"
            style={{ background: "rgba(13,13,13,0.98)", backdropFilter: "blur(40px)", borderLeft: "1px solid rgba(255,99,127,0.25)" }}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            {/* Red alert top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#FF637F] to-[#F191FA]" />

            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-white/06">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FF637F]/15 border border-[#FF637F]/30">
                  <AlertTriangle className="w-4.5 h-4.5 text-[#FF637F]" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-brand-1" style={{ letterSpacing: "-0.015em" }}>
                    Localization Sentinel
                  </h2>
                  <p className="text-[11px] text-[#FF637F] font-semibold mt-0.5">
                    ⚠ {data.gameName} — Critical Review Pattern
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/06 text-brand-4 hover:text-brand-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Summary strip */}
            <div className="grid grid-cols-3 gap-3 p-4 border-b border-white/05">
              {[
                { label: "Flagged Reviews", value: data.totalFlaggedReviews.toLocaleString(), color: "#FF637F" },
                { label: "Est. Refund Impact", value: data.estimatedRefundImpact, color: "#FAFD7E" },
                { label: "Regions Affected", value: `${data.regions.length}`, color: "#F191FA" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/02 border border-white/06 p-3 text-center">
                  <p className="text-[9px] text-brand-4 uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="mono-num text-[18px] font-bold" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Region breakdown */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: "thin" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-4 flex items-center gap-2">
                <Globe className="w-3 h-3" /> Negative Review Keywords by Region
              </p>

              {data.regions.map((region, i) => (
                <motion.div
                  key={region.code}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/08 bg-white/02 overflow-hidden"
                >
                  {/* Region header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/05">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{region.flag}</span>
                      <div>
                        <p className="text-[13px] font-semibold text-brand-1">{region.region}</p>
                        <p className="text-[10px] text-brand-4">{region.reviewVolume.toLocaleString()} reviews analysed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-[#FF637F]" />
                      <span className="mono-num text-[14px] font-bold text-[#FF637F]">{region.negativeRate}%</span>
                      <span className="text-[10px] text-brand-4">negative</span>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="px-4 py-3 space-y-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {region.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                          style={{ background: "rgba(255,99,127,0.1)", borderColor: "rgba(255,99,127,0.3)", color: "#FF637F" }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    {/* Sample review */}
                    <div className="bg-white/02 rounded-xl p-3 border border-white/05">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <MessageSquare className="w-3 h-3 text-brand-4" />
                        <span className="text-[9px] uppercase tracking-wider text-brand-4 font-semibold">Sample Review</span>
                      </div>
                      <p className="text-[11px] text-brand-3 italic leading-relaxed">{region.sampleReview}</p>
                    </div>

                    {/* Refund impact bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-brand-4 uppercase tracking-wider">Refund Impact Share</span>
                        <span className="mono-num text-[11px] font-bold text-[#FAFD7E]">{region.refundImpact}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/05">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#FF637F] to-[#FAFD7E]"
                          initial={{ width: 0 }}
                          animate={{ width: `${region.refundImpact}%` }}
                          transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Recommended actions */}
              <div className="rounded-2xl border border-[#36E0F8]/20 bg-[#36E0F8]/05 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-3.5 h-3.5 text-[#36E0F8]" />
                  <p className="text-[11px] font-bold text-[#36E0F8] uppercase tracking-wider">Recommended Actions</p>
                </div>
                <div className="space-y-2">
                  {data.recommendedActions.map((action, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-[#36E0F8] mt-0.5 flex-shrink-0" />
                      <p className="text-[11px] text-brand-3 leading-snug">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-4 border-t border-white/06 flex gap-2">
              <button className="flex-1 py-2.5 rounded-xl bg-[#FF637F]/15 border border-[#FF637F]/35 text-[12px] font-bold text-[#FF637F] hover:bg-[#FF637F]/25 transition-colors">
                Escalate to L10N Team
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-[#FAFD7E]/10 border border-[#FAFD7E]/25 text-[12px] font-bold text-[#FAFD7E] hover:bg-[#FAFD7E]/20 transition-colors">
                Pause DE/FR Ads
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
