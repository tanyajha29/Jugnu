import { useContext, useEffect, useMemo, useState } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { theme } = useContext(EmotionContext);
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phaseLabel = useMemo(() => {
    const raw = user?.currentPhase || "NEUTRAL";
    return raw.toLowerCase().replace(/_/g, " ");
  }, [user]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-xl transition-all duration-300 ${
            isScrolled ? "shadow-[0_12px_40px_rgba(15,23,42,0.35)]" : ""
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
          >
            <span
              className="logo-pulse h-9 w-9 rounded-full border border-white/20 bg-white/20"
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

          <div className="flex items-center gap-3">
            <span
              className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/70 md:inline-flex"
              style={{
                boxShadow: `0 0 16px ${theme.glowColor}`,
                color: theme.accent,
              }}
            >
              {phaseLabel}
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_18px_var(--phase-glow)] transition hover:bg-white/20"
              style={{ "--phase-glow": theme.glowColor }}
              aria-label="User menu"
            >
              <span className="h-2 w-2 rounded-full bg-white/70" />
              <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-white/50" />
            </button>

            {menuOpen && (
              <div className="absolute right-6 top-20 w-44 rounded-2xl border border-white/10 bg-slate-900/70 p-2 text-sm text-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.5)] backdrop-blur-xl">
                <div className="px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/50">
                  {user?.name || "Guest"}
                </div>
                <Link
                  to="/dashboard"
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/reflection"
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  Reflection
                </Link>
                <Link
                  to="/insights"
                  className="block rounded-xl px-3 py-2 hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  Insights
                </Link>
                {user && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-white/80 hover:bg-white/15"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
