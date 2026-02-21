import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, YAxis } from "recharts";
import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function WeeklyMoodChart() {
  const { dashboard, theme } = useContext(EmotionContext);
  const fallbackData = [
    { day: "Mon", mood: 3 },
    { day: "Tue", mood: 2 },
    { day: "Wed", mood: 3 },
    { day: "Thu", mood: 4 },
    { day: "Fri", mood: 3 },
    { day: "Sat", mood: 4 },
    { day: "Sun", mood: 3 },
  ];
  const chartData = dashboard?.weeklyTrend?.length ? dashboard.weeklyTrend : fallbackData;

  return (
    <GlassCard className="flex flex-col gap-4 p-8 sm:gap-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <h2 className="h2 text-white-90">Weekly Mood Trend</h2>
        <p className="body-sm text-white-60">A gentle view of your emotional rhythm this week.</p>
      </div>

      {/* Chart */}
      <div className="h-48 w-full sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
            <XAxis
              dataKey="day"
              stroke="rgba(255, 255, 255, 0.25)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
              tickMargin={12}
            />
            <YAxis hide domain={[0, 5]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 14, 26, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
              }}
              itemStyle={{ color: "#fff" }}
              cursor={{ stroke: "rgba(255, 255, 255, 0.1)", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke={theme.accent}
              strokeWidth={3}
              dot={{ r: 3, fill: theme.accent, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
