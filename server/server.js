const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const axios = require("axios");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const adminRoutes = require("./routes/adminRoutes");
const applyRoutes = require("./routes/applicationRoutes");
const profileRoute = require("./routes/ProfileRoutes");
const newsRoutes = require("./routes/newsRoutes");
const courseRoutes = require("./routes/courseRoutes");
const contactRoutes = require("./routes/contactusRoutes");
const companyProfileRoutes = require("./routes/companyProfileRoutes");

// Middleware
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_CONNECTION_URI;
const CAREERLINK_CHATBOT = process.env.CAREERLINK_CHAT_BOT;

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", applyRoutes);
app.use("/api", profileRoute);
app.use("/api/news", newsRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api", contactRoutes);
app.use("/api", companyProfileRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Chatbot Route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!CAREERLINK_CHATBOT) {
      return res.status(500).json({ error: "Chatbot API key is missing" });
    }

    // Use the correct model name (gemini-1.5-pro)
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${CAREERLINK_CHATBOT}`,
      {
        contents: [{ parts: [{ text: message }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Google Gemini API Error:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({
        error: error.response?.data?.error?.message || "Internal server error",
      });
  }
});
