import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim() !== '') {
      onLogin({ name: nameInput }); // 將名字傳遞給系統，代表登入成功
    } else {
      alert('請輸入車號與暱稱！');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700">
        <h1 className="text-2xl font-bold text-center mb-2">🏍️ 陽光小屋車隊</h1>
        <p className="text-slate-400 text-center mb-8">西藏遠征 - 專屬系統</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-1 text-sm">您的車號與暱稱</label>
            <input 
              type="text" 
              placeholder="例如: 05-小明" 
              className="w-full bg-slate-900 text-white border border-slate-700 rounded p-3 focus:outline-none focus:border-orange-500"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded transition-colors mt-4">
            🚀 進入今日行程
          </button>
        </div>
      </form>
    </div>
  );
}
