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
  const chartData = dashboard?.weeklyTrend?.length
    ? dashboard.weeklyTrend
    : fallbackData;

  return (
    <GlassCard className="flex flex-col gap-24 p-32">
      <div className="flex flex-col gap-8">
        <h2 className="text-h2 text-white">Weekly Mood Trend</h2>
        <p className="text-white-80">A gentle view of your emotional rhythm this week.</p>
      </div>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis
              dataKey="day"
              stroke="rgba(255, 255, 255, 0.4)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
              tickMargin={12}
            />
            <YAxis hide domain={[0, 5]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(8px)",
              }}
              itemStyle={{ color: "#fff" }}
              cursor={{ stroke: "rgba(255, 255, 255, 0.1)", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke={theme.accent}
              strokeWidth={4}
              dot={{ r: 4, fill: theme.accent, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
