import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function WeeklyInsightCard() {
  const { dashboard } = useContext(EmotionContext);
  const insightText =
    dashboard?.insight?.summary ||
    "A gentle pattern will appear here once we've gathered enough reflections and mood logs.";

  return (
    <GlassCard variant="elevated" className="flex flex-col gap-16 p-32">
      <div className="flex flex-col gap-8">
        <span className="text-caption text-white-80">AI Analysis</span>
        <h2 className="text-h2 text-white">Weekly Insights</h2>
      </div>
      <div className="flex flex-col gap-16">
        <p className="text-body leading-relaxed text-white-80">
          {insightText}
        </p>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-1/3 bg-white/20" />
        </div>
      </div>
    </GlassCard>
  );
}
