// src/api.js

export async function doCheckIn(section, type, title, apiId) {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = `https://sheetdb.io/api/v1/${apiId}?sheet=CheckIns`;
    
    const postData = {
        data: [{
            CustomerID: user.Name,
            Day: new Date().toLocaleDateString('zh-TW'),
            Section: section,
            Type: type,
            Timestamp: "INCREMENT_TIME",
            LocationName: title
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        
        if (response.ok) {
            return true;
        } else {
            alert("打卡失敗，請聯繫車隊管家");
            return false;
        }
    } catch (error) {
        console.error("API Error:", error);
        alert("網路異常，請確認是否有訊號");
        return false;
    }
}
