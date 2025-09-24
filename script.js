function openFramework() {
  const tag = "RadiumLabsFramework";

  // ยิง webhook ไปเก็บ Lead + Tag
  fetch("https://your-make-webhook-url", {
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tag: tag,
      time: new Date(),
      source: "RadiumLabs-Vault"
    })
  }).catch(err => console.error(err));

  // Redirect ไปที่ RadiumLabs Framework (LIFF)
  window.location.href = "https://inginiaos-liff.netlify.app/";
}

function openDetail() {
  document.getElementById("detailPopup").classList.remove("hidden");
}

function closeDetail() {
  document.getElementById("detailPopup").classList.add("hidden");
}
