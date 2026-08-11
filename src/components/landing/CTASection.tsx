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
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[8px] bg-[var(--accent-green)] text-[var(--bg-void)] text-[16px] font-semibold hover:bg-[var(--accent-green-hover)] transition-colors group"
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          开始免费诊断 <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </ScrollReveal>
    </section>
  );
}
