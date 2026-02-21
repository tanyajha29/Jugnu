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
    <PhaseBackground>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-8 py-24 sm:py-32">
        <GlassCard variant="elevated" className="w-full max-w-xl space-y-6 p-10 sm:space-y-8 sm:p-12">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">{prompt}</h1>
            <p className="text-white/70">Take your time. Your words matter.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              className="min-h-64 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-6 text-body text-white placeholder-white/40 transition-all duration-300 focus:ring-2 focus:ring-indigo-400/40 focus:border-white/15 focus:bg-white/7 focus:outline-none sm:min-h-80 sm:p-8"
              placeholder="Begin writing..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              disabled={loading}
              required
            />

            <button
              type="submit"
              disabled={loading || !reflection.trim()}
              className="w-full rounded-[24px] border border-white/10 bg-white/8 py-4 text-body font-medium text-white transition-all duration-300 hover:border-white/15 hover:bg-white/12 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? "Saving..." : "Save Reflection"}
            </button>
          </form>

          {success && (
            <div className="animate-fade-in rounded-[24px] border border-emerald-500/20 bg-emerald-500/8 px-6 py-4 text-center">
              <p className="body-sm text-emerald-300">Your reflection has been saved.</p>
            </div>
          )}

          {error && (
            <div className="rounded-[24px] border border-red-500/20 bg-red-500/8 px-6 py-4 text-center">
              <p className="body-sm text-red-300">{error}</p>
            </div>
          )}
        </GlassCard>
      </div>
    </PhaseBackground>
  );
}
