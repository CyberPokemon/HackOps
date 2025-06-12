document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const nav = document.querySelector("nav")
  
    if (mobileMenuBtn && nav) {
      mobileMenuBtn.addEventListener("click", () => {
        nav.classList.toggle("active")
        mobileMenuBtn.classList.toggle("active")
      })
    }
  
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
    const prevBtn = document.querySelector(".testimonial-prev")
    const nextBtn = document.querySelector(".testimonial-next")
  
    if (testimonialSlides.length > 0) {
      let currentSlide = 0
  
      function showSlide(index) {
        testimonialSlides.forEach((slide) => slide.classList.remove("active"))
        testimonialDots.forEach((dot) => dot.classList.remove("active"))
  
        testimonialSlides[index].classList.add("active")
        testimonialDots[index].classList.add("active")
        currentSlide = index
      }
  
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          let newIndex = currentSlide - 1
          if (newIndex < 0) newIndex = testimonialSlides.length - 1
          showSlide(newIndex)
        })
      }
  
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          let newIndex = currentSlide + 1
          if (newIndex >= testimonialSlides.length) newIndex = 0
          showSlide(newIndex)
        })
      }
  
      testimonialDots.forEach((dot) => {
        dot.addEventListener("click", function () {
          const index = Number.parseInt(this.dataset.index)
          showSlide(index)
        })
      })
  
      // Auto slide every 5 seconds
      setInterval(() => {
        let newIndex = currentSlide + 1
        if (newIndex >= testimonialSlides.length) newIndex = 0
        showSlide(newIndex)
      }, 5000)
    }
  
    // Animate stats when in viewport
    const statNumbers = document.querySelectorAll(".stat-number")
  
    if (statNumbers.length > 0) {
      const animateStats = () => {
        statNumbers.forEach((stat) => {
          const target = Number.parseInt(stat.dataset.target)
          const current = Number.parseInt(stat.textContent)
          const increment = target / 100
  
          if (current < target) {
            stat.textContent = Math.ceil(current + increment)
            setTimeout(animateStats, 20)
          } else {
            stat.textContent = target.toLocaleString()
          }
        })
      }
  
      const statsSection = document.querySelector(".stats")
  
      const checkIfInView = () => {
        if (statsSection) {
          const rect = statsSection.getBoundingClientRect()
          const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0
  
          if (isInViewport) {
            animateStats()
            window.removeEventListener("scroll", checkIfInView)
          }
        }
      }
  
      window.addEventListener("scroll", checkIfInView)
      checkIfInView() // Check on load
    }
  })
  