document.addEventListener("DOMContentLoaded", () => {
    // Interactive water drop logo
    function drawLogo(canvasId) {
      const canvas = document.getElementById(canvasId)
      if (!canvas) return
  
      const ctx = canvas.getContext("2d")
      const width = canvas.width
      const height = canvas.height
  
      // Clear canvas
      ctx.clearRect(0, 0, width, height)
  
      // Draw water drop
      function drawWaterDrop() {
        const centerX = width / 2
        const centerY = height / 2
        const size = Math.min(width, height) * 0.8
  
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, "#60a5fa")
        gradient.addColorStop(1, "#3b82f6")
  
        // Draw drop shape
        ctx.beginPath()
        ctx.moveTo(centerX, centerY - size / 3)
        ctx.bezierCurveTo(
          centerX + size / 3,
          centerY - size / 3,
          centerX + size / 2,
          centerY,
          centerX,
          centerY + size / 3,
        )
        ctx.bezierCurveTo(
          centerX - size / 2,
          centerY,
          centerX - size / 3,
          centerY - size / 3,
          centerX,
          centerY - size / 3,
        )
        ctx.fillStyle = gradient
        ctx.fill()
  
        // Add highlight
        ctx.beginPath()
        ctx.arc(centerX - size / 6, centerY - size / 6, size / 10, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fill()
      }
  
      // Draw ripples
      const ripples = []
      const maxRipples = 3
  
      function addRipple() {
        if (ripples.length < maxRipples) {
          ripples.push({
            radius: 0,
            maxRadius: Math.min(width, height) * 0.4,
            alpha: 0.6,
          })
        }
      }
  
      function drawRipples() {
        ripples.forEach((ripple, index) => {
          ctx.beginPath()
          ctx.arc(width / 2, height / 2, ripple.radius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(59, 130, 246, ${ripple.alpha})`
          ctx.lineWidth = 2
          ctx.stroke()
  
          // Update ripple
          ripple.radius += 0.5
          ripple.alpha -= 0.01
  
          // Remove ripple if it's too big or transparent
          if (ripple.radius > ripple.maxRadius || ripple.alpha <= 0) {
            ripples.splice(index, 1)
          }
        })
      }
  
      // Animation loop
      let animationId
      let lastRippleTime = 0
  
      function animate(timestamp) {
        ctx.clearRect(0, 0, width, height)
        drawWaterDrop()
        drawRipples()
  
        // Add new ripple every 2 seconds
        if (timestamp - lastRippleTime > 2000) {
          addRipple()
          lastRippleTime = timestamp
        }
  
        animationId = requestAnimationFrame(animate)
      }
  
      // Start animation
      animate(0)
  
      // Make logo interactive
      canvas.addEventListener("mouseover", () => {
        addRipple()
      })
  
      // Clean up animation when needed
      return function cleanup() {
        cancelAnimationFrame(animationId)
      }
    }
  
    // Initialize all logos
    const logoCanvases = ["logo-canvas", "footer-logo-canvas", "sidebar-logo"]
    logoCanvases.forEach((canvasId) => {
      drawLogo(canvasId)
    })
  })
  