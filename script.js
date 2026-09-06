/* =========================================================
   SCARLET.TIKSL.COM - FULL INTERACTIVE JS & API INTEGRATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  let isPremium = false;
  const SECRET_TOKEN = "Glass5522";

  // Web Audio API Sound Generator
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playClickSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  }

  // 1. Custom Cursor
  const cursorDot = document.getElementById("cursorDot");
  const cursorOutline = document.getElementById("cursorOutline");

  window.addEventListener("mousemove", (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;

    cursorOutline.animate({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`
    }, { duration: 250, fill: "forwards" });
  });

  document.querySelectorAll("button, a, input, select, label, .feature-card").forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  // 2. Custom Background dari Galeri (Local File Reader)
  const customBgInput = document.getElementById("customBgInput");
  const bgVideo = document.getElementById("bgVideo");
  const bgCustomImage = document.getElementById("bgCustomImage");

  customBgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (file.type.startsWith("video/")) {
        bgCustomImage.classList.add("hidden");
        bgVideo.classList.remove("hidden");
        bgVideo.src = url;
        bgVideo.play();
      } else if (file.type.startsWith("image/")) {
        bgVideo.classList.add("hidden");
        bgCustomImage.classList.remove("hidden");
        bgCustomImage.style.backgroundImage = `url('${url}')`;
      }
      playClickSound();
    }
  });

  // 3. Dark/Light Mode + Page Transition
  const themeToggle = document.getElementById("themeToggle");
  const pageTransition = document.getElementById("pageTransition");

  themeToggle.addEventListener("click", () => {
    playClickSound();
    pageTransition.classList.add("active");

    setTimeout(() => {
      document.body.classList.toggle("light-mode");
      document.body.classList.toggle("dark-mode");
    }, 250);

    setTimeout(() => pageTransition.classList.remove("active"), 500);
  });

  // 4. Dynamic Input Placeholder (Berganti tiap 5 detik)
  const placeholders = [
    "Scarlet Glass Liliya",
    "Masukan link tiktok",
    "Scarlet.TikSL.com"
  ];
  let placeholderIndex = 0;
  const tiktokInput = document.getElementById("tiktokUrl");

  setInterval(() => {
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    tiktokInput.style.opacity = "0.3";
    setTimeout(() => {
      tiktokInput.placeholder = placeholders[placeholderIndex];
      tiktokInput.style.opacity = "1";
    }, 200);
  }, 5000);

  // 5. Text Scramble Animation
  const logoText = document.getElementById("logoText");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function scrambleText(element) {
    let iteration = 0;
    const text = element.dataset.scramble;
    clearInterval(element.interval);

    element.interval = setInterval(() => {
      element.innerText = text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");

      if (iteration >= text.length) clearInterval(element.interval);
      iteration += 1 / 3;
    }, 30);
  }

  logoText.addEventListener("mouseenter", () => scrambleText(logoText));

  // 6. Magnetic Buttons
  document.querySelectorAll(".magnetic-btn").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });

  // 7. Ripple & Button Morph Click Effects
  document.addEventListener("click", (e) => {
    const target = e.target.closest(".ripple-btn, .btn");
    if (target) {
      playClickSound();

      const circle = document.createElement("span");
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;
      const rect = target.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("ripple");

      const prevRipple = target.querySelector(".ripple");
      if (prevRipple) prevRipple.remove();

      target.appendChild(circle);

      if (target.classList.contains("morph-btn")) {
        target.classList.add("morphing");
        setTimeout(() => target.classList.remove("morphing"), 300);
      }
    }
  });

  // 8. Scroll Reveal Animation
  const scrollElements = document.querySelectorAll(".scroll-reveal");
  const handleScroll = () => {
    scrollElements.forEach(el => {
      if (el.getBoundingClientRect().top <= window.innerHeight / 1.2) {
        el.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // 9. Premium Token Modal & Confetti
  const premiumBtn = document.getElementById("premiumBtn");
  const premiumModal = document.getElementById("premiumModal");
  const closeModal = document.getElementById("closeModal");
  const submitTokenBtn = document.getElementById("submitTokenBtn");
  const tokenInput = document.getElementById("tokenInput");

  premiumBtn.addEventListener("click", () => premiumModal.classList.remove("hidden"));
  closeModal.addEventListener("click", () => premiumModal.classList.add("hidden"));

  submitTokenBtn.addEventListener("click", () => {
    if (tokenInput.value.trim() === SECRET_TOKEN) {
      isPremium = true;
      premiumModal.classList.add("hidden");

      document.getElementById("tierText").innerText = "Premium Tier (Akses Penuh)";
      const badge = document.getElementById("userTierBadge");
      badge.style.borderColor = "#ffd700";
      badge.style.color = "#ffd700";

      document.getElementById("opt1080").disabled = false;
      document.getElementById("opt1080").innerText = "1080p HD (Ultra)";
      document.getElementById("opt60").disabled = false;
      document.getElementById("opt60").innerText = "60 FPS (Smooth)";
      document.getElementById("adBanner").classList.add("hidden");

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00d2ff', '#0066ff', '#00f0ff', '#ffffff']
      });
    } else {
      alert("Token Rahasia Salah!");
    }
  });

  // 10. Command Palette
  const cmdOverlay = document.getElementById("cmdOverlay");
  const cmdPaletteBtn = document.getElementById("cmdPaletteBtn");
  const cmdInput = document.getElementById("cmdInput");

  cmdPaletteBtn.addEventListener("click", () => {
    cmdOverlay.classList.remove("hidden");
    cmdInput.focus();
  });

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      cmdOverlay.classList.toggle("hidden");
      if (!cmdOverlay.classList.contains("hidden")) cmdInput.focus();
    }
    if (e.key === "Escape") cmdOverlay.classList.add("hidden");
  });

  document.querySelectorAll("#cmdList li").forEach(li => {
    li.addEventListener("click", () => {
      const act = li.dataset.action;
      cmdOverlay.classList.add("hidden");
      if (act === "theme") themeToggle.click();
      if (act === "premium") premiumBtn.click();
      if (act === "custombg") customBgInput.click();
      if (act === "clear") tiktokInput.value = "";
    });
  });

  // 11. TikWM API Integration
  const downloadBtn = document.getElementById("downloadBtn");
  const loader = document.getElementById("loader");
  const resultContainer = document.getElementById("resultContainer");

  downloadBtn.addEventListener("click", async () => {
    const url = tiktokInput.value.trim();
    if (!url) {
      alert("Masukkan link video TikTok terlebih dahulu!");
      return;
    }

    resultContainer.classList.add("hidden");
    loader.classList.remove("hidden");

    try {
      const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      loader.classList.add("hidden");

      if (data.code === 0) {
        document.getElementById("videoCover").src = data.data.cover;
        document.getElementById("videoTitle").innerText = data.data.title || "Video TikTok";
        document.getElementById("videoAuthor").innerText = `@${data.data.author.unique_id}`;

        document.getElementById("resBadge").innerText = isPremium ? document.getElementById("resSelect").value : "720p";
        document.getElementById("fpsBadge").innerText = isPremium ? document.getElementById("fpsSelect").value : "30fps";

        document.getElementById("dlNoWm").href = data.data.play;
        document.getElementById("dlMusic").href = data.data.music;

        resultContainer.classList.remove("hidden");
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } else {
        alert("Gagal memproses video. Pastikan link TikTok valid!");
      }
    } catch (err) {
      loader.classList.add("hidden");
      alert("Terjadi kesalahan jaringan/API. Coba beberapa saat lagi.");
    }
  });
});
