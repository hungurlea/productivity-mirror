# productivity-mirror

# 🪞 Productivity Mirror | 生產力之鏡

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-live-success.svg)

**Productivity Mirror** 是一個極簡且高效的個人生產力追蹤工具。它能將你 Google 日曆上的「計畫行程」與現實中的「實際執行」進行即時對焦，幫助你發現時間感知的偏差，進而優化工作節奏。

[Live Demo 連結](https://hungurlea.github.io/productivity-mirror/) 

---

## ✨ 核心功能

- **📅 日曆同步**：一鍵從 Google Calendar 抓取當日行程與會議。
- **🤖 自動分類**：智慧識別「會議」（多人）與「產出任務」（個人）。
- **⏱️ 即時計時器**：內建碼錶功能，隨手點擊即可追蹤任務進度。
- **📊 數據視覺化**：透過 Chart.js 生成時間分配比例圖與「計畫 vs. 實際」對比圖。
- **🎨 AutoSheet 風格**：採用現代 SaaS 介面設計，乾淨、專業、無壓力的淺色模式。
- **🔒 隱私保護**：GAS URL 儲存於瀏覽器 LocalStorage，不經過後端伺服器，確保隱私。

---

## 🛠️ 技術棧

- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Backend Proxy**: Google Apps Script (GAS)
- **Deployment**: GitHub Pages

---

## 🚀 快速開始

### 1. 部署 Google Apps Script
為了安全且免費地存取日曆，你需要建立一個 GAS 代理：

1. 前往 [Google Apps Script](https://script.google.com/) 並建立新專案。
2. 貼入專案提供的 `code.gs` 腳本（負責抓取 Calendar 資料）。
3. 點擊「部署」 > 「新增部署」 > 類型選擇「網頁應用程式」。
4. **設定：** 執行身份為「我」，誰可以存取為「所有人 (Anyone)」。
5. 複製生成的 **Web App URL**。

### 1.5  Google Apps Script完整代碼

前往 Google Apps Script。
點擊 「新專案」。
刪除原本的代碼，貼上以下這段：

<details>
  <summary>📄 查看 Google Apps Script (GAS) 程式碼</summary>
  
```
function doGet() {
  const today = new Date();
  const events = CalendarApp.getDefaultCalendar().getEventsForDay(today);
  
  const data = events.map(event => {
    const start = event.getStartTime();
    const end = event.getEndTime();
    const duration = (end - start) / (1000 * 60); // 預計分鐘數
    
    // 判斷是否為會議：若有除了自己以外的訪客即為會議
    const guestCount = event.getGuestList().length;
    const type = guestCount > 0 ? "會議" : "任務";
    
    return {
      id: event.getId(),
      title: event.getTitle(),
      startTime: start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      plannedMinutes: duration,
      type: type,
      color: type === "會議" ? "#f87171" : "#60a5fa" // 會議紅，任務藍
    };
  });

  // 回傳 JSON 給網頁
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```
---




部署： 點擊右上角 「部署」 > 「新增部署」。
類型： 選擇 「網頁應用程式」。
設定： * 「誰可以存取」請務必選擇 「所有人」(Anyone)（這樣你本地的網頁才抓得到）。
「執行身份」選 「我」。
授權： 點擊部署後會彈出視窗，請一路點擊「授予存取權限」-> 選擇你的帳號 -> 「進階」 -> 「前往『未命名專案』(不安全)」 -> 「允許」。
複製網址： 部署成功後，你會得到一個 「網頁應用程式 URL」。請先把這個網址記下來。

接下來請建立「建立本地網頁 (index.html)」


## 2. 新增網頁
1. 請先複製index.html，然後在你的電腦中打開
2. 在頂部輸入框貼上你的 **GAS URL**。
3. 點擊 **Sync Calendar**，開始你的工作的一天。

---

## 📝 授權

本專案採用 [MIT License](LICENSE) 授權。
