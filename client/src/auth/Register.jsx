import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import GlassCard from "../components/layout/GlassCard";
import AuthBackground from "../components/layout/AuthBackground";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register({ name, email, password });
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <GlassCard className="space-y-8 p-12 sm:p-16">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="h2 text-white-90">Start your journey</h2>
          <p className="body-sm text-white-60">Understand your emotions with AI-powered insights.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Input */}
          <input
            className="w-full rounded-[24px] border border-white/8 bg-white/4 px-6 py-4 text-body text-white placeholder-white/30 transition-all duration-300 focus:border-white/15 focus:bg-white/8 focus:outline-none"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="Create password"
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
            {loading ? "Creating account..." : "Begin journey"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="rounded-[24px] border border-red-500/20 bg-red-500/8 px-6 py-4 text-center text-body-sm text-red-300">
            {error}
          </div>
        )}

        {/* Login Link */}
        <p className="text-center text-body-sm text-white-60">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-white-90 transition-color duration-300 hover:text-white">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </AuthBackground>
  );
}
