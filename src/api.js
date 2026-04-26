// src/api.js
const API_URL = 'https://sheetdb.io/api/v1/poo9epu17583p';

/**
 * 執行打卡功能
 * @param {string} section - 賽段編號 (例如: SS1)
 * @param {string} type - 打卡類型 (START 或 END)
 * @param {string} locName - 地點名稱 (來自 Start_Point 或 End_Point)
 */
export async function doCheckIn(section, type, locName) {
    // 1. 取得登入時存下的用戶資訊
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return false;

    // 2. 格式化當前日期與時間，避免 Excel 出現序號數字
    const now = new Date();
    const dateStr = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                    now.getMinutes().toString().padStart(2, '0') + ':' + 
                    now.getSeconds().toString().padStart(2, '0');

    // 3. 準備寫入 CheckIns 表的資料 (Key 必須與 Excel 第一列標題完全一致)
    const postData = {
        data: [{
            "CustomerID": user.ID || user.id,   // 寫入 ACE 的 ID (如 U001)
            "Day": dateStr,                    // 寫入格式化後的日期字串
            "Section": section,
            "CheckIn_Time": timeStr,           // 寫入具體時間
            "Type": type,
            "Timestamp": now.toISOString(),    // 寫入完整時間戳
            "LocationName": locName            // 寫入地點名稱
        }]
    };

    try {
        const response = await fetch(`${API_URL}?sheet=CheckIns`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        return response.ok;
    } catch (error) {
        console.error("打卡 API 錯誤:", error);
        return false;
    }
}
