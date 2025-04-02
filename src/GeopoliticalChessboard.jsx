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
      gridTemplateColumns: 'repeat(4, 1fr)', // Adjust for 4 columns
      gap: 0,
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {countries.map((country, index) => {
        const isDark = (Math.floor(index / 4) + index) % 2 === 0; // chessboard pattern
        const tileColor = isDark ? (darkMode ? '#1e1e1e' : '#ddd') : (darkMode ? '#2e2e2e' : '#f9f9f9');
    
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            style={{
              background: tileColor,
              color: darkMode ? '#fff' : '#000',
              padding: '14px',
              border: '1px solid #ccc',
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Inside content stays the same (flag, buttons, summary, etc.) */}
          </motion.div>
        );
      })}
    </div>
    
  );
}
