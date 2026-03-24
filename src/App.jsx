import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 引入我們剛剛辛苦寫好的所有頁面與元件！
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Itinerary from './pages/Itinerary';
import Admin from './pages/Admin';
import Memoir from './pages/Memoir';

export default function App() {
  // 記錄使用者是否登入，以及使用者的名字
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      {/* 這裡是整個 APP 的最外層畫布，設定為深色背景 */}
      <div className="min-h-screen bg-slate-900 text-white font-sans">
        
        {/* Routes 負責根據網址切換不同的畫面 */}
        <Routes>
          {/* 首頁：如果還沒登入，就顯示 Login 頁面；如果登入了，就自動跳轉到 Itinerary (今日行程) */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/itinerary" /> : <Login onLogin={setUser} />} 
          />
          
          {/* 行程打卡頁：必須有 user 資料才能看，否則踢回首頁 */}
          <Route 
            path="/itinerary" 
            element={user ? <Itinerary user={user} /> : <Navigate to="/" />} 
          />
          
          {/* 車隊後台頁 */}
          <Route 
            path="/admin" 
            element={user ? <Admin /> : <Navigate to="/" />} 
          />
          
          {/* 騎行回憶錄 */}
          <Route 
            path="/memoir" 
            element={user ? <Memoir user={user} /> : <Navigate to="/" />} 
          />
        </Routes>

        {/* Navbar (底部導航列)：只有在登入狀態 (user 存在) 時才會顯示 */}
        {user && <Navbar />}
        
      </div>
    </BrowserRouter>
  );
}
