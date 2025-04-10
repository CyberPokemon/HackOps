document.addEventListener("DOMContentLoaded", () => {
    // Auth tabs
    const authTabs = document.querySelectorAll(".auth-tab")
    const authTabContents = document.querySelectorAll(".auth-tab-content")
  
    if (authTabs.length > 0 && authTabContents.length > 0) {
      authTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          const tabId = this.dataset.tab
  
          // Update active tab
          authTabs.forEach((t) => t.classList.remove("active"))
          this.classList.add("active")
  
          // Show corresponding content
          authTabContents.forEach((content) => {
            content.classList.remove("active")
            if (content.id === `${tabId}-tab`) {
              content.classList.add("active")
            }
          })
        })
      })
    }
  
    // Register form submission
    // const registerForm = document.getElementById("register-form")
  
    // if (registerForm) {
    //   registerForm.addEventListener("submit", (e) => {
    //     e.preventDefault()
  
    //     // Get form data
    //     const formData = new FormData(registerForm)
    //     const userData = Object.fromEntries(formData.entries())
  
    //     console.log("Registration data:", userData)
  
    //     // In a real app, you would send this data to your API
    //     // For demo purposes, we'll simulate a successful registration
    //     alert("Registration successful! Redirecting to dashboard...")
  
    //     // Redirect to dashboard
    //     setTimeout(() => {
    //       window.location.href = "citizen-dashboard.html"
    //     }, 1000)
    //   })
    // }
  
    // Login form submission
    // const citizenLoginForm = document.getElementById("citizen-login-form")
    // const adminLoginForm = document.getElementById("admin-login-form")
  
    // if (citizenLoginForm) {
    //   citizenLoginForm.addEventListener("submit", (e) => {
    //     e.preventDefault()
  
    //     // Get form data
    //     const formData = new FormData(citizenLoginForm)
    //     const loginData = Object.fromEntries(formData.entries())
  
    //     console.log("Citizen login data:", loginData)
  
    //     // In a real app, you would authenticate with your API
    //     // For demo purposes, we'll simulate a successful login
    //     alert("Login successful! Redirecting to dashboard...")
  
    //     // Redirect to dashboard
    //     setTimeout(() => {
    //       window.location.href = "citizen-dashboard.html"
    //     }, 1000)
    //   })
    // }
  
    // if (adminLoginForm) {
    //   adminLoginForm.addEventListener("submit", (e) => {
    //     e.preventDefault()
  
    //     // Get form data
    //     const formData = new FormData(adminLoginForm)
    //     const loginData = Object.fromEntries(formData.entries())
  
    //     console.log("Admin login data:", loginData)
  
    //     // In a real app, you would authenticate with your API
    //     // For demo purposes, we'll simulate a successful login
    //     alert("Admin login successful! Redirecting to dashboard...")
  
    //     // Redirect to dashboard
    //     setTimeout(() => {
    //       window.location.href = "admin-dashboard.html"
    //     }, 1000)
    //   })
    // }
  
    // Password visibility toggle
    const passwordInputs = document.querySelectorAll('input[type="password"]')
  
    passwordInputs.forEach((input) => {
      const container = input.parentElement
  
      // Create toggle button
      const toggleBtn = document.createElement("button")
      toggleBtn.type = "button"
      toggleBtn.className = "password-toggle"
      toggleBtn.innerHTML = '<i class="fas fa-eye"></i>'
      toggleBtn.style.position = "absolute"
      toggleBtn.style.right = "10px"
      toggleBtn.style.top = "50%"
      toggleBtn.style.transform = "translateY(-50%)"
      toggleBtn.style.background = "none"
      toggleBtn.style.border = "none"
      toggleBtn.style.color = "#64748b"
      toggleBtn.style.cursor = "pointer"
  
      // Make container relative for positioning
      container.style.position = "relative"
  
      // Add toggle button to container
      container.appendChild(toggleBtn)
  
      // Toggle password visibility
      toggleBtn.addEventListener("click", function () {
        const type = input.getAttribute("type") === "password" ? "text" : "password"
        input.setAttribute("type", type)
  
        // Update icon
        this.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>'
      })
    })
  })
  