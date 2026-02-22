import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function InsightsPage() {
  const { dashboard } = useContext(EmotionContext);

  return (
    <PhaseBackground variant="app" showGlow={true}>
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-24">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">Insights</h1>
          <p className="text-white/70">A calm, structured view of your emotional rhythm.</p>
        </div>

        <GlassCard className="p-8" variant="elevated">
          <h2 className="text-xl font-semibold text-white">Weekly AI Summary</h2>
          <p className="mt-3 text-white/70">
            {dashboard?.insight?.summary ||
              "Continue logging your moods and reflections to receive weekly insights."}
          </p>
        </GlassCard>

        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard className="p-6" variant="subtle">
            <h3 className="text-lg font-semibold text-white">Mood Distribution</h3>
            <div className="mt-4 h-10 rounded-full bg-white/10" />
          </GlassCard>
          <GlassCard className="p-6" variant="subtle">
            <h3 className="text-lg font-semibold text-white">Emotional Stability</h3>
            <p className="mt-4 text-3xl font-semibold text-white">74%</p>
            <p className="mt-2 text-sm text-white/60">
              Your emotional state has been relatively steady this week.
            </p>
          </GlassCard>
        </div>
      </div>
    </PhaseBackground>
  );
}
