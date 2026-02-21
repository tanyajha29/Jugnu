import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Adaptive Guidance",
    description:
      "Real-time support tailored to your unique emotional context.",
  },
  {
    title: "Safe Space",
    description:
      "Private, secure environment to process thoughts and feelings.",
  },
  {
    title: "Growth History",
    description:
      "Track your emotional journey and find patterns in your resilience.",
  },
];

export default function Landing() {
  return (
    <PhaseBackground>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-8 py-28 text-center">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/6">
            <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Jugnu
          </h1>

          <p className="max-w-2xl text-lg text-white/70">
            Your emotionally intelligent companion for life&apos;s difficult phases.
          </p>

          <Link
            to="/login"
            className="rounded-[24px] bg-[#7C3AED] px-8 py-4 text-white shadow-[0_10px_30px_rgba(124,58,237,0.35)] transition-all duration-300 hover:bg-[#6D28D9]"
          >
            Sign in to Jugnu
          </Link>
        </div>

        <section className="grid w-full grid-cols-1 gap-8 pt-8 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="animate-fade-in"
              style={{ animationDelay: `${(idx + 1) * 80}ms` }}
            >
              <GlassCard className="flex h-full flex-col gap-4 p-6 text-left">
                <div className="h-10 w-10 rounded-full border border-white/10 bg-white/6" />
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-white/70">{feature.description}</p>
              </GlassCard>
            </div>
          ))}
        </section>
      </div>
    </PhaseBackground>
  );
}
