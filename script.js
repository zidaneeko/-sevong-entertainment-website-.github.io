document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    window.addEventListener("load", function () {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  }

  // Header Scroll Effect
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (nav && nav.classList.contains("active")) {
          hamburger.classList.remove("active");
          nav.classList.remove("active");
        }
      }
    });
  });

  // Active Link Highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Services Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  if (tabBtns.length && tabPanes.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");

        // Update active tab button
        tabBtns.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        // Show corresponding tab pane
        tabPanes.forEach((pane) => pane.classList.remove("active"));
        document.getElementById(tabId).classList.add("active");
      });
    });
  }

  // Animate Stats Counter
  const statNumbers = document.querySelectorAll(".number");
  if (statNumbers.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statNumbers.forEach((number) => {
              const target = +number.getAttribute("data-count");
              const count = +number.innerText;
              const increment = target / 100;

              if (count < target) {
                number.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
              } else {
                number.innerText = target;
              }

              function updateCount() {
                const count = +number.innerText;
                const increment = target / 100;

                if (count < target) {
                  number.innerText = Math.ceil(count + increment);
                  setTimeout(updateCount, 10);
                } else {
                  number.innerText = target;
                }
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector(".about");
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  // Back to Top Button
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTop.style.opacity = "1";
        backToTop.style.visibility = "visible";
      } else {
        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
      }
    });
  }

  // Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = this.querySelector("#name").value;
      const email = this.querySelector("#email").value;
      const subject = this.querySelector("#subject").value;
      const message = this.querySelector("#message").value;

      // Here you would typically send the form data to a server
      console.log("Form submitted:", { name, email, subject, message });

      // Show success message
      alert("Thank you for your message! We will get back to you soon.");

      // Reset form
      this.reset();
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      // Here you would typically send the email to your newsletter service
      console.log("Newsletter subscription:", email);

      // Show success message
      alert("Thank you for subscribing to our newsletter!");

      // Reset form
      this.reset();
    });
  }

  // Video Placeholder Click
  const videoPlaceholder = document.querySelector(".video-placeholder");
  if (videoPlaceholder) {
    videoPlaceholder.addEventListener("click", function () {
      // In a real implementation, this would open a modal with the video
      alert("Video player would open here.");
    });
  }
});
