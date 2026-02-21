import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import { Link } from "react-router-dom";

export default function ReflectionPromptCard() {
  const { dashboard } = useContext(EmotionContext);
  const promptText =
    dashboard?.reflectionPrompt?.text || "What feels most present for you today? Take a moment to reflect.";

  return (
    <GlassCard className="flex h-full flex-col justify-between gap-4 p-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-semibold text-white">Reflection</h3>
        <p className="text-white/70">{promptText}</p>
      </div>

      <Link
        to="/reflection"
        className="inline-flex w-fit items-center gap-2 rounded-[24px] bg-white/10 px-6 py-3 text-sm text-white transition-all duration-300 hover:bg-white/15"
      >
        Write Reflection
      </Link>
    </GlassCard>
  );
}
