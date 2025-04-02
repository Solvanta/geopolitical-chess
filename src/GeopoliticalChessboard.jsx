import React, { useState } from "react";
import { BACKEND_URL } from "./config";

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
      const res = await fetch(`${BACKEND_URL}/api/strategy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      setStrategyData((prev) => ({ ...prev, [country]: data.summary }));
    } catch (err) {
      setStrategyData((prev) => ({
        ...prev,
        [country]: "Error getting AI strategy.",
      }));
    }
    setLoading((prev) => ({ ...prev, [country]: false }));
  };

  const handleNews = async (country) => {
    setLoading((prev) => ({ ...prev, [country]: true }));
    try {
      const res = await fetch(`${BACKEND_URL}/api/news`, {
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
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {countries.map((country) => (
        <div
          key={country.name}
          style={{
            border: `1px solid ${darkMode ? "#555" : "#ccc"}`,
            background: darkMode ? "#111" : "#fff",
            color: darkMode ? "#fff" : "#000",
            borderRadius: "12px",
            padding: "1rem",
            boxShadow: darkMode
              ? "0 4px 10px rgba(255,255,255,0.05)"
              : "0 4px 12px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
          }}
        >
          <h2 style={{ marginBottom: "0.3rem", fontSize: "18px" }}>
            {country.flag} {country.name}
          </h2>
          <p style={{ opacity: 0.7, fontSize: "14px" }}>{country.role}</p>

          <div style={{ marginTop: "8px", marginBottom: "10px" }}>
            <button
              onClick={() => handleAI(country.name)}
              disabled={loading[country.name]}
              style={{
                padding: "6px 12px",
                fontSize: "13px",
                backgroundColor: darkMode ? "#222" : "#eee",
                color: darkMode ? "#fff" : "#000",
                border: "1px solid",
                borderColor: darkMode ? "#333" : "#ccc",
                borderRadius: "6px",
                marginRight: "8px",
                cursor: "pointer",
              }}
            >
              {loading[country.name] ? "Thinking..." : "Get AI Strategy"}
            </button>

            <button
              onClick={() => handleNews(country.name)}
              style={{
                padding: "6px 12px",
                fontSize: "13px",
                backgroundColor: darkMode ? "#333" : "#ddd",
                color: darkMode ? "#fff" : "#000",
                border: "1px solid",
                borderColor: darkMode ? "#444" : "#bbb",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Get News
            </button>
          </div>

          {strategyData[country.name] && (
            <div style={{ fontSize: "13px", marginTop: "0.5rem" }}>
              <strong>♟️ AI Strategy:</strong>
              <p style={{ marginTop: "4px" }}>{strategyData[country.name]}</p>
            </div>
          )}

          {newsData[country.name] && newsData[country.name].length > 0 && (
            <div style={{ marginTop: "0.5rem", fontSize: "13px" }}>
              <strong>📰 News:</strong>
              <ul style={{ marginTop: "4px", paddingLeft: "18px" }}>
                {newsData[country.name].map((a, i) => (
                  <li key={i} style={{ marginBottom: "6px" }}>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: darkMode ? "#4fd1c5" : "#007acc" }}
                    >
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
