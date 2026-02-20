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
      <GlassCard className="flex flex-col gap-32 p-40">
        <div className="flex flex-col gap-8 text-center md:text-left">
          <h2 className="text-h2 text-white">Start your journey</h2>
          <p className="text-white-80">Find your light and understand your patterns.</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-24">
          <div className="flex flex-col gap-16">
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-16 py-12 text-white placeholder-white/40 outline-none transition-all focus:border-white/30 focus:bg-white/10"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              placeholder="Create password"
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
            {loading ? "Creating account..." : "Begin Journey"}
          </button>
        </form>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-12 text-center text-sm text-red-200">
            {error}
          </div>
        )}

        <p className="text-center text-sm text-white-80">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-white hover:underline">
            Login here
          </Link>
        </p>
      </GlassCard>
    </AuthBackground>
  );
}
