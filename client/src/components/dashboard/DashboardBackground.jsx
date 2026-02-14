import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

const DEFAULT_THEME = {
  gradient: "from-slate-800 to-slate-900",
};

export default function DashboardBackground({ children }) {
  const emotion = useContext(EmotionContext);

  const theme = emotion?.theme || DEFAULT_THEME;

  return (
    <div
      className={`
        min-h-screen w-full
        bg-gradient-to-br ${theme.gradient}
        transition-all duration-[1200ms]
        flex items-center justify-center
        relative
      `}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full px-6">
        {children}
      </div>
    </div>
  );
}
