"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { scoreLabel, scoreColor } from "@/engine/scoring";

interface HardwareCardProps {
  label: string;
  score: number;
  detail?: React.ReactNode;
  icon: React.ReactNode;
}

export default function HardwareCard({ label, score, detail, icon }: HardwareCardProps) {
  const [expanded, setExpanded] = useState(false);
  const sl = scoreLabel(score);
  const color = scoreColor(score);

  return (
    <motion.button
      onClick={() => detail && setExpanded(!expanded)}
      className={`
        w-full text-left p-4 rounded-[6px] border transition-all duration-150
        ${expanded
          ? "border-[var(--border-visible)] bg-[var(--bg-card)]"
          : "border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)] hover:border-[var(--border-default)]"}
      `}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[4px] bg-[var(--bg-panel)] border border-[var(--border-subtle)] flex items-center justify-center">
            <span className="text-[11px] text-[var(--text-secondary)]">{icon}</span>
          </div>
          <span className="text-[12px] font-semibold text-[var(--text-primary)] tracking-[-0.01em]">{label}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <motion.span
              className="text-[20px] font-bold tabular-nums tracking-[-0.03em]"
              style={{ color }}
              key={score}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {score}
            </motion.span>
            <p className="text-[9px] uppercase tracking-[0.12em] font-semibold" style={{ color }}>
              {sl}
            </p>
          </div>
          {detail && (
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.15 }}>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Progress bar — thin signal bar */}
      <div className="mt-2.5 h-0.5 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <AnimatePresence>
        {expanded && detail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3.5 mt-3.5 border-t border-[var(--border-subtle)] text-[12px] text-[var(--text-secondary)] leading-relaxed tracking-[-0.01em]">
              {detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
