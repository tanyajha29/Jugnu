import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import FireflyField from "./FireflyField";

export default function PhaseBackground({
  children,
  variant = "app",
  showStars = false,
  showGlow = true,
  showFireflies = false,
  className = "",
}) {
  const { theme } = useContext(EmotionContext);

  const fireflyCount = variant === "reflection" ? 3 : variant === "auth" ? 4 : 6;
  const fireflySpeed = variant === "reflection" ? 1.6 : variant === "auth" ? 1.3 : 1;

  const glowStyle = {
    background: `radial-gradient(circle at 50% 40%, ${theme.accent}33, transparent 60%)`,
  };

  const fireflyColor = `${theme.accent}AA`;

  return (
    <div
      className={`phase-background phase-${variant} ${className}`.trim()}
      style={{ "--phase-accent": theme.accent }}
    >
      {showStars && <div className="starfield" aria-hidden="true" />}
      {showGlow && <div className="phase-glow" style={glowStyle} aria-hidden="true" />}
      {showFireflies && (
        <FireflyField
          count={fireflyCount}
          speedMultiplier={fireflySpeed}
          color={fireflyColor}
        />
      )}
      <div className="phase-content">{children}</div>
    </div>
  );
}
