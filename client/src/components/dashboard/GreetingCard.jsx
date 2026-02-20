import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import GlassCard from "../layout/GlassCard";

export default function GreetingCard() {
  const { dashboard, theme } = useContext(EmotionContext);
  const phaseLabel = dashboard?.currentPhase
    ? dashboard.currentPhase.toLowerCase().replace(/_/g, " ")
    : "neutral";

  return (
    <GlassCard
      gradientBorder
      variant="elevated"
      className={`shadow-xl ${theme.glow}`}
    >
      <h2 className="text-[32px] md:text-[34px] font-semibold text-white mb-2">
        Good {dashboard.timeOfDay}, {dashboard.userName} 🌙
      </h2>

      <p className="text-white/80">
        You seem {phaseLabel} today.
        <br />
        {theme.messageTone}
      </p>

      <p className="mt-4 text-sm text-white/70">
        {dashboard?.dailyMessage?.text ||
          "Daily message placeholder: Your calm companion is here."}
      </p>
    </GlassCard>
  );
}
