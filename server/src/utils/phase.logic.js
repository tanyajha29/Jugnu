module.exports = function decidePhase(avg) {
  if (avg <= 2) return "STRESS";
  if (avg <= 3) return "CONFUSION";
  if (avg <= 4) return "LOW_MOTIVATION";
  return "CALM";
};
