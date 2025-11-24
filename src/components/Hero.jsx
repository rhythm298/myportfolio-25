import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

// Constellation Connect - Interactive Stars
function ConstellationCanvas() {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const stars = []
    const numStars = 150
    const connectionDistance = 150
    const mouseConnectionDistance = 200

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5
      })
    }
    starsRef.current = stars

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw stars
      stars.forEach((star, i) => {
        // Move stars
        star.x += star.vx
        star.y += star.vy

        // Bounce off edges
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Draw connections between nearby stars
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[j].x - star.x
          const dy = stars[j].y - star.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(star.x, star.y)
            ctx.lineTo(stars[j].x, stars[j].y)
            const opacity = (1 - distance / connectionDistance) * 0.3
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // Draw connections to mouse
        const mouseDx = mouseRef.current.x - star.x
        const mouseDy = mouseRef.current.y - star.y
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)

        if (mouseDistance < mouseConnectionDistance) {
          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          const opacity = (1 - mouseDistance / mouseConnectionDistance) * 0.4
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="constellation-canvas" />
}

// Code Editor Simulator Component
function CodeSimulator() {
  const [lines, setLines] = useState([
    { id: 1, code: 'const developer = {', color: '#ec4899', complete: false },
    { id: 2, code: '  name: "Rhythm Mehta",', color: '#10b981', complete: false },
    { id: 3, code: '  role: "AI Automation Engineer",', color: '#10b981', complete: false },
    { id: 4, code: '  skills: ["React", "AI/ML", "Automation"],', color: '#10b981', complete: false },
    { id: 5, code: '  passion: "Building the future"', color: '#10b981', complete: false },
    { id: 6, code: '};', color: '#ec4899', complete: false },
    { id: 7, code: '', color: '#fff', complete: false },
    { id: 8, code: 'async function innovate() {', color: '#6366f1', complete: false },
    { id: 9, code: '  const ideas = await fetchInspiration();', color: '#06b6d4', complete: false },
    { id: 10, code: '  return ideas.map(build).filter(perfect);', color: '#06b6d4', complete: false },
    { id: 11, code: '}', color: '#6366f1', complete: false },
  ])
  const [activeLineIndex, setActiveLineIndex] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLineIndex((prev) => {
        if (prev < lines.length - 1) {
          return prev + 1
        }
        return 0 // Loop back
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [lines.length])

  useEffect(() => {
    setLines((prev) =>
      prev.map((line, idx) => ({
        ...line,
        complete: idx <= activeLineIndex,
      }))
    )
  }, [activeLineIndex])

  return (
    <div className="code-simulator">
      <div className="code-header">
        <div className="code-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="code-title">portfolio.js</div>
      </div>
      <div className="code-content">
        {lines.map((line, idx) => (
          <div
            key={line.id}
            className={`code-line ${idx === activeLineIndex ? 'active' : ''} ${
              line.complete ? 'complete' : ''
            }`}
            style={{ color: line.color }}
          >
            <span className="line-number">{line.id}</span>
            <span className="line-code">
              {line.code}
              {idx === activeLineIndex && <span className="typing-cursor">|</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const cursorRef = useRef()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return
      
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero section background - immediate on page load
      gsap.from(heroRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 0.2
      })

      // Title animation with rotation and scale - immediate on page load
      gsap.from('.hero-title-line', {
        y: 120,
        opacity: 0,
        rotationX: -90,
        transformOrigin: 'top center',
        duration: 1.2,
        stagger: 0.25,
        ease: 'back.out(1.7)',
        delay: 0.3
      })

      // Animate individual words in title
      gsap.from('.hero-bracket', {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.8)',
        delay: 0.5
      })

      gsap.from('.hero-word', {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.6
      })

      // Subtitle with clip-path reveal
      gsap.from('.hero-subtitle', {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        opacity: 0,
        duration: 1.5,
        ease: 'power3.inOut',
        delay: 0.8
      })

      gsap.to('.hero-subtitle', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.5,
        ease: 'power3.inOut',
        delay: 0.8
      })

      // Description with fade and slide
      gsap.from('.hero-description', {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
        delay: 1
      })

      // CTA buttons with bounce
      gsap.from('.cta-button', {
        y: 100,
        opacity: 0,
        scale: 0.5,
        rotation: -10,
        duration: 1,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.6)',
        delay: 1.2
      })

      // Animate button text and icons separately
      gsap.from('.button-text', {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 1.4,
        ease: 'power2.out'
      })

      gsap.from('.button-arrow, .button-icon', {
        x: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 1.5,
        ease: 'power2.out'
      })

      // Stats with counter animation
      gsap.from('.stat-item', {
        y: 80,
        opacity: 0,
        scale: 0.8,
        rotation: 5,
        duration: 1,
        stagger: 0.25,
        ease: 'back.out(1.7)',
        delay: 1.6
      })

      // Scroll indicator animation
      gsap.from('.scroll-indicator', {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 1.8
      })

      // Continuous floating animation for scroll indicator
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })

      // Parallax effect on canvas
      gsap.to('.hero-canvas', {
        y: 150,
        scale: 1.1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Rotate canvas slightly on scroll
      gsap.to('.hero-canvas canvas', {
        rotationY: 15,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      {/* Constellation Connect Canvas */}
      <ConstellationCanvas />
      
      {/* Code Editor Simulator Background */}
      <CodeSimulator />
      
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-ring"></div>
        <div className="cursor-dot"></div>
      </div>

      <div className="hero-content container">
        <div className="hero-text">
          <div className="hero-title" ref={titleRef}>
            <div className="hero-title-line">
              <span className="hero-bracket">{'<'}</span>
              <span className="hero-word">AI/ML</span>
            </div>
            <div className="hero-title-line">
              <span className="hero-word gradient">ENGINEER</span>
            </div>
            <div className="hero-title-line">
              <span className="hero-bracket">{'/>'}</span>
            </div>
          </div>

          <p className="hero-subtitle" ref={subtitleRef}>
            <span className="typing-text">Full Stack Developer | AI/ML Engineer<br/>Automation Specialist</span>
          </p>

          <p className="hero-description">
            Building intelligent systems that automate the future.
            Crafting AI-powered solutions with cutting-edge machine learning.
          </p>

          <div className="hero-cta">
            <button className="cta-button primary" onClick={() => scrollToSection('projects')}>
              <span className="button-text">Explore Projects</span>
              <span className="button-arrow">→</span>
            </button>
            <button className="cta-button secondary" onClick={() => scrollToSection('contact')}>
              <span className="button-text">Contact Me</span>
              <span className="button-icon">✉</span>
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number" data-target="50">20 + </div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-target="5">3 + </div>
            <div className="stat-label">Years</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-target="100">10 + </div>
            <div className="stat-label">Clients</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <p>Scroll to explore</p>
      </div>
    </section>
  )
}

export default Hero
