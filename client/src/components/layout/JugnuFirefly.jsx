import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useLocation } from "react-router-dom";
import { EmotionContext } from "../../context/EmotionContext";
import { useFirefly } from "../../context/FireflyContext";

const PHASE_CONFIG = {
  CALM: { color: "#5EEAD4", speed: 0.6, drift: 6, jitter: 0 },
  STRESS: { color: "#F97316", speed: 1.1, drift: 7, jitter: 1.2 },
  LONELINESS: { color: "#93C5FD", speed: 0.5, drift: 5, jitter: 0 },
  ANXIETY: { color: "#FCA5A5", speed: 1.3, drift: 7, jitter: 1.6 },
  CONFUSION: { color: "#A78BFA", speed: 0.9, drift: 6, jitter: 0.8 },
  LOW_MOTIVATION: { color: "#FDE047", speed: 0.4, drift: 5, jitter: 0 },
  NEUTRAL: { color: "#F8FAFC", speed: 0.6, drift: 6, jitter: 0 },
};

const PAGE_OFFSETS = {
  "/dashboard": { x: -80, y: 80 },
  "/reflection": { x: -120, y: 180 },
  "/insights": { x: -40, y: 60 },
  "/mood": { x: -40, y: 120 },
  "/login": { x: -20, y: 20 },
  "/register": { x: -20, y: 20 },
  "/": { x: -40, y: 40 },
};

export default function JugnuFirefly() {
  const { dashboard } = useContext(EmotionContext);
  const { event } = useFirefly();
  const { pathname } = useLocation();
  const phase = dashboard?.currentPhase || "NEUTRAL";
  const config = PHASE_CONFIG[phase] || PHASE_CONFIG.NEUTRAL;
  const color = config.color;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rafRef = useRef(null);
  const [mode, setMode] = useState("idle");

  useEffect(() => {
    if (!event) return;
    setMode(event.type || "idle");
    const timeout = setTimeout(() => setMode("idle"), 1200);
    return () => clearTimeout(timeout);
  }, [event]);

  useEffect(() => {
    const offset = PAGE_OFFSETS[pathname] || PAGE_OFFSETS["/"];
    let start = performance.now();

    const tick = (now) => {
      const t = (now - start) * 0.001 * config.speed;
      const driftX = Math.sin(t * 1.4) * config.drift;
      const driftY = Math.cos(t * 1.1) * config.drift;
      const jitterX = config.jitter ? (Math.random() - 0.5) * config.jitter : 0;
      const jitterY = config.jitter ? (Math.random() - 0.5) * config.jitter : 0;

      x.set(offset.x + driftX + jitterX);
      y.set(offset.y + driftY + jitterY);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pathname, config, x, y]);

  const glowStyle = useMemo(
    () => ({
      boxShadow: `0 0 24px ${color}55, 0 0 40px ${color}22`,
      background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0.2) 60%, transparent 70%)`,
    }),
    [color]
  );

  return (
    <motion.div
      className={`jugnu-firefly ${mode}`.trim()}
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <svg className="firefly-svg" viewBox="0 0 64 64" aria-hidden="true">
        <g className="wing left">
          <ellipse cx="22" cy="32" rx="16" ry="9" />
        </g>
        <g className="wing right">
          <ellipse cx="42" cy="32" rx="16" ry="9" />
        </g>
        <circle className="core" cx="32" cy="34" r="6" />
      </svg>
      <div className="firefly-glow" style={glowStyle} />
    </motion.div>
  );
}
