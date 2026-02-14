import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import GlassCard from "../layout/GlassCard";

export default function GreetingCard() {
  const { dashboard, theme } = useContext(EmotionContext);

  return (
    <GlassCard className={`shadow-xl ${theme.glow}`}>
      <h2 className="text-2xl font-semibold text-white mb-2">
        Good {dashboard.timeOfDay}, {dashboard.userName} 🌙
      </h2>

      <p className="text-white/80">
        You seem {dashboard.currentPhase.toLowerCase()} today.
        <br />
        {theme.messageTone}
      </p>
    </GlassCard>
  );
}
