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

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [animationComplete, onComplete])

  return (
    <div ref={containerRef} className="signature-intro-container">
      <div ref={signatureRef} className="signature-content">
        {/* Letters injected by JavaScript */}
      </div>

      {animationComplete && scrollProgress < 0.1 && (
        <div className="scroll-hint-signature">
          <div className="scroll-arrow">↓</div>
          <span className="hint-text">Scroll Down</span>
        </div>
      )}
    </div>
  )
}

export default SignatureIntro
