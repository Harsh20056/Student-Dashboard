const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const journalRoutes = require("./routes/journal.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const profileRoutes = require("./routes/profile.routes");

connectDB();

const path = require("path");
const authMiddleware = require("./middlewares/auth.middleware");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/journal", authMiddleware, journalRoutes);
app.use("/api/dashboard", authMiddleware, dashboardRoutes);
app.use("/api/profile", profileRoutes);

module.exports = app;
