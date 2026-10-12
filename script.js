// カードの反転、横スクロール、スクロール演出
document.querySelectorAll(".project-card").forEach((card) => {
  const button = card.querySelector(".card-inner");
  if (!button) return;

  button.addEventListener("click", () => {
    const flipped = card.classList.toggle("is-flipped");
    button.setAttribute("aria-pressed", String(flipped));
  });
});

document.querySelectorAll(".member-flip-card").forEach((card) => {
  const button = card.querySelector(".member-flip-trigger");
  if (!button) return;

  button.addEventListener("click", () => {
    const flipped = card.classList.toggle("is-flipped");
    button.setAttribute("aria-pressed", String(flipped));
    button.setAttribute("aria-label", flipped ? "山田 優弥の紹介に戻る" : "山田 優弥の写真を表示");
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
    menuButton.textContent = "☰";
  }));
}
