"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Keyboard, Scan, FileCheck } from "lucide-react";

const steps = [
  { num: "01", icon: Keyboard, title: "输入", sub: "输入你的硬件配置", desc: "选择 CPU、GPU、内存、硬盘和电源。不需要任何技术知识。" },
  { num: "02", icon: Scan, title: "分析", sub: "分析性能与瓶颈", desc: "系统自动评估每个硬件的性能水平，并检测 CPU 与 GPU 的匹配度。" },
  { num: "03", icon: FileCheck, title: "诊断", sub: "得到明确的升级建议", desc: "按优先级排序的升级方案，告诉你应该先升级什么、预计提升多少。" },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="section-large container-page section-py">
      <ScrollReveal className="text-center mb-[clamp(32px,5vw,72px)]">
        <h2 className="h2-section text-[var(--text-primary)] mb-3">三步，了解你的电脑。</h2>
        <p className="body-lg text-[var(--text-secondary)] max-w-[560px] mx-auto">像医生做体检一样，给你的电脑做一次全面诊断。</p>
      </ScrollReveal>

      <div ref={ref} className="relative max-w-[1100px] mx-auto">
        <div className="absolute top-14 left-[calc(16.67%+48px)] right-[calc(16.67%+48px)] hidden md:block">
          <div className="h-px bg-[rgba(255,255,255,0.06)]">
            <motion.div className="h-full bg-[var(--accent-green)]"
              initial={{ width: 0 }} animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.num} className="relative text-center"
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--bg-void)] border border-[var(--border-subtle)] mb-6">
                  <span className="text-[clamp(20px,1.5vw,28px)] font-bold text-[var(--text-primary)] tracking-[-0.03em]">{step.num}</span>
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-[8px] bg-[var(--accent-green-dim)] mb-4">
                  <Icon className="w-6 h-6 text-[var(--accent-green)]" />
                </div>
                <h3 className="h3-card text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-[clamp(13px,0.9vw,16px)] font-medium text-[var(--accent-green)] mb-2">{step.sub}</p>
                <p className="body-md text-[var(--text-tertiary)] max-w-[260px] mx-auto">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
