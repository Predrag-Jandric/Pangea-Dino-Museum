import React, { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const NEWS_API_URL = import.meta.env.VITE_NEWS_API_URL;

  // get news from API
  useEffect(() => {
    async function getNews() {
      try {
        const res = await fetch(
          `${NEWS_API_URL}/everything?q=dinosaurs&from=2025-01-10&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
        );
        const data = await res.json();

        if (data.articles) setNews(getRandomArticle(data.articles, 3));
        else console.error("error fetching news: ", error);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    }
    getNews();
  }, []);

  // get a random selection of articles, based on count passed
  function getRandomArticle(articles, count) {
    const randomized = [...articles].sort(() => 0.5 - Math.random());
    return randomized.slice(0, count);
  }

  return (
    <div
      id="news"
      className="h-dvh p-6 flex gap-3 flex-col items-center justify-center text-center bg-dark"
    >
      <h2 className="text-4xl text-primary font-pressStart">Dino news</h2>
      <p className="max-w-2xl text-light mb-5">
        What have the newspapers dug up lately about our age old friends?
      </p>
      <div className="flex gap-5 flex-wrap justify-center">
        {news.map((article, i) => {
          const {
            source,
            author,
            title,
            description,
            urlToImage,
            url,
            publishedAt,
            content,
          } = article;

          return (
            <a href={url} target="_blank" rel="noopener noreferrer" key={i}>
              <div className="relative h-[300px] w-[400px] group overflow-hidden cursor-pointer hover:outline outline-highlight transition-all">
                {urlToImage && (
                  <img
                    src={urlToImage}
                    className="h-[300px] w-[400px] object-cover group-hover:scale-110 transition"
                  />
                ) }
                <div className="font-pressStart text-xs p-5 absolute text-left text-light w-full flex flex-col justify-end h-full bottom-0 bg-gradient-to-t from-black/100 to-black/0 hover:text-highlight">
                  <div className="text-[10px] font-sans italic group-hover:text-primary">
                    {source.name}
                  </div>
                  {title}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
