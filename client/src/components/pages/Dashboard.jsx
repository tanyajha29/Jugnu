import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";
import GreetingCard from "../dashboard/GreetingCard";
import WeeklyMoodChart from "../dashboard/WeeklyChart";
import WeeklyInsightCard from "../dashboard/WeeklyInsightCard";
import ReflectionPromptCard from "../dashboard/ReflectionPromptCard";
import AddMoodCard from "../dashboard/AddMoodCard";
import PhaseBackground from "../layout/PhaseBackground";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { dashboard } = useContext(EmotionContext);

  if (!dashboard) return null;

  return (
    <PhaseBackground>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GreetingCard />
        </motion.div>

        <WeeklyInsightCard />

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <WeeklyMoodChart />
        </motion.div>

        <ReflectionPromptCard />
        <AddMoodCard />
      </div>
    </PhaseBackground>
  );
}
