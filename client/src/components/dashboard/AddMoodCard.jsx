import GlassCard from "../layout/GlassCard";
import { useState, useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import api from "../../api/axios";

export default function AddMoodCard() {
  const { refetchDashboard } = useContext(EmotionContext);
  const [loading, setLoading] = useState(false);

  const logMood = async (moodValue) => {
    setLoading(true);
    try {
      await api.post("/mood", { mood: moodValue });
      await refetchDashboard();
      window.dispatchEvent(new Event("jugnu:mood-log"));
      window.dispatchEvent(new Event("jugnu:particle-pulse"));
    } catch (err) {
      console.error("Failed to log mood:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard variant="elevated" className="flex flex-col gap-4 p-8 sm:gap-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <h3 className="h3 text-white-90">Quick Check-in</h3>
        <p className="body-sm text-white-60">Rate your mood from 1 (challenging) to 5 (great).</p>
      </div>

      {/* Mood Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5].map((m) => (
          <button
            key={m}
            disabled={loading}
            onClick={() => logMood(m)}
            className="group relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[24px] border border-white/8 bg-white/4 font-semibold text-white transition-all duration-300 hover:border-white/15 hover:bg-white/7 disabled:opacity-50 sm:h-14 sm:w-14"
          >
            <span className="text-body font-bold sm:text-h3">{m}</span>
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center gap-2 text-body-sm text-white-60">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
          Recording mood...
        </div>
      )}
    </GlassCard>
  );
}
