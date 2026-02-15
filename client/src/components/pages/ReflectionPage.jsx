import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { motion } from "framer-motion";

export default function ReflectionPage() {
  return (
    <PhaseBackground>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl"
      >
        <GlassCard>
          <h2 className="text-2xl font-semibold text-white">Reflection</h2>
          <p className="mt-3 text-white/70">
            This space will hold your private reflections and guided prompts.
          </p>
        </GlassCard>
      </motion.div>
    </PhaseBackground>
  );
}
