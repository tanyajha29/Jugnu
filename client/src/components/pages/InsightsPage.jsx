import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { motion } from "framer-motion";

export default function InsightsPage() {
  return (
    <PhaseBackground
      fireflyCount={3}
      showBlobs={false}
      showMesh={false}
      showNoise={true}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-5xl pt-16"
      >
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Insights
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Emotional analytics
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Structured summaries and weekly patterns will live here.
          </p>
        </div>

        <div className="grid gap-6">
          <GlassCard variant="elevated">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                AI Summary
              </p>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Weekly
              </span>
            </div>
            <p className="mt-4 text-lg text-white/85">
              A calm, analytical summary will appear here once your data grows.
            </p>
          </GlassCard>

          <div className="grid gap-6 md:grid-cols-2">
            <GlassCard variant="subtle">
              <h3 className="text-lg font-semibold text-white">
                Mood Distribution
              </h3>
              <p className="mt-2 text-white/70">
                Visual breakdown of your recent emotions will appear here.
              </p>
            </GlassCard>
            <GlassCard variant="subtle">
              <h3 className="text-lg font-semibold text-white">
                Phase Stability
              </h3>
              <p className="mt-2 text-white/70">
                Trend stability and gentle insights will appear here.
              </p>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </PhaseBackground>
  );
}
