import { motion } from "framer-motion";
import GlassCard from "../layout/GlassCard";

export default function AddMoodCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <GlassCard className="flex h-full flex-col items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Add Mood</h3>
          <p className="mt-2 text-white/70">
            A quick check-in helps Jugnu learn your rhythm.
          </p>
        </div>
        <button
          className="mt-6 rounded-2xl border border-white/20 bg-white/20 px-5 py-2 text-white shadow-[0_0_20px_var(--phase-glow)] transition hover:bg-white/30"
          style={{ "--phase-glow": "var(--phase-glow)" }}
        >
          + Log mood
        </button>
      </GlassCard>
    </motion.div>
  );
}
