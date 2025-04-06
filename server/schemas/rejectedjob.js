//done
const mongoose = require("mongoose");

const rejectedJobSchema = new mongoose.Schema(
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
      enum: ["Rejected"],
      default: "Rejected",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rejectedjobs", rejectedJobSchema);
