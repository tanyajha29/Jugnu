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
    } catch (err) {
      console.error("Failed to change phase:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-white">Adjust Your State</h3>
        <p className="text-white/70">How are you feeling right now?</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PHASES.map((p) => (
          <button
            key={p.id}
            disabled={loading}
            onClick={() => changePhase(p.id)}
            className="flex items-center gap-2 rounded-[24px] border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/80 transition-all duration-300 hover:bg-white/10 disabled:opacity-50"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: p.color }}
              aria-hidden="true"
            />
            {p.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-sm text-white/60">Updating state...</div>
      )}
    </GlassCard>
  );
}
