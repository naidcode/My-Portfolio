const track = document.querySelector(".project-track");
const slides = Array.from(document.querySelectorAll(".project-slide"));
const prevBtn = document.querySelector(".proj-arrow.prev");
const nextBtn = document.querySelector(".proj-arrow.next");
const dotsContainer = document.querySelector(".project-dots");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");
const mobileLinks = document.querySelectorAll(".mobile-links a");

let index = 0;
let slidesPerView = 3;

function updateSlidesPerView() {
  if (window.innerWidth <= 520) slidesPerView = 1;
  else if (window.innerWidth <= 950) slidesPerView = 2;
  else slidesPerView = 3;
}

function createDots() {
  dotsContainer.innerHTML = "";
  const dotCount = Math.ceil(slides.length / slidesPerView);

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("button");
    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll("button");
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index]?.classList.add("active");
}

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width + 20;
  track.style.transform = `translateX(-${index * slideWidth * slidesPerView}px)`;
  updateDots();
}

nextBtn.addEventListener("click", () => {
  const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;
  index = index >= maxIndex ? 0 : index + 1;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;
  index = index <= 0 ? maxIndex : index - 1;
  updateCarousel();
});

window.addEventListener("resize", () => {
  updateSlidesPerView();
  createDots();
  index = 0;
  updateCarousel();
});

function openMenu(){
  mobileMenu.classList.add("open");
  menuOverlay.classList.add("show");
  menuBtn.classList.add("active");
}

function closeMenu(){
  mobileMenu.classList.remove("open");
  menuOverlay.classList.remove("show");
  menuBtn.classList.remove("active");
}

menuBtn.addEventListener("click", () => {
  if (mobileMenu.classList.contains("open")) closeMenu();
  else openMenu();
});

menuOverlay.addEventListener("click", closeMenu);
mobileLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});



updateSlidesPerView();
createDots();
updateCarousel();
