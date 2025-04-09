document.addEventListener("DOMContentLoaded", () => {
    // Preview chart animation
    const previewChart = document.getElementById("preview-chart")
  
    if (previewChart) {
      const ctx = previewChart.getContext("2d")
      let width = (previewChart.width = previewChart.parentElement.offsetWidth)
      const height = (previewChart.height = 200)
  
      // Sample data
      const data = [
        { month: "Jan", north: 400, south: 300, east: 200, west: 350, central: 250 },
        { month: "Feb", north: 450, south: 320, east: 240, west: 380, central: 260 },
        { month: "Mar", north: 420, south: 350, east: 260, west: 400, central: 280 },
        { month: "Apr", north: 480, south: 380, east: 280, west: 420, central: 300 },
        { month: "May", north: 500, south: 400, east: 300, west: 450, central: 320 },
        { month: "Jun", north: 520, south: 420, east: 320, west: 470, central: 340 },
      ]
  
      // Colors
      const colors = {
        north: "#3b82f6",
        south: "#10b981",
        east: "#f59e0b",
        west: "#ef4444",
        central: "#8b5cf6",
      }
  
      // Chart dimensions
      const padding = 40
      const chartWidth = width - padding * 2
      const chartHeight = height - padding * 2
  
      // Find max value for scaling
      const maxValue = Math.max(...data.flatMap((d) => [d.north, d.south, d.east, d.west, d.central]))
  
      // Animation variables
      let animationProgress = 0
      const animationDuration = 60 // frames
  
      function drawChart() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height)
  
        // Draw axes
        ctx.beginPath()
        ctx.moveTo(padding, padding)
        ctx.lineTo(padding, height - padding)
        ctx.lineTo(width - padding, height - padding)
        ctx.strokeStyle = "#e2e8f0"
        ctx.lineWidth = 2
        ctx.stroke()
  
        // Draw horizontal grid lines
        const gridLines = 5
        ctx.textAlign = "right"
        ctx.textBaseline = "middle"
        ctx.font = "10px Arial"
        ctx.fillStyle = "#64748b"
  
        for (let i = 0; i <= gridLines; i++) {
          const y = padding + (chartHeight / gridLines) * i
          const value = Math.round(maxValue - (maxValue / gridLines) * i)
  
          ctx.beginPath()
          ctx.moveTo(padding, y)
          ctx.lineTo(width - padding, y)
          ctx.strokeStyle = "#e2e8f0"
          ctx.lineWidth = 1
          ctx.stroke()
  
          ctx.fillText(value, padding - 5, y)
        }
  
        // Draw x-axis labels
        const barWidth = chartWidth / data.length / 5 // 5 zones
        const groupWidth = barWidth * 5 + 10 // 5 bars + gap
  
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
  
        data.forEach((item, i) => {
          const x = padding + i * groupWidth + groupWidth / 2
          ctx.fillText(item.month, x, height - padding + 10)
        })
  
        // Draw bars with animation
        data.forEach((item, i) => {
          const zones = ["north", "south", "east", "west", "central"]
  
          zones.forEach((zone, j) => {
            const value = item[zone]
            const x = padding + i * groupWidth + j * barWidth
            const barHeight = (value / maxValue) * chartHeight * (animationProgress / animationDuration)
            const y = height - padding - barHeight
  
            ctx.fillStyle = colors[zone]
            ctx.fillRect(x, y, barWidth - 2, barHeight)
          })
        })
  
        // Update animation
        if (animationProgress < animationDuration) {
          animationProgress++
          requestAnimationFrame(drawChart)
        }
      }
  
      // Start chart animation
      drawChart()
  
      // Redraw on window resize
      window.addEventListener("resize", () => {
        previewChart.width = previewChart.parentElement.offsetWidth
        width = previewChart.width
        animationProgress = 0
        drawChart()
      })
    }
  
    // Dynamic water drops animation
    function createWaterDrop() {
      const drop = document.createElement("div")
      drop.className = "water-drop dynamic"
  
      // Random position
      const left = Math.random() * 80 + 10 // 10% to 90%
      drop.style.left = `${left}%`
      drop.style.top = "-30px"
  
      // Random size
      const size = Math.random() * 20 + 10 // 10px to 30px
      drop.style.width = `${size}px`
      drop.style.height = `${size}px`
  
      // Random animation duration
      const duration = Math.random() * 2 + 2 // 2s to 4s
      drop.style.animation = `dynamicDrop ${duration}s linear forwards`
  
      // Random opacity
      const opacity = Math.random() * 0.3 + 0.1 // 0.1 to 0.4
      drop.style.backgroundColor = `rgba(59, 130, 246, ${opacity})`
  
      // Add to container
      const container = document.querySelector(".water-animation-container")
      if (container) {
        container.appendChild(drop)
  
        // Remove after animation completes
        setTimeout(() => {
          drop.remove()
        }, duration * 1000)
      }
    }
  
    // Create water drops periodically
    if (document.querySelector(".water-animation-container")) {
      setInterval(createWaterDrop, 500)
  
      // Add CSS for dynamic drops
      const style = document.createElement("style")
      style.textContent = `
              .water-drop.dynamic {
                  position: absolute;
                  border-radius: 50% 50% 50% 0;
                  transform: rotate(-45deg);
                  z-index: 1;
              }
              
              @keyframes dynamicDrop {
                  0% {
                      transform: rotate(-45deg) translateY(0) scale(1);
                      opacity: 0;
                  }
                  20% {
                      opacity: 1;
                  }
                  80% {
                      opacity: 1;
                  }
                  100% {
                      transform: rotate(-45deg) translateY(400px) scale(0);
                      opacity: 0;
                  }
              }
          `
      document.head.appendChild(style)
    }
  })
  