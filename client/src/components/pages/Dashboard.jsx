import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import GreetingCard from "../dashboard/GreetingCard";
import WeeklyMoodChart from "../dashboard/WeeklyChart";
import WeeklyInsightCard from "../dashboard/WeeklyInsightCard";
import ReflectionPromptCard from "../dashboard/ReflectionPromptCard";
import AddMoodCard from "../dashboard/AddMoodCard";
import PhaseBackground from "../layout/PhaseBackground";
import MoodActions from "../dashboard/MoodActions";

export default function Dashboard() {
  const { dashboard } = useContext(EmotionContext);

  if (!dashboard) return (
    <PhaseBackground>
      <div className="mx-auto max-w-7xl px-6">
        <div className="space-y-32 py-64">
          {/* Greeting skeleton */}
          <div className="grid grid-cols-1 gap-32 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-16 rounded-2xl border border-white/10 bg-white/5 p-32 backdrop-blur-xl">
                <div className="h-20 w-1/2 animate-pulse rounded-xl bg-white/10" />
                <div className="h-16 w-2/3 animate-pulse rounded-xl bg-white/10" />
                <div className="h-32 w-full animate-pulse rounded-xl bg-white/10" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="space-y-16 rounded-2xl border border-white/10 bg-white/5 p-32 backdrop-blur-xl">
                <div className="h-16 w-3/4 animate-pulse rounded-xl bg-white/10" />
                <div className="h-24 w-full animate-pulse rounded-xl bg-white/10" />
              </div>
            </div>
          </div>

          {/* Chart skeleton */}
          <div className="space-y-16 rounded-2xl border border-white/10 bg-white/5 p-32 backdrop-blur-xl">
            <div className="h-16 w-1/3 animate-pulse rounded-xl bg-white/10" />
            <div className="h-64 w-full animate-pulse rounded-xl bg-white/10" />
          </div>

          {/* Insights skeleton */}
          <div className="space-y-16 rounded-2xl border border-white/10 bg-white/5 p-32 backdrop-blur-xl">
            <div className="h-16 w-1/2 animate-pulse rounded-xl bg-white/10" />
            <div className="h-32 w-full animate-pulse rounded-xl bg-white/10" />
          </div>
        </div>
      </div>
    </PhaseBackground>
  );

  return (
    <PhaseBackground
      fireflyCount={4}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-32 px-6">
        {/* Row 1: Greeting + Reflection Prompt */}
        <div className="grid grid-cols-1 gap-32 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GreetingCard />
          </div>
          <div className="lg:col-span-1">
            <ReflectionPromptCard />
          </div>
        </div>

        {/* Row 2: Weekly Chart */}
        <WeeklyMoodChart />

        {/* Row 3: Insights + Mood Actions */}
        <div className="grid grid-cols-1 gap-32 lg:grid-cols-2">
          <WeeklyInsightCard />
          <MoodActions />
        </div>

        {/* Row 4: Quick Mood Check */}
        <AddMoodCard />
      </div>
    </PhaseBackground>
  );
}
