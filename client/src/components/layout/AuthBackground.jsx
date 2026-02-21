import PhaseBackground from "./PhaseBackground";

export default function AuthBackground({ children }) {
  return (
    <PhaseBackground
      fireflyCount={3}
      showNoise={true}
      showAmbient={true}
      className="pt-32"
    >
      <div className="flex min-h-screen items-center justify-center">
        {/* Premium spotlight effect */}
        <div className="auth-spotlight" aria-hidden="true" />

        {/* Centered card container */}
        <div className="relative z-10 w-full max-w-sm px-8">
          {children}
        </div>
      </div>
    </PhaseBackground>
  );
}
