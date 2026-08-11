"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { ChipVisual } from "@/components/shared/HardwareVisuals";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function BottleneckShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.05 });

  return (
    <section ref={ref} id="ch03" className="section-chapter page-container bg-void">
      <div className="w-full">
        <motion.div className="mb-[clamp(32px,6vw,80px)]"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="t-mono text-[var(--accent-green)] mb-3 block">03 / BOTTLENECK</span>
          <h2 className="t-section text-[var(--text-primary)] mb-3">
            不是告诉你参数。<br /><span className="text-[var(--accent-green)]">告诉你问题在哪里。</span>
          </h2>
          <p className="t-body max-w-[480px]">PC Doctor ≠ 硬件数据库。PC Doctor = 诊断工具。</p>
        </motion.div>

        {/* Three-column flow: CPU → Balance → GPU */}
        <div className="grid-12 items-end">
          {/* CPU */}
          <motion.div className="col-span-12 md:col-span-4 text-center"
            initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <ChipVisual variant="cpu" label="Ryzen 7 7800X3D" subLabel="8C/16T · 5.0 GHz" score={92} color="#35D07F" />
            <p className="t-label text-[var(--accent-green)] mt-2">EXCELLENT</p>
          </motion.div>

          {/* Balance */}
          <motion.div className="col-span-12 md:col-span-4 flex flex-col items-center justify-end pb-2"
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <svg width="80" height="40" viewBox="0 0 80 40" className="mb-2">
              <line x1={0} y1={20} x2={80} y2={20} stroke="#35D07F" strokeWidth={1} strokeOpacity={0.3} />
              {[0, 1, 2].map(i => (
                <motion.circle key={i} cx={20 + i * 15} cy={20} r={2.5} fill="#35D07F"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, delay: i * 0.25, repeat: Infinity }} />
              ))}
            </svg>
            <motion.span className="t-number text-[var(--accent-green)] tabular-nums"
              initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}>
              <AnimatedCounter to={78} duration={1200} suffix="%" />
            </motion.span>
            <span className="t-label mt-1">BALANCE SCORE</span>
          </motion.div>

          {/* GPU */}
          <motion.div className="col-span-12 md:col-span-4 text-center"
            initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <ChipVisual variant="gpu" label="RTX 4060" subLabel="8GB · Ada" score={71} color="#F5B942" />
            <p className="t-label text-[var(--status-warning)] mt-2">BOTTLENECK</p>
          </motion.div>
        </div>

        {/* Diagnosis conclusion */}
        <motion.div className="mt-[clamp(32px,5vw,64px)] text-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}>
          <div className="inline-flex items-center gap-2 glass px-6 py-4 rounded-[10px]">
            <AlertTriangle className="w-4 h-4 text-[var(--status-warning)]" />
            <p className="t-body" style={{ color: "var(--text-primary)" }}>
              你的 CPU 性能明显高于 GPU。在 1440P 游戏中，<span style={{ color: "var(--status-warning)" }}>显卡</span>会成为主要性能限制。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
