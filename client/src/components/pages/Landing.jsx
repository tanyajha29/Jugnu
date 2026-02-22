import PhaseBackground from "../layout/PhaseBackground";
import GlassCard from "../layout/GlassCard";
import { Link } from "react-router-dom";
import fireflyGif from "../../assets/firefly.gif";

const features = [
  {
    title: "Adaptive Guidance",
    description: "Real-time support tailored to your unique emotional context.",
  },
  {
    title: "Safe Space",
    description: "Private, secure environment to process thoughts and feelings.",
  },
  {
    title: "Growth History",
    description: "Track your emotional journey and find patterns in your resilience.",
  },
];

export default function Landing() {
  return (
    <PhaseBackground variant="landing" showStars={true} showGlow={true}>
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 py-24 text-center sm:px-8">
        <div className="landing-hero">
          <h1 className="text-5xl font-semibold tracking-tight text-slate-50 sm:text-6xl">
            Your quiet AI companion for emotional clarity.
          </h1>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Gentle guidance and reflection, built to meet you in every phase.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="cta-primary"
            >
              Begin your reflection
            </Link>
            <Link
              to="/login"
              className="cta-secondary"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="landing-firefly-wrap">
          <img src={fireflyGif} alt="Jugnu Firefly" className="landing-firefly" />
        </div>

        <section className="grid w-full grid-cols-1 gap-6 pt-8 md:grid-cols-3">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="p-6 text-left">
              <div className="h-10 w-10 rounded-xl bg-white/10" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </section>
      </div>
    </PhaseBackground>
  );
}
