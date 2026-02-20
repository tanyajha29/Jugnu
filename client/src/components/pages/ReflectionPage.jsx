import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { motion } from "framer-motion";
import glowHands from "../../assets/reflection-glow-hands.webp";

export default function ReflectionPage() {
  return (
    <PhaseBackground
      overlayImage={glowHands}
      overlayClassName="phase-overlay-hands"
      fireflyCount={4}
      accentOverride="#93C5FD"
      glowOverride="rgba(147, 197, 253, 0.35)"
      particleSpeedOverride="28s"
      showBlobs={false}
      className="from-sky-900/50 via-blue-900/40 to-slate-900/50"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-[720px] pt-20 md:pt-28"
      >
        <GlassCard variant="elevated" className="p-10 md:p-12">
          <h2 className="text-2xl font-semibold text-white">Reflection</h2>
          <p className="mt-3 text-white/70">
            This space will hold your private reflections and guided prompts.
          </p>
        </GlassCard>
      </motion.div>
    </PhaseBackground>
  );
}
