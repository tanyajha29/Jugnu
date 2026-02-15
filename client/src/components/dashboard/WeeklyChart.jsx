import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function WeeklyMoodChart() {
  const { dashboard } = useContext(EmotionContext);
  // Mood data array placeholder.
  const fallbackData = [
    { day: "Mon", mood: 3 },
    { day: "Tue", mood: 2 },
    { day: "Wed", mood: 3 },
    { day: "Thu", mood: 4 },
    { day: "Fri", mood: 3 },
    { day: "Sat", mood: 4 },
    { day: "Sun", mood: 3 },
  ];
  const chartData = dashboard?.weeklyTrend?.length
    ? dashboard.weeklyTrend
    : fallbackData;

  return (
    <GlassCard>
      <h3 className="text-white mb-4">Your week 🌱</h3>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="day" stroke="white" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="var(--phase-accent)"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
