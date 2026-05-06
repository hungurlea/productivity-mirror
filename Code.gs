/**
 * Productivity Mirror - 療癒系 AI 教練版
 * 功能：日曆同步 + Gemini 3 溫暖分析
 */

// 🔑 請在此處填入從 Google AI Studio 取得的 API Key
const GEMINI_API_KEY = "你的_API_KEY_貼在這裡";

function doGet() {
  try {
    const today = new Date();
    const events = CalendarApp.getDefaultCalendar().getEventsForDay(today);
    const data = events.map(event => {
      const start = event.getStartTime();
      const end = event.getEndTime();
      const guestCount = event.getGuestList().length;
      const type = guestCount > 0 ? "會議" : "任務";
      return {
        id: event.getId(),
        title: event.getTitle(),
        startTime: start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        plannedMinutes: (end - start) / (1000 * 60),
        type: type,
        color: type === "會議" ? "#f87171" : "#60a5fa"
      };
    });
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"error": err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    if (params.action === "analyze") {
      const aiResponse = getGeminiResponse(params.data);
      return ContentService.createTextOutput(aiResponse);
    }
  } catch (err) {
    return ContentService.createTextOutput("分析錯誤: " + err.toString());
  }
}

function getGeminiResponse(dataStr) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;
  const prompt = `你是一位溫柔的「心靈生產力導師」。根據以下數據：\n${dataStr}\n請給予肯定、發現閃光點、給予溫柔觀察與明日微小建議。嚴禁毒舌或負面詞彙。用繁體中文與 Markdown 格式。`;
  
  const payload = { "contents": [{ "parts": [{ "text": prompt }] }] };
  const options = { "method": "post", "contentType": "application/json", "payload": JSON.stringify(payload), "muteHttpExceptions": true };
  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());
  return result.candidates[0].content.parts[0].text;
}
