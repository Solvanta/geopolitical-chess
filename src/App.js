import React, { useState } from 'react';
import GeopoliticalChessboard from './GeopoliticalChessboard';
import Globe from './Globe';

function App() {
  const [darkMode, setDarkMode] = useState(true); // default: dark
  const [viewMode, setViewMode] = useState('chessboard'); // or 'globe'

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: darkMode ? "#000" : "#f0f0f0",
        color: darkMode ? "#fff" : "#000",
        transition: "all 0.3s ease",
        fontFamily: "sans-serif"
      }}
    >
      {/* Header */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1 style={{ margin: "0 0 10px 0" }}>🌍 Geopolitical Chessboard</h1>
        <div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
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

          <button
            onClick={() => setViewMode(viewMode === 'chessboard' ? 'globe' : 'chessboard')}
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
            Switch to {viewMode === 'chessboard' ? 'Globe' : 'Chessboard'} View
          </button>
        </div>
      </div>

      {/* View */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {viewMode === 'chessboard' ? (
          <GeopoliticalChessboard darkMode={darkMode} />
        ) : (
          <Globe darkMode={darkMode} />
        )}
      </div>
    </div>
  );
}

export default App;
