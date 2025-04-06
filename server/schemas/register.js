//done
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
  otp: String,
  isVerified: { type: Boolean, default: false },
  sessionId: { type: String, default: null },
  loginHistory: [
    {
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Register", userSchema);
