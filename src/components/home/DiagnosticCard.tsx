"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { scoreLabel } from "@/engine/scoring";

interface DiagnosticCardProps {
  animate?: boolean;
  scores?: { overall: number; cpu: number; gpu: number; ram: number; ssd: number; psu: number };
  label?: string;
}

function ScoreBar({ value, label, delay }: { value: number; label: string; delay: number }) {
  const color = value >= 80 ? "#35D07F" : value >= 60 ? "#F5B942" : "#FF5C5C";

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-[0.12em] font-medium w-7 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: delay + 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <motion.span
        className="text-[11px] font-semibold text-[var(--text-primary)] w-6 text-right tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4 }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
}

export default function DiagnosticCard({ animate = true, scores, label }: DiagnosticCardProps) {
  const defaultScores = scores ?? { overall: 87, cpu: 92, gpu: 89, ram: 82, ssd: 76, psu: 91 };
  const overallLabel = label ?? scoreLabel(defaultScores.overall);

  return (
    <motion.div
      className="relative w-full max-w-[380px] rounded-[8px] px-5 py-5 border border-[var(--border-subtle)]"
      style={{ background: "var(--bg-card)" }}
      initial={animate ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ borderColor: "rgba(255,255,255,0.12)", transition: { duration: 0.15 } }}
    >
      {/* 标题行 */}
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-3 h-3 text-[var(--accent-green)]" />
        <span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.18em] font-medium">
          电脑健康
        </span>
      </div>

      {/* 分数 —— 大字压缩 */}
      <div className="flex items-baseline gap-1.5 mb-1">
        <motion.span
          className="text-[56px] font-bold text-[var(--text-primary)] tracking-[-0.04em] leading-none"
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.4 }}
        >
          {defaultScores.overall}
        </motion.span>
        <span className="text-[16px] text-[var(--text-tertiary)] tracking-[-0.01em]">/ 100</span>
      </div>

      {/* 等级标签 —— 绿色信号 */}
      <motion.p
        className="text-[10px] text-[var(--accent-green)] tracking-[0.12em] font-semibold mb-4"
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        {overallLabel}
      </motion.p>

      {/* 分割线 */}
      <div className="h-px bg-[var(--border-subtle)] mb-4" />

      {/* 各项得分条 */}
      <div className="space-y-2.5">
        <ScoreBar value={defaultScores.cpu} label="CPU" delay={0.2} />
        <ScoreBar value={defaultScores.gpu} label="GPU" delay={0.28} />
        <ScoreBar value={defaultScores.ram} label="内存" delay={0.36} />
        <ScoreBar value={defaultScores.ssd} label="硬盘" delay={0.44} />
        <ScoreBar value={defaultScores.psu} label="电源" delay={0.52} />
      </div>
    </motion.div>
  );
}
