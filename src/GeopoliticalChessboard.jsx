import { useState } from "react";
import { motion } from "framer-motion";

const countryFlags = {
  USA: "🇺🇸",
  China: "🇨🇳",
  Russia: "🇷🇺",
  EU: "🇪🇺",
  India: "🇮🇳",
  Turkey: "🇹🇷",
  Iran: "🇮🇷",
  UK: "🇬🇧",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Africa: "🌍",
  "Latin America": "🌎",
  "Southeast Asia": "🌏",
  Japan: "🇯🇵",
  "South Korea": "🇰🇷",
  "Saudi Arabia": "🇸🇦",
};

const countryRoles = {
  USA: "♚ King",
  China: "♛ Queen",
  Russia: "♜ Rook",
  EU: "♝ Bishop",
  India: "♞ Knight",
  Turkey: "♟ Pawn",
  Iran: "♟ Pawn",
  UK: "♝ Bishop",
  Germany: "♜ Rook",
  France: "♞ Knight",
  Africa: "♟ Pawn",
  "Latin America": "♟ Pawn",
  "Southeast Asia": "♟ Pawn",
  Japan: "♝ Bishop",
  "South Korea": "♞ Knight",
  "Saudi Arabia": "♟ Pawn",
};

const countries = Object.keys(countryFlags);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
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
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          marginBottom: "20px",
          color: darkMode ? "#f0f0f0" : "#111",
        }}
      >
        🌐 Geopolitical Chessboard
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {countries.map((country, index) => {
          const isDark = (Math.floor(index / 4) + index) % 2 === 0;
          const tileColor = isDark
            ? darkMode
              ? "#1e1e1e"
              : "#ddd"
            : darkMode
            ? "#2e2e2e"
            : "#f9f9f9";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              style={{
                background: tileColor,
                color: darkMode ? "#fff" : "#000",
                padding: "10px",
                border: "1px solid #ccc",
                minHeight: "160px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h2
                style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px" }}
                title={countryRoles[country]}
              >
                {countryFlags[country]} {country}
              </h2>
              <p
                style={{ fontSize: "13px", color: darkMode ? "#aaa" : "#555", marginBottom: "6px" }}
              >
                {countryRoles[country]}
              </p>
              <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                <button
                  onClick={() => getAIStrategy(country)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    backgroundColor: darkMode ? "#222" : "#eee",
                    color: darkMode ? "#fff" : "#000",
                    border: "1px solid",
                    borderColor: darkMode ? "#444" : "#ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {loading === country ? "Thinking..." : "Get AI Strategy"}
                </button>
                <button
                  onClick={() => getCountryNews(country)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    backgroundColor: darkMode ? "#444" : "#ddd",
                    color: darkMode ? "#fff" : "#000",
                    border: "1px solid",
                    borderColor: darkMode ? "#555" : "#bbb",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {newsLoading === country ? "Loading News..." : "Get News"}
                </button>
              </div>
              <p style={{ fontSize: "12px", color: darkMode ? "#ccc" : "#333", marginBottom: "6px" }}>
                {summaries[country] || "Click the button to get strategy summary."}
              </p>
              {news[country] && news[country].length > 0 && (
                <ul style={{ fontSize: "12px", paddingLeft: "18px" }}>
                  {news[country].map((article, i) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: darkMode ? "#4fd1c5" : "#007acc" }}
                      >
                        {article.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
