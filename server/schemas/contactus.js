//done
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("contactus", ContactSchema);
