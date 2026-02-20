import axios from "./axios";

export const fetchDashboard = async () =>
  (await axios.get("/dashboard")).data.data;
export const fetchDailyMessage = async () =>
  (await axios.get("/message/daily")).data.data;
export const fetchWeeklyMood = async () =>
  (await axios.get("/mood/weekly")).data.data;
export const postMood = async (data) =>
  (await axios.post("/mood", data)).data.data;
export const fetchReflectionPrompt = async () =>
  (await axios.get("/reflection/prompt")).data.data;
export const postReflection = async (data) =>
  (await axios.post("/reflection", data)).data.data;
export const fetchReflections = async () =>
  (await axios.get("/reflection")).data.data;
