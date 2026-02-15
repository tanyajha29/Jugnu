const PHASE_TONE = {
  STRESS: "slow, reassuring, and grounded",
  ANXIETY: "calm, steady, and reassuring",
  LONELINESS: "warm, validating, and gentle",
  CONFUSION: "clarifying, patient, and kind",
  LOW_MOTIVATION: "soft, encouraging, and non-judgmental",
  CALM: "quiet, supportive, and steady",
};

const fallbackDailyMessages = {
  STRESS: "It's okay to pause. Let's take one slow breath together.",
  ANXIETY: "You're safe in this moment. We can move gently, one step at a time.",
  LONELINESS: "You're not alone here. I'm glad you showed up today.",
  CONFUSION: "It's okay not to have everything figured out right now.",
  LOW_MOTIVATION: "Small steps still count. Let's keep it light and kind.",
  CALM: "Hold onto this steadiness. You're doing well.",
};

const fallbackReflectionPrompt =
  "What felt most present for you today?";

const fallbackWeeklyInsight = {
  trend: "NO_DATA",
  summary: "We'll learn your rhythm over time. Keep checking in gently.",
};

const buildDailyMessagePrompt = ({ currentPhase, lastThreeMoods, timeOfDay }) => {
  const tone = PHASE_TONE[currentPhase] || "calm, validating, and gentle";
  const recentMoods =
    lastThreeMoods && lastThreeMoods.length
      ? lastThreeMoods.join(", ")
      : "no recent entries";

  return [
    "You are Jugnu, a calm and emotionally intelligent companion.",
    "Write a brief daily check-in message.",
    `Tone: ${tone}.`,
    `Time of day: ${timeOfDay}.`,
    `Current phase: ${currentPhase}.`,
    `Recent moods (1-5): ${recentMoods}.`,
    "Constraints:",
    "- 40 to 80 words.",
    "- One short paragraph.",
    "- Avoid medical advice and diagnosis.",
    "- Avoid crisis language or self-harm references.",
    "- Avoid dependence or exclusivity.",
    "- Use gentle, human language.",
    "Message:",
  ].join("\n");
};

const buildReflectionPrompt = ({ currentPhase, latestMood }) => {
  const tone = PHASE_TONE[currentPhase] || "gentle and validating";
  const moodValue = typeof latestMood === "number" ? latestMood : "unknown";

  return [
    "You are Jugnu, a calm and emotionally intelligent companion.",
    "Write one open-ended reflection question.",
    `Tone: ${tone}.`,
    `Current phase: ${currentPhase}. Latest mood: ${moodValue} (1-5).`,
    "Constraints:",
    "- 8 to 18 words.",
    "- One sentence and one question mark.",
    "- Never interrogative or demanding.",
    "- Avoid medical advice, diagnosis, or crisis language.",
    "- Avoid dependence or exclusivity.",
    "Question:",
  ].join("\n");
};

const buildWeeklyInsightPrompt = ({ weeklyTrend, averageMood }) => {
  const trendSummary = weeklyTrend
    .map((entry) => `${entry.day}:${entry.mood ?? "NA"}`)
    .join(", ");
  const average = typeof averageMood === "number" ? averageMood.toFixed(2) : "NA";

  return [
    "You are Jugnu, a calm and emotionally intelligent companion.",
    "Write a short, gentle weekly insight about the user's mood pattern.",
    `Weekly trend: ${trendSummary}.`,
    `Average mood (1-5): ${average}.`,
    "Constraints:",
    "- 35 to 70 words.",
    "- Soft, non-judgmental interpretation.",
    "- Encourage small progress recognition.",
    "- Avoid medical advice, diagnosis, or crisis language.",
    "- Avoid dependence or exclusivity.",
    "Insight:",
  ].join("\n");
};

module.exports = {
  buildDailyMessagePrompt,
  buildReflectionPrompt,
  buildWeeklyInsightPrompt,
  fallbackDailyMessages,
  fallbackReflectionPrompt,
  fallbackWeeklyInsight,
};
