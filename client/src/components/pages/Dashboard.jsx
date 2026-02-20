import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import GreetingCard from "../dashboard/GreetingCard";
import WeeklyMoodChart from "../dashboard/WeeklyChart";
import WeeklyInsightCard from "../dashboard/WeeklyInsightCard";
import ReflectionPromptCard from "../dashboard/ReflectionPromptCard";
import AddMoodCard from "../dashboard/AddMoodCard";
import PhaseBackground from "../layout/PhaseBackground";
import { motion } from "framer-motion";
import DailyMessage from "../dashboard/DailyMessage";

export default function Dashboard() {
  const { dashboard } = useContext(EmotionContext);

  if (!dashboard) return null;

  return (
    <PhaseBackground>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <motion.div
          className="space-y-6 md:col-span-2"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GreetingCard />
          <DailyMessage />
        </motion.div>

        <ReflectionPromptCard />

        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <WeeklyMoodChart />
        </motion.div>

        <div className="md:col-span-3">
          <WeeklyInsightCard />
        </div>

        <div className="md:col-span-3 flex justify-end">
          <div className="w-full md:max-w-sm">
            <AddMoodCard />
          </div>
        </div>
      </div>
    </PhaseBackground>
  );
}
