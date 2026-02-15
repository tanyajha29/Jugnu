import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import DashboardBackground from "../dashboard/DashboardBackground";
import GreetingCard from "../dashboard/GreetingCard";
import WeeklyMoodChart from "../dashboard/WeeklyChart";
import DailyMessage from "../dashboard/DailyMessage";

export default function Dashboard() {
  const { dashboard } = useContext(EmotionContext);

  if (!dashboard) return null;

  return (
    <DashboardBackground>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <GreetingCard />
        <WeeklyMoodChart />
        <DailyMessage />
      </div>
    </DashboardBackground>
  );
}
