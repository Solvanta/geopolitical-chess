import React from 'react';
import { useState } from "react";
import GeopoliticalChessboard from "./GeopoliticalChessboard";

function App() {
  const [darkMode, setDarkMode] = useState(true); // default: dark

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#000" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <h1 style={{ textAlign: "center", paddingTop: "20px" }}>
        🌍 Geopolitical Chessboard
      </h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px 20px",
            backgroundColor: darkMode ? "#333" : "#ddd",
            color: darkMode ? "#fff" : "#000",
            border: "1px solid",
            borderColor: darkMode ? "#555" : "#aaa",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <GeopoliticalChessboard darkMode={darkMode} />
    </div>
  );
}

export default App;
