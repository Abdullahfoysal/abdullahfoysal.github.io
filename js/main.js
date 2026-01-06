/**
 * Modern Portfolio - Main JavaScript
 * Abdullah Foysal - Cross-Platform Mobile Developer
 */

(function() {
  'use strict';

  // ===== DOM Elements =====
  const themeToggle = document.getElementById('themeToggle');
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const typedElement = document.getElementById('typed');
  const statNumbers = document.querySelectorAll('.stat-number');
  const contactForm = document.getElementById('contactForm');

  // ===== Theme Management =====
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // ===== Navigation =====
  const handleScroll = () => {
    // Navbar scroll effect
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Update active nav link
    updateActiveNavLink();
  };

  const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const toggleNav = () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  };

  const closeNav = () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  // ===== Smooth Scroll =====
  const smoothScroll = (e) => {
    const href = e.currentTarget.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        closeNav();
      }
    }
  };

  // ===== Typed Text Animation =====
  const initTyped = () => {
    if (typedElement && typeof Typed !== 'undefined') {
      new Typed('#typed', {
        strings: [
          'Flutter Developer',
          'iOS Developer',
          'Android Developer',
          'WatchOS Developer',
          'Cross-Platform Expert'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false
      });
    }
  };

  // ===== Counter Animation =====
  const animateCounters = () => {
    const options = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const count = parseInt(target.getAttribute('data-count'));
          animateValue(target, 0, count, 2000);
          observer.unobserve(target);
        }
      });
    }, options);

    statNumbers.forEach(stat => observer.observe(stat));
  };

  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  // ===== AOS (Animate On Scroll) =====
  const initAOS = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: 'mobile'
      });
    }
  };

  // ===== Contact Form =====
  const handleFormSubmit = (e) => {
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Form will be handled by Formspree
    // Reset button after submission
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 3000);
  };

  // ===== Particles Background (Optional) =====
  const initParticles = () => {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 10 + 2}px;
        height: ${Math.random() * 10 + 2}px;
        background: rgba(37, 99, 235, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(particle);
    }
  };

  // ===== Lazy Loading Images =====
  const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // ===== Keyboard Navigation =====
  const handleKeyboard = (e) => {
    // Close mobile nav on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeNav();
    }
  };

  // ===== Initialize =====
  const init = () => {
    // Initialize theme
    initTheme();

    // Event Listeners
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    if (navToggle) {
      navToggle.addEventListener('click', toggleNav);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', smoothScroll);
    });

    // Back to top
    if (backToTop) {
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Contact form
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Scroll events
    window.addEventListener('scroll', handleScroll);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Initialize features
    initTyped();
    initAOS();
    animateCounters();
    initParticles();
    lazyLoadImages();

    // Initial scroll check
    handleScroll();

    console.log('🚀 Portfolio initialized successfully!');
  };

  // ===== Run on DOM Ready =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
