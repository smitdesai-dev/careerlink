//done
const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  logins: { type: Number, default: 0 },
  signups: { type: Number, default: 0 },
  company_logins: { type: Number, default: 0 }, // Added company logins
  company_signups: { type: Number, default: 0 }, // Added company signups
});

const Analytics = mongoose.model("Analytics", AnalyticsSchema);
module.exports = Analytics;
