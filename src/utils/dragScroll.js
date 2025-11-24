// Drag-to-scroll functionality for horizontal scrollable elements
export const initDragScroll = (selector = '.tech-rail') => {
  const scrollContainers = document.querySelectorAll(selector)
  
  scrollContainers.forEach(container => {
    let isDown = false
    let startX
    let scrollLeft
    
    container.addEventListener('mousedown', (e) => {
      isDown = true
      container.style.cursor = 'grabbing'
      container.style.userSelect = 'none'
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
    })
    
    container.addEventListener('mouseleave', () => {
      isDown = false
      container.style.cursor = 'grab'
    })
    
    container.addEventListener('mouseup', () => {
      isDown = false
      container.style.cursor = 'grab'
    })
    
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 2 // Scroll speed multiplier
      container.scrollLeft = scrollLeft - walk
    })
    
    // Add grab cursor
    container.style.cursor = 'grab'
  })
}

// Initialize on page load
export const initInteractiveElements = () => {
  // Initialize drag scroll
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      initDragScroll('.tech-rail')
      initDragScroll('.projects-grid')
    })
  }
}
