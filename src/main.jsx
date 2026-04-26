<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>陽光小屋車隊 - 每日行程</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'tibet-red': '#8B1A1A',
                        'tibet-gold': '#D4AF37',
                        'tibet-white': '#F8F4E3'
                    }
                }
            }
        }
    </script>
    <style>
        body { background-color: #F8F4E3; background-image: url('https://www.transparenttextures.com/patterns/paper-fibers.png'); }
        .card-border { border-top: 5px solid #D4AF37; border-bottom: 5px solid #8B1A1A; }
    </style>
</head>
<body class="pb-24">

    <nav class="bg-tibet-red text-white p-4 sticky top-0 z-50 shadow-lg flex justify-between items-center">
        <div>
            <h1 class="text-xl font-bold tracking-widest">陽光小屋車隊</h1>
            <p id="userDisplay" class="text-[10px] text-tibet-gold uppercase tracking-tighter">Loading User...</p>
        </div>
        <button onclick="handleLogout()" class="text-xs border border-tibet-gold px-2 py-1 rounded">登出</button>
    </nav>

    <div id="itineraryContainer" class="p-4 space-y-6">
        <div class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-tibet-red"></div>
            <p class="mt-4 text-tibet-red font-bold">扎西德勒，正在開啟路書...</p>
        </div>
    </div>

    <div class="fixed bottom-0 w-full bg-white border-t border-tibet-gold flex justify-around py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div class="text-tibet-red flex flex-col items-center">
            <span class="text-xl">🗺️</span>
            <span class="text-[10px] font-bold">每日導航</span>
        </div>
        <div onclick="alert('完賽證書將於第六天打卡後生成')" class="text-gray-400 flex flex-col items-center">
            <span class="text-xl">📜</span>
            <span class="text-[10px]">榮譽證書</span>
        </div>
    </div>

    <script type="module">
        import { doCheckIn } from './api.js';

        // 1. 檢查登入狀態
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            window.location.href = '../index.html';
        } else {
            document.getElementById('userDisplay').innerText = `駕駛員：${user.Name}`;
        }

        // 2. 設定 SheetDB 配置 (請替換你的 API ID)
        const API_ID = '你的API_ID'; 

        // 3. 獲取行程資料
        async function loadItinerary() {
            try {
                const response = await fetch(`https://sheetdb.io/api/v1/${API_ID}?sheet=Itinerary`);
                const data = await response.json();
                renderCards(data);
            } catch (error) {
                document.getElementById('itineraryContainer').innerHTML = `<p class="text-center text-red-600">讀取失敗，請檢查網路</p>`;
            }
        }

        // 4. 渲染行程卡片
        function renderCards(items) {
            const container = document.getElementById('itineraryContainer');
            container.innerHTML = items.map(ss => `
                <div class="card-border bg-white rounded-xl shadow-xl overflow-hidden">
                    <div class="p-5">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-tibet-red font-black text-2xl">${ss.Section}</span>
                            <span class="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-full font-bold">${ss.Day}</span>
                        </div>
                        
                        <h2 class="text-xl font-bold text-gray-800 mb-2">${ss.Title}</h2>
                        
                        <div class="bg-red-50 p-3 rounded-lg border-l-4 border-tibet-red mb-4">
                            <p class="text-xs text-tibet-red leading-relaxed">
                                <strong>路段資訊：</strong>${ss.Description}<br>
                                <strong>預計里程：</strong>${ss.Distance} | <strong>預計耗時：</strong>${ss.Est_Time}
                            </p>
                        </div>

                        <button onclick="launchNavigation('${ss.Amap_Link}')" 
                                class="w-full bg-[#3385ff] text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform">
                            <img src="https://img.icons8.com/color/48/amap.png" class="w-6 h-6">
                            開啟高德專屬路線
                        </button>

                        <div class="grid grid-cols-2 gap-3 mt-4">
                            <button onclick="handleCheckIn('${ss.Section}', 'START', '${ss.Title}')" 
                                    class="bg-tibet-red text-white py-3 rounded-lg font-bold text-sm">
                                起點打卡
                            </button>
                            <button onclick="handleCheckIn('${ss.Section}', 'END', '${ss.Title}')" 
                                    class="border-2 border-tibet-red text-tibet-red py-3 rounded-lg font-bold text-sm">
                                終點打卡
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // 5. 導航跳轉
        window.launchNavigation = function(url) {
            // 補上 callnative 確保喚起 APP
            const finalUrl = url.includes('?') ? `${url}&callnative=1` : `${url}?callnative=1`;
            window.location.href = finalUrl;
        };

        // 6. 打卡動作 (呼叫 api.js)
        window.handleCheckIn = async function(section, type, title) {
            const btn = event.target;
            const originalText = btn.innerText;
            btn.innerText = "寫入中...";
            btn.disabled = true;

            const success = await doCheckIn(section, type, title, API_ID);
            
            if (success) {
                btn.innerText = `${type === 'START' ? '已起點打卡' : '已終點打卡'}`;
                btn.classList.add('opacity-50');
            } else {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        };

        window.handleLogout = function() {
            localStorage.clear();
            window.location.href = '../index.html';
        };

        loadItinerary();
    </script>
</body>
</html>
