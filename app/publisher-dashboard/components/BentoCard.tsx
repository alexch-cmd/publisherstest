"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { clsx } from "clsx";
import { Download } from "lucide-react";

interface BentoCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  className?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  presentationMode?: boolean;
  id?: string;
  noPadding?: boolean;
  noTilt?: boolean;
}

export default function BentoCard({
  title, subtitle, icon, accentColor = "#36E0F8", className,
  headerRight, children, presentationMode = false,
  id, noPadding = false, noTilt = false,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noTilt || presentationMode || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, { backgroundColor: "#131313" });
      const link = document.createElement("a");
      link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Export failed", e);
    }
  };

  return (
    <div style={{ perspective: "1200px" }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        id={id}
        style={{ rotateX: noTilt ? 0 : rotateX, rotateY: noTilt ? 0 : rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={clsx("glass-card rounded-2xl relative overflow-hidden flex flex-col w-full h-full", className)}
      >
        {/* Accent top-edge glow */}
        <div
          className="absolute top-0 left-6 right-6 h-px opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
        />
        {/* Tilt glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])}% ${useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])}%, rgba(255,255,255,0.04) 0%, transparent 60%)`,
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-0 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {icon && (
              <div
                className="flex items-center justify-center w-7 h-7 rounded-lg border flex-shrink-0"
                style={{ background: `${accentColor}18`, borderColor: `${accentColor}35` }}
              >
                <span style={{ color: accentColor }} className="[&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>
              </div>
            )}
            <div>
              <h3 className="text-[13px] font-semibold text-brand-1 leading-tight" style={{ letterSpacing: "-0.01em" }}>
                {title}
              </h3>
              {subtitle && <p className="text-[10px] text-brand-4 mt-0.5 uppercase tracking-wider">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {headerRight}
            {presentationMode && (
              <button
                onClick={handleCopyImage}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/05 hover:bg-white/10 border border-white/08 text-[10px] text-brand-4 hover:text-brand-1 transition-colors"
              >
                <Download className="w-3 h-3" /> Copy
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={clsx("flex-1 min-h-0", noPadding ? "" : "px-5 pb-5 pt-4")}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
