import axios from "./axios";

export const fetchDashboard = () => axios.get("/dashboard");
export const fetchDailyMessage = () => axios.get("/message/daily");
export const fetchWeeklyMood = () => axios.get("/mood/weekly");
export const postMood = (data) => axios.post("/mood", data);
export const fetchReflectionPrompt = () => axios.get("/reflection/prompt");
export const postReflection = (data) => axios.post("/reflection", data);
