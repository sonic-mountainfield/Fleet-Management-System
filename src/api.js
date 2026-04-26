// src/api.js
const API_URL = 'https://sheetdb.io/api/v1/poo9epu17583p';

/**
 * 執行打卡功能
 * @param {string} section - 賽段編號 (例如: SS1)
 * @param {string} type - 打卡類型 (START 或 END)
 * @param {string} locName - 地點名稱 (來自 Start_Point 或 End_Point)
 */
export async function doCheckIn(section, type, locName) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return false;

    const postData = {
        data: [{
            ID: user.ID,                // 對應 Users 表的 ID (如 U001)
            NAME: user.NAME,            // 對應 Users 表的 NAME (如 ACE)
            Day: new Date().toLocaleDateString('zh-TW'),
            Section: section,           // 賽段 (如 SS1)
            Type: type,                 // 類型 (START/END)
            Timestamp: "INCREMENT_TIME", // SheetDB 會自動填入時間
            LocationName: locName       // 實際打卡的地點名稱
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
