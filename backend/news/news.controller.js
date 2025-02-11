const NEWS_API_URL = process.env.SUPABASE_NEWS_API_URL;
const NEWS_API_KEY = process.env.SUPABASE_NEWS_API_KEY;

export const getNews = async (req, res) => {
    try {
        const response = await fetch(
          `${NEWS_API_URL}/everything?q=dinosaurs&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
        );
        const data = await response.json();
        res.json(data.articles)
      } catch (error) {
        console.error("Failed to fetch news:");
        res.status(500).json({error: "Failed to fetch news"})
      }
};
