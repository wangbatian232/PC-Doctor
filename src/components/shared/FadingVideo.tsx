"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: React.CSSProperties;
}

export default function FadingVideo({ src, className = "", style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);
  const indexRef = useRef(0);
  const sources = Array.isArray(src) ? src : [src];
  const rafRef = useRef(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  const animate = useCallback(() => {
    const cur = currentRef.current;
    const tgt = targetRef.current;
    if (Math.abs(cur - tgt) < 0.005) { currentRef.current = tgt; setOpacity(tgt); return; }
    currentRef.current += (tgt - cur) * 0.08;
    setOpacity(currentRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const fadeIn = useCallback(() => { targetRef.current = 1; animate(); }, [animate]);
  const fadeOut = useCallback(() => { targetRef.current = 0; animate(); }, [animate]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onLoaded = () => fadeIn();
    const onTime = () => {
      if (vid.currentTime > 0 && vid.duration - vid.currentTime <= 0.55) fadeOut();
    };
    const onEnded = () => {
      if (sources.length === 1) { vid.currentTime = 0; vid.play(); fadeIn(); }
      else { indexRef.current = (indexRef.current + 1) % sources.length; vid.src = sources[indexRef.current]; vid.play(); }
    };

    vid.addEventListener("loadeddata", onLoaded);
    vid.addEventListener("timeupdate", onTime);
    vid.addEventListener("ended", onEnded);
    return () => {
      vid.removeEventListener("loadeddata", onLoaded);
      vid.removeEventListener("timeupdate", onTime);
      vid.removeEventListener("ended", onEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [fadeIn, fadeOut, sources]);

  const srcAttr = sources[indexRef.current];

  return (
    <video
      ref={videoRef}
      src={srcAttr}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity, ...style, transition: "none" }}
    />
  );
}
