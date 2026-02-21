import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function WeeklyInsightCard() {
  const { dashboard } = useContext(EmotionContext);
  const insightText =
    dashboard?.insight?.summary ||
    "A gentle pattern will appear here once we've gathered enough reflections and mood logs.";

  return (
    <GlassCard variant="elevated" className="flex flex-col gap-4 border-l-2 border-white/10 pl-6 p-8 sm:gap-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <span className="caption text-white-50">AI Analysis</span>
        <h2 className="text-2xl font-semibold text-white">Weekly Insights</h2>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <p className="body leading-relaxed text-white-60">{insightText}</p>

        {/* Progress Indicator */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/6">
          <div className="h-full w-1/3 bg-white/15 transition-all duration-500" />
        </div>
      </div>
    </GlassCard>
  );
}
