import PhaseBackground from "./PhaseBackground";

export default function AuthBackground({ children }) {
  return (
    <PhaseBackground
      variant="auth"
      showGlow={true}
      showFireflies={true}
      className="auth-background"
    >
      <div className="auth-shell">
        <div className="auth-blur" aria-hidden="true" />
        <div className="auth-spotlight" aria-hidden="true" />
        <div className="auth-card-wrap">{children}</div>
      </div>
    </PhaseBackground>
  );
}
