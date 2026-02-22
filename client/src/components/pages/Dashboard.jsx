import { useContext, useEffect, useState } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { Link } from "react-router-dom";
import { fetchDailyMessage } from "../../api/dashboard.api";

export default function Dashboard() {
  const { dashboard } = useContext(EmotionContext);
  const [dailyMessage, setDailyMessage] = useState(null);

  useEffect(() => {
    const loadDaily = async () => {
      try {
        const data = await fetchDailyMessage();
        setDailyMessage(data);
      } catch (err) {
        setDailyMessage(null);
      }
    };
    loadDaily();
  }, []);

  if (!dashboard) {
    return (
      <PhaseBackground variant="app" showGlow={true}>
        <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 px-6 py-24">
          <div className="h-8 w-2/3 animate-pulse rounded-lg bg-white/10" />
          <div className="h-24 w-full animate-pulse rounded-2xl bg-white/10" />
          <div className="h-10 w-1/2 animate-pulse rounded-lg bg-white/10" />
        </div>
      </PhaseBackground>
    );
  }

  const phaseLabel = dashboard.currentPhase?.toLowerCase().replace(/_/g, " ") || "calm";
  const messageText = dailyMessage?.text || dashboard.dailyMessage?.text || "Take a calm breath. We&apos;ll move gently together.";

  return (
    <PhaseBackground variant="app" showGlow={true}>
      <div className="mx-auto flex min-h-screen max-w-[700px] flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">Good {dashboard.timeOfDay}</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            {dashboard.userName}, you&apos;re here.
          </h1>
          <span className="phase-pill">{phaseLabel}</span>
        </div>

        <GlassCard className="w-full p-8 text-left" variant="elevated">
          <p className="text-base text-white/80">Today&apos;s guidance</p>
          <p className="mt-3 text-lg text-white/70">
            {messageText}
          </p>
        </GlassCard>

        <Link to="/reflection" className="cta-primary">
          Start Reflection
        </Link>

        <Link to="/reflection" className="text-sm text-white/60 hover:text-white">
          View reflection history
        </Link>
      </div>
    </PhaseBackground>
  );
}
