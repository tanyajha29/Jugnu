import { motion } from "framer-motion";
import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { Link } from "react-router-dom";
import forestBg from "../../assets/forest-night-background.gif";
import lampHero from "../../assets/landing-lamp-hero.webp";
import cinematicOverlay from "../../assets/cinematic-firefly-overlay.webp";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true },
};

export default function Landing() {
  return (
    <PhaseBackground
      backgroundImage={forestBg}
      backgroundClassName="phase-cinematic"
      overlayImage={cinematicOverlay}
      overlayClassName="phase-overlay-soft"
      fireflyCount={10}
      accentOverride="#FCD34D"
      glowOverride="rgba(252, 211, 77, 0.45)"
      particleSpeedOverride="24s"
      className="landing-shell"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-24">
        <section className="grid min-h-[70vh] grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7 text-center md:text-left">
            <motion.div
              className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 shadow-[0_0_30px_rgba(252,211,77,0.45)]"
              {...fadeUp}
            >
              <span className="text-2xl font-semibold text-white">J</span>
            </motion.div>

            <motion.h1
              className="text-5xl font-semibold text-white md:text-6xl"
              {...fadeUp}
            >
              Your emotions deserve intelligence.
            </motion.h1>
            <motion.p
              className="mt-4 max-w-2xl text-lg text-white/70 md:text-xl"
              {...fadeUp}
            >
              AI-powered emotional awareness that feels calm, grounded, and
              responsive.
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start" {...fadeUp}>
              <Link
                to="/dashboard"
                className="rounded-2xl border border-white/20 bg-white/20 px-8 py-4 text-white shadow-[0_0_25px_rgba(252,211,77,0.45)] transition hover:bg-white/30"
              >
                Get Started
              </Link>
              <Link
                to="/insights"
                className="rounded-2xl border border-white/30 px-8 py-4 text-white/80 transition hover:bg-white/10"
              >
                See Demo
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative flex items-center justify-center md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="absolute inset-0 rounded-full bg-amber-200/10 blur-3xl" />
            <img
              src={lampHero}
              alt="Floating lamp"
              className="w-full max-w-sm animate-[float_6s_ease-in-out_infinite]"
            />
          </motion.div>
        </section>

        <motion.section
          className="grid gap-8 md:grid-cols-2"
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
