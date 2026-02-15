import { motion } from "framer-motion";
import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true },
};

export default function Landing() {
  return (
    <PhaseBackground>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20">
        <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <motion.div
            className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 shadow-[0_0_30px_var(--phase-glow)]"
            style={{ "--phase-glow": "var(--phase-glow)" }}
            {...fadeUp}
          >
            <span className="text-3xl font-semibold text-white">J</span>
          </motion.div>

          <motion.h1
            className="text-4xl font-semibold text-white md:text-6xl"
            {...fadeUp}
          >
            Jugnu
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-lg text-white/70 md:text-xl"
            {...fadeUp}
          >
            Your AI companion for emotional clarity.
          </motion.p>

          <motion.div className="mt-10" {...fadeUp}>
            <Link
              to="/dashboard"
              className="rounded-2xl border border-white/20 bg-white/20 px-8 py-4 text-white shadow-[0_0_25px_var(--phase-glow)] transition hover:bg-white/30"
              style={{ "--phase-glow": "var(--phase-glow)" }}
            >
              Start Your Journey
            </Link>
          </motion.div>
        </section>

        <motion.section
          className="grid gap-6 md:grid-cols-2"
          {...fadeUp}
        >
          <GlassCard>
            <h2 className="text-2xl font-semibold text-white">
              The problem we solve
            </h2>
            <p className="mt-3 text-white/70">
              Most mood trackers feel clinical or shallow. Jugnu helps you feel
              seen and gently understand your emotional patterns without
              judgment.
            </p>
          </GlassCard>

          <GlassCard>
            <h2 className="text-2xl font-semibold text-white">
              Calm, human support
            </h2>
            <p className="mt-3 text-white/70">
              Jugnu adapts its tone to your emotional phase, offers soft daily
              messages, and gives you space to reflect without pressure.
            </p>
          </GlassCard>
        </motion.section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Track",
              copy: "Log moods in seconds and notice gentle trends.",
            },
            {
              title: "Reflect",
              copy: "Receive short prompts that feel safe and open-ended.",
            },
            {
              title: "Understand",
              copy: "Weekly insights highlight patterns without judgment.",
            },
          ].map((item) => (
            <motion.div key={item.title} {...fadeUp}>
              <GlassCard>
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-white/70">{item.copy}</p>
              </GlassCard>
            </motion.div>
          ))}
        </section>

        <motion.section className="grid gap-8 md:grid-cols-2" {...fadeUp}>
          <GlassCard className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-white">
              Animated dashboard preview
            </h2>
            <p className="text-white/70">
              A calm, adaptive workspace that evolves with your emotional
              phase.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 h-4 w-40 rounded-full bg-white/20" />
              <div className="mb-6 h-3 w-64 rounded-full bg-white/10" />
              <div className="grid gap-3 md:grid-cols-2">
                <div className="h-20 rounded-2xl bg-white/10" />
                <div className="h-20 rounded-2xl bg-white/10" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-white">
              Designed for emotional safety
            </h2>
            <p className="mt-3 text-white/70">
              Jugnu keeps tone gentle, avoids clinical language, and never
              encourages dependency.
            </p>
          </GlassCard>
        </motion.section>
      </div>
    </PhaseBackground>
  );
}
