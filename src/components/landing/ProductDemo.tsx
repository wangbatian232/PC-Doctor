"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { Activity, Cpu, Monitor, MemoryStick, HardDrive, Zap } from "lucide-react";

const specs = [
  { icon: <Cpu className="w-5 h-5" />, label: "Ryzen 7 7800X3D", sub: "8核 / 16线程 · 4.2–5.0 GHz" },
  { icon: <Monitor className="w-5 h-5" />, label: "RTX 4070 SUPER", sub: "12GB GDDR6X · Ada Lovelace" },
  { icon: <MemoryStick className="w-5 h-5" />, label: "32GB DDR5", sub: "6000MHz · 双通道" },
  { icon: <HardDrive className="w-5 h-5" />, label: "1TB NVMe Gen4", sub: "7000MB/s 读取" },
  { icon: <Zap className="w-5 h-5" />, label: "750W 80+ Gold", sub: "充足余量" },
];

const scores = [
  { label: "CPU", value: 92, color: "#35D07F" },
  { label: "GPU", value: 89, color: "#35D07F" },
  { label: "RAM", value: 82, color: "#35D07F" },
  { label: "SSD", value: 76, color: "#F5B942" },
  { label: "PSU", value: 91, color: "#35D07F" },
];

export default function ProductDemo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="ch02" className="section-chapter page-container bg-panel">
      <div className="grid-12 w-full items-center">
        {/* Left: heading */}
        <motion.div className="col-span-12 lg:col-span-4"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="t-mono text-[var(--accent-green)] mb-3 block">02 / DIAGNOSIS</span>
          <h2 className="t-section text-[var(--text-primary)] mb-4">
            你的电脑，<br />究竟哪里<br />出了问题？
          </h2>
          <p className="t-body max-w-[360px]">
            不需要看懂复杂参数。PC Doctor 把硬件数据转换成简单、明确的诊断结果。
          </p>
        </motion.div>

        {/* Right: diagnostic panel */}
        <motion.div className="col-span-12 lg:col-span-7 lg:col-start-6 mt-8 lg:mt-0"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="glass p-[clamp(24px,3vw,40px)]">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4 text-[var(--accent-green)]" />
              <span className="t-label">YOUR CONFIGURATION</span>
            </div>
            <div className="space-y-2 mb-8">
              {specs.map((s, i) => (
                <motion.div key={i}
                  className="flex items-center gap-4 px-4 py-3 rounded-[8px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)]"
                  initial={{ opacity: 0, x: -6 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.06 }}>
                  <span className="text-[var(--text-tertiary)]">{s.icon}</span>
                  <div>
                    <p className="text-[15px] font-medium text-[var(--text-primary)]">{s.label}</p>
                    <p className="text-[11px] text-[var(--text-tertiary)]">{s.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-3">
              {scores.map((s, i) => (
                <motion.div key={s.label} className="flex items-center gap-3"
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.06 }}>
                  <span className="t-label w-8">{s.label}</span>
                  <div className="flex-1 bar-track h-1.5">
                    <motion.div className="bar-fill h-1.5" style={{ background: s.color }}
                      initial={{ width: 0 }} animate={inView ? { width: `${s.value}%` } : {}}
                      transition={{ delay: 0.45 + i * 0.06, duration: 0.6 }} />
                  </div>
                  <span className="text-[13px] font-semibold text-[var(--text-primary)] w-6 text-right tabular-nums">
                    <AnimatedCounter to={s.value} duration={700} />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
