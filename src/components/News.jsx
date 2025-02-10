import React, { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const NEWS_API_URL = import.meta.env.VITE_NEWS_API_URL;

  useEffect(() => {
    async function getNews() {
      try {
        const res = await fetch(`${NEWS_API_URL}/everything?q=tesla&from=2025-01-10&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`);
        const data = await res.json();

        if (data.articles) setNews(data.articles);
        else console.error("error fetching news: ", error);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    }
    getNews();
  }, []);

  return (
    <div className="h-dvh p-6 flex gap-3 flex-col items-center justify-center text-center bg-dark">
      <h2 className="text-4xl text-primary font-pressStart">Dino news</h2>
      <p className="max-w-2xl text-light mb-5">
        What have the newspapers dug up lately about our age old friends?
      </p>
      <div className="flex gap-5 flex-wrap justify-center"></div>
    </div>
  );
}
