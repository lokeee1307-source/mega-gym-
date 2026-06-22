/* ═══════════════════════════════════════════════════════
   MEGA GYM — Frontend Application Logic
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursorFollower();
  initNavbar();
  initParticles();
  initScrollAnimations();
  initStatCounters();
  initPopularTimes();
  initReviews();
  initContactForm();
  initMembershipModal();
});

/* ── Preloader ──────────────────────────────────────── */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      // Trigger hero animations
      document.querySelectorAll('.hero .animate-fade-up').forEach(el => {
        el.classList.add('visible');
      });
    }, 1500);
  });
  // Failsafe
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 4000);
}

/* ── Custom Cursor ──────────────────────────────────── */
function initCursorFollower() {
  const cursor = document.getElementById('cursorFollower');
  if (!cursor || window.innerWidth <= 768) return;

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Hover effect on interactive elements
  const hoverElements = document.querySelectorAll('a, button, .service-card, .trainer-card, .pricing-card, .review-card, input, textarea');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ── Navigation ─────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 80);
    lastScroll = currentScroll;

    // Active link highlight
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (currentScroll >= top && currentScroll < top + height) {
        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* ── Particles ──────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth <= 768 ? 20 : 40;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (6 + Math.random() * 6) + 's';
    particle.style.width = (2 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/* ── Scroll Animations ──────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-slide-up, .animate-fade-up:not(.hero .animate-fade-up)').forEach(el => {
    observer.observe(el);
  });
}

/* ── Stat Counters ──────────────────────────────────── */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => animateCounter(counter));
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = eased * target;

    if (isDecimal) {
      el.textContent = current.toFixed(1);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (isDecimal) {
        el.textContent = target.toFixed(1);
      } else {
        el.textContent = target.toLocaleString() + (el.closest('.hero-stat')?.querySelector('.stat-label')?.textContent.includes('+') ? '' : '');
      }
    }
  }

  requestAnimationFrame(update);
}

/* ── Popular Times ──────────────────────────────────── */
function initPopularTimes() {
  const popularTimes = {
    Monday:    [10, 15, 25, 40, 55, 70, 85, 90, 80, 65, 50, 40, 35, 45, 60, 75, 85, 70, 45, 20],
    Tuesday:   [8, 12, 20, 35, 50, 65, 80, 88, 75, 60, 48, 38, 32, 42, 58, 72, 82, 68, 42, 18],
    Wednesday: [12, 18, 28, 42, 58, 72, 88, 92, 82, 68, 52, 42, 38, 48, 62, 78, 88, 72, 48, 22],
    Thursday:  [10, 14, 22, 38, 52, 68, 82, 86, 78, 62, 50, 40, 34, 44, 60, 74, 84, 70, 44, 20],
    Friday:    [15, 20, 30, 45, 60, 75, 85, 88, 78, 65, 52, 42, 36, 46, 58, 70, 78, 62, 38, 15],
    Saturday:  [5, 8, 15, 30, 50, 70, 85, 92, 88, 78, 65, 55, 50, 55, 60, 55, 40, 25, 12, 5],
    Sunday:    [5, 8, 12, 25, 42, 60, 75, 82, 80, 72, 60, 50, 45, 48, 52, 45, 32, 18, 8, 3]
  };

  const hours = ['6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p', '12a', '1a'];
  const chart = document.getElementById('timesChart');
  const dayBtns = document.querySelectorAll('.time-day');

  function renderChart(day) {
    chart.innerHTML = '';
    const data = popularTimes[day];
    data.forEach((val, i) => {
      const bar = document.createElement('div');
      bar.classList.add('times-bar');
      bar.style.height = '0%';
      bar.setAttribute('data-time', hours[i]);

      if (val < 30) bar.classList.add('low');
      else if (val < 55) bar.classList.add('medium');
      else if (val < 80) bar.classList.add('high');
      else bar.classList.add('peak');

      bar.title = `${hours[i]}: ${val}% busy`;
      chart.appendChild(bar);

      // Animate
      setTimeout(() => {
        bar.style.height = val + '%';
      }, i * 30);
    });
  }

  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderChart(btn.dataset.day);
    });
  });

  // Initialize with Monday
  renderChart('Monday');
}

/* ── Reviews Carousel ───────────────────────────────── */
function initReviews() {
  const reviews = [
    { id: 1, name: 'Rahul M.', rating: 5, text: 'Nice friendly Staff, little small in space but have almost all equipments.', date: '2 months ago', avatar: 'RM' },
    { id: 2, name: 'Priya S.', rating: 5, text: 'Great place, friendly trainers and excellent equipment!!!', date: '1 month ago', avatar: 'PS' },
    { id: 3, name: 'Amit K.', rating: 4, text: 'Good gym with all necessary equipments. Trainers are helpful and motivating.', date: '3 weeks ago', avatar: 'AK' },
    { id: 4, name: 'Sneha R.', rating: 5, text: 'Best gym in Ejipura area! The trainers are very professional and supportive.', date: '1 week ago', avatar: 'SR' },
    { id: 5, name: 'Vikram D.', rating: 5, text: 'Amazing atmosphere and great collection of equipments. Highly recommend!', date: '4 days ago', avatar: 'VD' },
    { id: 6, name: 'Deepa N.', rating: 4, text: 'Clean environment, good equipment variety. Trainers know their craft well.', date: '2 days ago', avatar: 'DN' }
  ];

  const carousel = document.getElementById('reviewsCarousel');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevReview');
  const nextBtn = document.getElementById('nextReview');

  // Render cards
  reviews.forEach(review => {
    const card = document.createElement('div');
    card.classList.add('review-card');
    card.innerHTML = `
      <div class="review-header">
        <div class="review-avatar">${review.avatar}</div>
        <div class="review-author">
          <h4>${review.name}</h4>
          <span>${review.date}</span>
        </div>
      </div>
      <div class="review-stars-small">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <p class="review-text">${review.text}</p>
    `;
    carousel.appendChild(card);
  });

  // Calculate items per view
  function getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  let currentIndex = 0;
  let itemsPerView = getItemsPerView();
  const totalPages = Math.ceil(reviews.length / itemsPerView);

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    const pages = Math.ceil(reviews.length / getItemsPerView());
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    itemsPerView = getItemsPerView();
    const maxIndex = Math.ceil(reviews.length / itemsPerView) - 1;
    currentIndex = Math.max(0, Math.min(index, maxIndex));

    const cards = carousel.querySelectorAll('.review-card');
    const cardWidth = cards[0]?.offsetWidth + 24 || 0; // 24 = gap
    const offset = currentIndex * itemsPerView * cardWidth;
    carousel.style.transform = `translateX(-${offset}px)`;
    carousel.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  createDots();

  // Auto-play
  let autoPlay = setInterval(() => {
    const maxIndex = Math.ceil(reviews.length / getItemsPerView()) - 1;
    goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }, 5000);

  carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
  carousel.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
      const maxIndex = Math.ceil(reviews.length / getItemsPerView()) - 1;
      goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }, 5000);
  });

  // Resize handler
  window.addEventListener('resize', () => {
    createDots();
    goToSlide(0);
  });
}

/* ── Contact Form ───────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  const submitBtn = document.getElementById('contactSubmitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      phone: document.getElementById('contactPhone').value,
      message: document.getElementById('contactMessage').value
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';

    try {
      // Try server API first, fallback to local simulation
      let result;
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        result = await response.json();
      } catch {
        // Simulate success when no server is running (standalone mode)
        await new Promise(resolve => setTimeout(resolve, 800));
        result = { success: true, message: 'Thank you! We will get back to you within 24 hours.' };
      }

      if (result.success) {
        status.textContent = result.message;
        status.className = 'form-status success';
        form.reset();
        showToast('Message sent successfully! 🎉');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      status.textContent = error.message || 'Something went wrong. Please try again.';
      status.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Send Message</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
    }
  });
}

/* ── Membership Modal ───────────────────────────────── */
function initMembershipModal() {
  const modal = document.getElementById('membershipModal');
  const closeBtn = document.getElementById('modalClose');
  const form = document.getElementById('membershipForm');
  const status = document.getElementById('membershipStatus');

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('memberName').value,
      email: document.getElementById('memberEmail').value,
      phone: document.getElementById('memberPhone').value,
      plan: document.getElementById('memberPlan').value
    };

    try {
      let result;
      try {
        const response = await fetch('/api/membership', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        result = await response.json();
      } catch {
        await new Promise(resolve => setTimeout(resolve, 800));
        result = { success: true, message: `Thank you for choosing the ${data.plan} plan! Our team will contact you shortly.` };
      }

      if (result.success) {
        status.textContent = result.message;
        status.className = 'form-status success';
        form.reset();
        showToast('Membership inquiry submitted! 🏋️');
        setTimeout(() => modal.classList.remove('active'), 2500);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      status.textContent = error.message || 'Something went wrong. Please try again.';
      status.className = 'form-status error';
    }
  });
}

/* ── Global Functions ───────────────────────────────── */
function openMembershipModal(plan) {
  const modal = document.getElementById('membershipModal');
  document.getElementById('modalPlan').textContent = plan;
  document.getElementById('memberPlan').value = plan;
  document.getElementById('membershipStatus').className = 'form-status';
  document.getElementById('membershipForm').reset();
  modal.classList.add('active');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('active');
  setTimeout(() => toast.classList.remove('active'), 3500);
}

/* ── Smooth scroll for anchor links ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
