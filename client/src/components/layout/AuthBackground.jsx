import PhaseBackground from "./PhaseBackground";

export default function AuthBackground({ children }) {
  return (
    <PhaseBackground
      fireflyCount={4}
      showNoise={true}
    >
      <div className="flex min-h-[70vh] items-center justify-center py-64">
        {/* Subtle spotlight behind card */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-md">
          {children}
        </div>
      </div>
    </PhaseBackground>
  );
}
