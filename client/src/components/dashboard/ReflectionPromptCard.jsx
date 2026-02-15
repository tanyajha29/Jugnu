import { motion } from "framer-motion";
import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function ReflectionPromptCard() {
  const { dashboard } = useContext(EmotionContext);
  const promptText =
    dashboard?.reflectionPrompt?.text ||
    "Reflection prompt placeholder: What feels most present for you today?";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <GlassCard className="h-full">
        <h3 className="text-lg font-semibold text-white">Reflection Prompt</h3>
        <p className="mt-3 text-white/70">{promptText}</p>
      </GlassCard>
    </motion.div>
  );
}
