import { useState, useContext } from "react";
import GlassCard from "../layout/GlassCard";
import { EmotionContext } from "../../context/EmotionContext";
import api from "../../api/axios";

const PHASES = [
  { id: "CALM", color: "#0F766E", label: "Calm" },
  { id: "STRESS", color: "#3B1C6B", label: "Stress" },
  { id: "LONELINESS", color: "#3F1D63", label: "Loneliness" },
  { id: "ANXIETY", color: "#4C1D95", label: "Anxiety" },
  { id: "CONFUSION", color: "#60A5FA", label: "Confusion" },
  { id: "LOW_MOTIVATION", color: "#065F46", label: "Low Motivation" },
];

export default function MoodActions() {
  const { refetchDashboard } = useContext(EmotionContext);
  const [loading, setLoading] = useState(false);

  const changePhase = async (phaseId) => {
    setLoading(true);
    try {
      await api.post("/user/phase", { phase: phaseId });
      await refetchDashboard();
      window.dispatchEvent(new Event("jugnu:particle-pulse"));
    } catch (err) {
      console.error("Failed to change phase:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard variant="default" className="flex flex-col gap-4 p-8 sm:gap-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <h3 className="h3 text-white-90">Adjust Your State</h3>
        <p className="body-sm text-white-60">How are you feeling? Your environment will shift to match.</p>
      </div>

      {/* Phase Grid */}
      <div className="grid auto-rows-max grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {PHASES.map((p) => (
          <button
            key={p.id}
            disabled={loading}
            onClick={() => changePhase(p.id)}
            className="group relative flex flex-col items-center gap-2 rounded-[24px] border border-white/8 bg-white/4 p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/7 disabled:opacity-50 sm:gap-3 sm:p-6"
          >
            <span
              className="h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 10px ${p.color}30`,
              }}
              aria-hidden="true"
            />
            <span className="text-body-sm font-medium text-white-80 text-center">{p.label}</span>
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center gap-2 text-body-sm text-white-60">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
          Shifting environment...
        </div>
      )}
    </GlassCard>
  );
}
