import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import GlassCard from "../layout/GlassCard";

export default function GreetingCard() {
  const { dashboard, theme } = useContext(EmotionContext);
  const phaseLabel = dashboard?.currentPhase
    ? dashboard.currentPhase.toLowerCase().replace(/_/g, " ")
    : "neutral";

  return (
    <GlassCard variant="elevated" className="flex flex-col gap-6 p-6 sm:p-8">
      <div className="space-y-3">
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Good {dashboard.timeOfDay}, <span className="text-white">{dashboard.userName}</span>
        </h1>
        <p className="text-white/70">
          You seem{" "}
          <span className="font-medium" style={{ color: theme.accent }}>
            {phaseLabel}
          </span>{" "}
          today.
        </p>
      </div>

      <div className="border-t border-white/10 pt-4">
        <p className="text-white/60 italic">
          "{dashboard?.dailyMessage?.text || "Take a moment to breathe and notice your surroundings."}"
        </p>
      </div>
    </GlassCard>
  );
}
