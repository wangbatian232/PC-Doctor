"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight, Activity } from "lucide-react";

export default function CTASection({ onStartDiagnosis }: { onStartDiagnosis: () => void }) {
  return (
    <section className="section-cta page-container text-center">
      <ScrollReveal>
        <span className="t-mono text-[var(--accent-green)] mb-3 block">GET STARTED</span>
        <h2 className="t-section text-[var(--text-primary)] mb-4">现在，给你的电脑做一次体检。</h2>
        <p className="t-body mb-8">30 秒，知道你的电脑到底怎么样。</p>
        <motion.button onClick={onStartDiagnosis}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[8px] border border-[rgba(53,208,127,0.35)] text-[var(--accent-green)] text-[16px] font-semibold hover:bg-[rgba(53,208,127,0.08)] hover:border-[rgba(53,208,127,0.5)] transition-all duration-200 group"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          开始免费诊断 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </motion.button>
      </ScrollReveal>
    </section>
  );
}
