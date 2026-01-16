document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const page = document.getElementById("page");
  const bgVideo = document.getElementById("bgVideo");
  const bgMusic = document.getElementById("bgMusic");

  if (!splash || !page || !bgVideo) {
    console.log("Missing required elements:", { splash, page, bgVideo });
    return;
  }


  page.classList.add("is-hidden");


  bgVideo.muted = true;
  bgVideo.pause();
  if (bgMusic) bgMusic.pause();

  splash.addEventListener("click", async () => {

    splash.style.display = "none";


    page.classList.remove("is-hidden");
    page.classList.add("is-visible");


    try {
      bgVideo.muted = false;
      await bgVideo.play();
      if (bgMusic) await bgMusic.play();
    } catch (e) {
      console.log("Autoplay blocked:", e);
    }
  });
});
