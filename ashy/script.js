document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const page = document.getElementById('page');
  const bgVideo = document.getElementById('bgVideo');
  const bgMusic = document.getElementById('bgMusic');

  const toggleVideoSoundBtn = document.getElementById('toggleVideoSound');
  const toggleMusicBtn = document.getElementById('toggleMusic');

  if (!splash || !page || !bgVideo) {
    console.error('Missing required elements:', { splash, page, bgVideo });
    return;
  }

  // Ensure correct initial state
  page.classList.add('is-hidden');
  page.classList.remove('is-visible');

  // Keep background video moving (muted autoplay is allowed)
  bgVideo.muted = true;
  bgVideo.play().catch(() => {});

  const setVideoBtnText = () => {
    if (!toggleVideoSoundBtn) return;
    toggleVideoSoundBtn.textContent = bgVideo.muted ? 'Unmute Video' : 'Mute Video';
  };

  const setMusicBtnText = () => {
    if (!toggleMusicBtn || !bgMusic) return;
    toggleMusicBtn.textContent = bgMusic.paused ? 'Play Music' : 'Pause Music';
  };

  setVideoBtnText();
  setMusicBtnText();

  async function enterSite() {
    // Reveal landing content first (so even if media play fails, you're not stuck)
    page.classList.remove('is-hidden');
    page.classList.add('is-visible');

    // Hide splash and stop it from blocking clicks
    splash.classList.add('hidden');
    setTimeout(() => splash.remove(), 600);

    // Start video with sound
    try {
      bgVideo.muted = false;
      await bgVideo.play();
    } catch (e) {
      // If browser blocks, user can still unmute using the button
      console.log('Video play/unmute blocked:', e);
    }

    // Start optional music
    if (bgMusic) {
      try {
        await bgMusic.play();
      } catch (e) {
        console.log('Music play blocked:', e);
      }
    }

    setVideoBtnText();
    setMusicBtnText();
  }

  // Click / keyboard support
  splash.addEventListener('click', enterSite);
  splash.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      enterSite();
    }
  });

  // Buttons (optional)
  if (toggleVideoSoundBtn) {
    toggleVideoSoundBtn.addEventListener('click', async () => {
      bgVideo.muted = !bgVideo.muted;
      try { await bgVideo.play(); } catch (_) {}
      setVideoBtnText();
    });
  }

  if (toggleMusicBtn && bgMusic) {
    toggleMusicBtn.addEventListener('click', async () => {
      try {
        if (bgMusic.paused) {
          await bgMusic.play();
        } else {
          bgMusic.pause();
        }
      } catch (e) {
        console.log('Music toggle blocked:', e);
      }
      setMusicBtnText();
    });
  }
});
