import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { theme } = useContext(EmotionContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2 text-white/90">
            <span
              className="h-9 w-9 rounded-full border border-white/20 bg-white/20 shadow-[0_0_25px_var(--phase-glow)]"
              style={{ "--phase-glow": theme.glowColor }}
            />
            <span className="text-lg font-semibold tracking-wide">Jugnu</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link to="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/reflection" className="hover:text-white transition-colors">
              Reflection
            </Link>
            <Link to="/insights" className="hover:text-white transition-colors">
              Insights
            </Link>
          </div>

          <div
            className="h-10 w-10 rounded-full border border-white/20 bg-white/10 shadow-[0_0_18px_var(--phase-glow)]"
            style={{ "--phase-glow": theme.glowColor }}
            aria-label="User avatar"
          />
        </div>
      </div>
    </nav>
  );
}
