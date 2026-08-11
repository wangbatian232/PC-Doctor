"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight, Eye } from "lucide-react";
import DiagnosticCard from "./DiagnosticCard";

interface HeroSectionProps {
  onStartDiagnosis: () => void;
  onViewExample: () => void;
}

export default function HeroSection({ onStartDiagnosis, onViewExample }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 md:py-24">
      <div className="w-full max-w-[1120px] mx-auto grid md:grid-cols-[1fr_420px] gap-16 md:gap-20 items-center">
        {/* Left: Text — compressed, authoritative */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label pill — Linear pattern */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] mb-6">
            <Activity className="w-3 h-3 text-[var(--accent-green)]" />
            <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-[0.18em] font-medium">
              PC Doctor
            </span>
          </div>

          {/* Headline — compressed, Linear-style negative tracking */}
          <h1 className="text-[42px] md:text-[52px] lg:text-[60px] font-semibold text-[var(--text-primary)] tracking-[-0.035em] leading-[1.05] mb-4 text-compressed">
            让你的电脑配置，
            <br />
            <span className="text-[var(--accent-green)]">一眼看懂。</span>
          </h1>

          {/* Body — relaxed contrast */}
          <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-[420px] mb-8 tracking-[-0.01em]">
            输入你的 CPU、GPU、内存和其他硬件，我们会分析性能、瓶颈、游戏表现和升级优先级。
          </p>

          {/* Buttons — ghost + signal (NVIDIA: green border, never green fill) */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <motion.button
              onClick={onStartDiagnosis}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[6px]
                         border-2 border-[var(--accent-green)] text-[var(--accent-green)]
                         text-[14px] font-semibold tracking-[-0.01em]
                         hover:bg-[var(--accent-green)] hover:text-[var(--bg-canvas)]
                         active:scale-[0.985]
                         transition-all duration-150
                         focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--bg-canvas),0_0_0_3px_rgba(53,208,127,0.3)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              开始诊断
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            {/* Ghost secondary — Linear pattern: rgba(255,255,255,0.02) */}
            <motion.button
              onClick={onViewExample}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[6px]
                         bg-[rgba(255,255,255,0.02)] border border-[var(--border-default)]
                         text-[var(--text-secondary)] text-[14px] font-medium tracking-[-0.01em]
                         hover:text-[var(--text-primary)] hover:border-[var(--border-visible)] hover:bg-[rgba(255,255,255,0.04)]
                         active:scale-[0.985]
                         transition-all duration-150"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              查看示例
              <Eye className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Diagnostic Card + Image Placeholder */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* IMAGE PLACEHOLDER — GPU diagnostic visual */}
          <div className="w-full max-w-[380px] aspect-[4/3] rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-panel)] flex flex-col items-center justify-center gap-2 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(53,208,127,0.03)] to-transparent" />
            <span className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-[0.15em] font-medium z-10">
              需要图片
            </span>
            <span className="text-[13px] text-[var(--text-secondary)] z-10 text-center max-w-[260px] leading-relaxed">
              GPU 芯片渲染图：深色背景、绿色电路板纹理、金属散热器细节、RTX/GeForce 风格产品摄影
            </span>
            <span className="text-[10px] text-[var(--text-placeholder)] z-10 mt-1">
              Image: GPU die render — dark bg, green PCB trace accents, metal heatsink, RTX-style product shot
            </span>
          </div>

          <DiagnosticCard />
        </motion.div>
      </div>
    </section>
  );
}
