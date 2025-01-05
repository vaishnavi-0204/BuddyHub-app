const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const friendRoutes = require("./routes/friends");
const bcrypt = require('bcryptjs');
const recommendationRoutes = require("./routes/recommendations");
// this is a dotenv.config which helps to change .env file into .process.env.file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the BuddyHub App API!",
    endpoints: {
      auth: "/api/auth", // this is given by us so in postman it uses /auth/login for post request
      friends: "/api/friends",
      recommendations: "/api/recommendations",
    },
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
