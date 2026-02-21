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
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
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
      <div className="mx-auto w-full max-w-7xl px-8">
        <div
          className={`mt-8 flex items-center justify-between rounded-[24px] border border-white/8 bg-white/4 px-8 py-4 backdrop-blur-md transition-all duration-300 ${
            isScrolled ? "border-white/12 bg-white/6 shadow-[0_8px_32px_rgba(0,0,0,0.2)]" : ""
          }`}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-white-95 transition-color hover:text-white duration-300"
          >
            <div
              className="h-8 w-8 rounded-full border border-white/20 bg-white/10"
              style={{
                boxShadow: `0 0 12px ${theme.accent}20`,
              }}
              aria-hidden="true"
            />
            <span className="text-h3 font-semibold tracking-tight">Jugnu</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-12 text-body-sm text-white-60 md:flex">
            <Link
              to="/dashboard"
              className="transition-color duration-300 hover:text-white-80"
            >
              Dashboard
            </Link>
            <Link
              to="/reflection"
              className="transition-color duration-300 hover:text-white-80"
            >
              Reflection
            </Link>
            <Link
              to="/insights"
              className="transition-color duration-300 hover:text-white-80"
            >
              Insights
            </Link>
          </div>

          {/* Right Side: Phase Badge & Menu */}
          <div className="flex items-center gap-4">
            {/* Phase Badge */}
            <div
              className="hidden rounded-full border border-white/10 bg-white/6 px-4 py-1.5 text-caption text-white-60 transition-all duration-300 md:inline-block"
              style={{
                color: theme.accent,
              }}
            >
              {phaseLabel}
            </div>

            {/* User Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 transition-all duration-300 hover:bg-white/12 hover:border-white/20"
              aria-label="User menu"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white-60" />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-8 top-24 w-52 animate-fade-in rounded-[24px] border border-white/10 bg-white/6 p-2 text-body-sm text-white-60 shadow-[0_12px_40px_rgba(0,0,0,0.3)] backdrop-blur-lg">
                {/* User Name Header */}
                <div className="px-4 py-3 text-caption text-white-40">
                  {user?.name || "Guest"}
                </div>

                {/* Menu Items */}
                <Link
                  to="/dashboard"
                  className="block rounded-[16px] px-4 py-2.5 transition-all duration-300 hover:bg-white/8"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/reflection"
                  className="block rounded-[16px] px-4 py-2.5 transition-all duration-300 hover:bg-white/8"
                  onClick={() => setMenuOpen(false)}
                >
                  Reflection
                </Link>
                <Link
                  to="/insights"
                  className="block rounded-[16px] px-4 py-2.5 transition-all duration-300 hover:bg-white/8"
                  onClick={() => setMenuOpen(false)}
                >
                  Insights
                </Link>

                {/* Logout Button */}
                {user && (
                  <>
                    <div className="my-1 border-t border-white/8" />
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="w-full rounded-[16px] px-4 py-2.5 text-left transition-all duration-300 hover:bg-white/8"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
