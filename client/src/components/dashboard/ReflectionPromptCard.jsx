import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import { Link } from "react-router-dom";

export default function ReflectionPromptCard() {
  const { dashboard } = useContext(EmotionContext);
  const promptText =
    dashboard?.reflectionPrompt?.text || "What feels most present for you today? Take a moment to reflect.";

  return (
    <GlassCard variant="subtle" className="flex h-full flex-col justify-between gap-4 p-8 sm:gap-6 sm:p-10">
      {/* Prompt Section */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <span className="caption text-white-50">Daily Reflection</span>
        <p className="h3 leading-snug text-white-90">{promptText}</p>
      </div>

      {/* CTA Button */}
      <Link
        to="/reflection"
        className="inline-flex w-fit items-center gap-2 rounded-[24px] border border-white/12 bg-white/6 px-6 py-3 text-body-sm font-medium text-white-80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white-90 active:scale-95"
      >
        Write Reflection
      </Link>
    </GlassCard>
  );
}
