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
      // Refetch dashboard to update charts and insights
      await refetchDashboard();
    } catch (err) {
      console.error("Failed to log mood:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard variant="elevated" className="flex flex-col gap-24 p-32">
      <div className="flex flex-col gap-8">
        <h3 className="text-xl font-semibold text-white">Quick Check-in</h3>
        <p className="text-white-80">Rate your mood from 1 (challenging) to 5 (great).</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16">
        {[1, 2, 3, 4, 5].map((m) => (
          <button
            key={m}
            disabled={loading}
            onClick={() => logMood(m)}
            className="group relative flex h-32 w-32 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/15 disabled:opacity-50 sm:h-40 sm:w-40"
          >
            <span className="text-xl font-bold sm:text-2xl">{m}</span>
            <span className="hidden text-xs text-white-80 group-hover:text-white/90 transition-colors sm:block">
              {m === 1 ? "Low" : m === 5 ? "Great" : ""}
            </span>
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.1), transparent)`
              }}
            />
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-8 text-sm text-white-80">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
          Recording your mood...
        </div>
      )}
    </GlassCard>
  );
}
