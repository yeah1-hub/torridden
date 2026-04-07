const header = document.getElementById('header');
const megaMenu = document.getElementById('megaMenu');
const backdrop = document.getElementById('backdrop');
const navItems = document.querySelectorAll('.nav-item');
const megaInner = document.querySelector('.mega-inner');

let currentMenu = null;
let lastScrollY = 0;
let ticking = false;

/* ── SCROLL BEHAVIOUR ── */
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
});

function updateHeader() {
  const y = window.scrollY;

  if (y > 20) {
    header.classList.remove('transparent');
    header.classList.add('scrolled');
  } else {
    header.classList.add('transparent');
    header.classList.remove('scrolled');
  }

  if (y > lastScrollY && y > 80) {
    header.classList.add('hidden');
    closeMega();
  } else {
    header.classList.remove('hidden');
  }

  lastScrollY = y;
  ticking = false;
}

/* ── MEGA MENU ── */
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const menu = item.dataset.menu;
    openMega(menu);
    item.classList.add('active');
  });

  item.addEventListener('mouseleave', () => {
    item.classList.remove('active');
  });
});

megaMenu.addEventListener('mouseenter', () => {
  /* keep open while inside menu */
});

megaMenu.addEventListener('mouseleave', () => {
  closeMega();
});

document.querySelector('nav').addEventListener('mouseleave', (e) => {
  if (!megaMenu.contains(e.relatedTarget)) closeMega();
});

backdrop.addEventListener('click', closeMega);

function openMega(menu) {
  if (currentMenu === menu) return;
  currentMenu = menu;

  document.querySelectorAll('.shop-panel, .simple-panel').forEach(p => p.classList.remove('active'));

  const panel = document.getElementById('panel-' + menu);
  if (panel) panel.classList.add('active');

  if (menu === 'shop') {
    megaInner.style.marginLeft = 'auto';
    megaInner.style.marginRight = 'auto';
    megaInner.style.maxWidth = '1280px';
  } else {
    const activeNav = document.querySelector(`.nav-item[data-menu="${menu}"]`);
    if (activeNav) {
      const rect = activeNav.getBoundingClientRect();
      megaInner.style.marginLeft = (rect.left - 10) + 'px';
      megaInner.style.marginRight = '0';
      megaInner.style.maxWidth = 'none';
    }
  }

  megaMenu.classList.add('open');
  backdrop.classList.add('active');
  header.classList.add('menu-open');
}

function closeMega() {
  currentMenu = null;
  megaMenu.classList.remove('open');
  backdrop.classList.remove('active');
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  header.classList.remove('menu-open');
}


/* ── MAIN SWIPER ── */
function animateSlide(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const content = activeSlide.querySelector('.slide-anim');
  if (content) {
    gsap.fromTo(content,
      { y: 70, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" }
    );
  }
}
function startProgress() {
  const fill = document.querySelector('.slide-progress-fill');
  fill.style.transition = 'none';
  fill.style.width = '0%';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fill.style.transition = 'width 3s linear';
      fill.style.width = '100%';
    });
  });
}

var swiper = new Swiper(".main-swiper", {
  spaceBetween: 30,
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init: function () { 
      animateSlide(this); 
      startProgress();
    },
    slideChange: function () { 
      animateSlide(this);
      startProgress();
    }
  }
});


/* ── BEST SELLER SWIPER ── */
const bestSellerSwiper = new Swiper('.best-seller-swiper', {
  slidesPerView: 4,
  spaceBetween: 24,
  slidesPerGroup: 1,
  pagination: {
    el: '.best-seller-swiper .swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1.2 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  },
  on: {
    init: function () {
      const slides = document.querySelectorAll('.best-seller-swiper .swiper-slide');

      gsap.set(slides, { x: -60, opacity: 0 });

      ScrollTrigger.create({
        trigger: '.best-seller-swiper',
        start: 'top 85%',
        onEnter: () => {
          gsap.to(slides, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            overwrite: true
          });
        },
        onLeave: () => {
          gsap.to(slides, {
            x: -60,
            opacity: 0,
            duration: 0.5,
            overwrite: true
          });
        },
        onEnterBack: () => {
          gsap.to(slides, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            overwrite: true
          });
        },
        onLeaveBack: () => {
          gsap.to(slides, {
            x: -60,
            opacity: 0,
            duration: 0.5,
            overwrite: true
          });
        },
      });
    }
  }
});


/* ── PRODUCT BOX ── */
$(document).ready(function () {
  var slide = $(".product_box");

  slide.click(function () {
    var $this = $(this);

    slide.not($this).stop().animate({ "width": "14%" }, 700);
    slide.not($this).find(".product_box_ver_title").stop().fadeIn(700);
    slide.not($this).find(".product_box_title_wrap").stop().hide();

    $this.stop().animate({ "width": "55%" }, 700);
    $this.find(".product_box_ver_title").stop().fadeOut(300);
    $this.find(".product_box_title_wrap").stop().delay(300).fadeIn(400);
  });
});


/* ── LINE RIGHT BOX 스크롤 제어 ── */
const lineRightBox = document.querySelector('.line_right_box');
let isTransferring = false;

lineRightBox.addEventListener('wheel', (e) => {
  const { scrollTop, scrollHeight, clientHeight } = lineRightBox;
  const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
  const isAtTop = scrollTop === 0;

  if (isAtBottom && e.deltaY > 0) {
    e.preventDefault();
    if (isTransferring) return;
    isTransferring = true;

    const nextSection = document.querySelector('.product_line');
    lenis.scrollTo(nextSection, { duration: 1.5, offset: -80 });

    setTimeout(() => { isTransferring = false; }, 1500);
    return;
  }

  if (isAtTop && e.deltaY < 0) {
    e.preventDefault();
    if (isTransferring) return;
    isTransferring = true;

    const prevSection = document.querySelector('.best_seller');
    lenis.scrollTo(prevSection, { duration: 1.5, offset: -80 });

    setTimeout(() => { isTransferring = false; }, 1500);
    return;
  }

}, { passive: false });







/* ── YOUTUBE iframe 스크롤 이슈 해결 ── */
const videoWrapper = document.querySelector('.video_wrapper');

if (videoWrapper) {
  // iframe에 포커스 들어가면 wheel을 window로 전달
  window.addEventListener('blur', () => {
    setTimeout(() => {
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
        window.focus();
      }
    }, 0);
  });
}