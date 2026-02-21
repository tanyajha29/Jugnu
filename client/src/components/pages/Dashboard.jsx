import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import GreetingCard from "../dashboard/GreetingCard";
import WeeklyMoodChart from "../dashboard/WeeklyChart";
import WeeklyInsightCard from "../dashboard/WeeklyInsightCard";
import ReflectionPromptCard from "../dashboard/ReflectionPromptCard";
import PhaseBackground from "../layout/PhaseBackground";
import MoodActions from "../dashboard/MoodActions";

export default function Dashboard() {
  const { dashboard } = useContext(EmotionContext);

  if (!dashboard)
    return (
      <PhaseBackground>
        <div className="mx-auto max-w-7xl px-8">
          <div className="space-y-8 py-32 sm:space-y-12 sm:py-40">
            {/* Greeting & Prompt skeleton */}
            <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="space-y-4 rounded-[24px] border border-white/8 bg-white/4 p-8 sm:p-10 sm:space-y-6 backdrop-blur-md">
                  <div className="h-8 w-1/2 animate-pulse rounded-lg bg-white/10" />
                  <div className="h-6 w-2/3 animate-pulse rounded-lg bg-white/10" />
                  <div className="h-20 w-full animate-pulse rounded-lg bg-white/10" />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="space-y-4 rounded-[24px] border border-white/8 bg-white/4 p-8 sm:p-10 sm:space-y-6 backdrop-blur-md">
                  <div className="h-6 w-3/4 animate-pulse rounded-lg bg-white/10" />
                  <div className="h-16 w-full animate-pulse rounded-lg bg-white/10" />
                </div>
              </div>
            </div>

            {/* Chart skeleton */}
            <div className="space-y-4 rounded-[24px] border border-white/8 bg-white/4 p-8 sm:p-10 sm:space-y-6 backdrop-blur-md">
              <div className="h-6 w-1/3 animate-pulse rounded-lg bg-white/10" />
              <div className="h-56 w-full animate-pulse rounded-lg bg-white/10" />
            </div>

            {/* Insights skeleton */}
            <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
              <div className="space-y-4 rounded-[24px] border border-white/8 bg-white/4 p-8 sm:p-10 sm:space-y-6 backdrop-blur-md">
                <div className="h-6 w-1/2 animate-pulse rounded-lg bg-white/10" />
                <div className="h-24 w-full animate-pulse rounded-lg bg-white/10" />
              </div>
              <div className="space-y-4 rounded-[24px] border border-white/8 bg-white/4 p-8 sm:p-10 sm:space-y-6 backdrop-blur-md">
                <div className="h-6 w-1/2 animate-pulse rounded-lg bg-white/10" />
                <div className="h-24 w-full animate-pulse rounded-lg bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </PhaseBackground>
    );

  return (
    <PhaseBackground>
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 pb-16 pt-32">
        {/* Section 1: Greeting (2/3) + Reflection (1/3) */}
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GreetingCard />
          </div>
          <div className="lg:col-span-1">
            <ReflectionPromptCard />
          </div>
        </div>

        {/* Section 2: Weekly Mood Trend (Full Width) */}
        <div>
          <WeeklyMoodChart />
        </div>

        {/* Section 3: Weekly Insights + Adjust Your State */}
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
          <WeeklyInsightCard />
          <MoodActions />
        </div>
      </div>
    </PhaseBackground>
  );
}
