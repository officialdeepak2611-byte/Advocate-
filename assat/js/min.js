//======DISCLAIMER MODAL SCRIPT ======

window.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('disclaimer-modal');
  var acceptBtn = document.getElementById('disclaimer-accept');
  modal.style.display = 'flex';
  acceptBtn.onclick = function () {
    modal.style.display = 'none';
  };
});


// ======= STICKY NAVBAR ON SCROLL =======
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// ======= HAMBURGER MENU TOGGLE =======
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

// Close menu when any nav link is clicked
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  }
});


// ======= COUNT-UP ANIMATION FOR HERO STATS =======
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const stepTime = 16;
  const steps = Math.ceil(duration / stepTime);
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, stepTime);
}

const stats = document.querySelectorAll('.stat-num[data-target]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
stats.forEach(stat => observer.observe(stat));

// ======= ABOUT COUNTER ANIMATION =======
function animateAboutCounter() {
  // Animate #about-counter
  const el = document.getElementById('about-counter');
  if (el) runCounter(el);
  // Animate #about-years
  const yearsEl = document.getElementById('about-years');
  if (yearsEl) runCounter(yearsEl);
}

function runCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const stepTime = 16;
  const steps = Math.ceil(duration / stepTime);
  let current = 0;
  const increment = target / steps;
  let started = false;

  function run() {
    if (started) return;
    started = true;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, stepTime);
  }

  // Intersection Observer to trigger only when visible
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        run();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(el);
}

window.addEventListener('DOMContentLoaded', animateAboutCounter);

// ======= ABOUT =======
function toggleText() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "READ MORE";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "READ LESS";
    moreText.style.display = "inline";
  }
}

// ======= PRACTICE AREAS SECTION =======

// (Moved into DOMContentLoaded block below)






// ======= FAQ (New) =======
const faqItems = document.querySelectorAll(".faq-acc-item");

faqItems.forEach(item => {
  const header = item.querySelector(".faq-acc-header");
  const body = item.querySelector(".faq-acc-body");

  header.addEventListener("click", () => {
    // Close other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-acc-body").style.maxHeight = null;
      }
    });

    // Toggle current item
    item.classList.toggle("active");

    if (item.classList.contains("active")) {
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      body.style.maxHeight = null;
    }
  });
});


// ======= TESTIMONIALS SLIDER =======
function runTestimonialsSlider() {
  const track = document.querySelector('.testimonials-track');
  const cards = document.querySelectorAll('.testimonial-card');
  if (!track || cards.length === 0) return;

  let index = 0;

  function getVisibleCards() {
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 768) return 2;
    return 1;
  }

  function slide() {
    const visibleCards = getVisibleCards();
    const totalCards = cards.length;
    const maxIndex = totalCards - visibleCards;

    // Calculate card width + gap dynamically
    const cardRect = cards[0].getBoundingClientRect();
    const trackStyle = window.getComputedStyle(track);
    const gap = parseInt(trackStyle.gap) || 0;
    const moveAmount = cardRect.width + gap;

    index++;
    if (index > maxIndex) {
      index = 0;
    }

    track.style.transform = `translateX(-${index * moveAmount}px)`;
  }

  let sliderInterval = setInterval(slide, 2000);

  // Pause on hover
  const wrapper = document.querySelector('.testimonials-slider-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    wrapper.addEventListener('mouseleave', () => sliderInterval = setInterval(slide, 2000));
  }

  // Handle resize - reset to start to avoid alignment issues
  window.addEventListener('resize', () => {
    index = 0;
    track.style.transform = `translateX(0)`;
  });
}
window.addEventListener('DOMContentLoaded', () => {
  runTestimonialsSlider();
  initScrollReveal();
  initScrollToTop();
  initPracticeModal();
});

// ======= SCROLL REVEAL ANIMATIONS =======
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, we can unobserve if we only want it to happen once
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 // Trigger when 15% of the element is visible
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
}

// ======= SCROLL TO TOP =======
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ======= PRACTICE AREA MODAL LOGIC =======
function initPracticeModal() {
  const modal = document.getElementById('practice-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.modal-close');
  const overlay = document.querySelector('.modal-overlay');
  const readMoreBtns = document.querySelectorAll('.read-more-btn');

  if (!modal || !modalBody || !closeBtn) return;

  function openModal(contentHtml) {
    modalBody.innerHTML = contentHtml;
    modal.style.display = 'flex';
    // Small timeout to allow display:flex to register before adding class for transition
    setTimeout(() => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }, 10);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Restore scroll
    // Wait for transition to finish before hiding display
    setTimeout(() => {
      modal.style.display = 'none';
      modalBody.innerHTML = '';
    }, 400);
  }

  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const cardContent = this.closest('.card-content');
      if (cardContent) {
        // Clone the content to avoid removing it from the original card
        const contentClone = cardContent.innerHTML;
        openModal(contentClone);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
