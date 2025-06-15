// LuxVision Photography - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Navbar scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          header.classList.add('header-scrolled');
      } else {
          header.classList.remove('header-scrolled');
      }
  });

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function() {
          navMenu.classList.toggle('active');
          this.classList.toggle('active');
      });
  }

  // Hero slider
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  function showSlide(index) {
      heroSlides.forEach(slide => slide.classList.remove('active'));
      heroSlides[index].classList.add('active');
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(currentSlide);
  }

  if (heroSlides.length > 0) {
      showSlide(0);
      setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  // Portfolio filter
  const filterItems = document.querySelectorAll('.filter-item');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterItems.forEach(item => {
      item.addEventListener('click', function() {
          // Remove active class from all filter items
          filterItems.forEach(filter => filter.classList.remove('active'));

          // Add active class to clicked filter
          this.classList.add('active');

          const filterValue = this.getAttribute('data-filter');

          // Show/hide portfolio items based on filter
          portfolioItems.forEach(portfolioItem => {
              if (filterValue === 'all' || portfolioItem.classList.contains(filterValue)) {
                  portfolioItem.style.display = 'block';
              } else {
                  portfolioItem.style.display = 'none';
              }
          });
      });
  });

  // Portfolio lightbox
  const portfolioImages = document.querySelectorAll('.portfolio-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let currentLightboxIndex = 0;
  const lightboxImageSrcs = [];

  portfolioImages.forEach((item, index) => {
      const imgElement = item.querySelector('.portfolio-img');
      if (imgElement) {
          const imgSrc = imgElement.getAttribute('src');
          lightboxImageSrcs.push(imgSrc);

          item.addEventListener('click', function() {
              currentLightboxIndex = index;
              showLightboxImage(currentLightboxIndex);
              lightbox.classList.add('active');
          });
      }
  });

  function showLightboxImage(index) {
      if (lightboxImageSrcs[index]) {
          lightboxImg.setAttribute('src', lightboxImageSrcs[index]);
      }
  }

  if (lightboxClose) {
      lightboxClose.addEventListener('click', function() {
          lightbox.classList.remove('active');
      });
  }

  if (lightboxPrev) {
      lightboxPrev.addEventListener('click', function() {
          currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImageSrcs.length) % lightboxImageSrcs.length;
          showLightboxImage(currentLightboxIndex);
      });
  }

  if (lightboxNext) {
      lightboxNext.addEventListener('click', function() {
          currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImageSrcs.length;
          showLightboxImage(currentLightboxIndex);
      });
  }

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
          lightbox.classList.remove('active');
      }
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
          lightbox.classList.remove('active');
      }
  });

  // Contact form validation
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();

          // Basic validation
          let valid = true;
          const name = contactForm.querySelector('input[name="name"]');
          const email = contactForm.querySelector('input[name="email"]');
          const message = contactForm.querySelector('textarea[name="message"]');

          if (!name.value.trim()) {
              valid = false;
              name.classList.add('error');
              name.style.borderColor = '#e74c3c';
          } else {
              name.classList.remove('error');
              name.style.borderColor = '#ddd';
          }

          if (!email.value.trim() || !isValidEmail(email.value)) {
              valid = false;
              email.classList.add('error');
              email.style.borderColor = '#e74c3c';
          } else {
              email.classList.remove('error');
              email.style.borderColor = '#ddd';
          }

          if (!message.value.trim()) {
              valid = false;
              message.classList.add('error');
              message.style.borderColor = '#e74c3c';
          } else {
              message.classList.remove('error');
              message.style.borderColor = '#ddd';
          }

          if (valid) {
              // In a real implementation, you would send the form data to a server
              // For now, just show a success message
              const successMessage = document.createElement('div');
              successMessage.className = 'success-message';
              successMessage.style.cssText = `
                  background-color: #2ecc71;
                  color: white;
                  padding: 15px;
                  border-radius: 5px;
                  margin-top: 20px;
                  text-align: center;
              `;
              successMessage.textContent = 'Thank you for your message! We will get back to you soon.';

              contactForm.appendChild(successMessage);

              // Clear form fields
              name.value = '';
              email.value = '';
              contactForm.querySelector('input[name="subject"]').value = '';
              message.value = '';

              // Remove success message after 5 seconds
              setTimeout(() => {
                  if (successMessage.parentNode) {
                      successMessage.remove();
                  }
              }, 5000);
          }
      });
  }

  function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();

          const targetId = this.getAttribute('href');
          if (targetId === '#') return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const headerHeight = document.querySelector('header').offsetHeight;
              const targetPosition = targetElement.offsetTop - headerHeight;

              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });

              // Close mobile menu if open
              if (navMenu && navMenu.classList.contains('active')) {
                  navMenu.classList.remove('active');
                  if (mobileNavToggle) {
                      mobileNavToggle.classList.remove('active');
                  }
              }
          }
      });
  });

  // Add loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
      img.addEventListener('load', function() {
          this.style.opacity = '1';
      });

      img.addEventListener('error', function() {
          // If image fails to load, show a placeholder or hide the element
          this.style.display = 'none';
      });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, observerOptions);

  // Observe service items and portfolio items for scroll animations
  document.querySelectorAll('.service-item, .portfolio-item').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
  });

  // Update active navigation link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              navLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${sectionId}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }

  window.addEventListener('scroll', updateActiveNavLink);
});
