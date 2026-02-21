import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import GlassCard from "../layout/GlassCard";

export default function GreetingCard() {
  const { dashboard, theme } = useContext(EmotionContext);
  const phaseLabel = dashboard?.currentPhase
    ? dashboard.currentPhase.toLowerCase().replace(/_/g, " ")
    : "neutral";

  return (
    <GlassCard variant="elevated" className="flex flex-col gap-4 p-8 sm:gap-6 sm:p-10">
      {/* Greeting & Status */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <h1 className="h1 text-white-90">
          Good {dashboard.timeOfDay}, <span className="text-white">{dashboard.userName}</span>
        </h1>
        <p className="body text-white-60">
          You seem{" "}
          <span className="font-medium text-white-80" style={{ color: theme.accent }}>
            {phaseLabel}
          </span>{" "}
          today.
        </p>
      </div>

      {/* Daily Message */}
      <div className="flex flex-col gap-3 border-t border-white/8 pt-4 sm:gap-4 sm:pt-6">
        <p className="body text-white-60 italic">
          "{dashboard?.dailyMessage?.text || "Take a moment to breathe and notice your surroundings."}"
        </p>
        <span className="caption text-white-50">{theme.messageTone}</span>
      </div>
    </GlassCard>
  );
}
