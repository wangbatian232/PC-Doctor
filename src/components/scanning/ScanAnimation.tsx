"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Monitor, MemoryStick, HardDrive, Zap, BarChart3, FileCheck } from "lucide-react";

const scanSteps = [
  { label: "正在检测 CPU……", icon: Cpu },
  { label: "正在检测 GPU……", icon: Monitor },
  { label: "正在检测内存……", icon: MemoryStick },
  { label: "正在检测硬盘……", icon: HardDrive },
  { label: "正在检测电源……", icon: Zap },
  { label: "正在分析性能瓶颈……", icon: BarChart3 },
  { label: "正在估算游戏表现……", icon: Monitor },
  { label: "正在生成诊断报告……", icon: FileCheck },
];

/**
 * 扫描动画粒子
 * 为什么这样设计:
 * - 随机分布的数据粒子从左/右流入中心
 * - 绿色微光粒子暗示"数据正在被采集"
 * - 使用 CSS 动画而非 Framer Motion（大量粒子时性能更好）
 */
function ScanParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      size: 1 + Math.random() * 2,
    })), []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "var(--accent-green)",
            opacity: 0,
            animation: `particle-float ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

interface ScanAnimationProps { onComplete: () => void; }

export default function ScanAnimation({ onComplete }: ScanAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);

  useEffect(() => {
    const totalSteps = scanSteps.length;
    // 前快后慢的节奏
    const timings = [200, 180, 160, 160, 150, 220, 260, 400];
    let elapsed = 0;
    const timeouts: NodeJS.Timeout[] = [];

    timings.forEach((delay, i) => {
      elapsed += i === 0 ? 0 : timings[i - 1];
      const t = setTimeout(() => {
        setCurrentIndex(i);
        setTimeout(() => {
          setCompletedIndices((prev) => [...prev, i]);
          if (i === totalSteps - 1) setTimeout(onComplete, 350);
        }, Math.min(delay * 0.6, 120));
      }, elapsed);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  const progress = (completedIndices.length / scanSteps.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 背景粒子 */}
      <ScanParticles />

      {/* 扫描线 */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(53,208,127,0.15), transparent)" }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="text-center max-w-[380px] mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* 标题 */}
        <div className="mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] mb-3"
            animate={{ boxShadow: ["0 0 0px rgba(53,208,127,0)", "0 0 12px rgba(53,208,127,0.1)", "0 0 0px rgba(53,208,127,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Activity className="w-3 h-3 text-[var(--accent-green)]" />
            <span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.18em] font-medium">
              电脑医生
            </span>
          </motion.div>
          <h2 className="text-[16px] font-semibold text-[var(--text-primary)] tracking-[0.06em]">
            系统扫描中
          </h2>
        </div>

        {/* 扫描步骤 — 分段脉冲进度 */}
        <div className="space-y-1 mb-8">
          {scanSteps.map((step, i) => {
            const isActive = i === currentIndex;
            const isCompleted = completedIndices.includes(i);
            const isPending = i > currentIndex && currentIndex >= 0;
            const Icon = step.icon;

            return (
              <motion.div
                key={i}
                className="flex items-center gap-3 px-2 py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isPending ? 0.2 : 1 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
              >
                {/* 状态图标 */}
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <svg className="w-3.5 h-3.5 text-[var(--accent-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      className="relative"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      {/* 脉冲环 */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-[var(--accent-green)]"
                        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                      <Icon className="w-3.5 h-3.5 text-[var(--accent-green)] relative z-10" />
                    </motion.div>
                  ) : (
                    <Icon className="w-3.5 h-3.5 text-[rgba(255,255,255,0.06)]" />
                  )}
                </div>

                {/* 步骤文字 */}
                <span className={`text-[11px] tracking-[-0.01em] transition-colors duration-300 ${
                  isCompleted ? "text-[var(--accent-green)]" :
                  isActive ? "text-[var(--text-primary)]" :
                  "text-[var(--text-tertiary)]"
                }`}>
                  {step.label}
                </span>

                {/* 完成时间指示 */}
                {isCompleted && (
                  <motion.span
                    className="ml-auto text-[8px] text-[var(--accent-green)] opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 进度条 — 分段脉冲风格 */}
        <div className="px-2">
          <div className="flex items-center justify-between text-[9px] text-[var(--text-tertiary)] mb-1.5">
            <span>{completedIndices.length} / {scanSteps.length} 完成</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
            {/* 分段进度条 */}
            <div className="h-full flex gap-[1px]">
              {scanSteps.map((_, i) => {
                const segComplete = completedIndices.includes(i);
                const segActive = i === currentIndex;
                return (
                  <div key={i} className="flex-1 h-full rounded-full relative overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                    {segComplete && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--accent-green)" }}
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                      />
                    )}
                    {segActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--accent-green)" }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 0.4, repeat: Infinity }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
