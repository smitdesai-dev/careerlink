// const mongoose = require("mongoose");

// const companySchema = new mongoose.Schema({
//   companyname: { type: String, required: true  },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   otp: { type: String },
//   isVerified: { type: Boolean, default: false },
//   sessionId: { type: String, default: null },
//   loginHistory: [
//     {
//       timestamp: { type: Date, default: Date.now },
//     },
//   ],
// });

// module.exports = mongoose.model("company_register", companySchema);

const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyname: { type: String, required: true, unique: true }, // Enforce uniqueness
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  sessionId: { type: String, default: null },
  loginHistory: { type: Array, default: [] },
});

// Ensure the unique index is applied
companySchema.index({ companyname: 1 }, { unique: true });

module.exports = mongoose.model("company_register", companySchema);
