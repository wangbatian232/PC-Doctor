"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { GpuCardVisual } from "@/components/shared/HardwareVisuals";
import { TrendingUp, ArrowDown } from "lucide-react";

const improvements = [
  { from: "1080p 中画质", to: "1440p 极高", label: "画质提升" },
  { from: "67 FPS", to: "110 FPS", label: "平均帧率" },
  { from: "48 FPS", to: "81 FPS", label: "1% 低帧" },
];

export default function UpgradeShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="ch05" className="section-chapter page-container bg-void">
      <div className="w-full">
        <motion.div className="mb-[clamp(32px,5vw,64px)]"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="t-mono text-[var(--accent-green)] mb-3 block">05 / UPGRADE</span>
          <h2 className="t-section text-[var(--text-primary)] mb-3">
            如果只花一笔钱，<br />应该升级什么？
          </h2>
          <p className="t-body max-w-[440px]">PC Doctor 告诉你钱应该花在哪里，而不是让你盲目升级。</p>
        </motion.div>

        <div className="grid-12 items-center">
          {/* Upgrade visual — full width, centered */}
          <motion.div className="col-span-12"
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="glass p-[clamp(32px,4vw,56px)] text-center">
              {/* Before → After */}
              <div className="flex items-center justify-center gap-[clamp(32px,6vw,80px)] mb-10">
                <div className="text-center">
                  <p className="t-label mb-3">当前</p>
                  <div className="w-[clamp(140px,12vw,200px)] mx-auto mb-3">
                    <GpuCardVisual name="RTX 4060" color="#8B929E" width={200} height={80} />
                  </div>
                  <p className="text-[18px] font-semibold text-[var(--text-secondary)]">RTX 4060</p>
                </div>

                <div className="flex flex-col items-center">
                  <motion.div className="w-12 h-12 rounded-full bg-[rgba(53,208,127,0.08)] border border-[rgba(53,208,127,0.2)] flex items-center justify-center mb-1"
                    animate={inView ? { y: [0, -4, 0] } : {}}
                    transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}>
                    <ArrowDown className="w-5 h-5 text-[var(--accent-green)]" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.6, type: "spring" }}>
                    <span className="t-number text-[var(--accent-green)] tabular-nums">
                      +<AnimatedCounter to={64} duration={1400} suffix="%" />
                    </span>
                  </motion.div>
                </div>

                <div className="text-center">
                  <p className="t-label mb-3">推荐</p>
                  <div className="w-[clamp(140px,12vw,200px)] mx-auto mb-3">
                    <GpuCardVisual name="RTX 5070" color="#35D07F" width={200} height={80} />
                  </div>
                  <p className="text-[18px] font-semibold text-[var(--accent-green)]">RTX 5070</p>
                </div>
              </div>

              {/* Improvement rows */}
              <div className="max-w-[500px] mx-auto space-y-3">
                {improvements.map((imp, i) => (
                  <motion.div key={i} className="flex items-center justify-between py-3 px-5 rounded-[6px] border border-[var(--border-subtle)]"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.1 }}>
                    <span className="t-label" style={{ width: "80px", textAlign: "left", textTransform: "none" }}>{imp.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[15px] text-[var(--text-tertiary)] line-through">{imp.from}</span>
                      <ArrowDown className="w-3 h-3 text-[var(--accent-green)]" />
                      <span className="text-[15px] font-semibold text-[var(--accent-green)]">{imp.to}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
