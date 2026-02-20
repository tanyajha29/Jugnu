import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import GlassCard from "../layout/GlassCard";

export default function GreetingCard() {
  const { dashboard, theme } = useContext(EmotionContext);
  const phaseLabel = dashboard?.currentPhase
    ? dashboard.currentPhase.toLowerCase().replace(/_/g, " ")
    : "neutral";

  return (
    <GlassCard variant="elevated" className="flex flex-col gap-16 p-32">
      <div className="flex flex-col gap-8">
        <h1 className="text-h1 text-white">
          Good {dashboard.timeOfDay}, {dashboard.userName}
        </h1>
        <p className="text-lg text-white-80">
          You seem <span className="font-semibold text-white" style={{ color: theme.accent }}>{phaseLabel}</span> today.
        </p>
      </div>

      <div className="flex flex-col gap-12 border-t border-white/10 pt-16">
        <p className="text-body text-white-80 italic">
          "{dashboard?.dailyMessage?.text || "Take a moment to breathe and notice your surroundings."}"
        </p>
        <span className="text-caption text-white-80">
          {theme.messageTone}
        </span>
      </div>
    </GlassCard>
  );
}
