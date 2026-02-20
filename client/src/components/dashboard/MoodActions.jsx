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
      // Refetch dashboard to update theme and UI
      await refetchDashboard();
    } catch (err) {
      console.error("Failed to change phase:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard variant="default" className="flex flex-col gap-24 p-32">
      <div className="flex flex-col gap-8">
        <h3 className="text-xl font-semibold text-white">Adjust Your Phase</h3>
        <p className="text-white-80">How are you feeling? Your environment will shift to match.</p>
      </div>

      <div className="flex flex-col gap-16">
        <div className="grid auto-rows-max grid-cols-2 gap-12 sm:grid-cols-3 sm:gap-16">
          {PHASES.map((p) => (
            <button
              key={p.id}
              disabled={loading}
              onClick={() => changePhase(p.id)}
              className="group relative flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-12 text-center transition-all duration-300 hover:border-white/20 hover:bg-white/10 disabled:opacity-50 sm:gap-8 sm:p-16"
            >
              <span
                className="h-16 w-16 rounded-full shadow-[0_0_20px_var(--phase-color)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20"
                style={{
                  backgroundColor: p.color,
                  "--phase-color": `${p.color}40`,
                }}
              />
              <span className="text-xs font-medium text-white sm:text-sm">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-8 text-center text-sm text-white-80">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
          Shifting your environment...
        </div>
      )}
    </GlassCard>
  );
}
