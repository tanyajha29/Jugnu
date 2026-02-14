import { createContext, useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api";

export const EmotionContext = createContext();

const EMOTION_THEMES = {
  STRESS: {
    gradient: "from-red-300 via-orange-300 to-orange-400",
    glow: "shadow-red-300/40",
    messageTone: "Let’s slow things down.",
  },
  SAD: {
    gradient: "from-indigo-300 via-blue-300 to-indigo-400",
    glow: "shadow-indigo-300/40",
    messageTone: "You don’t have to carry this alone.",
  },
  NEUTRAL: {
    gradient: "from-gray-200 via-gray-300 to-gray-400",
    glow: "shadow-gray-300/40",
    messageTone: "One step at a time.",
  },
  CALM: {
    gradient: "from-emerald-300 via-sky-300 to-blue-400",
    glow: "shadow-emerald-300/40",
    messageTone: "You’re doing well. Keep breathing.",
  },
  HAPPY: {
    gradient: "from-yellow-200 via-yellow-300 to-yellow-400",
    glow: "shadow-yellow-300/40",
    messageTone: "Let’s celebrate this feeling.",
  },
};

export function EmotionProvider({ children }) {
  const [dashboard, setDashboard] = useState(null);
  const [theme, setTheme] = useState(EMOTION_THEMES.NEUTRAL);

  useEffect(() => {
    async function loadDashboard() {
      const data = await fetchDashboard();
      setDashboard(data);
      setTheme(EMOTION_THEMES[data.currentPhase]);
    }
    loadDashboard();
  }, []);

  return (
    <EmotionContext.Provider value={{ dashboard, theme }}>
      {children}
    </EmotionContext.Provider>
  );
}
