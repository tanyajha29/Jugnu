import { useContext, useMemo } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import { NavLink, Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { theme, dashboard } = useContext(EmotionContext);
  const { pathname } = useLocation();

  const phaseLabel = useMemo(() => {
    const raw = dashboard?.currentPhase || "NEUTRAL";
    return raw.toLowerCase().replace(/_/g, " ");
  }, [dashboard]);

  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mt-8 flex items-center justify-between rounded-[24px] border border-white/10 bg-black/30 px-8 py-4 backdrop-blur-xl transition-all duration-300">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-3 text-white">
            <span
              className="h-7 w-7 rounded-full border border-white/20 bg-white/10"
              style={{ boxShadow: `0 0 10px ${theme.accent}30` }}
            />
            <span className="text-lg font-semibold tracking-tight">Jugnu</span>
          </Link>

          {/* Center: Links */}
          <div className="hidden items-center gap-12 text-sm text-white/70 md:flex">
            {[
              { label: "Dashboard", to: "/dashboard" },
              { label: "Reflection", to: "/reflection" },
              { label: "Insights", to: "/insights" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right: Phase Badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.accent }} />
            {phaseLabel}
          </div>
        </div>
      </div>
    </nav>
  );
}
