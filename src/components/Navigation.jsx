import { useEffect, useState } from 'react'
import './Navigation.css'

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadText, setDownloadText] = useState('Resume')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadResume = () => {
    if (isDownloading) return
    
    setIsDownloading(true)
    
    // Animation sequence
    const messages = [
      'Crafting Resume',
      'Compiling Skills',
      'Adding Projects',
      'Almost Ready',
      'Downloading'
    ]
    
    let index = 0
    const interval = setInterval(() => {
      if (index < messages.length) {
        setDownloadText(messages[index])
        index++
      } else {
        clearInterval(interval)
        
        // Trigger download
        const link = document.createElement('a')
        link.href = '/resume.pdf' // Place your resume.pdf in the public folder
        link.download = 'Rhythm_Mehta_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Reset after download
        setTimeout(() => {
          setDownloadText('Resume')
          setIsDownloading(false)
        }, 1000)
      }
    }, 600) // Change text every 600ms
  }

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-bracket">{'<'}</span>
          <span className="logo-text">RM</span>
          <span className="logo-bracket">{'/>'}</span>
        </div>

        <ul className="nav-menu">
          <li onClick={() => scrollToSection('hero')}>
            <span className="nav-number">01</span>
            <span className="nav-text">HOME</span>
          </li>
          <li onClick={() => scrollToSection('about')}>
            <span className="nav-number">02</span>
            <span className="nav-text">ABOUT</span>
          </li>
          <li onClick={() => scrollToSection('skills')}>
            <span className="nav-number">03</span>
            <span className="nav-text">SKILLS</span>
          </li>
          <li onClick={() => scrollToSection('projects')}>
            <span className="nav-number">04</span>
            <span className="nav-text">PROJECTS</span>
          </li>
          <li onClick={() => scrollToSection('contact')}>
            <span className="nav-number">05</span>
            <span className="nav-text">CONTACT</span>
          </li>
        </ul>

        <button 
          className={`space-button ${isDownloading ? 'downloading' : ''}`} 
          onClick={handleDownloadResume}
          disabled={isDownloading}
        >
          <span className="button-content">
            <span className="button-icon">🚀</span>
            <span className="button-text">{downloadText}</span>
          </span>
          <span className="button-glow"></span>
          {isDownloading && (
            <span className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navigation
