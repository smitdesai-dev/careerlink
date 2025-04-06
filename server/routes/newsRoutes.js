const express = require("express");
const News = require("../schemas/newsfeed");
const axios = require("axios");
const cron = require("node-cron");
require("dotenv").config();

const router = express.Router();
const NEWSFEED_API = process.env.NEWS_API;

// Fetch and Update News from API
async function fetchAndUpdateNews() {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=technology&apiKey=${NEWSFEED_API}&pageSize=100`
    );

    if (response.data.articles.length > 0) {
      const businessNews = response.data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
      }));

      for (const article of businessNews) {
        await News.updateOne(
          { title: article.title },
          { $set: article },
          { upsert: true }
        );
      }

      console.log("News updated successfully.");
    } else {
      console.log("No new articles available.");
    }
  } catch (error) {
    console.error("Error updating news:", error.message);
  }
}

// Route to trigger manual news update
router.get("/update-news", async (req, res) => {
  try {
    await fetchAndUpdateNews();
    return res.json({ message: "News updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update news" });
  }
});

// Fetch Stored News
router.get("/fetch-news", async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    if (news.length === 0) {
      return res.status(404).json({ message: "No news found." });
    }
    return res.json(news);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch news from database" });
  }
});

// Schedule daily news updates at midnight
cron.schedule("* * * * *", async () => {
  console.log("Running scheduled news update task...");
  await fetchAndUpdateNews();
});

module.exports = router;
