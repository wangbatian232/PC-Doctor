"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { ChipVisual } from "@/components/shared/HardwareVisuals";
import type { BottleneckResult, HardwareSelection } from "@/types";

interface BottleneckAnalysisProps { bottleneck: BottleneckResult; selection: HardwareSelection; }

export default function BottleneckAnalysis({ bottleneck, selection }: BottleneckAnalysisProps) {
  const isBalanced = bottleneck.severity === "low";
  const color = isBalanced ? "#35D07F" : bottleneck.severity === "medium" ? "#F5B942" : "#FF5C5C";

  return (
    <motion.div
      className="p-5 rounded-[8px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-4">
        {isBalanced ? (
          <CheckCircle className="w-3.5 h-3.5" style={{ color }} />
        ) : (
          <AlertTriangle className="w-3.5 h-3.5" style={{ color }} />
        )}
        <h3 className="text-[11px] font-semibold text-[var(--text-primary)] tracking-[0.08em]">
          性能瓶颈分析
        </h3>
      </div>

      {/* CPU ↔ GPU 芯片可视化 (replaces image placeholder) */}
      <div className="mb-4 flex items-center justify-center gap-6 py-4">
        <ChipVisual
          variant="cpu"
          label={selection.cpu?.name?.slice(0, 15) ?? "CPU"}
          subLabel={selection.cpu ? `${selection.cpu.cores}C/${selection.cpu.threads}T` : undefined}
          score={0}
          color="#8B929E"
        />

        {/* Center: balance indicator */}
        <div className="flex flex-col items-center gap-1">
          {/* Connection line with data flow */}
          <svg width="60" height="30" viewBox="0 0 60 30" className="shrink-0">
            {/* Base line */}
            <line x1={0} y1={15} x2={60} y2={15}
              stroke={color} strokeWidth={1.5} strokeOpacity={0.3} />
            {/* Data flow dots */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={15 + i * 15} cy={15} r={2}
                fill={color}
                animate={{ opacity: [0.3, 1, 0.3], cx: [10 + i * 15, 20 + i * 15] }}
                transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </svg>
          <motion.span
            className="text-[20px] font-bold tracking-[-0.03em] tabular-nums"
            style={{ color }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          >
            {bottleneck.balancePercent}%
          </motion.span>
          <span className="text-[8px] text-[var(--text-tertiary)] uppercase tracking-[0.1em]">平衡度</span>
        </div>

        <ChipVisual
          variant="gpu"
          label={selection.gpu?.name?.slice(0, 15) ?? "GPU"}
          subLabel={selection.gpu ? `${selection.gpu.vram}GB` : undefined}
          score={0}
          color={isBalanced ? "#35D07F" : color}
        />
      </div>

      {/* CPU → GPU 流程条 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
          <div className="text-[10px] text-[var(--text-tertiary)] mb-1">{selection.cpu?.name ?? "CPU"}</div>
          <div className="h-1 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: color }}
              initial={{ width: 0 }} animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-[var(--text-tertiary)] shrink-0" />
        <div className="flex-1">
          <div className="text-[10px] text-[var(--text-tertiary)] mb-1">{selection.gpu?.name ?? "GPU"}</div>
          <div className="h-1 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: color }}
              initial={{ width: 0 }} animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </div>
      </div>

      {/* 诊断文字 */}
      <motion.p
        className="text-[11px] leading-relaxed tracking-[-0.01em]"
        style={{ color: isBalanced ? "#8B929E" : color }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
      >
        {bottleneck.description}
      </motion.p>
    </motion.div>
  );
}
