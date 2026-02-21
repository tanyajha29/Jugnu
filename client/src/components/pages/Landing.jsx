import { motion } from "framer-motion";
import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Reflective Journaling",
    description:
      "A calm space to articulate your feelings with AI-guided prompts that help you understand yourself better.",
  },
  {
    title: "Adaptive Themes",
    description:
      "The interface subtly shifts to match your emotional state, creating a truly personalized experience.",
  },
  {
    title: "Smart Insights",
    description:
      "Discover patterns in your emotional life and gain actionable insights that support your growth.",
  },
];

const steps = [
  { step: "01", title: "Track", desc: "Log your mood and emotional state" },
  { step: "02", title: "Reflect", desc: "Write about what you're feeling" },
  { step: "03", title: "Understand", desc: "Discover your emotional patterns" },
  { step: "04", title: "Grow", desc: "Use insights to support yourself" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Landing() {
  return (
    <PhaseBackground fireflyCount={8}>
      <div className="relative mx-auto w-full max-w-6xl px-8 py-40 flex flex-col gap-32">

        {/* HERO */}
        <section className="relative flex flex-col items-center text-center gap-12">

          {/* Golden ambient glow */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-amber-300/20 to-yellow-500/10 blur-3xl"
          />

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl font-semibold tracking-tight text-white leading-tight"
          >
            Understand your emotions <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
              with clarity
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-lg text-white/60 leading-relaxed"
          >
            Jugnu is a thoughtful emotional AI designed to help you
            track, reflect, and understand your inner world through
            calm, intelligent interaction.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/register"
              className="rounded-xl px-10 py-4 font-medium text-white
              bg-white/10 backdrop-blur-xl border border-white/15
              shadow-[0_0_40px_rgba(255,200,50,0.15)]
              transition-all duration-300
              hover:bg-white/15 hover:border-white/25"
            >
              Begin Your Journey
            </Link>

            <Link
              to="/login"
              className="rounded-xl px-10 py-4 font-medium text-white/80
              border border-white/10 bg-white/5
              transition-all duration-300
              hover:text-white hover:bg-white/10"
            >
              Sign In
            </Link>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
            >
              <GlassCard
                className="p-10 flex flex-col gap-6 transition-all duration-500
                hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-white/15 to-white/5" />
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-medium text-white/90">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </section>

        {/* HOW IT WORKS */}
        <section className="flex flex-col gap-16">
          <h2 className="text-3xl font-semibold text-white text-center">
            A Simple Path Forward
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="h-12 w-12 flex items-center justify-center
                  rounded-xl border border-white/15 bg-white/5
                  text-white/80 text-sm font-medium">
                  {item.step}
                </div>

                <h4 className="text-lg font-medium text-white/90">
                  {item.title}
                </h4>

                <p className="text-white/60 text-sm max-w-xs">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section>
          <GlassCard className="p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">
                Ready to begin?
              </h2>
              <p className="text-white/60 max-w-sm">
                Start your emotional journey today.
              </p>
            </div>

            <Link
              to="/register"
              className="rounded-xl px-10 py-4 font-medium text-white
              bg-white/10 border border-white/15
              transition-all duration-300
              hover:bg-white/15"
            >
              Create Account
            </Link>
          </GlassCard>
        </section>

      </div>
    </PhaseBackground>
  );
}
