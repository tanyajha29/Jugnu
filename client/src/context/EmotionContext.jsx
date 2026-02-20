import { createContext, useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api";

export const EmotionContext = createContext();

const EMOTION_THEMES = {
  STRESS: {
    gradientClass: "from-rose-500/40 via-orange-400/30 to-amber-400/30",
    glow: "shadow-rose-300/40",
    glowColor: "rgba(251, 113, 133, 0.35)",
    accent: "#FCA5A5",
    particleSpeed: "22s",
    fireflyCount: 8,
    messageTone: "Let's slow things down.",
  },
  ANXIETY: {
    gradientClass: "from-amber-400/30 via-orange-300/20 to-yellow-300/30",
    glow: "shadow-orange-300/40",
    glowColor: "rgba(253, 186, 116, 0.35)",
    accent: "#FDBA74",
    particleSpeed: "20s",
    fireflyCount: 9,
    messageTone: "You're not alone in this. One breath at a time.",
  },
  LONELINESS: {
    gradientClass: "from-indigo-400/30 via-blue-400/30 to-sky-400/30",
    glow: "shadow-indigo-300/40",
    glowColor: "rgba(165, 180, 252, 0.35)",
    accent: "#A5B4FC",
    particleSpeed: "28s",
    fireflyCount: 7,
    messageTone: "You don't have to carry this alone.",
  },
  CONFUSION: {
    gradientClass: "from-slate-400/30 via-gray-300/30 to-slate-500/30",
    glow: "shadow-gray-300/40",
    glowColor: "rgba(203, 213, 225, 0.35)",
    accent: "#CBD5E1",
    particleSpeed: "26s",
    fireflyCount: 7,
    messageTone: "It's okay not to have all the answers today.",
  },
  LOW_MOTIVATION: {
    gradientClass: "from-teal-300/30 via-emerald-300/20 to-lime-300/30",
    glow: "shadow-emerald-300/40",
    glowColor: "rgba(110, 231, 183, 0.35)",
    accent: "#6EE7B7",
    particleSpeed: "30s",
    fireflyCount: 6,
    messageTone: "We'll take it gently, one small step at a time.",
  },
  CALM: {
    gradientClass: "from-emerald-400/30 via-sky-400/25 to-blue-400/30",
    glow: "shadow-emerald-300/40",
    glowColor: "rgba(110, 231, 183, 0.35)",
    accent: "#93C5FD",
    particleSpeed: "32s",
    fireflyCount: 6,
    messageTone: "You're doing well. Keep breathing.",
  },
  NEUTRAL: {
    gradientClass: "from-slate-500/20 via-gray-400/20 to-slate-600/30",
    glow: "shadow-gray-300/40",
    glowColor: "rgba(203, 213, 225, 0.25)",
    accent: "#CBD5E1",
    particleSpeed: "30s",
    fireflyCount: 6,
    messageTone: "One step at a time.",
  },
};

export function EmotionProvider({ children }) {
  const [dashboard, setDashboard] = useState(null);
  const [theme, setTheme] = useState(EMOTION_THEMES.NEUTRAL);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // API integration occurs here for dashboard context.
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
