import PhaseBackground from "./PhaseBackground";
import forestBg from "../../assets/forest-night-background.gif";

// src/components/layout/AuthBackground.jsx
export default function AuthBackground({ children }) {
  return (
    <PhaseBackground
      backgroundImage={forestBg}
      backgroundClassName="phase-cinematic phase-cinematic--blur"
      fireflyCount={4}
      accentOverride="#FCD34D"
      glowOverride="rgba(252, 211, 77, 0.25)"
      particleSpeedOverride="34s"
      showBlobs={false}
    >
      <div className="auth-spotlight" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center px-4">
        {children}
      </div>
    </PhaseBackground>
  );
}
