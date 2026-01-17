const track = document.querySelector(".project-track");
const slides = Array.from(document.querySelectorAll(".project-slide"));
const prevBtn = document.querySelector(".proj-arrow.prev");
const nextBtn = document.querySelector(".proj-arrow.next");
const dotsContainer = document.querySelector(".project-dots");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");
const mobileLinks = document.querySelectorAll(".mobile-links a");
const revealElements = document.querySelectorAll(".autoShow");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < triggerBottom) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
revealOnScroll();

function parallaxEffect() {
  const aboutSection = document.querySelector('.Aboutus-section');
  const contactSection = document.querySelector('.contact-section');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (aboutSection) {
      const aboutOffset = aboutSection.offsetTop;
      const aboutParallax = (scrolled - aboutOffset) * 0.5;
      if (scrolled > aboutOffset - window.innerHeight) {
        aboutSection.style.backgroundPositionY = `${aboutParallax}px`;
      }
    }
    
    if (contactSection) {
      const contactOffset = contactSection.offsetTop;
      const contactParallax = (scrolled - contactOffset) * 0.5;
      if (scrolled > contactOffset - window.innerHeight) {
        contactSection.style.backgroundPositionY = `${contactParallax}px`;
      }
    }
  });
}

if (window.innerWidth > 768) {
  parallaxEffect();
}

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = 'rgba(244, 238, 226, 0.95)';
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.background = 'rgba(244, 238, 226, 0.55)';
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

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

  slides.forEach((slide, i) => {
    if (i >= index * slidesPerView && i < (index + 1) * slidesPerView) {
      slide.style.animation = 'none';
      setTimeout(() => {
        slide.style.animation = 'fadeInStagger 0.6s ease-out';
      }, 10);
    }
  });
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
  
  const links = mobileMenu.querySelectorAll('.mobile-links a');
  links.forEach((link, i) => {
    link.style.animation = 'none';
    setTimeout(() => {
      link.style.animation = `fadeInDown 0.4s ease-out ${i * 0.1}s both`;
    }, 10);
  });
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const headerOffset = 120;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const buttons = document.querySelectorAll('.contactBtn, .ContactBtn, .about-btn, .project-btn, .testimonial-btn, .contact-submit-btn');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transition = 'all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  });
});

function typingEffect() {
  const heroTitle = document.querySelector('.heroh1');
  if (!heroTitle) return;
  
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.opacity = '1';
  
  let i = 0;
  const speed = 50; 
  
  function type() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 800);
}

let cursorTrail = [];
const maxTrailLength = 20;

function createCursorTrail(e) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--button-background-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    opacity: 0.5;
    animation: cursorFade 0.8s ease-out forwards;
  `;
  
  document.body.appendChild(trail);
  cursorTrail.push(trail);
  
  if (cursorTrail.length > maxTrailLength) {
    const oldTrail = cursorTrail.shift();
    oldTrail.remove();
  }
  
  setTimeout(() => trail.remove(), 800);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes cursorFade {
    to {
      opacity: 0;
      transform: scale(0);
    }
  }
`;
document.head.appendChild(style);

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));

updateSlidesPerView();
createDots();
updateCarousel();

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

console.log('🎨 Portfolio animations loaded successfully!');