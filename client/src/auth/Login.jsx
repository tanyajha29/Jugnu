import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import GlassCard from "../components/layout/GlassCard";
import AuthBackground from "../components/layout/AuthBackground";

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
      <GlassCard className="space-y-8 p-12 sm:p-16">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="h2 text-white-90">Welcome back</h2>
          <p className="body-sm text-white-60">Continue your emotional journey with clarity.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <input
            type="email"
            className="w-full rounded-[24px] border border-white/8 bg-white/4 px-6 py-4 text-body text-white placeholder-white/30 transition-all duration-300 focus:border-white/15 focus:bg-white/8 focus:outline-none"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            className="w-full rounded-[24px] border border-white/8 bg-white/4 px-6 py-4 text-body text-white placeholder-white/30 transition-all duration-300 focus:border-white/15 focus:bg-white/8 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[24px] border border-white/10 bg-white/8 py-4 text-body font-medium text-white transition-all duration-300 hover:border-white/15 hover:bg-white/12 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="rounded-[24px] border border-red-500/20 bg-red-500/8 px-6 py-4 text-center text-body-sm text-red-300">
            {error}
          </div>
        )}

        {/* Register Link */}
        <p className="text-center text-body-sm text-white-60">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-white-90 transition-color duration-300 hover:text-white">
            Create one
          </Link>
        </p>
      </GlassCard>
    </AuthBackground>
  );
}
