import PhaseBackground from "./PhaseBackground";

// src/components/layout/AuthBackground.jsx
export default function AuthBackground({ children }) {
  return (
    <PhaseBackground>
      <div
        className="relative mx-auto flex w-full max-w-5xl items-center justify-center px-4"
        style={{
          // Images/GIF URLs can be inserted here for immersive auth pages.
          backgroundImage: "none",
        }}
      >
        {children}
      </div>
    </PhaseBackground>
  );
}
