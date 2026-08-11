"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function BlurText({ text, className = "", delay = 0 }: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "0.1em" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={inView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
