import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import GlassCard from "../components/layout/GlassCard";
import AuthBackground from "../components/layout/AuthBackground";
import { useFirefly } from "../context/FireflyContext";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useContext(AuthContext);
  const { emit } = useFirefly();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      setSuccess(true);
      emit("auth_success");
      setTimeout(() => navigate("/mood"), 850);
    } catch (err) {
      emit("error");
      setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <GlassCard className="auth-card" variant="elevated">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
          <p className="text-sm text-white/70">Sign in to continue with clarity.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="floating-field">
            <input
              type="email"
              className="floating-input peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="floating-label">Email address</label>
          </div>

          <div className="floating-field">
            <input
              type="password"
              className="floating-input peer"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="floating-label">Password</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <p className="text-center text-sm text-white/60">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-white hover:text-white/90">
            Create one
          </Link>
        </p>
      </GlassCard>

      {success && (
        <motion.div
          className="auth-success-fly"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="auth-firefly"
            initial={{ x: 0, y: 0 }}
            animate={{ x: 220, y: -240, opacity: 0.7 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AuthBackground>
  );
}
