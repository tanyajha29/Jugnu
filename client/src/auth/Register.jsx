import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import GlassCard from "../components/layout/GlassCard";
import AuthBackground from "../components/layout/AuthBackground";
import { useFirefly } from "../context/FireflyContext";
import { motion } from "framer-motion";

export default function Register() {
  const { register } = useContext(AuthContext);
  const { emit } = useFirefly();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register({ name, email, password });
      setSuccess(true);
      emit("auth_success");
      setTimeout(() => navigate("/mood"), 850);
    } catch (err) {
      emit("error");
      setError(err?.response?.data?.message || "Registration failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <GlassCard className="auth-card" variant="elevated">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-white">Start your journey</h2>
          <p className="text-sm text-white/70">Create a space for clarity and growth.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="floating-field">
            <input
              className="floating-input peer"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="floating-label">Full name</label>
          </div>

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
            <label className="floating-label">Create password</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <p className="text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:text-white/90">
            Sign in
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
