"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ArrowRight, X } from "lucide-react";

interface NavbarProps { onStartDiagnosis: () => void; }

const navLinks = [
  { num: "01", label: "诊断", href: "#ch02" },
  { num: "02", label: "瓶颈", href: "#ch03" },
  { num: "03", label: "游戏", href: "#ch04" },
  { num: "04", label: "升级", href: "#ch05" },
];

export default function Navbar({ onStartDiagnosis }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { document.body.style.overflow = mobileOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mobileOpen]);

  const scrollTo = (href: string) => { setMobileOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (<>
    <motion.nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(7,9,12,0.88)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent" }}>
      <div className="page-container h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 text-[var(--text-primary)]">
          <span className="text-[15px] font-bold tracking-[-0.02em]">PC</span>
          <Activity className="w-4 h-4 text-[var(--accent-green)]" />
          <span className="text-[15px] font-bold tracking-[-0.02em]">DOCTOR</span>
        </button>

        {/* Nav links — underline-on-hover */}
        <div className="hidden md:flex items-center gap-0">
          {navLinks.map((l, i) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative px-4 py-5 text-[12px] font-medium tracking-[0.04em] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              <span className="text-[10px] text-[var(--text-placeholder)] mr-1.5">{l.num}</span>
              {l.label}
              {/* Underline */}
              <motion.div
                className="absolute bottom-3 left-4 right-4 h-[1.5px] bg-[var(--accent-green)] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIdx === i ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </button>
          ))}
        </div>

        {/* CTA — border + arrow style */}
        <button
          onClick={onStartDiagnosis}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-[6px] border border-[rgba(53,208,127,0.3)] text-[var(--accent-green)] text-[13px] font-semibold hover:bg-[rgba(53,208,127,0.08)] hover:border-[rgba(53,208,127,0.5)] transition-all duration-200 group active:scale-[0.97]">
          开始诊断
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(true)} className="md:hidden flex flex-col gap-1 p-1.5">
          <span className="block w-5 h-[1.5px] bg-[var(--text-secondary)] rounded-full" />
          <span className="block w-5 h-[1.5px] bg-[var(--text-secondary)] rounded-full" />
          <span className="block w-4 h-[1.5px] bg-[var(--text-secondary)] rounded-full" />
        </button>
      </div>
    </motion.nav>

    {/* Mobile drawer */}
    <AnimatePresence>
      {mobileOpen && (<>
        <motion.div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
        <motion.div className="fixed top-0 right-0 bottom-0 w-[280px] bg-[var(--bg-card)] border-l border-[var(--border-subtle)] z-50 md:hidden flex flex-col"
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.25 }}>
          <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)]">
            <span className="text-[16px] font-bold">PC DOCTOR</span>
            <button onClick={() => setMobileOpen(false)} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex-1 p-4 space-y-0.5">
            {navLinks.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="w-full text-left px-4 py-3 rounded-[6px] text-[15px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.03)]">
                <span className="text-[11px] text-[var(--text-placeholder)] mr-2">{l.num}</span>{l.label}
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-[var(--border-subtle)]">
            <button onClick={() => { setMobileOpen(false); onStartDiagnosis(); }}
              className="w-full py-3 rounded-[6px] border border-[rgba(53,208,127,0.3)] text-[var(--accent-green)] text-[15px] font-semibold flex items-center justify-center gap-2">
              开始诊断<ArrowRight className="w-4 h-4" /></button>
          </div>
        </motion.div>
      </>)}
    </AnimatePresence>
  </>);
}
