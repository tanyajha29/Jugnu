import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function PhaseBackground({
  children,
  showNoise = true,
  showAmbient = true,
  className = "",
}) {
  const { theme } = useContext(EmotionContext);

  return (
    <div
      className={`
        phase-background
        min-h-screen w-full
        transition-all duration-300
        relative overflow-hidden
        ${className}
      `}
      style={{
        "--phase-accent": theme.accent,
      }}
    >
      {showAmbient && <div className="phase-ambient" aria-hidden="true" />}
      {showNoise && <div className="phase-noise" aria-hidden="true" />}

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
