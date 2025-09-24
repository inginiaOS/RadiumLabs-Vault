// เปิด Popup รายละเอียด
function openDetail() {
  document.getElementById("detailPopup").classList.remove("hidden");
}

// ปิด Popup รายละเอียด
function closeDetail() {
  document.getElementById("detailPopup").classList.add("hidden");
}

// เปิด Framework Analysis (Radium Framework Automation)
function openFramework() {
  window.location.href = "https://inginiaos-liff.netlify.app/";
}

// สมัครรับการแจ้งเตือน
function subscribeNotify() {
  alert("✅ คุณจะได้รับการแจ้งเตือนผ่าน LINE เมื่อมีเครื่องมือใหม่ๆ!");
}
