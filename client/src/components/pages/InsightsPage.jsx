import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function InsightsPage() {
  const { dashboard } = useContext(EmotionContext);

  return (
    <PhaseBackground showNoise={true}>
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-32">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Emotional Insights
          </h1>
          <p className="text-white/70 max-w-2xl">
            A structured view of your emotional patterns and growth.
          </p>
        </div>

        {/* AI Summary */}
        <GlassCard className="border-l-2 border-white/10 p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Weekly AI Summary</h2>
            <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs text-white/70">
              Powered by AI
            </span>
          </div>
          <p className="mt-4 text-white/70">
            {dashboard?.insight?.summary ||
              "Continue logging your mood and reflections to receive AI-generated summaries of your emotional patterns."}
          </p>
        </GlassCard>

        <div className="border-t border-white/10" />

        {/* Stats */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <GlassCard className="p-8">
            <h3 className="text-2xl font-semibold text-white">Mood Distribution</h3>
            <p className="mt-2 text-white/70">Based on your recent check-ins.</p>
            <div className="mt-6 h-10 w-full rounded-full bg-white/6" />
          </GlassCard>
          <GlassCard className="p-8">
            <h3 className="text-2xl font-semibold text-white">Emotional Stability</h3>
            <p className="mt-2 text-white/70">A measure of consistency in your mood.</p>
            <div className="mt-6 text-4xl font-bold text-white">74%</div>
            <p className="mt-2 italic text-white/60">
              "Your emotional state has been relatively stable this week."
            </p>
          </GlassCard>
        </div>
      </div>
    </PhaseBackground>
  );
}
