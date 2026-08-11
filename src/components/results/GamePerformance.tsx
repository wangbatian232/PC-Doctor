"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { GameCover } from "@/components/shared/HardwareVisuals";
import type { HardwareSelection } from "@/types";
import { predictAllGames } from "@/engine/gaming";

const qualities = ["低", "中", "高", "极高"];

interface GamePerformanceProps { selection: HardwareSelection; }

export default function GamePerformance({ selection }: GamePerformanceProps) {
  const [quality, setQuality] = useState("高");
  const predictions = predictAllGames(selection, quality);

  return (
    <motion.div
      className="rounded-[8px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)] overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 标题栏 */}
      <div className="px-5 py-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
            <h3 className="text-[11px] font-semibold text-[var(--text-primary)] tracking-[0.08em]">
              游戏性能预测
            </h3>
            <span className="text-[9px] text-[var(--text-tertiary)] bg-[rgba(255,255,255,0.03)] px-2 py-0.5 rounded-[3px]">
              {selection.monitor?.resolutionLabel ?? "1080p"}
            </span>
          </div>
          <div className="flex gap-0.5">
            {qualities.map((q) => (
              <button key={q} onClick={() => setQuality(q)}
                className={`px-3 py-1.5 rounded-[4px] text-[11px] font-medium transition-all duration-150 ${
                  q === quality
                    ? "bg-[rgba(255,255,255,0.08)] text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.03)]"
                }`}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GPU 缺失提示 */}
      {predictions.length === 0 && !selection.gpu && (
        <div className="p-6 text-center">
          <p className="text-[12px] text-[var(--text-tertiary)]">
            GPU 信息缺失，无法进行完整游戏性能评估。
          </p>
        </div>
      )}

      {/* 游戏行 */}
      <div className="divide-y divide-[rgba(255,255,255,0.03)]">
        {predictions.map((pred, i) => (
          <motion.div
            key={pred.gameId}
            className="px-5 py-3.5 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3">
              {/* 游戏封面 (replaces text placeholder with gradient cover) */}
              <GameCover gameId={pred.gameId} name={pred.gameName} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[12px] font-medium text-[var(--text-primary)] tracking-[-0.01em]">
                    {pred.gameName}
                  </span>
                  {pred.estimated && (
                    <span className="text-[8px] text-[var(--text-tertiary)] bg-[rgba(255,255,255,0.03)] px-1.5 py-0.5 rounded-[2px] tracking-[0.08em]">
                      估算值
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <p className="text-[8px] text-[var(--text-tertiary)] tracking-[0.08em] mb-0.5">平均帧率</p>
                    <p className={`text-[15px] font-bold tracking-[-0.02em] tabular-nums ${
                      pred.avgFps >= 100 ? "text-[var(--accent-green)]" :
                      pred.avgFps >= 60 ? "text-[var(--status-warning)]" : "text-[var(--status-danger)]"
                    }`}>{pred.avgFps}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-[var(--text-tertiary)] tracking-[0.08em] mb-0.5">1% 低帧</p>
                    <p className="text-[15px] font-bold text-[var(--text-primary)] tracking-[-0.02em] tabular-nums">{pred.low1pFps}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-[var(--text-tertiary)] tracking-[0.08em] mb-0.5">GPU 占用</p>
                    <p className="text-[15px] font-bold text-[var(--text-primary)] tracking-[-0.02em] tabular-nums">{pred.gpuUsage}%</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-[var(--text-tertiary)] tracking-[0.08em] mb-0.5">显存</p>
                    <p className="text-[15px] font-bold text-[var(--text-primary)] tracking-[-0.02em] tabular-nums">{pred.vramUsage} GB</p>
                  </div>
                </div>
              </div>

              {/* 推荐设置 */}
              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-[3px] shrink-0 ${
                pred.avgFps >= 100 ? "bg-[rgba(53,208,127,0.08)] text-[var(--accent-green)]" :
                pred.avgFps >= 60 ? "bg-[rgba(245,185,66,0.08)] text-[var(--status-warning)]" :
                "bg-[rgba(255,92,92,0.08)] text-[var(--status-danger)]"
              }`}>
                {pred.recommendedSettings}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
