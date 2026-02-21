import { useContext, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useMotionValue } from "framer-motion";
import { EmotionContext } from "../../context/EmotionContext";

const PHASE_BEHAVIOR = {
  CALM: { amp: 10, speed: 0.6, jitter: 0, dim: 1 },
  STRESS: { amp: 8, speed: 0.9, jitter: 0, dim: 1 },
  LONELINESS: { amp: 4, speed: 0.4, jitter: 0, dim: 0.9 },
  ANXIETY: { amp: 6, speed: 1.1, jitter: 1.2, dim: 1 },
  CONFUSION: { amp: 8, speed: 0.8, jitter: 0.4, dim: 1 },
  LOW_MOTIVATION: { amp: 5, speed: 0.35, jitter: 0, dim: 0.75 },
  NEUTRAL: { amp: 6, speed: 0.5, jitter: 0, dim: 0.9 },
};

const ROUTE_ANCHOR = {
  "/": { x: 0.58, y: 0.28, amp: 8, speed: 0.8 },
  "/dashboard": { x: 0.2, y: 0.25, amp: 10, speed: 0.9 },
  "/reflection": { x: 0.55, y: 0.36, amp: 5, speed: 0.6 },
  "/insights": { x: 0.8, y: 0.2, amp: 3, speed: 0.4 },
  "/login": { x: 0.6, y: 0.3, amp: 4, speed: 0.5 },
  "/register": { x: 0.6, y: 0.3, amp: 4, speed: 0.5 },
};

export default function JugnuEntity() {
  const { theme, dashboard } = useContext(EmotionContext);
  const location = useLocation();
  const phase = dashboard?.currentPhase || "NEUTRAL";
  const behavior = PHASE_BEHAVIOR[phase] || PHASE_BEHAVIOR.NEUTRAL;
  const anchor = ROUTE_ANCHOR[location.pathname] || ROUTE_ANCHOR["/"];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glow = useMotionValue(0.6);
  const scale = useMotionValue(1);

  const effects = useRef({ pulse: 0, lift: 0, jitter: 0 });
  const drift = useRef({ dx: 1, dy: -1, nextShift: 0 });
  const rafId = useRef(0);

  const getViewport = () => ({
    w: window.innerWidth || 1200,
    h: window.innerHeight || 800,
  });

  const targetBase = useMemo(() => {
    const { w, h } = getViewport();
    return { x: w * anchor.x, y: h * anchor.y };
  }, [anchor.x, anchor.y, location.pathname]);

  useEffect(() => {
    const handleMood = () => {
      effects.current.pulse = 1;
      effects.current.lift = 0.6;
    };
    const handleTyping = () => {
      effects.current.pulse = 0.35;
    };
    const handlePhase = () => {
      effects.current.pulse = 0.6;
    };
    const handleSave = () => {
      effects.current.pulse = 1;
      effects.current.lift = 1;
    };

    window.addEventListener("jugnu:mood-log", handleMood);
    window.addEventListener("jugnu:reflection-typing", handleTyping);
    window.addEventListener("jugnu:phase-change", handlePhase);
    window.addEventListener("jugnu:reflection-save", handleSave);
    return () => {
      window.removeEventListener("jugnu:mood-log", handleMood);
      window.removeEventListener("jugnu:reflection-typing", handleTyping);
      window.removeEventListener("jugnu:phase-change", handlePhase);
      window.removeEventListener("jugnu:reflection-save", handleSave);
    };
  }, []);

  useEffect(() => {
    const loop = (time) => {
      const t = time / 1000;
      const { w, h } = getViewport();
      const baseX = w * anchor.x;
      const baseY = h * anchor.y;

      if (t > drift.current.nextShift) {
        drift.current = {
          dx: Math.random() * 2 - 1,
          dy: Math.random() * 2 - 1,
          nextShift: t + 3 + Math.random() * 3,
        };
      }

      const arcX = Math.sin(t * behavior.speed) * behavior.amp;
      const arcY = Math.cos(t * behavior.speed * 0.8) * behavior.amp;
      const confusionDrift =
        phase === "CONFUSION"
          ? { x: drift.current.dx * 4, y: drift.current.dy * 4 }
          : { x: 0, y: 0 };
      const jitter =
        behavior.jitter > 0
          ? Math.sin(t * 12) * behavior.jitter
          : 0;

      effects.current.pulse *= 0.92;
      effects.current.lift *= 0.9;

      const lift = effects.current.lift * 20;
      const targetX =
        baseX + arcX + confusionDrift.x + jitter * 1.5 + anchor.amp;
      const targetY =
        baseY + arcY + confusionDrift.y - lift;

      const currentX = x.get();
      const currentY = y.get();
      const nextX = currentX + (targetX - currentX) * 0.05;
      const nextY = currentY + (targetY - currentY) * 0.05;

      x.set(nextX);
      y.set(nextY);

      const glowValue = 0.45 + effects.current.pulse * 0.4;
      const scaleValue = 1 + effects.current.pulse * 0.06;
      glow.set(glowValue * behavior.dim);
      scale.set(scaleValue);

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, [anchor.amp, anchor.x, anchor.y, behavior.amp, behavior.dim, behavior.jitter, behavior.speed, phase, x, y, glow, scale]);

  return (
    <motion.div
      className="fixed z-[5] pointer-events-none"
      style={{ x, y, scale }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="jugnu-entity"
        style={{
          "--jugnu-accent": theme.accent,
          "--jugnu-glow": theme.glowColor,
          opacity: glow,
        }}
      >
        <span className="jugnu-aura" />
        <span className="jugnu-core" />
      </motion.div>
    </motion.div>
  );
}
