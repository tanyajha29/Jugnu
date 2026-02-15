const MAX_WORDS = 80;

const forbiddenPatterns = [
  /suicide/i,
  /self[- ]harm/i,
  /kill yourself/i,
  /end it all/i,
  /die/i,
  /overdose/i,
  /diagnos/i,
  /clinical/i,
  /prescrib/i,
  /medicat/i,
  /therap/i,
  /psychiat/i,
  /psycholog/i,
  /doctor/i,
  /you (?:only|just) need me/i,
  /i'?m all you need/i,
  /depend on me/i,
  /don'?t leave/i,
  /stay with me/i,
];

const normalizeText = (text = "") =>
  text.replace(/\s+/g, " ").replace(/\u0000/g, "").trim();

const countWords = (text) => (text ? text.split(/\s+/).length : 0);

const isExtremeTone = (text) => {
  if (!text) return false;
  const exclamations = (text.match(/!/g) || []).length;
  if (exclamations > 1) return true;

  const capsWords = text.split(/\s+/).filter((word) => word.length >= 5 && word === word.toUpperCase());
  return capsWords.length > 1;
};

const isUnsafe = (text) => {
  if (!text) return true;
  if (forbiddenPatterns.some((pattern) => pattern.test(text))) return true;
  if (isExtremeTone(text)) return true;
  return false;
};

const enforceMaxWords = (text) => {
  const words = text.split(/\s+/);
  if (words.length <= MAX_WORDS) return text;
  return words.slice(0, MAX_WORDS).join(" ").replace(/\s+$/, "").trim();
};

const safeOutput = ({ text, fallback }) => {
  const normalized = normalizeText(text);
  if (isUnsafe(normalized)) return fallback;

  const limited = enforceMaxWords(normalized);
  return limited;
};

module.exports = {
  MAX_WORDS,
  normalizeText,
  isUnsafe,
  safeOutput,
  enforceMaxWords,
};
