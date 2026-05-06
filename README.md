# 🪞 Productivity Mirror | 療癒系生產力之鏡

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Model](https://img.shields.io/badge/AI-Gemini%203%20Flash-blueviolet)

**Productivity Mirror** 是一個結合了 **Google Calendar**、**秒級精確計時器**與 **Gemini AI** 的個人生產力追蹤器。它不只紀錄時間，更是一位在你疲憊時給予溫暖鼓勵的「療癒系導師」。

## ✨ 核心特色

- **📅 日曆同步**：自動識別「會議」(多人) 與「任務」(個人)。
- **⏱️ 專業級計時器**：支援時分秒 (HH:MM:SS) 顯示、暫停/繼續功能，並有動態運行特效。
- **📊 數據可視化**：
  - **時間分配圓餅圖**：即時分析開會與產出的比例。
  - **計畫 vs 實際長條圖**：直觀呈現時間感知的偏差。
- **🌿 溫柔 AI 教練**：採用最新 `gemini-3-flash-preview`，提供正向、溫暖且具洞察力的每日回顧。

---

## ⚠️ 重要注意事項 (Must-Read)

在開始使用前，請務必閱讀以下設定關鍵，以確保程式正常運行：

### 🔑 1. API Key 安全性
- **取得方式**：請至 [Google AI Studio](https://aistudio.google.com/app/apikey) 點擊 "Create API key"。
- **安全性提示**：**請勿將含有真實 API Key 的程式碼上傳至公開的 GitHub 倉庫！** 建議在 `Code.gs` 中將 Key 保留為空字串，或使用私有倉庫。

### 🚀 2. GAS 部署「新版本」
- 每次修改 Google Apps Script 程式碼後，必須點擊：**「部署」 > 「管理部署」 > 「編輯 (筆圖標)」 > 版本選擇「新版本 (New Version)」**。
- 若未選擇「新版本」，網頁端將永遠執行舊版的程式碼。

### 🤖 3. 模型設定 (Model)
- 本專案預設使用 `gemini-3-flash-preview`。
- 若您的 API Key 尚未支援此預覽模型，請將 GAS 程式碼中的 URL 修改為 `gemini-1.5-flash`。

### 🔒 4. 權限設定
- 首次執行時，Google 會提示「此應用程式未經驗證」，請點擊 **「進階」 > 「前往... (不安全)」** 並允許權限，否則無法讀取日曆。

---

## 🚀 快速開始

### 第一步：設置 Google Apps Script (後端)
1. 前往 [Google Apps Script](https://script.google.com/) 建立新專案。
2. 貼入本專案提供的 `Code.gs` 代碼。
3. 填入你的 API Key 並完成「新版本」部署。
4. 複製生成的 **Web App URL**。

### 第二步：設置 HTML (前端)
1. 將本倉庫的 `index.html` 上傳至 GitHub。
2. 開啟 **GitHub Pages** 功能。
3. 在網頁中貼入你的 GAS URL，點擊「同步日曆」即可開始。

---
*Developed with ❤️ and Vibe Coding.*
