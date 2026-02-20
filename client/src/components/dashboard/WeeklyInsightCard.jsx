import { motion } from "framer-motion";
import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function WeeklyInsightCard() {
  const { dashboard } = useContext(EmotionContext);
  const insightText =
    dashboard?.insight?.summary ||
    "Weekly insight placeholder: A gentle pattern will appear here.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <GlassCard className="h-full" variant="elevated">
        <h3 className="text-lg font-semibold text-white">Weekly AI Insight</h3>
        <p className="mt-3 text-white/70">{insightText}</p>
      </GlassCard>
    </motion.div>
  );
}
