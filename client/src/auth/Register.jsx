import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import GlassCard from "../components/layout/GlassCard";
import AuthBackground from "../components/layout/AuthBackground";

export default function Register() {
  const { register } = useContext(AuthContext);

  const [name, setName] = useState("");
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
            Start your journey 🌸
          </h2>

          {name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/80 mb-4"
            >
              Hi <span className="font-medium">{name}</span> 💗, we’re glad you’re here.
            </motion.p>
          )}

          <input
            className="w-full p-3 rounded-lg mb-4 bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />

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
            onClick={() => register(name, email, password)}
            className="
              w-full py-3 rounded-lg
              bg-white/30 hover:bg-white/40
              transition-all duration-300
              text-white font-medium
            "
          >
            Begin my journey
          </button>

          <p className="mt-6 text-center text-sm text-white/60">
            We’ll take care of you here 🌷
          </p>
        </GlassCard>
      </motion.div>
    </AuthBackground>
  );
}
