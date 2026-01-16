document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const bgVideo = document.getElementById("bgVideo");
  const bgMusic = document.getElementById("bgMusic");

  const toggleVideoSoundBtn = document.getElementById("toggleVideoSound");
  const toggleMusicBtn = document.getElementById("toggleMusic");


  if (!splash || !bgVideo) {
    console.warn("Missing splash or bgVideo element.");
    return;
  }

  /* ---------------------------
     ALWAYS MUTE MP4 (VIDEO) AUDIO
     --------------------------- */
  bgVideo.muted = true;
  bgVideo.volume = 0;

  // Try to ensure video is playing behind the splash (muted autoplay allowed).
  bgVideo.play().catch(() => {});

  function updateButtons() {
    // Video audio is locked off, so hide/disable that button if it exists.
    if (toggleVideoSoundBtn) {
      toggleVideoSoundBtn.textContent = "Video Muted";
      toggleVideoSoundBtn.disabled = true;
      toggleVideoSoundBtn.style.opacity = "0.6";
      toggleVideoSoundBtn.style.cursor = "not-allowed";
    }

    // Music button reflects actual MP3 state
    if (toggleMusicBtn && bgMusic) {
      toggleMusicBtn.textContent = bgMusic.paused ? "Play Music" : "Pause Music";
    }
  }

  async function enter() {

    splash.classList.add("hidden");
    setTimeout(() => splash.remove(), 500);


    bgVideo.muted = true;
    bgVideo.volume = 0;
    bgVideo.play().catch(() => {});


    if (bgMusic) {
      try {
        bgMusic.muted = false;
        if (bgMusic.volume === 0) bgMusic.volume = 1.0;
        await bgMusic.play();
      } catch (e) {

        console.log("Music play blocked:", e);
      }
    }

    updateButtons();
  }

  // Click / tap
  splash.addEventListener("click", enter);

  // Keyboard accessibility: Enter/Space
  splash.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      enter();
    }
  });

  if (toggleMusicBtn && bgMusic) {
    toggleMusicBtn.addEventListener("click", async () => {
      try {
        if (bgMusic.paused) {
          bgMusic.muted = false;
          if (bgMusic.volume === 0) bgMusic.volume = 1.0;
          await bgMusic.play();
        } else {
          bgMusic.pause();
        }
      } catch (e) {
        console.log("Music toggle blocked:", e);
      }
      updateButtons();
    });
  }

  updateButtons();
});
