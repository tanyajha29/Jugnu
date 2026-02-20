import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import GlassCard from "../components/layout/GlassCard";
import AuthBackground from "../components/layout/AuthBackground"; // No background images

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <GlassCard className="flex flex-col gap-32 p-40">
        <div className="flex flex-col gap-8">
          <h2 className="text-h2 text-white">Welcome back</h2>
          <p className="text-white-80">Take a breath and continue your journey.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-24">
          <div className="flex flex-col gap-16">
            <input
              type="email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-16 py-12 text-white placeholder-white/40 outline-none transition-all focus:border-white/30 focus:bg-white/10"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-16 py-12 text-white placeholder-white/40 outline-none transition-all focus:border-white/30 focus:bg-white/10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white/10 py-16 font-semibold text-white transition-all duration-300 hover:bg-white/20 disabled:opacity-50 active:scale-95"
          >
            {loading ? "Signing in..." : "Continue Gently"}
          </button>
        </form>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-12 text-center text-sm text-red-200">
            {error}
          </div>
        )}

        <p className="text-center text-sm text-white-80">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-white hover:underline">
            Register here
          </Link>
        </p>
      </GlassCard>
    </AuthBackground>
  );
}
