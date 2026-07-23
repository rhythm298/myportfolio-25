import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

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
    const numStars = 400
    const connectionDistance = 120
    const mouseConnectionDistance = 200

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    for (let i = 0; i < numStars; i++) {
      const xPosition = Math.random() < 0.60
        ? Math.random() * (canvas.width * 0.5)
        : Math.random() * (canvas.width * 0.5) + (canvas.width * 0.5)

      stars.push({
        x: xPosition,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5
      })
    }
    starsRef.current = stars

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star, i) => {
        star.x += star.vx
        star.y += star.vy

        if (star.x < 0 || star.x > canvas.width) star.vx *= -1
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

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

function CodeSimulator() {
  const [lines, setLines] = useState([
    { id: 1, code: 'const developer = {', color: '#ec4899', complete: false },
    { id: 2, code: '  name: "Rhythm Mehta",', color: '#10b981', complete: false },
    { id: 3, code: '  roles: ["Full Stack", "MERN", "AI/ML"],', color: '#10b981', complete: false },
    { id: 4, code: '  focus: "Scalable Web Apps",', color: '#10b981', complete: false },
    { id: 5, code: '  exploring: "Cybersecurity"', color: '#10b981', complete: false },
    { id: 6, code: '};', color: '#ec4899', complete: false },
    { id: 7, code: '', color: '#fff', complete: false },
    { id: 8, code: 'async function build() {', color: '#6366f1', complete: false },
    { id: 9, code: '  const stack = await loadMERN();', color: '#06b6d4', complete: false },
    { id: 10, code: '  return stack.deploy().scale();', color: '#06b6d4', complete: false },
    { id: 11, code: '}', color: '#6366f1', complete: false },
  ])
  const [activeLineIndex, setActiveLineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLineIndex((prev) => {
        if (prev < lines.length - 1) {
          return prev + 1
        }
        return 0
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
    <div className="code-simulator glass">
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

const ROLE_TAGS = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'AI & Automation Engineer',
  'Data Science Enthusiast',
  'Cybersecurity Explorer',
  'Freelance Developer',
]

function RoleTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROLE_TAGS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="role-ticker">
      <span className="role-prefix">{'>'}</span>
      <div className="role-viewport">
        {ROLE_TAGS.map((role, i) => (
          <span
            key={role}
            className={`role-tag ${i === currentIndex ? 'active' : ''}`}
          >
            {role}
          </span>
        ))}
      </div>
      <span className="role-cursor">_</span>
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
      gsap.from(heroRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 0.2
      })

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

      gsap.from('.role-ticker', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power3.out'
      })

      gsap.from('.hero-description', {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
        delay: 1.1
      })

      gsap.from('.cta-button', {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 1.3
      })

      gsap.from('.button-text', {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 1.5,
        ease: 'power2.out'
      })

      gsap.from('.button-arrow, .button-icon', {
        x: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 1.6,
        ease: 'power2.out'
      })

      gsap.from('.stat-item', {
        y: 80,
        opacity: 0,
        scale: 0.8,
        rotation: 5,
        duration: 1,
        stagger: 0.25,
        ease: 'back.out(1.7)',
        delay: 1.7
      })

      gsap.from('.scroll-indicator', {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 1.9
      })

      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })

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

      gsap.to('.hero-canvas canvas', {
        rotationY: 15,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2
        }
      })

      gsap.to('.hero-text', {
        y: -80,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      <ConstellationCanvas />
      <CodeSimulator />

      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-ring"></div>
        <div className="cursor-dot"></div>
      </div>

      <div className="hero-content container">
        <div className="hero-text">
          <div className="hero-title" ref={titleRef}>
            <div className="hero-title-line">
              <span className="hero-bracket">{'<'}</span>
              <span className="hero-word">Full</span>
            </div>
            <div className="hero-title-line">
              <span className="hero-word gradient">STACK</span>
              <span className="hero-bracket">{'/>'}</span>
            </div>
          </div>

          <p className="hero-subtitle" ref={subtitleRef}>
            <span className="typing-text">Full Stack Developer | MERN Stack | AI & Automation<br/>Data Science | Cybersecurity | Freelancing</span>
          </p>

          <RoleTicker />

          <p className="hero-description">
            I build scalable web applications and intelligent systems that solve real-world problems.
            From MERN-stack production apps to AI-driven automation, I turn ideas into polished,
            high-performance digital experiences.
          </p>

          <div className="hero-cta">
            <button className="cta-button primary" onClick={() => scrollToSection('projects')}>
              <span className="button-text">Explore Projects</span>
              <span className="button-arrow">→</span>
            </button>
            <button className="cta-button secondary" onClick={() => scrollToSection('contact')}>
              <span className="button-text">Get In Touch</span>
              <span className="button-icon">✉</span>
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item glass-card">
            <div className="stat-number">15+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item glass-card">
            <div className="stat-number">5+</div>
            <div className="stat-label">Domains</div>
          </div>
          <div className="stat-item glass-card">
            <div className="stat-number">1+</div>
            <div className="stat-label">Internship</div>
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
