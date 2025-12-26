require("dotenv").config();
console.log("DB URL:", process.env.DATABASE_URL);
const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");  
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Jugnu Backend is running 🪔");
});

module.exports = app;
