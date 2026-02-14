export default function GlassCard({ children }) {
  return (
    <div
      className="
        w-full max-w-md
        p-8
        rounded-2xl
        bg-white/20
        backdrop-blur-xl
        border border-white/30
        shadow-[0_30px_60px_rgba(0,0,0,0.35)]
        text-white
        transition-transform duration-300
        hover:scale-[1.01]
      "
    >
      {children}
    </div>
  );
}
