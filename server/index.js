const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const heroRoutes = require("./routes/heroRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(express.json());

// allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",   // Vite React
  "http://localhost:3000",
  "http://localhost:5174"
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

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/healthy", (req, res) => {
  res.status(200).json({ status: 200, msg: "Server is healthy" });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/users", userRoutes);
app.use("/api/heroes", heroRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});