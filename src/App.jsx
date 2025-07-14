import React, { useState } from 'react';
import Countdown from './components/Countdown';
import Checklist from './components/Checklist';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <h1>📘 我的 N3 倒數小工具</h1>
      <Countdown />
      <Checklist />
    </div>
  );
}

export default App;
