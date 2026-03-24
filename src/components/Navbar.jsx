import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Users, Image as ImageIcon } from 'lucide-react';

export default function Navbar() {
  const location = useLocation(); // 取得現在位於哪個頁面

  // 判斷目前網址，來決定按鈕要不要亮橘色
  const isActive = (path) => location.pathname === path ? 'text-orange-500' : 'text-slate-400';

  return (
    <nav className="fixed bottom-0 w-full bg-slate-800 border-t border-slate-700 flex justify-around p-3 pb-safe z-50">
      <Link to="/itinerary" className={`flex flex-col items-center ${isActive('/itinerary')}`}>
        <Map size={24} />
        <span className="text-xs mt-1">行程打卡</span>
      </Link>
      
      <Link to="/admin" className={`flex flex-col items-center ${isActive('/admin')}`}>
        <Users size={24} />
        <span className="text-xs mt-1">車隊監控</span>
      </Link>
      
      <Link to="/memoir" className={`flex flex-col items-center ${isActive('/memoir')}`}>
        <ImageIcon size={24} />
        <span className="text-xs mt-1">回憶錄</span>
      </Link>
    </nav>
  );
}
