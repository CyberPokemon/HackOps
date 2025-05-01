document.addEventListener("DOMContentLoaded", () => {
    // Sidebar toggle
    const sidebarToggle = document.querySelector(".sidebar-toggle")
    const sidebar = document.querySelector(".sidebar")
  
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open")
      })
    }
  
    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (sidebar && sidebar.classList.contains("open") && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
        sidebar.classList.remove("open")
      }
    })
  
    // Dashboard tabs
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")
  
    if (tabButtons.length > 0 && tabContents.length > 0) {
      tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const tabId = this.dataset.tab
  
          // Update active tab
          tabButtons.forEach((btn) => btn.classList.remove("active"))
          this.classList.add("active")
  
          // Show corresponding content
          tabContents.forEach((content) => {
            content.classList.remove("active")
            if (content.id === `${tabId}-tab`) {
              content.classList.add("active")
            }
          })
        })
      })
    }
  
    // Water request form submission
    // const waterRequestForm = document.getElementById("water-request-form")
  
    // if (waterRequestForm) {
    //   waterRequestForm.addEventListener("submit", (e) => {
    //     e.preventDefault()
  
    //     // Get form data
    //     const formData = new FormData(waterRequestForm)
    //     const requestData = Object.fromEntries(formData.entries())
  
    //     console.log("Water request data:", requestData)
  
    //     // In a real app, you would send this data to your API
    //     // For demo purposes, we'll simulate a successful submission
    //     alert("Water request submitted successfully!")
    //   })
    // }
  
    // Settings tabs
    const settingsTabs = document.querySelectorAll(".settings-tab")
    const settingsPanels = document.querySelectorAll(".settings-panel")
  
    if (settingsTabs.length > 0 && settingsPanels.length > 0) {
      settingsTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          const tabId = this.dataset.tab
  
          // Update active tab
          settingsTabs.forEach((t) => t.classList.remove("active"))
          this.classList.add("active")
  
          // Show corresponding panel
          settingsPanels.forEach((panel) => {
            panel.classList.remove("active")
            if (panel.id === `${tabId}-panel`) {
              panel.classList.add("active")
            }
          })
        })
      })
    }
  
    // Save settings button
    const saveSettingsBtn = document.getElementById("save-settings")
  
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener("click", () => {
        // In a real app, you would collect and save all settings
        alert("Settings saved successfully!")
      })
    }
  
    // Calendar functionality
    function generateCalendar(containerId, year, month) {
      const container = document.getElementById(containerId)
      if (!container) return
  
      // Clear container
      container.innerHTML = ""
  
      // Get first day of month and number of days
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const daysInMonth = lastDay.getDate()
  
      // Get day of week for first day (0 = Sunday, 6 = Saturday)
      const startDay = firstDay.getDay()
  
      // Add day names
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      dayNames.forEach((day) => {
        const dayNameEl = document.createElement("div")
        dayNameEl.className = "calendar-day day-name"
        dayNameEl.textContent = day
        container.appendChild(dayNameEl)
      })
  
      // Add empty cells for days before first day of month
      for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement("div")
        emptyDay.className = "calendar-day empty"
        container.appendChild(emptyDay)
      }
  
      // Add days of month
      const today = new Date()
      const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month
  
      for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement("div")
        dayEl.className = "calendar-day"
        dayEl.textContent = day
  
        // Check if this day is today
        if (isCurrentMonth && day === today.getDate()) {
          dayEl.classList.add("today")
        }
  
        // Add event indicator for some days (demo)
        if ((day % 3 === 0 || day % 7 === 0) && day <= 28) {
          dayEl.classList.add("has-event")
        }
  
        // Make days clickable
        dayEl.addEventListener("click", function () {
          // Remove selected class from all days
          document.querySelectorAll(".calendar-day").forEach((d) => {
            d.classList.remove("selected")
          })
  
          // Add selected class to clicked day
          this.classList.add("selected")
  
          // Update selected date display if it exists
          const selectedDateEl = document.getElementById("selected-date")
          if (selectedDateEl) {
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]
            selectedDateEl.textContent = `Schedule for ${monthNames[month]} ${day}, ${year}`
          }
        })
  
        container.appendChild(dayEl)
      }
    }
  
    // Initialize calendars
    const calendars = [
      { id: "schedule-calendar", large: false },
      { id: "full-calendar", large: true },
    ]
  
    const currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth()
  
    calendars.forEach((calendar) => {
      if (document.getElementById(calendar.id)) {
        generateCalendar(calendar.id, currentYear, currentMonth)
  
        // Month navigation
        const prevMonthBtn = document.getElementById("prev-month")
        const nextMonthBtn = document.getElementById("next-month")
        const calendarMonthEl = document.getElementById("calendar-month")
  
        if (prevMonthBtn && nextMonthBtn && calendarMonthEl) {
          // Set initial month display
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]
          calendarMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`
  
          prevMonthBtn.addEventListener("click", () => {
            currentMonth--
            if (currentMonth < 0) {
              currentMonth = 11
              currentYear--
            }
  
            calendarMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`
            generateCalendar(calendar.id, currentYear, currentMonth)
          })
  
          nextMonthBtn.addEventListener("click", () => {
            currentMonth++
            if (currentMonth > 11) {
              currentMonth = 0
              currentYear++
            }
  
            calendarMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`
            generateCalendar(calendar.id, currentYear, currentMonth)
          })
        }
      }
    })
  
    // Notification bell dropdown
    const notificationBell = document.querySelector(".notification-bell")
  
    if (notificationBell) {
      // Create dropdown
      const dropdown = document.createElement("div")
      dropdown.className = "notification-dropdown"
      dropdown.style.display = "none"
      dropdown.style.position = "absolute"
      dropdown.style.top = "100%"
      dropdown.style.right = "0"
      dropdown.style.width = "300px"
      dropdown.style.backgroundColor = "white"
      dropdown.style.borderRadius = "var(--radius)"
      dropdown.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      dropdown.style.zIndex = "100"
      dropdown.style.marginTop = "0.5rem"
      dropdown.style.overflow = "hidden"
  
      // Add header
      const header = document.createElement("div")
      header.style.padding = "1rem"
      header.style.borderBottom = "1px solid var(--border)"
      header.style.display = "flex"
      header.style.justifyContent = "space-between"
      header.style.alignItems = "center"
  
      const title = document.createElement("h3")
      title.textContent = "Notifications"
      title.style.margin = "0"
      title.style.fontSize = "1rem"
  
      const markAllRead = document.createElement("button")
      markAllRead.textContent = "Mark all as read"
      markAllRead.style.background = "none"
      markAllRead.style.border = "none"
      markAllRead.style.color = "var(--primary)"
      markAllRead.style.fontSize = "0.75rem"
      markAllRead.style.cursor = "pointer"
  
      header.appendChild(title)
      header.appendChild(markAllRead)
      dropdown.appendChild(header)
  
      // Add notifications
      const notifications = [
        {
          title: "Schedule Update",
          message: "Your water supply schedule has been updated for next week.",
          time: "10 minutes ago",
          read: false,
        },
        {
          title: "Supply Reminder",
          message: "Water supply scheduled for tomorrow at 6:00 AM.",
          time: "1 hour ago",
          read: false,
        },
        {
          title: "Request Approved",
          message: "Your additional water request has been approved.",
          time: "2 days ago",
          read: true,
        },
      ]
  
      const notificationsList = document.createElement("div")
      notificationsList.style.maxHeight = "300px"
      notificationsList.style.overflowY = "auto"
  
      notifications.forEach((notification) => {
        const item = document.createElement("div")
        item.style.padding = "1rem"
        item.style.borderBottom = "1px solid var(--border)"
        item.style.cursor = "pointer"
        item.style.transition = "background-color 0.2s ease"
  
        if (!notification.read) {
          item.style.backgroundColor = "rgba(59, 130, 246, 0.05)"
        }
  
        item.addEventListener("mouseover", function () {
          this.style.backgroundColor = "var(--muted)"
        })
  
        item.addEventListener("mouseout", function () {
          if (!notification.read) {
            this.style.backgroundColor = "rgba(59, 130, 246, 0.05)"
          } else {
            this.style.backgroundColor = ""
          }
        })
  
        const itemTitle = document.createElement("h4")
        itemTitle.textContent = notification.title
        itemTitle.style.margin = "0 0 0.25rem 0"
        itemTitle.style.fontSize = "0.875rem"
  
        const itemMessage = document.createElement("p")
        itemMessage.textContent = notification.message
        itemMessage.style.margin = "0 0 0.5rem 0"
        itemMessage.style.fontSize = "0.75rem"
  
        const itemTime = document.createElement("span")
        itemTime.textContent = notification.time
        itemTime.style.fontSize = "0.75rem"
        itemTime.style.color = "var(--secondary)"
  
        item.appendChild(itemTitle)
        item.appendChild(itemMessage)
        item.appendChild(itemTime)
        notificationsList.appendChild(item)
      })
  
      dropdown.appendChild(notificationsList)
  
      // Add footer
      const footer = document.createElement("div")
      footer.style.padding = "0.75rem"
      footer.style.textAlign = "center"
      footer.style.borderTop = "1px solid var(--border)"
  
      const viewAllLink = document.createElement("a")
      viewAllLink.textContent = "View all notifications"
      viewAllLink.href = "#"
      viewAllLink.style.fontSize = "0.75rem"
      viewAllLink.style.color = "var(--primary)"
      viewAllLink.style.textDecoration = "none"
  
      footer.appendChild(viewAllLink)
      dropdown.appendChild(footer)
  
      // Add dropdown to notification bell
      notificationBell.style.position = "relative"
      notificationBell.appendChild(dropdown)
  
      // Toggle dropdown on click
      notificationBell.addEventListener("click", (e) => {
        e.stopPropagation()
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none"
      })
  
      // Close dropdown when clicking outside
      document.addEventListener("click", () => {
        dropdown.style.display = "none"
      })
    }
  
    // User dropdown
    const userDropdown = document.querySelector(".user-dropdown")
  
    if (userDropdown) {
      // Create dropdown
      const dropdown = document.createElement("div")
      dropdown.className = "user-menu-dropdown"
      dropdown.style.display = "none"
      dropdown.style.position = "absolute"
      dropdown.style.top = "100%"
      dropdown.style.right = "0"
      dropdown.style.width = "200px"
      dropdown.style.backgroundColor = "white"
      dropdown.style.borderRadius = "var(--radius)"
      dropdown.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      dropdown.style.zIndex = "100"
      dropdown.style.marginTop = "0.5rem"
      dropdown.style.overflow = "hidden"
  
      // Add menu items
      const menuItems = [
        { text: "Profile", icon: "user", href: "settings.html" },
        { text: "Settings", icon: "cog", href: "settings.html" },
        { text: "Help", icon: "question-circle", href: "#" },
        { text: "Log out", icon: "sign-out-alt", href: "index.html" },
      ]
  
      menuItems.forEach((item) => {
        const menuItem = document.createElement("a")
        menuItem.href = item.href
        menuItem.style.display = "flex"
        menuItem.style.alignItems = "center"
        menuItem.style.padding = "0.75rem 1rem"
        menuItem.style.color = "var(--foreground)"
        menuItem.style.textDecoration = "none"
        menuItem.style.transition = "background-color 0.2s ease"
  
        if (item.text === "Log out") {
          menuItem.style.borderTop = "1px solid var(--border)"
          menuItem.style.color = "var(--danger)"
        }
  
        menuItem.addEventListener("mouseover", function () {
          this.style.backgroundColor = "var(--muted)"
        })
  
        menuItem.addEventListener("mouseout", function () {
          this.style.backgroundColor = ""
        })
  
        const icon = document.createElement("i")
        icon.className = `fas fa-${item.icon}`
        icon.style.marginRight = "0.75rem"
        icon.style.width = "1rem"
        icon.style.textAlign = "center"
  
        const text = document.createElement("span")
        text.textContent = item.text
        text.style.fontSize = "0.875rem"
  
        menuItem.appendChild(icon)
        menuItem.appendChild(text)
        dropdown.appendChild(menuItem)
      })
  
      // Add dropdown to user dropdown
      userDropdown.style.position = "relative"
      userDropdown.appendChild(dropdown)
  
      // Toggle dropdown on click
      userDropdown.addEventListener("click", (e) => {
        e.stopPropagation()
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none"
      })
  
      // Close dropdown when clicking outside
      document.addEventListener("click", () => {
        dropdown.style.display = "none"
      })
    }
  })
  