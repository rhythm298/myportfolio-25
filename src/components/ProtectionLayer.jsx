import { useEffect } from 'react'

/**
 * Copyright (c) 2025 Rhythm Mehta
 * All rights reserved.
 * 
 * This code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

function ProtectionLayer() {
  useEffect(() => {
    // Check if mobile device - disable protections on mobile for better UX
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 968
    
    if (isMobile) {
      // Skip all protections on mobile to allow normal touch/scroll interaction
      return
    }

    // Desktop-only protections
    // Disable right-click context menu
    const disableRightClick = (e) => {
      e.preventDefault()
      return false
    }

    // Disable common keyboard shortcuts
    const disableShortcuts = (e) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
        (e.ctrlKey && e.shiftKey && e.keyCode === 67) // Ctrl+Shift+C
      ) {
        e.preventDefault()
        return false
      }
    }

    // Disable text selection (desktop only)
    const disableSelection = () => {
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
      document.body.style.mozUserSelect = 'none'
      document.body.style.msUserSelect = 'none'
    }

    // Detect DevTools (desktop only)
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        // DevTools is likely open
        document.body.innerHTML = `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #0a0e27;
            color: #06b6d4;
            font-family: 'Space Mono', monospace;
            text-align: center;
            padding: 2rem;
          ">
            <div>
              <h1 style="font-size: 3rem; margin-bottom: 1rem;">⚠️</h1>
              <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Developer Tools Detected</h2>
              <p style="color: rgba(255, 255, 255, 0.7);">Please close DevTools to continue browsing.</p>
              <p style="color: rgba(255, 255, 255, 0.5); margin-top: 2rem; font-size: 0.875rem;">
                © 2025 Rhythm Mehta. All rights reserved.
              </p>
            </div>
          </div>
        `
      }
    }

    // Apply protections (desktop only)
    document.addEventListener('contextmenu', disableRightClick)
    document.addEventListener('keydown', disableShortcuts)
    disableSelection()

    // Check for DevTools periodically (desktop only)
    const devToolsInterval = setInterval(detectDevTools, 1000)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', disableRightClick)
      document.removeEventListener('keydown', disableShortcuts)
      clearInterval(devToolsInterval)
    }
  }, [])

  return null
}

export default ProtectionLayer
