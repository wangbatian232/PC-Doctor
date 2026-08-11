"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Cpu, Monitor, AlertTriangle, Gamepad2, TrendingUp, FileCheck } from "lucide-react";

interface FeatureCard {
  id: string;
  num: string;
  tag: string;
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  /** Mini viz: small visual inside card */
  viz: React.ReactNode;
}

function MiniBar({ label, value, max, color, delay }: { label: string; value: number; max: number; color: string; delay: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-[var(--text-tertiary)] w-8 text-right font-mono">{label}</span>
      <div className="flex-1 h-[2px] rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${(value / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="text-[10px] font-semibold text-[var(--text-primary)] tabular-nums" style={{ color }}>{value}</span>
    </div>
  );
}

const cards: FeatureCard[] = [
  {
    id: "ch02", num: "01", tag: "DIAGNOSIS", title: "PC 配置诊断", desc: "分析 CPU / GPU / RAM / SSD 各项性能指标", href: "#ch02",
    icon: <Cpu className="w-4 h-4" />,
    viz: (
      <div className="space-y-1.5">
        <MiniBar label="CPU" value={92} max={100} color="#35D07F" delay={0.1} />
        <MiniBar label="GPU" value={89} max={100} color="#35D07F" delay={0.2} />
        <MiniBar label="RAM" value={82} max={100} color="#35D07F" delay={0.3} />
        <MiniBar label="SSD" value={76} max={100} color="#F5B942" delay={0.4} />
      </div>
    ),
  },
  {
    id: "ch03", num: "02", tag: "BOTTLENECK", title: "瓶颈检测", desc: "找出系统真正拖后腿的硬件", href: "#ch03",
    icon: <AlertTriangle className="w-4 h-4" />,
    viz: (
      <div className="flex items-end gap-3 justify-center pt-2">
        <div className="text-center">
          <div className="w-3 h-16 rounded-full bg-[rgba(53,208,127,0.15)] mx-auto mb-1 relative overflow-hidden">
            <motion.div className="absolute bottom-0 w-full bg-[#35D07F]" style={{ height: "92%" }}
              initial={{ height: 0 }} whileInView={{ height: "92%" }} viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }} />
          </div>
          <span className="text-[9px] text-[var(--text-tertiary)]">CPU</span>
        </div>
        <span className="text-[11px] text-[var(--text-placeholder)] mb-2">vs</span>
        <div className="text-center">
          <div className="w-3 h-12 rounded-full bg-[rgba(245,185,66,0.12)] mx-auto mb-1 relative overflow-hidden">
            <motion.div className="absolute bottom-0 w-full bg-[#F5B942]" style={{ height: "71%" }}
              initial={{ height: 0 }} whileInView={{ height: "71%" }} viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }} />
          </div>
          <span className="text-[9px] text-[var(--text-tertiary)]">GPU</span>
        </div>
      </div>
    ),
  },
  {
    id: "ch04", num: "03", tag: "GAMING", title: "游戏性能", desc: "FPS / CPU / GPU / VRAM 预测", href: "#ch04",
    icon: <Gamepad2 className="w-4 h-4" />,
    viz: (
      <div className="text-center">
        <motion.span className="text-[clamp(28px,2.5vw,40px)] font-bold text-[var(--accent-green)] tabular-nums"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          108
        </motion.span>
        <span className="text-[12px] text-[var(--text-tertiary)] ml-1">FPS</span>
        <div className="flex justify-center gap-4 mt-1.5">
          <span className="text-[10px] text-[var(--text-tertiary)]">CPU 63%</span>
          <span className="text-[10px] text-[var(--text-tertiary)]"><span className="text-[var(--accent-green)]">GPU</span> 94%</span>
        </div>
      </div>
    ),
  },
  {
    id: "ch05", num: "04", tag: "UPGRADE", title: "升级建议", desc: "告诉你钱应该花在哪里", href: "#ch05",
    icon: <TrendingUp className="w-4 h-4" />,
    viz: (
      <div className="flex items-center justify-center gap-3 text-[11px]">
        <span className="text-[var(--text-tertiary)]">RTX 4060</span>
        <div className="flex flex-col items-center">
          <ArrowRight className="w-3 h-3 text-[var(--text-tertiary)] rotate-90" />
          <motion.span className="text-[var(--accent-green)] font-bold"
            initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            +64%
          </motion.span>
        </div>
        <span className="text-[var(--accent-green)]">RTX 5070</span>
      </div>
    ),
  },
  {
    id: "ch06", num: "05", tag: "REPORT", title: "诊断报告", desc: "完整的电脑健康体检报告", href: "#ch06",
    icon: <FileCheck className="w-4 h-4" />,
    viz: (
      <div className="text-center">
        <motion.span className="text-[clamp(28px,2.5vw,40px)] font-bold text-[var(--accent-green)] tabular-nums"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          91
        </motion.span>
        <span className="text-[12px] text-[var(--text-tertiary)] ml-1">/100</span>
        <p className="text-[10px] text-[var(--accent-green)] mt-1 font-medium">EXCELLENT</p>
      </div>
    ),
  },
];

function FeatureCardItem({ card, index }: { card: FeatureCard; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleClick = () => {
    document.querySelector(card.href)?.scrollIntoView({ behavior: "smooth" });
  };

  const isLarge = index === 0; // First card spans wider

  return (
    <motion.div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative rounded-[12px] border cursor-pointer overflow-hidden transition-all duration-250 ease-out group
        ${isLarge ? "col-span-12 lg:col-span-7" : "col-span-12 sm:col-span-6 lg:col-span-5"}
        ${hovered
          ? "border-[rgba(53,208,127,0.3)] bg-[rgba(53,208,127,0.04)]"
          : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)]"
        }`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
    >
      {/* Cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(53,208,127,0.07), transparent 70%)`,
        }}
      />

      {/* Scan line on hover */}
      {hovered && (
        <motion.div
          className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(53,208,127,0.2), transparent)" }}
          initial={{ top: "20%" }}
          animate={{ top: ["20%", "80%"] }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10 p-[clamp(20px,2.5vw,36px)] h-full flex flex-col">
        {/* Top: number + tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="t-mono text-[var(--accent-green)]">{card.num}</span>
            <span className="text-[10px] tracking-[0.12em] font-medium text-[var(--text-tertiary)]">{card.tag}</span>
          </div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.3, x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ArrowRight className={`w-4 h-4 ${hovered ? "text-[var(--accent-green)]" : "text-[var(--text-tertiary)]"} transition-colors`} />
          </motion.div>
        </div>

        {/* Title + desc */}
        <h3 className="text-[clamp(18px,1.4vw,24px)] font-semibold text-[var(--text-primary)] mb-1.5"
          style={{ transform: hovered ? "translateX(3px)" : "none", transition: "transform 0.25s ease-out" }}>
          {card.title}
        </h3>
        <p className="text-[13px] text-[var(--text-tertiary)] mb-5">{card.desc}</p>

        {/* Mini UI Visualization */}
        <div
          className="mt-auto pt-5 border-t border-[rgba(255,255,255,0.05)]"
          style={{ opacity: hovered ? 1 : 0.35, transition: "opacity 0.35s ease-out" }}
        >
          {card.viz}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeatureGrid() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.05 });

  return (
    <section ref={ref} className="section-chapter page-container bg-void">
      <div className="w-full">
        <motion.div className="mb-[clamp(32px,5vw,64px)]"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="t-mono text-[var(--accent-green)] mb-3 block">CAPABILITIES</span>
          <h2 className="t-section text-[var(--text-primary)] mb-3">PC Doctor 能为你做什么？</h2>
          <p className="t-body max-w-[480px]">选择一项功能，深入了解你的电脑。</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-3">
          {cards.map((card, i) => (
            <FeatureCardItem key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
