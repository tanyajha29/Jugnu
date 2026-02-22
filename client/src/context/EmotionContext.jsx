import { createContext, useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api";
import api from "../api/axios";

export const EmotionContext = createContext();

const EMOTION_THEMES = {
  CALM: {
    accent: "#5EEAD4",
    messageTone: "You're doing well. Keep breathing.",
  },
  STRESS: {
    accent: "#F97316",
    messageTone: "Let's slow things down.",
  },
  LONELINESS: {
    accent: "#93C5FD",
    messageTone: "You don't have to carry this alone.",
  },
  ANXIETY: {
    accent: "#FCA5A5",
    messageTone: "You're not alone in this. One breath at a time.",
  },
  CONFUSION: {
    accent: "#A78BFA",
    messageTone: "It's okay not to have all the answers today.",
  },
  LOW_MOTIVATION: {
    accent: "#FDE047",
    messageTone: "We'll take it gently, one small step at a time.",
  },
  NEUTRAL: {
    accent: "#F8FAFC",
    messageTone: "One step at a time.",
  },
};

export function EmotionProvider({ children }) {
  const [dashboard, setDashboard] = useState(null);
  const [theme, setTheme] = useState(EMOTION_THEMES.NEUTRAL);

  const loadDashboard = async () => {
    try {
      const data = await fetchDashboard();
      setDashboard(data);
      const phase = data?.currentPhase || "NEUTRAL";
      setTheme(EMOTION_THEMES[phase] || EMOTION_THEMES.NEUTRAL);
    } catch (error) {
      setDashboard(null);
      setTheme(EMOTION_THEMES.NEUTRAL);
    }
  };

  const setUserPhase = async (phase) => {
    await api.post("/user/phase", { phase });
    await loadDashboard();
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <EmotionContext.Provider value={{ dashboard, theme, refetchDashboard: loadDashboard, setUserPhase }}>
      {children}
    </EmotionContext.Provider>
  );
}
