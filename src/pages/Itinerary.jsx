import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';

export default function Itinerary() {
  const [tripData, setTripData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkIns, setCheckIns] = useState({}); // 記錄哪些點已經打卡

  useEffect(() => {
    // 從 public/data 讀取我們剛剛建好的 CSV 檔案
    fetch('/data/trip.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setTripData(results.data);
            setIsLoading(false);
          }
        });
      })
      .catch(error => console.error("讀取 CSV 失敗:", error));
  }, []);

  // 處理打卡按鈕點擊
  const handleCheckIn = (nodeId) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCheckIns(prev => ({ ...prev, [nodeId]: currentTime }));
  };

  if (isLoading) return <div className="p-8 text-center text-slate-400">載入行程中...</div>;

  return (
    <div className="p-4 pb-24">
      <header className="mb-6 border-b border-slate-700 pb-4">
        <h2 className="font-bold text-xl text-orange-500">Day 4: 拉薩 ➡️ 日喀則</h2>
        <p className="text-slate-400 text-sm mt-1">請依照下方賽段指示騎行，並於集結點打卡。</p>
      </header>

      <div className="space-y-6">
        {tripData.map((node, index) => {
          const isCheckedIn = checkIns[node.NodeID];

          return (
            <div key={index} className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
              {/* 左側時間軸裝飾線 */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${node.Type === 'pace' || node.Type === 'free' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
              
              <div className="flex justify-between items-start mb-2 pl-2">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  {node.Type === 'waypoint' || node.Type === 'start' ? <MapPin size={18} className="text-blue-400"/> : <Navigation size={18} className="text-orange-400"/>}
                  {node.Title}
                </h3>
                {node.Time && <span className="text-sm font-mono bg-slate-700 px-2 py-1 rounded text-slate-300">{node.Time}</span>}
              </div>
              
              <div className="pl-2 mt-2">
                {node.Distance_Time && <p className="text-sm text-slate-400 mb-2">🛣️ {node.Distance_Time}</p>}
                {node.Note && <p className="text-sm text-yellow-500 bg-yellow-900/20 p-2 rounded mb-3">⚠️ {node.Note}</p>}

                {/* 互動按鈕區：根據類型顯示導航或打卡 */}
                {(node.Type === 'pace' || node.Type === 'free') && node.AmapLink && (
                  <a href={node.AmapLink} target="_blank" rel="noreferrer" className="inline-block w-full text-center bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors text-sm font-bold border border-slate-600">
                    ↗️ 開啟高德導航
                  </a>
                )}

                {(node.Type === 'waypoint' || node.Type === 'start') && (
                  <button 
                    onClick={() => handleCheckIn(node.NodeID)}
                    disabled={isCheckedIn}
                    className={`w-full py-2 rounded-lg transition-colors text-sm font-bold flex items-center justify-center gap-2 ${isCheckedIn ? 'bg-green-600/20 text-green-400 border border-green-600/50' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                  >
                    {isCheckedIn ? <><CheckCircle size={16} /> 已於 {isCheckedIn} 抵達</> : '📍 抵達打卡'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
