import React, { useState } from "react";

const countryRoles = {
  USA: "♚ King",
  China: "♛ Queen",
  Russia: "♜ Rook",
  EU: "♝ Bishop",
  India: "♞ Knight",
  Turkey: "♟︎ Pawn",
  Iran: "♟︎ Pawn",
  UK: "♝ Bishop",
  Germany: "♜ Rook",
  France: "♞ Knight",
  Africa: "♟︎ Pawn",
  "Latin America": "♟︎ Pawn",
  "Southeast Asia": "♟︎ Pawn",
  Japan: "♞ Knight",
  Brazil: "♟︎ Pawn",
  Australia: "♟︎ Pawn",
};

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
  Brazil: "🇧🇷",
  Australia: "🇦🇺",
};

const countries = Object.keys(countryRoles);

export default function GeopoliticalChessboard({ darkMode }) {
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState(null);
  const [news, setNews] = useState({});
  const [newsLoading, setNewsLoading] = useState(null);

  const getAIStrategy = async (country) => {
    setLoading(country);
    try {
      const res = await fetch("https://geopolitical-backend.onrender.com/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      setSummaries((prev) => ({ ...prev, [country]: data.summary }));
    } catch (err) {
      console.error(err);
      setSummaries((prev) => ({ ...prev, [country]: "Failed to load strategy." }));
    } finally {
      setLoading(null);
    }
  };

  const getCountryNews = async (country) => {
    setNewsLoading(country);
    try {
      const res = await fetch("https://geopolitical-backend.onrender.com/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      setNews((prev) => ({ ...prev, [country]: data.articles || [] }));
    } catch (err) {
      console.error(err);
      setNews((prev) => ({ ...prev, [country]: [] }));
    } finally {
      setNewsLoading(null);
    }
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 0,
      maxWidth: "1200px",
      margin: "0 auto",
    }}>
      {countries.map((country, i) => {
        const isDarkTile = (Math.floor(i / 4) + i) % 2 === 0;
        const tileColor = isDarkTile ? (darkMode ? "#1e1e1e" : "#ddd") : (darkMode ? "#2e2e2e" : "#f9f9f9");

        return (
          <div key={country} style={{
            background: tileColor,
            color: darkMode ? "#fff" : "#000",
            padding: "14px",
            border: "1px solid #ccc",
            minHeight: "180px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
              {countryFlags[country]} {country}
            </h2>
            <p style={{ fontSize: "13px", color: darkMode ? "#aaa" : "#555" }} title={`Role: ${countryRoles[country]}`}>
              {countryRoles[country]}
            </p>

            <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
              <button onClick={() => getAIStrategy(country)} style={buttonStyle(darkMode)}>
                {loading === country ? "Thinking..." : "Get AI Strategy"}
              </button>
              <button onClick={() => getCountryNews(country)} style={buttonStyle(darkMode, true)}>
                {newsLoading === country ? "Loading..." : "Get News"}
              </button>
            </div>

            <p style={{ fontSize: "12px", color: darkMode ? "#ccc" : "#333", marginBottom: "6px" }}>
              {summaries[country] || "Click the button to get strategy summary."}
            </p>

            {news[country]?.length > 0 && (
              <ul style={{ fontSize: "12px", paddingLeft: "18px" }}>
                {news[country].map((article, i) => (
                  <li key={i}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: darkMode ? "#4fd1c5" : "#007acc" }}>
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

function buttonStyle(dark, secondary = false) {
  return {
    padding: "4px 8px",
    fontSize: "12px",
    backgroundColor: secondary ? (dark ? "#444" : "#ddd") : (dark ? "#222" : "#eee"),
    color: dark ? "#fff" : "#000",
    border: "1px solid",
    borderColor: dark ? "#555" : "#bbb",
    borderRadius: "4px",
    cursor: "pointer",
  };
}
