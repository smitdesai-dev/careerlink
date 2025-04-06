const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  downloadLink: { type: String },
  videoLink: { type: String },
  image: { type: String } // Store the image URL as a string
});

module.exports = mongoose.model("Course", courseSchema);
