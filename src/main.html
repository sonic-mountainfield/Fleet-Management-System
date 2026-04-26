<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>陽光小屋 - 每日行程</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #F8F4E3; background-image: url('https://www.transparenttextures.com/patterns/paper-fibers.png'); }
        .tibet-card { border-top: 6px solid #D4AF37; border-bottom: 6px solid #8B1A1A; }
    </style>
</head>
<body class="pb-24">

    <nav class="bg-[#8B1A1A] text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-2xl">
        <div>
            <h1 class="text-xl font-bold tracking-widest">陽光小屋車隊</h1>
            <p id="userDisplay" class="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest"></p>
        </div>
        <button onclick="localStorage.clear(); window.location.href='../index.html'" class="text-xs border border-[#D4AF37] px-3 py-1 rounded-full">登出</button>
    </nav>

    <div id="itineraryContainer" class="p-4 space-y-8">
        <div class="text-center py-20 text-[#8B1A1A] font-bold">扎西德勒，載入路書中...</div>
    </div>

    <div class="fixed bottom-0 w-full bg-white border-t border-[#D4AF37] flex justify-around py-4 shadow-inner">
        <div class="flex flex-col items-center text-[#8B1A1A]">
            <span class="text-2xl">🗺️</span>
            <span class="text-[10px] font-bold">每日路書</span>
        </div>
        <div onclick="alert('完賽證書將於第六天打卡後開放')" class="flex flex-col items-center text-gray-300">
            <span class="text-2xl">📜</span>
            <span class="text-[10px] font-bold">榮譽證書</span>
        </div>
    </div>

    <script type="module">
        import { doCheckIn } from './api.js';

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) window.location.href = '../index.html';
        document.getElementById('userDisplay').innerText = `隊員：${user.Name}`;

        async function loadItinerary() {
            try {
                // 讀取 Itinerary 分頁
                const response = await fetch('https://sheetdb.io/api/v1/poo9epu17583p?sheet=Itinerary');
                const data = await response.json();
                renderCards(data);
            } catch (e) {
                document.getElementById('itineraryContainer').innerHTML = "資料讀取失敗，請檢查網路。";
            }
        }

        function renderCards(items) {
            const container = document.getElementById('itineraryContainer');
            container.innerHTML = items.map(ss => `
                <div class="tibet-card bg-white rounded-2xl shadow-xl p-6 transition-all">
                    <div class="flex justify-between items-center mb-4">
                        <span class="bg-[#8B1A1A] text-white text-xs px-3 py-1 rounded-full font-bold">${ss.Section}</span>
                        <span class="text-gray-400 text-xs font-mono">${ss.Day}</span>
                    </div>
                    
                    <h2 class="text-2xl font-black text-gray-800 mb-2">${ss.Title}</h2>
                    <p class="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg border-l-4 border-[#D4AF37] mb-6">
                        ${ss.Description}
                    </p>

                    <button onclick="window.location.href='${ss.Amap_Link}&callnative=1'" 
                            class="w-full bg-[#3385ff] text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 mb-6 active:scale-95 transition-all">
                        <img src="https://img.icons8.com/color/48/amap.png" class="h-6 w-6">
                        啟動高德導航
                    </button>

                    <div class="grid grid-cols-2 gap-4">
                        <button onclick="handleCheckIn('${ss.Section}', 'START', '${ss.Title}')" 
                                class="bg-[#8B1A1A] text-white py-3 rounded-xl font-bold text-sm shadow">
                            起點打卡
                        </button>
                        <button onclick="handleCheckIn('${ss.Section}', 'END', '${ss.Title}')" 
                                class="border-2 border-[#8B1A1A] text-[#8B1A1A] py-3 rounded-xl font-bold text-sm">
                            終點打卡
                        </button>
                    </div>
                </div>
            `).join('');
        }

        window.handleCheckIn = async function(section, type, title) {
            const btn = event.target;
            btn.innerText = "寫入中...";
            btn.disabled = true;

            const success = await doCheckIn(section, type, title);
            if (success) {
                btn.innerText = `${type === 'START' ? '已起點打卡' : '已終點打卡'}`;
                btn.classList.add('opacity-40');
                alert("打卡成功！扎西德勒！");
            } else {
                btn.innerText = "重試打卡";
                btn.disabled = false;
            }
        }

        loadItinerary();
    </script>
</body>
</html>
