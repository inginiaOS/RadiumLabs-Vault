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
  liff.init({ liffId: "2007908663-nyGaxRLe" })
    .then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        return liff.getProfile();
      }
    })
    .then(profile => {
      // ส่ง userId + displayName ไป Make Webhook
      return fetch("https://hook.eu2.make.com/4lmcb99if8p9e2x9oj16ednpx3q66u9g", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineUserId: profile.userId,
          displayName: profile.displayName,
          action: "subscribe_notify"
        })
      });
    })
    .then(() => {
      alert("🚀 สมัครรับแจ้งเตือนเรียบร้อยแล้ว!");
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ เกิดข้อผิดพลาด โปรดลองใหม่");
    });
}
