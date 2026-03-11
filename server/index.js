const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const heroRoutes = require("./routes/heroRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());

// allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",   // Vite React
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }

    },
    credentials: true
  })
);

connectDB();

app.get("/healthy", (req, res) => {
  res.status(200).json({ status: 200, msg: "Server is healthy" });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/users", userRoutes);
app.use("/api/heroes", heroRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});