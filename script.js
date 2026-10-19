// カードの反転、横スクロール、スクロール演出
document.querySelectorAll(".project-card").forEach((card) => {
  const button = card.querySelector(".card-inner");
  if (!button) return;
  const projectName = card.querySelector(".card-title")?.textContent.replace(/\s+/g, " ").trim();

  button.addEventListener("click", () => {
    const flipped = card.classList.toggle("is-flipped");
    button.setAttribute("aria-pressed", String(flipped));
    if (projectName) {
      button.setAttribute("aria-label", `${projectName}の詳細を${flipped ? "閉じる" : "表示"}`);
    }
  });
});

document.querySelectorAll(".member-flip-card").forEach((card) => {
  const button = card.querySelector(".member-flip-trigger");
  if (!button) return;
  const memberName = card.querySelector(".member-info h3").textContent.trim();
  const photo = card.querySelector(".member-flip-photo img");
  const alternatePhoto = photo?.dataset.alternateSrc;
  const originalPhoto = photo?.getAttribute("src");

  button.addEventListener("click", () => {
    const flipped = card.classList.toggle("is-flipped");
    if (flipped && photo && alternatePhoto && originalPhoto) {
      photo.src = Math.random() < 0.5 ? originalPhoto : alternatePhoto;
    }
    button.setAttribute("aria-pressed", String(flipped));
    button.setAttribute("aria-label", flipped ? `${memberName}の紹介に戻る` : `${memberName}の写真を表示`);
  });
});

const track = document.querySelector("#projectTrack");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

if (track) {
  prevButton?.addEventListener("click", () => {
    track.scrollBy({ left: -track.clientWidth * 0.72, behavior: "smooth" });
  });

  nextButton?.addEventListener("click", () => {
    track.scrollBy({ left: track.clientWidth * 0.72, behavior: "smooth" });
  });
}

// 要素が画面に入ったらふわっと表示
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// スマホ用ナビゲーション
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".desktop-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    menuButton.textContent = open ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
    menuButton.textContent = "☰";
  }));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
      menuButton.textContent = "☰";
      menuButton.focus();
    }
  });
}
