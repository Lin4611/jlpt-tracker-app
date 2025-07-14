import React, { useState, useEffect } from 'react';
import './Countdown.css';

function Countdown() {
  const [examDate, setExamDate] = useState(() => {
    const saved = localStorage.getItem('examDate');
    return saved ? new Date(saved) : null;
  });

  const [inputDate, setInputDate] = useState('');

  const handleSetDate = () => {
    const selected = new Date(inputDate);
    if (!isNaN(selected)) {
      setExamDate(selected);
      localStorage.setItem('examDate', selected.toISOString());
    }
  };
  const handleResetDate = () => {
    localStorage.removeItem('examDate');
    setExamDate(null);
    setInputDate('');
  };

  if (!examDate) {
    return (
      <div>
        <p>📅 請先設定你的日檢考試日期：</p>
        <input
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />
        <button onClick={handleSetDate}>✅ 設定日期</button>
      </div>
    );
  }

  const today = new Date();
  const diffTime = examDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="countdown-wrapper">
        <h2>⏳ 距離日檢還有 <strong>{diffDays}</strong> 天</h2>
        <p className="exam-date-display">📆 考試日：{examDate.toLocaleDateString()}</p>
        <button className="reset-date-btn" onClick={handleResetDate}>🔄 重新設定日期</button>
    </div>
  );
}

export default Countdown;
