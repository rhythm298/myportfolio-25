import { useEffect, useRef, useState } from 'react'
import './SignatureIntro.css'

function SignatureIntro({ onComplete }) {
  const containerRef = useRef()
  const signatureRef = useRef()
  const [animationComplete, setAnimationComplete] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollAccumulator = useRef(0)

  useEffect(() => {
    const name = "Rhythm Mehta"
    const container = signatureRef.current
    
    if (!container) return

    container.innerHTML = ''

    let currentDelay = 0
    const letterDuration = 0.3 // Slightly slower for more elegance

    // Using spread operator like the original code
    ;[...name].forEach((char, index) => {
      const span = document.createElement('span')
      
      if (char === ' ') {
        span.className = 'space'
        currentDelay += 0.1
      } else {
        span.textContent = char
        span.className = 'letter'
        
        // Z-Index Stacking:
        // Increasing z-index ensures the new letter draws "over" 
        // the tail of the previous one, hiding the seam.
        span.style.zIndex = index

        span.style.animationDelay = `${currentDelay}s`
        span.style.animationDuration = `${letterDuration}s`
        
        // Smooth overlap timing
        currentDelay += (letterDuration - 0.1)
      }
      
      container.appendChild(span)
    })

    // Calculate total animation time
    const totalDuration = (currentDelay + letterDuration) * 1000
    
    setTimeout(() => {
      setAnimationComplete(true)
    }, totalDuration + 500)

  }, [])

  useEffect(() => {
    if (!animationComplete) return

    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 968
    
    // Touch/Swipe handling for mobile
    let touchStartY = 0
    let touchEndY = 0
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    
    const handleTouchMove = (e) => {
      touchEndY = e.touches[0].clientY
    }
    
    const handleTouchEnd = () => {
      const swipeDistance = touchStartY - touchEndY
      
      // Detect swipe up (scroll down gesture) - small threshold for mobile
      if (swipeDistance > 30) {
        // Quick zoom transition on swipe
        if (signatureRef.current) {
          signatureRef.current.style.transform = 'scale(16)'
          signatureRef.current.style.opacity = '0'
          signatureRef.current.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out'
        }
        
        setTimeout(() => {
          onComplete()
        }, 500)
      }
    }

    const handleWheel = (e) => {
      e.preventDefault()
      
      // Accumulate scroll delta
      scrollAccumulator.current += Math.abs(e.deltaY)
      
      // Map scroll to zoom (0 to 100%) - smooth progression
      const progress = Math.min(scrollAccumulator.current / 1500, 1)
      setScrollProgress(progress)
      
      // Apply smooth zoom transform
      if (signatureRef.current) {
        const scale = 1 + (progress * 15) // Zoom from 1x to 16x
        const opacity = 1 - (progress * 0.8) // Fade out smoothly
        signatureRef.current.style.transform = `scale(${scale})`
        signatureRef.current.style.opacity = opacity
        signatureRef.current.style.transition = 'transform 0.15s ease-out, opacity 0.15s ease-out'
      }
      
      // Complete transition when fully zoomed
      if (progress >= 1) {
        onComplete()
        window.removeEventListener('wheel', handleWheel)
      }
    }

    if (isMobile) {
      // Mobile: Use touch events
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
    } else {
      // Desktop: Use wheel event
      window.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [animationComplete, onComplete])

  return (
    <div ref={containerRef} className="signature-intro-container">
      <div ref={signatureRef} className="signature-content">
        {/* Letters injected by JavaScript */}
      </div>

      {animationComplete && scrollProgress < 0.1 && (
        <div 
          className="scroll-hint-signature"
          onClick={() => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 968
            if (isMobile && signatureRef.current) {
              signatureRef.current.style.transform = 'scale(16)'
              signatureRef.current.style.opacity = '0'
              signatureRef.current.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out'
              setTimeout(() => onComplete(), 500)
            }
          }}
          style={{ cursor: window.innerWidth < 968 ? 'pointer' : 'default' }}
        >
          <div className="scroll-arrow">↓</div>
          <span className="hint-text">{window.innerWidth < 968 ? 'Swipe or Tap' : 'Scroll Down'}</span>
        </div>
      )}
    </div>
  )
}

export default SignatureIntro
