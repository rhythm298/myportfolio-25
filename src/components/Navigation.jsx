import { useEffect, useState } from 'react'
import './Navigation.css'

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const navItems = [
    { id: 'hero', number: '01', label: 'HOME' },
    { id: 'about', number: '02', label: 'ABOUT' },
    { id: 'skills', number: '03', label: 'SKILLS' },
    { id: 'projects', number: '04', label: 'PROJECTS' },
    { id: 'contact', number: '05', label: 'CONTACT' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setScrollProgress(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    )

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-progress-bar" style={{ width: `${scrollProgress * 100}%` }} />
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('hero')}>
            <span className="logo-bracket">{'<'}</span>
            <span className="logo-text">RM</span>
            <span className="logo-bracket">{'/>'}</span>
          </div>

          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li
                key={item.id}
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="nav-number">{item.number}</span>
                <span className="nav-text">{item.label}</span>
              </li>
            ))}
          </ul>

          <button
            className={`nav-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navigation
