import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 注意：這些頁面元件我們稍後會一步步建立，所以先標註起來 (註解掉)
// import Navbar from './components/Navbar';
// import Login from './pages/Login';
// import Itinerary from './pages/Itinerary';

export default function App() {
  // 管理使用者是否已登入與使用者名稱
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-white pb-20 font-sans">
        
        {/* 測試用畫面：確認 App.jsx 有成功運作 */}
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold text-orange-500 mb-4">🏍️ 陽光小屋車隊系統</h1>
            <p className="text-slate-400">系統大腦 App.jsx 建立成功！</p>
            <p className="text-slate-500 text-sm mt-2">準備載入登入頁面與行程資料...</p>
        </div>

      </div>
    </BrowserRouter>
  );
}
