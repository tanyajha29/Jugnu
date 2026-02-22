import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { postMood } from "../../api/dashboard.api";
import { EmotionContext } from "../../context/EmotionContext";
import { useFirefly } from "../../context/FireflyContext";

const MOODS = [
  { value: 1, label: "Heavy", color: "#1E3A8A", glow: "rgba(30,58,138,0.5)", phase: "STRESS" },
  { value: 2, label: "Low", color: "#3B82F6", glow: "rgba(59,130,246,0.45)", phase: "ANXIETY" },
  { value: 3, label: "Neutral", color: "#A855F7", glow: "rgba(168,85,247,0.45)", phase: "CONFUSION" },
  { value: 4, label: "Okay", color: "#FB923C", glow: "rgba(251,146,60,0.45)", phase: "LOW_MOTIVATION" },
  { value: 5, label: "Light", color: "#FDE047", glow: "rgba(253,224,71,0.55)", phase: "CALM" },
];

export default function MoodPage() {
  const { refetchDashboard, setUserPhase } = useContext(EmotionContext);
  const { emit } = useFirefly();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeMood = useMemo(
    () => MOODS.find((mood) => mood.value === selected),
    [selected]
  );

  const handleSelect = async (mood) => {
    if (loading) return;
    setSelected(mood.value);
    setLoading(true);
    setError("");
    emit("mood_selected");

    try {
      await postMood({ value: mood.value });
      if (setUserPhase) {
        await setUserPhase(mood.phase);
      }
      await refetchDashboard();
      setTimeout(() => navigate("/dashboard"), 700);
    } catch (err) {
      emit("error");
      setError("We couldn't save your mood. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhaseBackground variant="app" showGlow={true}>
      <div className="relative w-full">
        <div
          className="mood-overlay"
          style={{
            opacity: activeMood ? 0.5 : 0,
            background: activeMood
              ? `radial-gradient(circle at 50% 40%, ${activeMood.color}55, transparent 65%)`
              : "transparent",
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-10 px-6 py-24 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-white">How are you feeling right now?</h1>
            <p className="text-white/70">Choose the orb that matches your current state.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {MOODS.map((mood) => (
              <button
                key={mood.value}
                type="button"
                className={`mood-orb ${selected === mood.value ? "active" : ""}`.trim()}
                style={{
                  background: mood.color,
                  boxShadow: `0 0 18px ${mood.glow}`,
                }}
                onClick={() => handleSelect(mood)}
              >
                <span className="sr-only">{mood.label}</span>
              </button>
            ))}
          </div>

          <GlassCard className="w-full p-6 text-left" variant="subtle">
            <p className="text-white/70">
              We&apos;ll use this check-in to shape your daily guidance and reflection prompts.
            </p>
          </GlassCard>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
        </div>
      </div>
    </PhaseBackground>
  );
}
