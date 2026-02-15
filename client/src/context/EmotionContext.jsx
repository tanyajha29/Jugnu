import { createContext, useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api";

export const EmotionContext = createContext();

const EMOTION_THEMES = {
  STRESS: {
    gradient: "from-red-300 via-orange-300 to-orange-400",
    glow: "shadow-red-300/40",
    messageTone: "Letâ€™s slow things down.",
  },
  ANXIETY: {
    gradient: "from-amber-200 via-orange-200 to-orange-300",
    glow: "shadow-orange-300/40",
    messageTone: "Youâ€™re not alone in this. One breath at a time.",
  },
  LONELINESS: {
    gradient: "from-indigo-300 via-blue-300 to-indigo-400",
    glow: "shadow-indigo-300/40",
    messageTone: "You donâ€™t have to carry this alone.",
  },
  CONFUSION: {
    gradient: "from-slate-200 via-gray-300 to-slate-400",
    glow: "shadow-gray-300/40",
    messageTone: "Itâ€™s okay not to have all the answers today.",
  },
  LOW_MOTIVATION: {
    gradient: "from-teal-200 via-emerald-200 to-green-300",
    glow: "shadow-emerald-300/40",
    messageTone: "Weâ€™ll take it gently, one small step at a time.",
  },
  CALM: {
    gradient: "from-emerald-300 via-sky-300 to-blue-400",
    glow: "shadow-emerald-300/40",
    messageTone: "Youâ€™re doing well. Keep breathing.",
  },
  NEUTRAL: {
    gradient: "from-gray-200 via-gray-300 to-gray-400",
    glow: "shadow-gray-300/40",
    messageTone: "One step at a time.",
  },
};

export function EmotionProvider({ children }) {
  const [dashboard, setDashboard] = useState(null);
  const [theme, setTheme] = useState(EMOTION_THEMES.NEUTRAL);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await fetchDashboard();
        setDashboard(data);
        const phase = data?.currentPhase || "NEUTRAL";
        setTheme(EMOTION_THEMES[phase] || EMOTION_THEMES.NEUTRAL);
      } catch (error) {
        setDashboard(null);
        setTheme(EMOTION_THEMES.NEUTRAL);
      }
    }
    loadDashboard();
  }, []);

  return (
    <EmotionContext.Provider value={{ dashboard, theme }}>
      {children}
    </EmotionContext.Provider>
  );
}
