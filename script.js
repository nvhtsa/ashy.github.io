document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const bgVideo = document.getElementById("bgVideo");
  const bgMusic = document.getElementById("bgMusic");

  console.log("splash:", splash);
  console.log("bgVideo:", bgVideo);
  console.log("bgMusic:", bgMusic);

  if (!splash) {
    alert('DEBUG: No #splash element found in HTML.');
    return;
  }

  // Make clicks obvious no matter what
  splash.style.outline = "4px solid red";
  splash.style.zIndex = "999999";
  splash.style.pointerEvents = "auto";

  splash.addEventListener("click", () => {
    alert("DEBUG: Splash click works ✅");

    // Try to start media (won't stop the debug alert even if blocked)
    if (bgVideo) {
      bgVideo.muted = false;
      bgVideo.play().catch(console.log);
    }
    if (bgMusic) {
      bgMusic.play().catch(console.log);
    }

    splash.classList.add("hidden");
    setTimeout(() => splash.remove(), 700);
  });
});
