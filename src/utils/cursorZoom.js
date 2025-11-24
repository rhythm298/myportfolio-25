// Cursor-zoom functionality for project cards and images
export const initCursorZoom = () => {
  const zoomableElements = document.querySelectorAll('.project-card, .zoomable')
  
  zoomableElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      // Set transform origin based on cursor position
      el.style.transformOrigin = `${x}% ${y}%`
      
      // Apply zoom effect
      if (!el.classList.contains('zoomed')) {
        el.classList.add('zoomed')
      }
    })
    
    el.addEventListener('mouseleave', () => {
      el.classList.remove('zoomed')
      el.style.transformOrigin = 'center center'
    })
  })
}

// Parallax cursor effect for backgrounds
export const initParallaxCursor = () => {
  const parallaxElements = document.querySelectorAll('.parallax-layer')
  
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    
    const deltaX = (clientX - centerX) / centerX
    const deltaY = (clientY - centerY) / centerY
    
    parallaxElements.forEach((el, index) => {
      const depth = (index + 1) * 10
      const moveX = deltaX * depth
      const moveY = deltaY * depth
      
      el.style.transform = `translate(${moveX}px, ${moveY}px)`
    })
  })
}

// Initialize all cursor effects
export const initCursorEffects = () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (!prefersReducedMotion) {
    initCursorZoom()
    initParallaxCursor()
  }
}
