import { motion } from "framer-motion";
import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function DailyMessage() {
  const { dashboard } = useContext(EmotionContext);

  return (
    <GlassCard variant="subtle" className="p-6 sm:p-8">
      <span className="caption text-white-50">Daily message</span>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-3 text-body text-white-60 leading-relaxed"
      >
        {dashboard.dailyMessage?.text || "Take a gentle breath. You are safe here."}
      </motion.p>
    </GlassCard>
  );
}
