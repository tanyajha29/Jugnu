module.exports = function decidePhase(avg) {
  if (avg <= 2) return "STRESS";
  if (avg === 3) return "CONFUSION";
  return "LOW_MOTIVATION";
};
