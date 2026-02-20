import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function PhaseBackground({
  children,
  backgroundImage,
  backgroundClassName = "",
  overlayImage,
  overlayClassName = "",
  fireflyCount,
  showMesh = true,
  showNoise = true,
  showBlobs = true,
  accentOverride,
  glowOverride,
  particleSpeedOverride,
  className = "",
}) {
  const { theme } = useContext(EmotionContext);
  const accent = accentOverride || theme.accent;
  const glow = glowOverride || theme.glowColor;
  const particleSpeed = particleSpeedOverride || theme.particleSpeed;
  const resolvedFireflyCount = fireflyCount ?? theme.fireflyCount ?? 8;

  return (
    <div
      className={`
        phase-background
        min-h-screen w-full
        bg-gradient-to-br ${theme.gradientClass}
        transition-[background] duration-[1200ms]
        relative overflow-hidden
        ${className}
      `}
      style={{
        // Background gradient is injected dynamically per LifePhase.
        "--phase-accent": accent,
        "--phase-glow": glow,
        "--particle-speed": particleSpeed,
      }}
    >
      {backgroundImage && (
        <div
          className={`phase-cinematic ${backgroundClassName}`.trim()}
          aria-hidden="true"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {overlayImage && (
        <div
          className={`phase-overlay-image ${overlayClassName}`.trim()}
          aria-hidden="true"
          style={{ backgroundImage: `url(${overlayImage})` }}
        />
      )}

      {showMesh && <div className="phase-mesh" aria-hidden="true" />}
      {showNoise && <div className="phase-noise" aria-hidden="true" />}
      {showBlobs && (
        <div className="phase-blobs" aria-hidden="true">
          <span className="phase-blob blob-1" />
          <span className="phase-blob blob-2" />
          <span className="phase-blob blob-3" />
        </div>
      )}

      {/* Particle effect is configured here. */}
      <div className="fireflies" aria-hidden="true">
        {Array.from({ length: resolvedFireflyCount }).map((_, index) => (
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
