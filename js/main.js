// 1. CHUỘT TÙY CHỈNH (NÂNG CẤP HIỆU ỨNG SAO CHỔI)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 600, fill: "forwards", easing: "ease-out" }); 
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.6)';
    cursorOutline.style.backgroundColor = 'rgba(236, 72, 153, 0.2)';
    cursorOutline.style.border = 'none'; 
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0)'; 
  });
  
  el.addEventListener('mouseleave', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorOutline.style.backgroundColor = 'transparent';
    cursorOutline.style.border = '2px solid rgba(244, 114, 182, 0.4)'; 
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)'; 
  });
});


// 2. HIỆU ỨNG 3D HOVER TILT VÀ FLASHLIGHT CHO THẺ DỰ ÁN
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});


// 3. HIỆU ỨNG PARALLAX ẢNH NỀN VŨ TRỤ KHI CUỘN
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  // Gắn translate vào the cha (.hero-bg) để không xung đột với CSS Animation của img
  const heroBgContainer = document.querySelector('.hero-bg');
  if(heroBgContainer) {
    heroBgContainer.style.transform = `translateY(${scrolled * 0.4}px)`;
  }
});


// 4. ANIMATION CUỘN TRANG & XUẤT HIỆN MƯỢT MÀ
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        if(!entry.target.classList.contains('glass-card')) {
           entry.target.style.transform = "translateY(0)";
        }
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(".glass-card, .about-grid").forEach((el) => {
  el.style.opacity = "0";
  el.style.animation = "fadeUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards";
  observer.observe(el);
});


// 5. ĐIỀU KHIỂN CỬA SỔ POP-UP (MODAL)
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});


// 6. THANH ĐIỀU HƯỚNG THÔNG MINH
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.site-nav');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    navbar.classList.add('nav-hidden');
  } else {
    navbar.classList.remove('nav-hidden');
  }
  lastScrollY = currentScrollY;
});


// 7. THANH TIẾN ĐỘ CUỘN (SCROLL PROGRESS BAR)
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  if(progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
});