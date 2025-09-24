// ==== Popup Control ====
function openDetail() {
  console.log("📌 openDetail: showing popup");
  document.getElementById("detailPopup").classList.remove("hidden");
}

function closeDetail() {
  console.log("📌 closeDetail: hiding popup");
  document.getElementById("detailPopup").classList.add("hidden");
}

// ==== Framework Redirect ====
function openFramework() {
  console.log("📌 Redirecting to Radium Framework Analysis");
  window.location.href = "https://inginiaos-liff.netlify.app/";
}

// ==== Subscribe to Notify (LINE LIFF + Make Webhook) ====
function subscribeNotify() {
  console.log("📌 subscribeNotify() called");

  // LIFF init
  liff.init({ liffId: "2007908663-nyGaxRLe" })
    .then(() => {
      console.log("✅ LIFF init success");

      if (!liff.isLoggedIn()) {
        console.log("⚠️ User not logged in → redirect to LINE Login");
        liff.login();
      } else {
        console.log("✅ User is logged in → fetching profile");
        return liff.getProfile();
      }
    })
    .then(profile => {
      if (!profile) {
        throw new Error("⚠️ Profile not found after login");
      }
      console.log("👤 Profile:", profile);

      // ส่งไปที่ Make Webhook
      return fetch("https://hook.eu2.make.com/4lmcb99if8p9e2x9oj16ednpx3q66u9g", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineUserId: profile.userId,
          displayName: profile.displayName,
          action: "subscribe_notify",
          timestamp: new Date().toISOString()
        })
      });
    })
    .then(res => {
      console.log("📤 Webhook response status:", res.status);
      if (res.ok) {
        alert("🚀 สมัครรับแจ้งเตือนเรียบร้อยแล้ว!");
      } else {
        alert("⚠️ ส่งข้อมูลไปยังเซิร์ฟเวอร์ไม่สำเร็จ (" + res.status + ")");
      }
    })
    .catch(err => {
      console.error("❌ Error in subscribeNotify:", err);
      alert("❌ เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง");
    });
}
