// src/api.js
const API_URL = 'https://sheetdb.io/api/v1/poo9epu17583p';

export async function doCheckIn(section, type, title) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return false;

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
        const response = await fetch(`${API_URL}?sheet=CheckIns`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        return response.ok;
    } catch (error) {
        console.error("API Error:", error);
        return false;
    }
}
