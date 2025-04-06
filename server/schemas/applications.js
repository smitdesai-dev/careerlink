const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  experience: String,
  resume: String,
  coverLetter: String,
  skills: [String],
  careerlink: String,
  github: String,
  // jobId: { type: String, ref: "verifiedjobs", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "verifiedjobs", required: true }
});

module.exports = mongoose.model("Application", applicationSchema);
