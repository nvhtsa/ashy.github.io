document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const bgVideo = document.getElementById("bgVideo");
  const bgMusic = document.getElementById("bgMusic");

  if (!splash || !bgVideo) return;

  // Gate entry until click
  bgVideo.muted = true;
  bgVideo.pause();
  if (bgMusic) bgMusic.pause();

  splash.addEventListener("click", async () => {
    try {
      bgVideo.muted = false;
      await bgVideo.play();
      if (bgMusic) await bgMusic.play();
    } catch (e) {
      console.log("Autoplay blocked:", e);
    }

    splash.classList.add("hidden");
    setTimeout(() => splash.remove(), 700);
  });
});
