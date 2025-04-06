//done
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String, // Image URL field
  publishedAt: Date,
});

module.exports = mongoose.model("News", newsSchema);
