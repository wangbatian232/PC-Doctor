"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Repeat, Zap, X } from "lucide-react";
import { GpuCardVisual } from "@/components/shared/HardwareVisuals";
import type { GpuData } from "@/types";
import { gpus } from "@/data";
import { simulateGpuUpgrade } from "@/engine/upgrade";

/** 已知有实物图的 GPU */
const gpuImages: Record<string, string> = {
  "nvidia-rtx-4070-super": "/images/gpu-rtx-4070-super.png",
  "nvidia-rtx-5070": "/images/gpu-rtx-5070.png",
};

function GpuImage({ gpu, color, width = 180, height = 72 }: { gpu: GpuData; color?: string; width?: number; height?: number }) {
  const realImg = gpuImages[gpu.id];
  if (realImg) {
    return (
      <motion.div
        className="relative overflow-hidden rounded-[4px]"
        style={{ maxWidth: width }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={realImg}
          alt={gpu.name}
          className="w-full object-contain"
          style={{
            // 渐变蒙版：四边融入暗色背景
            WebkitMaskImage: `radial-gradient(ellipse 85% 80% at 50% 50%, black 60%, transparent 100%)`,
            maskImage: `radial-gradient(ellipse 85% 80% at 50% 50%, black 60%, transparent 100%)`,
            filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
          }}
        />
        {/* 底部叠加层，匹配卡片背景色 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, rgba(19,22,27,0.7) 0%, transparent 25%),
                         linear-gradient(to bottom, rgba(19,22,27,0.3) 0%, transparent 15%),
                         linear-gradient(to right, rgba(19,22,27,0.3) 0%, transparent 10%),
                         linear-gradient(to left, rgba(19,22,27,0.3) 0%, transparent 10%)`,
          }}
        />
      </motion.div>
    );
  }
  return <GpuCardVisual name={gpu.name} color={color ?? "#35D07F"} width={width} height={height} />;
}

interface UpgradeSimulatorProps { currentGpu: GpuData; }

export default function UpgradeSimulator({ currentGpu }: UpgradeSimulatorProps) {
  const [showSelector, setShowSelector] = useState(false);
  const [targetGpu, setTargetGpu] = useState<GpuData | null>(null);
  const upgradeOptions = gpus.filter((g) => g.tier > currentGpu.tier).sort((a, b) => a.tier - b.tier);
  const simulation = targetGpu ? simulateGpuUpgrade(currentGpu, targetGpu) : null;

  return (
    <motion.div
      className="p-5 rounded-[8px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)]"
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Repeat className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
        <h3 className="text-[11px] font-semibold text-[var(--text-primary)] tracking-[0.08em]">
          升级模拟器
        </h3>
      </div>

      {/* GPU 显卡对比可视化 */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1">
          <GpuImage gpu={currentGpu} color="#8B929E" width={180} height={72} />
        </div>
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            className="w-8 h-8 rounded-full bg-[rgba(53,208,127,0.06)] border border-[rgba(53,208,127,0.15)] flex items-center justify-center"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-[var(--accent-green)]" />
          </motion.div>
          {simulation && (
            <motion.span
              className="text-[14px] font-bold text-[var(--accent-green)] tracking-[-0.02em] mt-0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              +{simulation.percentImprovement}%
            </motion.span>
          )}
        </div>
        <div className="flex-1">
          {targetGpu ? (
            <GpuImage gpu={targetGpu} color="#35D07F" width={180} height={72} />
          ) : (
            <button
              onClick={() => setShowSelector(true)}
              className="w-full aspect-[180/72] rounded-[4px] border border-dashed border-[var(--border-default)] bg-[rgba(255,255,255,0.01)] flex items-center justify-center hover:border-[var(--accent-green)] hover:bg-[rgba(53,208,127,0.03)] transition-all duration-200"
            >
              <span className="text-[10px] text-[var(--text-tertiary)]">选择显卡</span>
            </button>
          )}
        </div>
      </div>

      {/* 当前 → 目标 文字 */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="text-center flex-1">
          <p className="text-[8px] text-[var(--text-tertiary)] tracking-[0.08em] mb-0.5">当前</p>
          <p className="text-[11px] font-medium text-[var(--text-secondary)] tracking-[-0.01em]">{currentGpu.name}</p>
        </div>
        <div className="text-center flex-1">
          <p className="text-[8px] text-[var(--text-tertiary)] tracking-[0.08em] mb-0.5">升级到</p>
          {targetGpu ? (
            <p className="text-[11px] font-medium text-[var(--accent-green)] tracking-[-0.01em]">{targetGpu.name}</p>
          ) : (
            <button onClick={() => setShowSelector(true)}
              className="text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] underline underline-offset-4 transition-colors">
              选择显卡
            </button>
          )}
        </div>
      </div>

      {/* 模拟结果 */}
      <AnimatePresence>
        {simulation && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[var(--text-tertiary)]">游戏性能提升</span>
                <motion.span className="text-[20px] font-bold text-[var(--accent-green)] tracking-[-0.03em]"
                  initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }}>
                  +{simulation.percentImprovement}%
                </motion.span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[var(--text-tertiary)]">1440p 帧率</span>
                <span className="text-[11px] font-medium text-[var(--text-primary)] tracking-[-0.01em] tabular-nums">
                  <span className="text-[var(--text-tertiary)]">{simulation.currentFps}</span>
                  {" → "}
                  <span className="text-[var(--accent-green)]">{simulation.targetFps}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[var(--text-tertiary)]">预计提升</span>
                <span className="text-[11px] font-medium text-[var(--accent-green)] tracking-[-0.01em] tabular-nums">
                  +{simulation.targetFps - simulation.currentFps} FPS
                </span>
              </div>
              <button onClick={() => { setTargetGpu(null); setShowSelector(true); }}
                className="w-full mt-1 py-2 rounded-[4px] border border-[var(--border-subtle)] text-[10px] text-[var(--text-tertiary)]
                           hover:text-[var(--text-primary)] hover:border-[var(--border-default)] transition-all duration-150
                           flex items-center justify-center gap-1.5">
                <Zap className="w-3 h-3" /> 比较其他显卡
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 显卡选择弹窗 */}
      <AnimatePresence>
        {showSelector && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[rgba(0,0,0,0.75)] z-50 flex items-center justify-center p-4"
            onClick={() => setShowSelector(false)}>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[8px] p-5 w-full max-w-[380px] max-h-[400px] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[12px] font-semibold text-[var(--text-primary)] tracking-[-0.01em]">选择升级目标显卡</h4>
                <button onClick={() => setShowSelector(false)} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-0.5">
                {upgradeOptions.map((gpu) => {
                  const sim = simulateGpuUpgrade(currentGpu, gpu);
                  return (
                    <button key={gpu.id}
                      onClick={() => { setTargetGpu(gpu); setShowSelector(false); }}
                      className="w-full text-left px-3 py-2 rounded-[4px] hover:bg-[rgba(255,255,255,0.03)] transition-colors flex items-center justify-between">
                      <div>
                        <p className="text-[12px] font-medium text-[var(--text-primary)] tracking-[-0.01em]">{gpu.name}</p>
                        <p className="text-[9px] text-[var(--text-tertiary)] mt-0.5">{gpu.vram}GB · ${gpu.priceUsd}</p>
                      </div>
                      <span className="text-[14px] font-bold text-[var(--accent-green)] tracking-[-0.02em]">+{sim.percentImprovement}%</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
