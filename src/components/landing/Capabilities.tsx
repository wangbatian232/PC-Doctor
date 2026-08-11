"use client";

import { motion } from "framer-motion";
import FadingVideo from "@/components/shared/FadingVideo";

/* ── Icons ── */
function ImageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-.9 2-2V5c0-1-1-2-2-2zm-2 14H5v-2l3-3 4 4 5-5 3 3v3zm0-4.5l-3-3-5 5-4-4-3 3V5h16v7.5z" />
    </svg>
  );
}
function MovieIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 4l2 3h-3l-2-3h-2l2 3h-3l-2-3H8l2 3H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm2 14H4V6h16v12z" />
    </svg>
  );
}
function LightbulbIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
    </svg>
  );
}

const cards = [
  {
    icon: <ImageIcon />,
    title: "Design",
    tags: ["Brand Systems", "Art Direction", "Visual Identity", "Motion"],
    body: "We shape identities and interfaces that feel unmistakably yours — typographic systems, component libraries, and art-directed pages that scale without losing soul.",
  },
  {
    icon: <MovieIcon />,
    title: "Engineering",
    tags: ["React", "Next.js", "Headless CMS", "Edge-Ready"],
    body: "Production-grade front-ends built on modern stacks. Performant, accessible, and instrumented — with code your team will enjoy extending long after launch.",
  },
  {
    icon: <LightbulbIcon />,
    title: "Growth",
    tags: ["SEO", "Analytics", "A/B Testing", "Retention"],
    body: "Launch is the starting line. We partner with your team on conversion, content, and iteration loops that turn a beautiful site into a compounding asset.",
  },
];

const initial = { filter: "blur(10px)", opacity: 0, y: 20 };
const animate = { filter: "blur(0px)", opacity: 1, y: 0 };

export default function Capabilities() {
  return (
    <section className="min-h-screen overflow-hidden bg-black relative">
      {/* Background video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 px-6 md:px-14 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="mb-auto">
          <motion.p initial={initial} animate={animate} transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-sm font-body text-white/80 mb-6">
            // Capabilities
          </motion.p>
          <motion.h2 initial={initial} animate={animate} transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            className="font-heading italic text-5xl md:text-6xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
            Studio craft,<br />end to end
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div key={card.title} initial={initial} animate={animate}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: "easeOut" }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col">
              {/* Top: icon + tags */}
              <div className="flex items-start justify-between gap-3">
                <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center text-white/80">
                  {card.icon}
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {card.tags.map((t) => (
                    <span key={t} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* Spacer */}
              <div className="flex-1" />
              {/* Bottom: title + body */}
              <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none">{card.title}</h3>
              <p className="text-sm text-white/90 font-body font-light leading-snug mt-3 max-w-[32ch]">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
