import { useState, useEffect, useContext } from "react";
import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { fetchReflectionPrompt, postReflection } from "../../api/dashboard.api";
import { EmotionContext } from "../../context/EmotionContext";

export default function ReflectionPage() {
  const { dashboard } = useContext(EmotionContext);
  const [prompt, setPrompt] = useState(dashboard?.reflectionPrompt?.text || "How are you feeling right now?");
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPrompt() {
      if (!dashboard?.reflectionPrompt?.text) {
        try {
          const data = await fetchReflectionPrompt();
          if (data?.text) setPrompt(data.text);
        } catch (err) {
          console.error("Failed to fetch reflection prompt:", err);
        }
      }
    }
    getPrompt();
  }, [dashboard]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reflection.trim()) return;

    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await postReflection({ content: reflection });
      setSuccess(true);
      setReflection("");
    } catch (err) {
      setError("Failed to save reflection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhaseBackground
      fireflyCount={3}
      fireflyAnimation="floating"
    >
      <div className="mx-auto max-w-xl py-64">
        <GlassCard variant="elevated" className="flex flex-col gap-32 p-40">
          <div className="flex flex-col gap-8 text-center">
            <span className="text-caption text-white-80">Reflective Space</span>
            <h1 className="text-h2 text-white">{prompt}</h1>
            <p className="text-white-80">
              Take as much time as you need. There are no right or wrong words.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-24">
            <textarea
              className="min-h-[240px] w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-24 text-body text-white placeholder-white/30 outline-none transition-all focus:border-white/30 focus:bg-white/10"
              placeholder="Begin typing your reflection..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              disabled={loading}
              required
            />

            <button
              type="submit"
              disabled={loading || !reflection.trim()}
              className="w-full rounded-xl bg-white/10 py-16 font-semibold text-white transition-all duration-300 hover:bg-white/20 disabled:opacity-50 active:scale-95"
            >
              {loading ? "Saving reflection..." : "Save Reflection"}
            </button>
          </form>

          {success && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-12 text-center text-sm text-emerald-200">
              Your reflection has been saved safely.
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-12 text-center text-sm text-red-200">
              {error}
            </div>
          )}
        </GlassCard>
      </div>
    </PhaseBackground>
  );
}
