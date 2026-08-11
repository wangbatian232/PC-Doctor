"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, ArrowRight, Eye, Cpu, Monitor, MemoryStick, HardDrive, Zap, ChevronDown } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { useDashboardTilt } from "@/components/shared/BackgroundSystem";

interface HeroProps { onStartDiagnosis: () => void; onViewExample: () => void; }

function Bar({ icon, label, value, color, delay }: { icon: React.ReactNode; label: string; value: number; color: string; delay: number }) {
  return (
    <motion.div className="flex items-center gap-3"
      initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22,1,0.36,1] }}>
      <span className="text-[var(--text-tertiary)] w-3.5 shrink-0">{icon}</span>
      <span className="t-label w-7 shrink-0">{label}</span>
      <div className="flex-1 bar-track">
        <motion.div className="bar-fill" style={{ background: color }}
          initial={{ width: 0 }} animate={{ width: `${value}%` }}
          transition={{ delay: delay + 0.18, duration: 0.7, ease: [0.22,1,0.36,1] }} />
      </div>
      <motion.span className="text-[13px] font-semibold text-[var(--text-primary)] w-7 text-right tabular-nums"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.25 }}>
        <AnimatedCounter to={value} duration={800} />
      </motion.span>
    </motion.div>
  );
}

export default function HeroSection({ onStartDiagnosis, onViewExample }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const tilt = useDashboardTilt();

  return (
    <section ref={ref} className="section-hero page-container relative">
      <div className="grid-12 items-center w-full">
        {/* Left: Text — cols 1-6 */}
        <motion.div className="col-span-12 lg:col-span-6 relative z-10 lg:pr-8"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] mb-6">
            <Activity className="w-3 h-3 text-[var(--accent-green)]" />
            <span className="t-label">电脑配置医生</span>
          </div>
          <h1 className="t-hero text-[var(--text-primary)] mb-5">
            让你的电脑配置，<br /><span className="text-[var(--accent-green)]">一眼看懂。</span>
          </h1>
          <p className="t-body max-w-[440px] mb-8">
            输入你的 CPU、GPU、内存和其他硬件，PC Doctor 会分析性能、瓶颈、游戏表现和升级优先级。
          </p>
          <div className="flex gap-3">
            <motion.button onClick={onStartDiagnosis}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-[var(--accent-green)] text-[var(--bg-void)] text-[15px] font-semibold hover:bg-[var(--accent-green-hover)] transition-colors group"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              开始诊断 <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.button onClick={onViewExample}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] border border-[var(--border-default)] text-[var(--text-secondary)] text-[15px] font-medium hover:text-[var(--text-primary)] hover:border-[var(--border-visible)] transition-colors"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              查看示例 <Eye className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Dashboard — cols 8-12 */}
        <motion.div className="col-span-12 lg:col-span-5 lg:col-start-8 relative z-10 mt-10 lg:mt-0"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22,1,0.36,1] }}>
          <div className="glass p-[clamp(24px,3vw,40px)] relative overflow-hidden" style={tilt}>
            <div className="flex items-center gap-2 mb-5">
              <Activity className="w-3.5 h-3.5 text-[var(--accent-green)]" />
              <span className="t-label">PC HEALTH</span>
            </div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <motion.div className="t-number text-[var(--text-primary)] tabular-nums"
                initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.25, duration: 0.5, ease: [0.34,1.56,0.64,1] }}>
                <AnimatedCounter to={87} duration={1600} />
              </motion.div>
              <span className="text-[15px] text-[var(--text-tertiary)]">/100</span>
            </div>
            <motion.p className="t-label text-[var(--accent-green)] font-semibold mb-6"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
              EXCELLENT
            </motion.p>
            <div className="h-px bg-[var(--border-subtle)] mb-6" />
            <div className="space-y-4">
              <Bar icon={<Cpu className="w-3 h-3" />} label="CPU" value={92} color="#35D07F" delay={0.4} />
              <Bar icon={<Monitor className="w-3 h-3" />} label="GPU" value={89} color="#35D07F" delay={0.5} />
              <Bar icon={<MemoryStick className="w-3 h-3" />} label="RAM" value={82} color="#35D07F" delay={0.6} />
              <Bar icon={<HardDrive className="w-3 h-3" />} label="SSD" value={76} color="#F5B942" delay={0.7} />
              <Bar icon={<Zap className="w-3 h-3" />} label="PSU" value={91} color="#35D07F" delay={0.8} />
            </div>
            <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex justify-between items-center">
              <span className="t-label">BALANCE</span>
              <motion.span className="text-[22px] font-bold text-[var(--accent-green)] tabular-nums"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}>
                <AnimatedCounter to={94} duration={900} suffix="%" />
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => document.getElementById("ch02")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
        <span className="t-mono">01 / 06</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
