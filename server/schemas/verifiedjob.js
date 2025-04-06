//done
const mongoose = require("mongoose");

const verifiedjobSchema = new mongoose.Schema(
  {
    file: { type: String, required: true },
    company_name: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    jobtype: {
      type: String,
      enum: ["FullTime", "PartTime", "Internship", "Temporary"],
      required: true,
    },
    salary: { type: Number, required: true },
    job_description: { type: String, required: true },
    company_description: { type: String, required: true },
    requirements: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
const VerifiedJob = mongoose.model("verifiedjobs", verifiedjobSchema);
module.exports = VerifiedJob;
