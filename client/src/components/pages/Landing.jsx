import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <PhaseBackground
      fireflyCount={6}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-80 px-6 py-64">
        {/* Hero Section */}
        <section className="flex flex-col gap-48 text-center">
          <div className="flex flex-col gap-24">
            <h1 className="text-h1-landing text-white leading-tight">
              Understand your <br />
              <span className="bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent">emotions with AI</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/70">
              Jugnu is a thoughtful emotional companion designed to help you track, reflect on, and understand your feelings through calm, intelligent conversations.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-16 sm:flex-row">
            <Link
              to="/register"
              className="rounded-lg bg-white px-32 py-16 text-sm font-semibold text-slate-900 transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-white/20 bg-white/5 px-32 py-16 text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10 active:scale-95"
            >
              Sign In
            </Link>
          </div>
        </section>

        {/* Feature Sections */}
        <section className="flex flex-col gap-32">
          <div className="grid grid-cols-1 gap-32 md:grid-cols-3">
            {/* Feature 1 */}
            <GlassCard className="flex flex-col gap-24 p-32">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-300 to-blue-500" />
              </div>
              <div className="flex flex-col gap-12">
                <h3 className="text-xl font-semibold text-white">Reflective Journaling</h3>
                <p className="text-white/70">
                  A calm space to articulate your feelings with AI-guided prompts that help you understand yourself better.
                </p>
              </div>
            </GlassCard>

            {/* Feature 2 */}
            <GlassCard className="flex flex-col gap-24 p-32" variant="elevated">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-300 to-purple-500" />
              </div>
              <div className="flex flex-col gap-12">
                <h3 className="text-xl font-semibold text-white">Adaptive Themes</h3>
                <p className="text-white/70">
                  The interface subtly shifts to match your emotional state, creating a truly personalized experience.
                </p>
              </div>
            </GlassCard>

            {/* Feature 3 */}
            <GlassCard className="flex flex-col gap-24 p-32">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-300 to-pink-500" />
              </div>
              <div className="flex flex-col gap-12">
                <h3 className="text-xl font-semibold text-white">Smart Insights</h3>
                <p className="text-white/70">
                  Discover patterns in your emotional life and gain actionable insights that support your growth.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* How It Works */}
        <section className="flex flex-col gap-32">
          <div className="text-center">
            <h2 className="text-h2 text-white">A Simple Path Forward</h2>
          </div>
          <div className="grid grid-cols-1 gap-24 md:grid-cols-4">
            {[
              { step: "1", title: "Track", desc: "Log your mood and current state" },
              { step: "2", title: "Reflect", desc: "Write about what you're feeling" },
              { step: "3", title: "Understand", desc: "Discover your emotional patterns" },
              { step: "4", title: "Grow", desc: "Use insights to support yourself" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 mx-auto text-sm font-semibold text-white/80">
                  {item.step}
                </div>
                <div className="flex flex-col gap-8">
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <GlassCard className="flex flex-col gap-24 p-48 text-center md:flex-row md:items-center md:justify-between md:gap-32" variant="elevated">
            <div className="flex flex-col gap-12 md:text-left">
              <h2 className="text-h2 text-white">Ready to begin?</h2>
              <p className="text-white/70 md:max-w-sm">Start your emotional journey today with a free account.</p>
            </div>
            <Link
              to="/register"
              className="flex-shrink-0 rounded-lg bg-white px-40 py-16 text-sm font-semibold text-slate-900 transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              Create Account
            </Link>
          </GlassCard>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-center gap-24 border-t border-white/10 pt-48 text-center text-sm text-white/60">
          <div>
            <p className="mb-12 text-base font-semibold text-white">Jugnu</p>
            <p>Your emotional companion, powered by AI.</p>
          </div>
          <div className="flex gap-32">
            <a href="#" className="hover:text-white/90 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/90 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/90 transition-colors">Contact</a>
          </div>
          <p>© 2024 Jugnu. All rights reserved.</p>
        </footer>
      </div>
    </PhaseBackground>
  );
}
