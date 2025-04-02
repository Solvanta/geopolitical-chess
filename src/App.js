import React, { useState } from 'react';
import Globe from './Globe';
import GeopoliticalChessboard from './GeopoliticalChessboard';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState('globe');

  return (
    <div style={{
      backgroundColor: darkMode ? '#000' : '#f0f0f0',
      color: darkMode ? '#fff' : '#000',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>
        🌍 Geopolitical Chess
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={() => setDarkMode(!darkMode)} style={toggleButtonStyle(darkMode)}>
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <button onClick={() => setViewMode(viewMode === 'globe' ? 'chessboard' : 'globe')} style={toggleButtonStyle(darkMode)}>
          View {viewMode === 'globe' ? 'Chessboard' : 'Globe'}
        </button>
      </div>

      {viewMode === 'globe'
        ? <Globe darkMode={darkMode} />
        : <GeopoliticalChessboard darkMode={darkMode} />}
    </div>
  );
}

function toggleButtonStyle(darkMode) {
  return {
    padding: '10px 20px',
    marginRight: '10px',
    backgroundColor: darkMode ? '#333' : '#ddd',
    color: darkMode ? '#fff' : '#000',
    border: '1px solid',
    borderColor: darkMode ? '#555' : '#aaa',
    borderRadius: '8px',
    cursor: 'pointer',
  };
}
