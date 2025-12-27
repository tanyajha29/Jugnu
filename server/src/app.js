require("dotenv").config();
console.log("DB URL:", process.env.DATABASE_URL);
const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");  
const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");
const moodRoutes= require("./routes/mood.routes");
const reflectionRoutes= require("./routes/reflection.routes");
const DashboardRoutes = require("./routes/dashboard.routes");

app.use(cors());
app.use(express.json());

app.use("/api/mood", moodRoutes);
app.use("/api/reflection", reflectionRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/dashboard", DashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Jugnu Backend is running 🪔");
});

module.exports = app;
