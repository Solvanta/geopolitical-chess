import React, { useState } from "react";

const countries = [
  { name: "USA", role: "♚ King", flag: "🇺🇸" },
  { name: "China", role: "♛ Queen", flag: "🇨🇳" },
  { name: "Russia", role: "♜ Rook", flag: "🇷🇺" },
  { name: "EU", role: "♝ Bishop", flag: "🇪🇺" },
  { name: "India", role: "♞ Knight", flag: "🇮🇳" },
  { name: "Turkey", role: "♟ Pawn", flag: "🇹🇷" },
  { name: "Iran", role: "♟ Pawn", flag: "🇮🇷" },
  { name: "UK", role: "♝ Bishop", flag: "🇬🇧" },
  { name: "Germany", role: "♜ Rook", flag: "🇩🇪" },
  { name: "France", role: "♞ Knight", flag: "🇫🇷" },
  { name: "Africa", role: "♟ Pawn", flag: "🌍" },
  { name: "Latin America", role: "♟ Pawn", flag: "🌎" },
  { name: "Southeast Asia", role: "♟ Pawn", flag: "🌏" },
  { name: "Japan", role: "♞ Knight", flag: "🇯🇵" },
  { name: "Brazil", role: "♟ Pawn", flag: "🇧🇷" },
  { name: "Australia", role: "♟ Pawn", flag: "🇦🇺" },
];

export default function GeopoliticalChessboard({ darkMode }) {
  const [strategyData, setStrategyData] = useState({});
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState({});

  const handleAI = async (country) => {
    setLoading((prev) => ({ ...prev, [country]: true }));
    try {
      const res = await fetch("/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      setStrategyData((prev) => ({ ...prev, [country]: data.summary }));
    } catch (err) {
      setStrategyData((prev) => ({ ...prev, [country]: "Error getting AI strategy." }));
    }
    setLoading((prev) => ({ ...prev, [country]: false }));
  };

  const handleNews = async (country) => {
    setLoading((prev) => ({ ...prev, [country]: true }));
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      setNewsData((prev) => ({ ...prev, [country]: data.articles || [] }));
    } catch (err) {
      setNewsData((prev) => ({ ...prev, [country]: [] }));
    }
    setLoading((prev) => ({ ...prev, [country]: false }));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {countries.map((country) => (
        <div
          key={country.name}
          style={{
            border: `1px solid ${darkMode ? "#555" : "#ccc"}`,
            background: darkMode ? "#1e1e1e" : "#fff",
            borderRadius: "10px",
            padding: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "0.3rem" }}>{country.flag} {country.name}</h2>
          <p style={{ opacity: 0.7 }}>{country.role}</p>

          <div style={{ marginBottom: "10px" }}>
            <button onClick={() => handleAI(country.name)} disabled={loading[country.name]}>
              {loading[country.name] ? "Loading..." : "Get AI Strategy"}
            </button>
            <button onClick={() => handleNews(country.name)} style={{ marginLeft: "10px" }}>
              Get News
            </button>
          </div>

          {strategyData[country.name] && (
            <div style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
              <strong>AI:</strong> {strategyData[country.name]}
            </div>
          )}

          {newsData[country.name] && newsData[country.name].length > 0 && (
            <div style={{ marginTop: "0.5rem" }}>
              <strong>News:</strong>
              <ul>
                {newsData[country.name].map((a, i) => (
                  <li key={i}><a href={a.url} target="_blank" rel="noreferrer">{a.title}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
