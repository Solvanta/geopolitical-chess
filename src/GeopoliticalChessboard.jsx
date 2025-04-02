import { useState } from "react";
import { motion } from "framer-motion";

const countryFlags = {
  "USA": "🇺🇸",
  "China": "🇨🇳",
  "Russia": "🇷🇺",
  "EU": "🇪🇺",
  "India": "🇮🇳",
  "Turkey": "🇹🇷",
  "Iran": "🇮🇷",
  "UK": "🇬🇧",
  "Germany": "🇩🇪",
  "France": "🇫🇷",
  "Africa": "🌍",
  "Latin America": "🌎",
  "Southeast Asia": "🌏"
};

const countries = [
  "USA", "China", "Russia", "EU", "India", "Turkey", "Iran",
  "UK", "Germany", "France", "Africa", "Latin America", "Southeast Asia"
];

export default function GeopoliticalChessboard({ darkMode }) {
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState(null);
  const [news, setNews] = useState({});
  const [newsLoading, setNewsLoading] = useState(null);

  const getAIStrategy = async (country) => {
    setLoading(country);
    try {
      const response = await fetch("https://geopolitical-backend.onrender.com/api/strategy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ country })
      });

      const data = await response.json();
      setSummaries((prev) => ({ ...prev, [country]: data.summary }));
    } catch (err) {
      console.error(err);
      setSummaries((prev) => ({ ...prev, [country]: "Failed to load AI summary." }));
    } finally {
      setLoading(null);
    }
  };

  const getCountryNews = async (country) => {
    setNewsLoading(country);
  
    try {
      const response = await fetch("https://geopolitical-backend.onrender.com/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ country })
      });
  
      const data = await response.json();
  
      if (data.error) {
        console.error("Backend error:", data.error);
        setNews((prev) => ({ ...prev, [country]: [] }));
      } else {
        setNews((prev) => ({ ...prev, [country]: data.articles || [] }));
      }
    } catch (err) {
      console.error("News fetch error:", err);
      setNews((prev) => ({ ...prev, [country]: [] }));
    } finally {
      setNewsLoading(null);
    }
  };
  
  

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      padding: '20px',
    }}>
      {countries.map((country, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.03 }}
          style={{
            background: darkMode ? '#111' : '#fff',
            color: darkMode ? '#fff' : '#000',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '16px',
            border: `1px solid ${darkMode ? '#333' : '#ccc'}`,
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
            {countryFlags[country]} {country}
          </h2>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button
              onClick={() => getAIStrategy(country)}
              style={{
                padding: '6px 10px',
                backgroundColor: darkMode ? '#222' : '#eee',
                color: darkMode ? '#fff' : '#000',
                border: '1px solid',
                borderColor: darkMode ? '#444' : '#ccc',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {loading === country ? "Thinking..." : "Get AI Strategy"}
            </button>

            <button
              onClick={() => getCountryNews(country)}
              style={{
                padding: '6px 10px',
                backgroundColor: darkMode ? '#444' : '#ddd',
                color: darkMode ? '#fff' : '#000',
                border: '1px solid',
                borderColor: darkMode ? '#555' : '#bbb',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {newsLoading === country ? "Loading News..." : "Get News"}
            </button>
          </div>

          <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#333' }}>
            {summaries[country] || "Click the button to get strategy summary."}
          </p>

          {news[country] && (
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ marginBottom: '4px' }}>📰 Latest News:</h4>
              {news[country].length > 0 ? (
                <ul style={{ paddingLeft: '18px' }}>
                  {news[country].map((article, i) => (
                    <li key={i} style={{ fontSize: '13px', marginBottom: '6px' }}>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: darkMode ? '#4fd1c5' : '#007acc' }}>
                        {article.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: '13px', color: darkMode ? '#aaa' : '#555' }}>
                  No news found for {country}.
                </p>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
