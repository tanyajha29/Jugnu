export const emotionThemes = {
  STRESS: "from-red-300 to-orange-400",
  ANXIETY: "from-amber-200 to-orange-300",
  LONELINESS: "from-indigo-300 to-indigo-600",
  CONFUSION: "from-slate-200 to-slate-400",
  LOW_MOTIVATION: "from-teal-200 to-green-300",
  CALM: "from-green-300 to-blue-500",
  NEUTRAL: "from-gray-200 to-gray-400",
};

export const getEmotionGradient = (phase) =>
  emotionThemes[phase] || emotionThemes.NEUTRAL;
