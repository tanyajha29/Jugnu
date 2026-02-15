import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import GlassCard from "../layout/GlassCard";
import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function WeeklyMoodChart() {
  const { dashboard } = useContext(EmotionContext);

  return (
    <GlassCard>
      <h3 className="text-white mb-4">Your week 🌱</h3>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={dashboard.weeklyTrend || []}>
          <XAxis dataKey="day" stroke="white" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="white"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
