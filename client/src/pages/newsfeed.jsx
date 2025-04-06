import axios from "axios";
import { useEffect, useState } from "react";
import LocalHeader from "../components/LocalHeader";
import "../css/newsfeed.css";

function Newsfeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/news/fetch-news"
        );
        setNews(response.data);
      } catch (err) {
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading)
    return <p className="loading-message">Loading business news...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <LocalHeader />
      <main id="newsfeed-background">
        <div id="news-container">
          {news.map((article, index) => (
            <div key={index} id="news-content">
              <div id="news-text">
                <h1 className="article-title">{article.title}</h1>
                {article.urlToImage && (
                  <h5 className="article-description">{article.description}</h5>
                )}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="read-more"
                >
                  Read more
                </a>
              </div>
              <img src={article.urlToImage} alt="News" id="news-img" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Newsfeed;
