import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function PhaseBackground({ children }) {
  const { theme } = useContext(EmotionContext);

  return (
    <div
      className={`
        phase-background
        min-h-screen w-full
        bg-gradient-to-br ${theme.gradientClass}
        transition-[background] duration-[1200ms]
        relative overflow-hidden
      `}
      style={{
        // Background gradient is injected dynamically per LifePhase.
        "--phase-accent": theme.accent,
        "--phase-glow": theme.glowColor,
        "--particle-speed": theme.particleSpeed,
      }}
    >
      <div className="phase-mesh" aria-hidden="true" />
      <div className="phase-noise" aria-hidden="true" />
      <div className="phase-blobs" aria-hidden="true">
        <span className="phase-blob blob-1" />
        <span className="phase-blob blob-2" />
        <span className="phase-blob blob-3" />
      </div>

      {/* Particle effect is configured here. */}
      <div className="fireflies" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} className="firefly" />
        ))}
      </div>

      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

      <div className="relative z-10 w-full px-6 pt-24 pb-16">
        {children}
      </div>
    </div>
  );
}
