import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import GlassCard from "../components/layout/GlassCard";
import AuthBackground from "../components/layout/AuthBackground";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthBackground>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center"
      >
        <GlassCard>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            Welcome back 🌙
          </h2>

          <p className="text-white/70 mb-6">
            We missed you. Take a breath.
          </p>

          <input
            className="w-full p-3 rounded-lg mb-4 bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 rounded-lg mb-6 bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => login(email, password)}
            className="
              w-full py-3 rounded-lg
              bg-white/30 hover:bg-white/40
              transition-all duration-300
              text-white font-medium
            "
          >
            Continue gently
          </button>

          <p className="mt-6 text-center text-sm text-white/60">
            You’re safe here 💛
          </p>
        </GlassCard>
      </motion.div>
    </AuthBackground>
  );
}
