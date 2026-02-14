export const emotionThemes = {
  STRESS: "from-red-300 to-orange-400",
  SAD: "from-indigo-300 to-indigo-600",
  CALM: "from-green-300 to-blue-500",
  HAPPY: "from-yellow-300 to-yellow-500",
  NEUTRAL: "from-gray-200 to-gray-400",
};

export const getEmotionGradient = (phase) =>
  emotionThemes[phase] || emotionThemes.NEUTRAL;
