import { createContext, useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api";

export const EmotionContext = createContext();

const EMOTION_THEMES = {
  CALM: {
    gradientClass: "from-[#0B2447] to-[#0F766E]",
    glowColor: "rgba(103, 232, 249, 0.35)",
    accent: "#67E8F9",
    particleSpeed: "32s",
    fireflyCount: 6,
    fireflyAnimation: "drift",
    messageTone: "You're doing well. Keep breathing.",
  },
  STRESS: {
    gradientClass: "from-[#2A0944] to-[#3B1C6B]",
    glowColor: "rgba(214, 188, 250, 0.35)",
    accent: "#D6BCFA",
    particleSpeed: "22s",
    fireflyCount: 8,
    fireflyAnimation: "pulse",
    messageTone: "Let's slow things down.",
  },
  LONELINESS: {
    gradientClass: "from-[#0F172A] to-[#3F1D63]",
    glowColor: "rgba(251, 207, 232, 0.35)",
    accent: "#FBCFE8",
    particleSpeed: "28s",
    fireflyCount: 7,
    fireflyAnimation: "floating",
    messageTone: "You don't have to carry this alone.",
  },
  ANXIETY: {
    gradientClass: "from-[#4C1D95] to-[#F97316]",
    glowColor: "rgba(253, 164, 175, 0.35)",
    accent: "#FDA4AF",
    particleSpeed: "20s",
    fireflyCount: 9,
    fireflyAnimation: "jitter",
    messageTone: "You're not alone in this. One breath at a time.",
  },
  CONFUSION: {
    gradientClass: "from-[#1E293B] to-[#60A5FA]",
    glowColor: "rgba(191, 219, 254, 0.35)",
    accent: "#BFDBFE",
    particleSpeed: "26s",
    fireflyCount: 7,
    fireflyAnimation: "flicker",
    messageTone: "It's okay not to have all the answers today.",
  },
  LOW_MOTIVATION: {
    gradientClass: "from-[#0B1120] to-[#065F46]",
    glowColor: "rgba(163, 230, 53, 0.35)",
    accent: "#A3E635",
    particleSpeed: "30s",
    fireflyCount: 6,
    fireflyAnimation: "fade-in",
    messageTone: "We'll take it gently, one small step at a time.",
  },
  NEUTRAL: {
    gradientClass: "from-[#0f172a] to-[#1e293b]",
    glowColor: "rgba(255, 255, 255, 0.25)",
    accent: "#FFFFFF",
    particleSpeed: "30s",
    fireflyCount: 6,
    fireflyAnimation: "drift",
    messageTone: "One step at a time.",
  },
};

export function EmotionProvider({ children }) {
  const [dashboard, setDashboard] = useState(null);
  const [theme, setTheme] = useState(EMOTION_THEMES.NEUTRAL);

  const loadDashboard = async () => {
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
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <EmotionContext.Provider value={{ dashboard, theme, refetchDashboard: loadDashboard }}>
      {children}
    </EmotionContext.Provider>
  );
}
