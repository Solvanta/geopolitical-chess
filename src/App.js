import React, { useState } from "react";
import GeopoliticalChessboard from "./GeopoliticalChessboard";
import Globe from "./Globe";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState("chessboard");

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#000" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        position: "relative"
      }}
    >
      <div style={{ position: "absolute", top: 20, left: 0, right: 0, textAlign: "center", zIndex: 10 }}>
        <h1>🌍 Geopolitical Chessboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            background: darkMode ? "#333" : "#ddd",
            color: darkMode ? "#fff" : "#000",
            border: "1px solid",
            borderColor: darkMode ? "#555" : "#aaa",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
        <button
          onClick={() => setViewMode(viewMode === "chessboard" ? "globe" : "chessboard")}
          style={{
            padding: "10px 20px",
            background: darkMode ? "#333" : "#ddd",
            color: darkMode ? "#fff" : "#000",
            border: "1px solid",
            borderColor: darkMode ? "#555" : "#aaa",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Switch to {viewMode === "chessboard" ? "Globe" : "Chessboard"} View
        </button>
      </div>

      {viewMode === "chessboard" ? (
        <GeopoliticalChessboard darkMode={darkMode} />
      ) : (
        <Globe darkMode={darkMode} />
      )}
    </div>
  );
}

export default App;
