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

export default function Landing() {
  return (
    <PhaseBackground fireflyCount={5}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-8 py-32 sm:gap-32 sm:py-40">
        {/* Hero Section */}
        <section className="flex flex-col gap-12 text-center sm:gap-16">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h1 className="h1-landing text-white-95">
              Understand your <br className="hidden sm:inline" />
              emotions with AI
            </h1>
            <p className="mx-auto max-w-2xl body text-white-60">
              Jugnu is a thoughtful emotional AI designed to help you track, reflect on, and understand your feelings
              through calm, intelligent conversations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="rounded-[24px] border border-white/12 bg-white/10 px-8 py-4 text-body font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/14 active:scale-95"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="rounded-[24px] border border-white/8 bg-white/4 px-8 py-4 text-body font-medium text-white-80 transition-all duration-300 hover:border-white/12 hover:bg-white/6 hover:text-white-90 active:scale-95"
            >
              Sign In
            </Link>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {features.map((feature, idx) => (
              <GlassCard
                key={idx}
                className="flex flex-col gap-4 p-8 sm:p-10 sm:gap-6"
                variant={idx === 1 ? "elevated" : "default"}
              >
                <div className="h-10 w-10 rounded-[12px] bg-white/8" aria-hidden="true" />
                <div className="flex flex-col gap-2 sm:gap-3">
                  <h3 className="h3 text-white-90">{feature.title}</h3>
                  <p className="body-sm text-white-60">{feature.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="flex flex-col gap-12">
          <div className="text-center">
            <h2 className="h2 text-white-90">A Simple Path Forward</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-4">
            {steps.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 mx-auto">
                  <span className="text-body-sm font-medium text-white-80">{item.step}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="h3 text-white-90">{item.title}</h4>
                  <p className="body-sm text-white-60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section>
          <GlassCard className="flex flex-col gap-6 p-10 text-center sm:p-12 md:flex-row md:items-center md:justify-between md:gap-8" variant="elevated">
            <div className="flex flex-col gap-3 md:text-left">
              <h2 className="h2 text-white-90">Ready to begin?</h2>
              <p className="body-sm text-white-60 md:max-w-xs">Start your emotional journey today with a free account.</p>
            </div>
            <Link
              to="/register"
              className="flex-shrink-0 rounded-[24px] border border-white/12 bg-white/10 px-8 py-4 text-body font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/14 active:scale-95"
            >
              Create Account
            </Link>
          </GlassCard>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-center gap-6 border-t border-white/8 pt-12 text-center sm:pt-16 sm:gap-8">
          <div>
            <p className="h3 text-white-90 mb-2">Jugnu</p>
            <p className="body-sm text-white-60">Your emotional companion, powered by AI</p>
          </div>
          <div className="flex gap-6 text-body-sm text-white-60">
            <a href="#privacy" className="transition-color duration-300 hover:text-white-80">
              Privacy
            </a>
            <a href="#terms" className="transition-color duration-300 hover:text-white-80">
              Terms
            </a>
            <a href="#contact" className="transition-color duration-300 hover:text-white-80">
              Contact
            </a>
          </div>
          <p className="body-sm text-white-40">© 2024 Jugnu. All rights reserved.</p>
        </footer>
      </div>
    </PhaseBackground>
  );
}
