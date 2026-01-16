const splash = document.getElementById("splash");
const bgVideo = document.getElementById("bgVideo");
const bgMusic = document.getElementById("bgMusic");

bgVideo.muted = true;
bgVideo.pause();
bgMusic.pause();

splash.addEventListener("click", async () => {
  try {
    bgVideo.muted = false;
    await bgVideo.play();
    await bgMusic.play();
  } catch (e) {
    console.log("Autoplay blocked:", e);
  }

  splash.classList.add("hidden");

  // Optional: fully remove splash after animation
  setTimeout(() => splash.remove(), 700);
});
