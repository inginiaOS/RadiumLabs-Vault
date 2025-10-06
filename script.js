// ==== Popup Control ====
function openDetail() {
  console.log("📌 openDetail: showing popup");
  document.getElementById("detailPopup").classList.remove("hidden");
}

function closeDetail() {
  console.log("📌 closeDetail: hiding popup");
  document.getElementById("detailPopup").classList.add("hidden");
}

// ==== Framework Redirect with Tracking & Loading Button ====
function openFramework() {
  console.log("📌 User clicked Start Framework");

  // จับปุ่มที่กด
  const btn = document.querySelector(".btn.framework");
  btn.textContent = "⏳ กำลังโหลด...";
  btn.disabled = true;
  btn.style.opacity = "0.6";
  btn.style.cursor = "not-allowed";

  liff.init({ liffId: "2007908663-nyGaxRLe" })
    .then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        return liff.getProfile();
      }
    })
    .then(profile => {
      if (!profile) throw new Error("⚠️ Profile not found");

      // ส่ง event ไป Make
      return fetch("https://hook.eu2.make.com/4lmcb99if8p9e2x9oj16ednpx3q66u9g", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineUserId: profile.userId,
          displayName: profile.displayName,
          action: "start_framework",
          timestamp: new Date().toISOString()
        })
      });
    })
    .then(() => {
      // ✅ เสร็จแล้วเปิด LIFF Framework
      liff.openWindow({
        url: "https://inginiaos-liff.netlify.app/",
        external: false
      });
    })
    .catch(err => {
      console.error("❌ Error in openFramework:", err);
      alert("⚠️ เกิดข้อผิดพลาด โปรดลองอีกครั้ง");
    })
    .finally(() => {
      // คืนค่าปุ่มกลับมา
      btn.textContent = "🚀 เริ่มการวิเคราะห์ฟรี!";
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
    });
}

// ==== Subscribe to Notify (LINE LIFF + Make Webhook) ====
function subscribeNotify() {
  console.log("📌 subscribeNotify() called");

  const btn = document.querySelector(".btn.fomo");
  btn.textContent = "⏳ กำลังสมัคร...";
  btn.disabled = true; // ปิดปุ่มชั่วคราว
  btn.style.opacity = "0.6";
  btn.style.cursor = "not-allowed";

  liff.init({ liffId: "2007908663-nyGaxRLe" })
    .then(() => {
      console.log("✅ LIFF init success");

      if (!liff.isLoggedIn()) {
        console.log("⚠️ Not logged in → redirecting");
        liff.login();
      } else {
        return liff.getProfile();
      }
    })
    .then(profile => {
      if (!profile) throw new Error("⚠️ Profile not found");
      console.log("👤 Profile:", profile);

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
      console.log("📤 Webhook status:", res.status);
      if (res.ok) {
        alert("🚀 สมัครรับแจ้งเตือนเรียบร้อยแล้ว!");
      } else {
        alert("⚠️ ส่งข้อมูลไม่สำเร็จ (" + res.status + ")");
      }
    })
    .catch(err => {
      console.error("❌ subscribeNotify error:", err);
      alert("❌ เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง");
    })
    .finally(() => {
      // ✅ คืนค่าปุ่มกลับมา
      btn.textContent = "⚡ สมัครก่อนใคร";
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
    });
}
function sendTemplate() {
    const btn = document.querySelector(".btn.template");

  // ✅ เปลี่ยนสถานะปุ่มชั่วคราว
  btn.textContent = "⏳ กรุณารอสักครู่...";
  btn.disabled = true;
  btn.style.opacity = "0.6";
  btn.style.cursor = "not-allowed";
  
  liff.init({ liffId: "2007908663-nyGaxRLe" }) // ✅ ใช้ LIFF ID จริง
    .then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      return liff.sendMessages([
        {
          type: "text",
          text: `🎁 นี่คือ Notion Template ฟรีจาก RadiumLabs 🚀\n\n👉 ลิงก์: https://cake-house-cff.notion.site/v-1-2-inginiaOS-LITE-by-RadiumLabs-2818322f7c0a80409334df3f4caa7373\n\n⚡ วิธีใช้งาน:\n1. กดลิงก์ด้านบน\n2. กดปุ่ม "Duplicate" มุมขวาบน\n3. เทมเพลตจะถูกเก็บใน Workspace ของคุณ`
        }
      ]);
    })
    .then(() => {
      console.log("✅ ส่งข้อความเรียบร้อย");
      // ❌ ไม่ปิด LIFF อัตโนมัติ
      alert("✅ ส่งลิงก์ให้คุณเรียบร้อยแล้ว!\nกรุณาเช็กที่หน้าต่างแชท LINE ครับ 🙌");
    })
    .catch(err => {
      console.error("❌ Error in sendTemplate:", err);
      alert("⚠️ เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง");
    });
}
