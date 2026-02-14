// src/components/layout/AuthBackground.jsx

export default function AuthBackground({ children }) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/calm_bg.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark calming overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 w-full flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
