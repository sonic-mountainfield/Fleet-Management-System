<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>每日行程指南</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 pb-20">
    <nav class="bg-tibet-red p-4 text-white sticky top-0 z-10 shadow-md">
        <div class="flex justify-between items-center">
            <span id="userName" class="font-bold text-lg">載入中...</span>
            <button onclick="logout()" class="text-xs border border-white px-2 py-1 rounded">登出</button>
        </div>
    </nav>

    <div id="itineraryList" class="p-4 space-y-6">
        <div class="text-center py-10 text-gray-400">正在獲取今日路書...</div>
    </div>

    <div class="fixed bottom-0 w-full bg-white border-t flex justify-around py-3 text-xs text-gray-500">
        <div class="text-tibet-red font-bold">每日導航</div>
        <div onclick="alert('完賽證書將於第六天打卡完成後開放')">紀錄證書</div>
    </div>

    <script>
        // 1. 初始化檢查登入
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) window.location.href = 'index.html';
        document.getElementById('userName').innerText = `扎西德勒，${user.Name}`;

        // 2. 獲取行程 (這裡假設你 SheetDB 的另一張表叫 Itinerary)
        async function fetchItinerary() {
            try {
                const res = await fetch(`https://sheetdb.io/api/v1/你的API_ID?sheet=Itinerary`);
                const data = await res.json();
                renderItinerary(data);
            } catch (e) { console.error("抓取行程失敗"); }
        }

        // 3. 渲染 SS 卡片
        function renderItinerary(items) {
            const container = document.getElementById('itineraryList');
            container.innerHTML = items.map(ss => `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-tibet-red">
                    <div class="p-4">
                        <div class="flex justify-between text-sm text-gray-500 font-bold mb-2">
                            <span>${ss.Day}</span>
                            <span class="text-tibet-red">${ss.Section}</span>
                        </div>
                        <h2 class="text-xl font-bold mb-1">${ss.Title}</h2>
                        <p class="text-sm text-gray-600 mb-3 italic">🚩 ${ss.Description}</p>
                        
                        <div class="grid grid-cols-2 gap-2 text-center text-xs mb-4">
                            <div class="bg-gray-100 p-2 rounded">距離：${ss.Distance}</div>
                            <div class="bg-gray-100 p-2 rounded">預計：${ss.Est_Time}</div>
                        </div>

                        <a href="amapuri://navigation?to=${ss.Lon},${ss.Lat},${ss.Title}&mode=car&callnative=1" 
                           class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold mb-4 shadow-md">
                           啟動高德導航
                        </a>

                        <div class="flex gap-2">
                            <button onclick="checkIn('${ss.Section}', 'START')" class="flex-1 bg-tibet-red text-white py-2 rounded text-sm">起點打卡</button>
                            <button onclick="checkIn('${ss.Section}', 'END')" class="flex-1 border border-tibet-red text-tibet-red py-2 rounded text-sm">終點打卡</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // 4. 打卡邏輯
        async function checkIn(section, type) {
            const timestamp = new Date().toLocaleString();
            alert(`${section} ${type} 成功！\n${timestamp}`);
            // 這裡發送 POST 到 SheetDB 的 CheckIns 表
        }

        function logout() { localStorage.clear(); window.location.href = 'index.html'; }

        fetchItinerary();
    </script>
</body>
</html>
