import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function WeeklyInsightCard() {
  const { dashboard } = useContext(EmotionContext);
  const insightText =
    dashboard?.insight?.summary ||
    "A gentle pattern will appear here once we've gathered enough reflections and mood logs.";

  return (
    <GlassCard className="flex flex-col gap-4 p-6">
      <h3 className="text-2xl font-semibold text-white">Weekly AI Insights</h3>
      <p className="text-white/70 italic">{insightText}</p>
    </GlassCard>
  );
}
