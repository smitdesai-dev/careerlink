const mongoose = require("mongoose");

const CompanyProfileSchema = new mongoose.Schema({
  companyName: String,
  email: { type: String, required: true, unique: true },
  establishedDate: String,
  city: String,
  state: String,
  phone: String,
  vision: String,
  profilePic: String,
});

module.exports = mongoose.model("CompanyProfile", CompanyProfileSchema);
