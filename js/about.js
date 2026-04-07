// planet 스크롤 시 문구 전환
const planetSection = document.getElementById('planet');

ScrollTrigger.create({
  trigger: planetSection,
  start: 'top top',
  end: 'bottom top',
  pin: true,           // 고정
  onEnter: () => planetSection.classList.remove('switched'),
  onLeaveBack: () => planetSection.classList.remove('switched'),
  onUpdate: (self) => {
    if (self.progress > 0.55) {
      planetSection.classList.add('switched');
    } else {
      planetSection.classList.remove('switched');
    }
  }
});






// brand_story shrink

const brandStory = document.querySelector('.brand-story');  // ← 이 줄 추가

ScrollTrigger.create({
  trigger: brandStory,
  start: 'top 80%',
  onEnter: () => {
    brandStory.classList.add('is-visible');
  },
});





//카드
const brandCard = document.querySelector('.brand-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.5) {
            brandCard.classList.add('hover-enabled');
        } else {
            brandCard.classList.remove('hover-enabled');
        }
    });
}, {
    threshold: 0.7  // 70% 보였을 때 호버효과 나타나게
});

observer.observe(brandCard);