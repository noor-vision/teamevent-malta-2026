/**
 * Noor Vision GmbH - Event Website Script
 * Malta Onsite 2026
 *
 * Uses GSAP + ScrollTrigger for animations.
 * All content lives directly in index.html.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Check user motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // Utility: Kill all ScrollTriggers (used for reduced motion)
  // ============================================================
  function clearScrollTriggers() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  // ============================================================
  // Interactivity: Mobile Menu, Smooth Scroll, Active Nav, Print
  // ============================================================

  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    // Set initial state for GSAP
    gsap.set(nav, { yPercent: -150, autoAlpha: 0 });

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));

      if (prefersReducedMotion) {
        gsap.set(nav, { yPercent: isOpen ? 0 : -150, autoAlpha: isOpen ? 1 : 0 });
      } else {
        gsap.to(nav, {
          yPercent: isOpen ? 0 : -150,
          autoAlpha: isOpen ? 1 : 0,
          duration: 0.35,
          ease: 'power3.out'
        });
      }
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');

        if (prefersReducedMotion) {
          gsap.set(nav, { yPercent: -150, autoAlpha: 0 });
        } else {
          gsap.to(nav, { yPercent: -150, autoAlpha: 0, duration: 0.25, ease: 'power3.in' });
        }
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  function initActiveNav() {
    const sections = ['overview', 'logistics', 'itinerary', 'dining', 'packing']
      .map(id => document.getElementById(id))
      .filter(Boolean);
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: self => {
          if (self.isActive) {
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
            });
          }
        }
      });
    });
  }

  function initPrintButton() {
    const btn = document.getElementById('btn-print');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.print();
    });
  }

  // ============================================================
  // GSAP Animations
  // Only clickable elements get hover/focus micro-interactions.
  // All other motion is the initial page-load / scroll reveal.
  // ============================================================

  function initAnimations() {
    if (prefersReducedMotion) {
      clearScrollTriggers();
      return;
    }

    // Hero entrance animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-label', { y: 24, opacity: 0, duration: 0.7 })
      .from('#hero-title', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.hero-subtitle', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.hero-description', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.hero-actions .btn', { y: 16, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.4')
      .from('.hero-visual img', { x: 40, opacity: 0, scale: 0.98, duration: 1 }, '-=0.8');

    // Section headers reveal
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Stat cards stagger reveal
    gsap.from('.stat-card', {
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out'
    });

    // Logistics info items stagger reveal
    gsap.from('.info-item', {
      scrollTrigger: {
        trigger: '.info-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out'
    });

    // Day cards reveal
    gsap.utils.toArray('.day-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.05,
        ease: 'power3.out'
      });
    });

    // Dining note reveal
    gsap.from('.dining-note', {
      scrollTrigger: {
        trigger: '.dining-note',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Restaurant cards stagger reveal
    gsap.from('.restaurant-card', {
      scrollTrigger: {
        trigger: '.restaurant-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Packing items stagger reveal
    gsap.from('.packing-item', {
      scrollTrigger: {
        trigger: '.packing-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out'
    });

    // Footer reveal
    gsap.from('.footer-message', {
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Clickable element hover micro-interactions (GSAP)
    const clickables = document.querySelectorAll('.btn, .nav-link, .map-link, .btn-print, .menu-toggle, .logo-link');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { y: -2, duration: 0.2, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { y: 0, duration: 0.2, ease: 'power2.out' });
      });
    });
  }

  // ============================================================
  // Initialize
  // ============================================================

  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  initPrintButton();
  initAnimations();
});
