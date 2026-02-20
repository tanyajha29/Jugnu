import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import FireflyEngine from "./FireflyEngine";

export default function PhaseBackground({
  children,
  fireflyCount = 6,
  fireflyAnimation,
  showNoise = true,
  className = "",
}) {
  const { theme } = useContext(EmotionContext);
  const accent = theme.accent;
  const particleSpeed = theme.particleSpeed;

  return (
    <div
      className={`
        phase-background
        min-h-screen w-full
        bg-gradient-to-br ${theme.gradientClass}
        transition-all duration-[1200ms]
        relative overflow-hidden
        ${className}
      `}
      style={{
        "--phase-accent": accent,
        "--particle-speed": particleSpeed,
      }}
    >
      {/* Radial ambient lighting layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 800px 600px at 50% 40%, rgba(255,255,255,0.05) 0%, transparent 70%)`
        }}
        aria-hidden="true"
      />

      {/* Subtle grain overlay */}
      {showNoise && <div className="phase-noise pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />}

      {/* Firefly particle system */}
      <FireflyEngine count={Math.min(fireflyCount, 8)} animation={fireflyAnimation} />

      {/* Content wrapper */}
      <div className="relative z-10 w-full px-6 pt-24 pb-16">
        {children}
      </div>
    </div>
  );
}
