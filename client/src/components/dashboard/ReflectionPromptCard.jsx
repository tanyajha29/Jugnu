import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import { Link } from "react-router-dom";

export default function ReflectionPromptCard() {
  const { dashboard } = useContext(EmotionContext);
  const promptText =
    dashboard?.reflectionPrompt?.text ||
    "What feels most present for you today? Take a moment to reflect.";

  return (
    <GlassCard variant="subtle" className="flex h-full flex-col justify-between gap-16 p-32">
      <div className="flex flex-col gap-8">
        <span className="text-caption text-white-80">Daily Reflection</span>
        <p className="text-lg font-semibold leading-snug text-white">
          {promptText}
        </p>
      </div>

      <Link
        to="/reflection"
        className="inline-flex w-fit items-center gap-8 rounded-full bg-white/10 px-16 py-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 active:scale-95"
      >
        Write Reflection
      </Link>
    </GlassCard>
  );
}
