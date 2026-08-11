"use client";

import { motion } from "framer-motion";
import { scoreLabel, scoreColor } from "@/engine/scoring";

interface HealthScoreProps { score: number; summary: string; }

export default function HealthScore({ score, summary }: HealthScoreProps) {
  const label = scoreLabel(score);
  const color = scoreColor(score);

  return (
    <motion.div
      className="text-center mb-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.2em] font-medium mb-3">
        您的电脑健康状况
      </p>

      <div className="flex items-baseline justify-center gap-1.5 mb-1.5">
        <motion.span
          className="text-[80px] md:text-[96px] font-bold tracking-[-0.05em] leading-none tabular-nums"
          style={{ color }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {score}
        </motion.span>
        <span className="text-[20px] text-[var(--text-tertiary)] tracking-[-0.01em]">/ 100</span>
      </div>

      <motion.p
        className="text-[11px] font-semibold tracking-[0.12em] mb-3"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {label}
      </motion.p>

      <motion.p
        className="text-[13px] text-[var(--text-secondary)] max-w-[480px] mx-auto leading-relaxed tracking-[-0.01em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        {summary}
      </motion.p>
    </motion.div>
  );
}
