import { useContext, useEffect, useRef, useState } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import FireflyEngine from "./FireflyEngine";

export default function PhaseBackground({
  children,
  fireflyCount = 6,
  fireflyAnimation,
  showNoise = true,
  showAmbient = true,
  className = "",
}) {
  const { theme } = useContext(EmotionContext);
  const accent = theme.accent;
  const particleSpeed = theme.particleSpeed;
  const [interaction, setInteraction] = useState(0);
  const [pulse, setPulse] = useState(0);
  const interactionTimer = useRef(null);
  const pulseTimer = useRef(null);

  useEffect(() => {
    const handlePulse = () => {
      setPulse(1);
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
      pulseTimer.current = setTimeout(() => setPulse(0), 500);
    };
    window.addEventListener("jugnu:particle-pulse", handlePulse);
    return () => {
      window.removeEventListener("jugnu:particle-pulse", handlePulse);
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (interactionTimer.current) clearTimeout(interactionTimer.current);
    };
  }, []);

  const handlePointerMove = () => {
    setInteraction(1);
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setInteraction(0), 350);
  };

  return (
    <div
      className={`
        phase-background
        min-h-screen w-full
        bg-gradient-to-br ${theme.gradientClass}
        transition-all duration-300
        relative overflow-hidden
        ${className}
      `}
      style={{
        "--phase-accent": accent,
        "--phase-glow": theme.glowColor,
        "--particle-speed": particleSpeed,
        "--interaction": interaction,
        "--pulse": pulse,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setInteraction(0)}
    >
      {/* Ambient lighting layer for depth */}
      {showAmbient && <div className="phase-ambient" aria-hidden="true" />}

      {/* Subtle grain texture overlay */}
      {showNoise && <div className="phase-noise" aria-hidden="true" />}

      {/* Firefly particle system - max 8 particles, phase-aware animation */}
      <FireflyEngine count={Math.min(fireflyCount, 8)} animation={fireflyAnimation} />

      {/* Content wrapper with proper spacing */}
      <div className="relative z-10 w-full h-full px-8">
        {children}
      </div>
    </div>
  );
}
