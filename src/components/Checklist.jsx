import React, { useState, useEffect } from 'react';
import './Checklist.css';

function Checklist() {
  const defaultItems = [
    { id: 1, text: "N3 Week 1 文法", checked: false },
    { id: 2, text: "N3 Week 2 文法", checked: false },
    { id: 3, text: "N3 Week 3 單字", checked: false },
    { id: 4, text: "N3 Week 4 聽解", checked: false }
  ];

  // ✅ 讀取 localStorage 中的資料（初次載入）
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('n3-checklist');
    return saved ? JSON.parse(saved) : defaultItems;
  });

  // ✅ 每次 items 變動時，寫入 localStorage
  useEffect(() => {
    localStorage.setItem('n3-checklist', JSON.stringify(items));
  }, [items]);

  const toggleCheck = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  // 完成度進度計算
  const total=items.length;
  const done = items.filter(item => item.checked).length;
  const percent= Math.round((done / total) * 100);

  // ✅ 加入新項目
  const[newItemText, setNewItemText] = useState('');
  const additem =() => {
    if (newItemText.trim() === '') return;
    const newItem = {
    id: Date.now(), //用時間戳記當id
    text: newItemText.trim(),
    checked: false
    };
    setItems([...items, newItem]);
    setNewItemText(''); // 清空輸入框
  };
  //刪除自訂項目函式
  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div className="checklist-container">
      <h2>📋 N3 學習清單</h2>
      {/* ✅進度條 */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
      <p>完成進度:{done}/{total}({percent}%)</p>
      <div className="add-item">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="輸入新的學習任務.."
        />
        <button onClick={additem}>➕ 新增</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.checked ? 'checked' : ''}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(item.id)}
              />
              {item.checked ? <s>{item.text}</s> : item.text}
            </label>
            {/*✅ 只顯示於 id > 100000 的自訂項目*/}
            {item.id > 100000 && (
              <button className="delete-btn" onClick={() => deleteItem(item.id)}>🗑️</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;
