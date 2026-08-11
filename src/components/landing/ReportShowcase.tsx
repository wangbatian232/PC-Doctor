"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { FileCheck, TrendingUp } from "lucide-react";

const reportItems = [
  { label: "综合健康", value: 91 }, { label: "CPU", value: 92 }, { label: "GPU", value: 71 },
  { label: "内存", value: 82 }, { label: "硬盘", value: 76 }, { label: "电源", value: 88 },
  { label: "游戏性能", value: 84 }, { label: "平衡度", value: 78 },
];

interface Props { onStartDiagnosis: () => void; }

export default function ReportShowcase({ onStartDiagnosis }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.05 });

  return (
    <section ref={ref} id="ch06" className="section-chapter page-container bg-panel">
      <div className="w-full">
        <motion.div className="mb-[clamp(32px,6vw,72px)]"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="t-mono text-[var(--accent-green)] mb-3 block">06 / REPORT</span>
          <h2 className="t-section text-[var(--text-primary)] mb-3">完整的诊断报告</h2>
          <p className="t-body max-w-[440px]">就像专业医疗报告一样，每一项指标都清晰可见。</p>
        </motion.div>

        <div className="grid-12">
          {/* Score grid */}
          <motion.div className="col-span-12 lg:col-span-8"
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}>
            <div className="glass p-[clamp(24px,3vw,40px)]">
              <div className="flex items-center gap-2 mb-6">
                <FileCheck className="w-4 h-4 text-[var(--accent-green)]" />
                <span className="t-label">DIAGNOSTIC REPORT</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {reportItems.map((item, i) => {
                  const color = item.value >= 85 ? "#35D07F" : item.value >= 75 ? "#F5B942" : "#FF5C5C";
                  return (
                    <motion.div key={item.label}
                      className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)] text-center"
                      initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.15 + i * 0.04 }}>
                      <span className="text-[clamp(22px,2vw,34px)] font-bold tabular-nums" style={{ color }}>
                        <AnimatedCounter to={item.value} duration={900} />
                      </span>
                      <p className="t-label mt-1">{item.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Verdict sidebar */}
          <motion.div className="col-span-12 lg:col-span-4 mt-4 lg:mt-0"
            initial={{ opacity: 0, x: 8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}>
            <div className="glass p-[clamp(20px,2.5vw,36px)] h-full flex flex-col justify-between">
              <div>
                <span className="t-label">RECOMMENDED ACTION</span>
                <div className="flex items-center gap-2 mt-4 mb-3">
                  <TrendingUp className="w-5 h-5 text-[var(--accent-green)]" />
                  <span className="t-heading text-[var(--accent-green)]">Upgrade GPU</span>
                </div>
                <p className="t-body mt-2">建议优先升级显卡。当前 GPU 是系统中最明显的性能短板，升级后游戏帧率预计提升 <span className="text-[var(--accent-green)] font-semibold">+64%</span>。</p>
              </div>
              <button onClick={onStartDiagnosis}
                className="w-full mt-6 py-3 rounded-[8px] bg-[var(--accent-green)] text-[var(--bg-void)] text-[14px] font-semibold hover:bg-[var(--accent-green-hover)] transition-colors">
                Start Your Diagnosis
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
