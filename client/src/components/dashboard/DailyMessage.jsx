import { motion } from "framer-motion";
import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function DailyMessage() {
  const { dashboard } = useContext(EmotionContext);

  return (
    <GlassCard className="md:col-span-2">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-xl text-white text-center leading-relaxed"
      >
        {dashboard.dailyMessage}
      </motion.p>
    </GlassCard>
  );
}
