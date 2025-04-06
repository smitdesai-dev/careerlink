const mongoose = require("mongoose");

const postJobSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String, required: true },
  jobtype: { type: String, required: true },
  salary: { type: Number, required: true },
  job_description: { type: String, required: true },
  company_description: { type: String, required: true },
  requirements: { type: String, required: true },
  file: { type: String, required: true },
});

module.exports = mongoose.model("postjobs", postJobSchema);
