import { useState, useEffect, useContext } from "react";
import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { EmotionContext } from "../../context/EmotionContext";
import { fetchReflections } from "../../api/dashboard.api";

export default function InsightsPage() {
  const { dashboard } = useContext(EmotionContext);
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReflections() {
      try {
        const data = await fetchReflections();
        setReflections(data || []);
      } catch (err) {
        console.error("Failed to load reflections:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReflections();
  }, []);

  return (
    <PhaseBackground fireflyCount={2} showNoise={true}>
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-32 sm:gap-12 sm:py-40">
        {/* Page Header */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <span className="caption text-white-50">Growth & Patterns</span>
          <h1 className="h1 text-white-95">Emotional Insights</h1>
          <p className="body-sm text-white-60 max-w-2xl">A structured view of your emotional patterns and growth.</p>
        </div>

        {/* AI Weekly Summary */}
        <section className="mt-4">
          <GlassCard variant="elevated" className="flex flex-col gap-4 border-l-2 border-white/10 p-8 sm:gap-6 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
              <h2 className="h2 text-white-90">Weekly AI Summary</h2>
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-caption text-white-60">
                Powered by AI
              </span>
            </div>
            <p className="body leading-relaxed text-white-60">
              {dashboard?.insight?.summary ||
                "Continue logging your mood and reflections to receive AI-generated summaries of your emotional patterns."}
            </p>
          </GlassCard>
        </section>

        {/* Mood Analytics Grid */}
        <section className="mt-4 grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2">
          {/* Mood Distribution */}
          <GlassCard className="flex flex-col gap-4 p-8 sm:gap-6 sm:p-10">
            <h3 className="h3 text-white-90">Mood Distribution</h3>
            <p className="body-sm text-white-60">Based on your recent check-ins.</p>

            {/* Distribution Bar */}
            <div className="flex h-10 w-full overflow-hidden rounded-full bg-white/6 sm:h-12">
              <div className="h-full w-1/4 bg-[#0F766E]" />
              <div className="h-full w-1/3 bg-[#3B1C6B]" />
              <div className="h-full w-1/6 bg-[#4C1D95]" />
              <div className="h-full w-1/4 bg-[#60A5FA]" />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#0F766E]" aria-hidden="true" />
                <span className="body-sm text-white-60">Calm</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#3B1C6B]" aria-hidden="true" />
                <span className="body-sm text-white-60">Stress</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#4C1D95]" aria-hidden="true" />
                <span className="body-sm text-white-60">Anxiety</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#60A5FA]" aria-hidden="true" />
                <span className="body-sm text-white-60">Confusion</span>
              </div>
            </div>
          </GlassCard>

          {/* Stability Index */}
          <GlassCard className="flex flex-col gap-4 p-8 sm:gap-6 sm:p-10">
            <h3 className="h3 text-white-90">Emotional Stability</h3>
            <p className="body-sm text-white-60">A measure of consistency in your mood.</p>

            <div className="space-y-4">
              <div className="text-h1 font-bold text-white-95">74%</div>
              <p className="body-sm text-white-60 italic">
                "Your emotional state has been relatively stable this week. Well done."
              </p>
            </div>
          </GlassCard>
        </section>

        {/* Recent Reflections */}
        <section className="mt-4 flex flex-col gap-6 sm:gap-8 border-t border-white/10 pt-10">
          <h2 className="h2 text-white-90">Recent Reflections</h2>

          {loading ? (
            <div className="space-y-4 sm:space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3 rounded-[24px] border border-white/8 bg-white/4 p-6 sm:space-y-4 sm:p-8">
                  <div className="h-4 w-24 animate-pulse rounded-lg bg-white/10" />
                  <div className="space-y-2 sm:space-y-3">
                    <div className="h-4 w-full animate-pulse rounded-lg bg-white/10" />
                    <div className="h-4 w-5/6 animate-pulse rounded-lg bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : reflections.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {reflections.slice(0, 5).map((r, i) => (
                <GlassCard key={i} variant="subtle" className="flex flex-col gap-2 p-6 sm:gap-3 sm:p-8">
                  <span className="body-sm text-white-50">{new Date(r.createdAt).toLocaleDateString()}</span>
                  <p className="body text-white-60 line-clamp-3">{r.content}</p>
                </GlassCard>
              ))}
            </div>
          ) : (
            <GlassCard className="flex flex-col items-center gap-4 p-8 text-center sm:gap-6 sm:p-12">
              <div className="h-16 w-16 rounded-full bg-white/8" aria-hidden="true" />
              <div className="space-y-2">
                <p className="h3 text-white-90">No reflections yet</p>
                <p className="body-sm text-white-60 max-w-sm">
                  Begin your reflection journey to unlock personalized insights about your emotional patterns.
                </p>
              </div>
            </GlassCard>
          )}
        </section>
      </div>
    </PhaseBackground>
  );
}
