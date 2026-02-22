import { useState, useEffect, useContext, useRef } from "react";
import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { fetchReflectionPrompt, postReflection } from "../../api/dashboard.api";
import { EmotionContext } from "../../context/EmotionContext";
import { useFirefly } from "../../context/FireflyContext";

export default function ReflectionPage() {
  const { dashboard } = useContext(EmotionContext);
  const { emit } = useFirefly();
  const [prompt, setPrompt] = useState(dashboard?.reflectionPrompt?.text || "How are you feeling right now?");
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const typingTimer = useRef(null);

  useEffect(() => {
    async function getPrompt() {
      if (!dashboard?.reflectionPrompt?.text) {
        try {
          const data = await fetchReflectionPrompt();
          if (data?.prompt) setPrompt(data.prompt);
        } catch (err) {
          console.error("Failed to fetch reflection prompt:", err);
        }
      }
    }
    getPrompt();
  }, [dashboard]);

  const handleChange = (e) => {
    setReflection(e.target.value);
    emit("typing");
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => emit("idle"), 900);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reflection.trim()) return;

    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await postReflection({ prompt, answer: reflection });
      setSuccess(true);
      setReflection("");
      emit("reflection_saved");
    } catch (err) {
      emit("error");
      setError("Failed to save reflection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhaseBackground variant="reflection" showGlow={true} showFireflies={true}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-24">
        <GlassCard variant="elevated" className="w-full space-y-8 p-10 sm:p-12">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Reflection</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">{prompt}</h1>
            <p className="text-white/70">Let your thoughts arrive softly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              className="reflection-textarea"
              placeholder="Begin writing..."
              value={reflection}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <button
              type="submit"
              disabled={loading || !reflection.trim()}
              className="cta-primary w-full"
            >
              {loading ? "Saving..." : "Save Reflection"}
            </button>
          </form>

          {success && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-200">
              Your reflection has been saved.
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
              {error}
            </div>
          )}
        </GlassCard>
      </div>
    </PhaseBackground>
  );
}
