"use client";

import { motion } from "framer-motion";
import FadingVideo from "@/components/shared/FadingVideo";
import BlurText from "@/components/shared/BlurText";

interface HeroProps { onStartDiagnosis: () => void; }

/* ── Custom SVG Icons ── */
function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      <circle cx="12" cy="12" r="9" /><line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9" /><path d="M12 3a15 15 0 0 0-4 9 15 15 0 0 0 4 9" />
    </svg>
  );
}

const logos = ["Aeon", "Vela", "Apex", "Orbit", "Zeno"];

export default function HeroSection({ onStartDiagnosis }: HeroProps) {
  const initial = { filter: "blur(10px)", opacity: 0, y: 20 };
  const animate = { filter: "blur(0px)", opacity: 1, y: 0 };

  return (
    <section className="h-screen overflow-hidden bg-black relative">
      {/* Background video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: "120%", height: "120%" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16">
          <div className="liquid-glass h-11 w-11 rounded-full flex items-center justify-center">
            <span className="font-heading italic text-xl">P</span>
          </div>
          <div className="hidden md:flex liquid-glass rounded-full px-1.5 py-1.5 items-center gap-0.5">
            {["诊断", "瓶颈", "游戏", "升级", "报告"].map((l) => (
              <button key={l} className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors">
                {l}
              </button>
            ))}
            <button onClick={onStartDiagnosis} className="ml-1 px-3 py-2 rounded-full bg-white text-black text-sm font-medium font-body flex items-center gap-1 hover:bg-gray-200 transition-colors">
              开始诊断 <ArrowUpRight />
            </button>
          </div>
          <div className="h-11 w-11" />
        </nav>

        {/* Main */}
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center">
          {/* Badge */}
          <motion.div initial={initial} animate={animate} transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}>
            <div className="liquid-glass rounded-full px-4 py-1.5 inline-flex items-center gap-2">
              <span className="bg-white text-black text-[10px] font-medium px-2 py-0.5 rounded-full font-body">NEW</span>
              <span className="text-sm text-white/80 font-body">Free diagnostic tool — no signup required</span>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="mt-6 max-w-3xl">
            <BlurText
              text="Crafted Digital Experiences Built to Outlast Trends"
              className="text-5xl md:text-6xl lg:text-[5rem] font-heading italic text-white leading-[0.8] tracking-[-3px]"
              delay={0.5}
            />
          </div>

          {/* Subtext */}
          <motion.p initial={initial} animate={animate} transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="text-sm md:text-base text-white/80 max-w-2xl mt-4 font-body font-light leading-tight px-4">
            We are a small studio of designers and engineers shaping brand-defining websites for ambitious companies. Precise typography, cinematic motion, and code you can be proud of.
          </motion.p>

          {/* CTA buttons */}
          <motion.div initial={initial} animate={animate} transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
            className="mt-6 flex items-center gap-6">
            <button onClick={onStartDiagnosis}
              className="liquid-glass-strong rounded-full px-6 py-3 text-white font-body font-medium flex items-center gap-2 hover:bg-white/5 transition-colors">
              开始诊断 <ArrowUpRight />
            </button>
          </motion.div>

          {/* Stats cards */}
          <motion.div initial={initial} animate={animate} transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem]">
              <ClockIcon />
              <p className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4">6 Weeks</p>
              <p className="text-xs text-white/70 font-body font-light mt-1">Average End-to-End Launch Time</p>
            </div>
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem]">
              <GlobeIcon />
              <p className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4">140+</p>
              <p className="text-xs text-white/70 font-body font-light mt-1">Brands Shipped Across Four Continents</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust bar */}
        <motion.div initial={initial} animate={animate} transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 pb-8">
          <div className="liquid-glass rounded-full px-6 py-2.5">
            <span className="text-sm text-white/80 font-body">Trusted by founders, operators, and creative directors worldwide</span>
          </div>
          <div className="flex gap-10 md:gap-14">
            {logos.map((l) => (
              <span key={l} className="font-heading italic text-2xl md:text-3xl tracking-tight text-white/60">{l}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
