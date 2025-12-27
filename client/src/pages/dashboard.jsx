import { useEffect, useState } from "react";
import API from "../api/api";
import "../style/dashboard.css";

import DailyMessage from "../components/dailyMessage";
import MoodCard from "../components/moodCard";
import WeeklyMoodChart from "../components/weeklyMoodChart";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setDashboard(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!dashboard) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Hello, {dashboard.user.name} 👋</h2>

      <DailyMessage message={dashboard.dailyMessage} />

      <MoodCard currentPhase={dashboard.currentPhase} />

      <WeeklyMoodChart moods={dashboard.weeklyMoodTrend} />
    </div>
  );
};

export default Dashboard;
