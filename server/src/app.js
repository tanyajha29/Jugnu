require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");
const moodRoutes = require("./routes/mood.routes");
const reflectionRoutes = require("./routes/reflection.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const requestLogger = require("./middleware/requestLogger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/mood", moodRoutes);
app.use("/api/reflection", reflectionRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Jugnu Backend is running ðŸª”");
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
