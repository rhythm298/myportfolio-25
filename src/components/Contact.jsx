import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

function Satellite() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 1.5]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 1.5]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function Contact() {
  const contactRef = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    // Ensure all form elements are visible on mount
    const form = document.getElementById('contactForm')
    if (form) {
      const inputs = form.querySelectorAll('input, textarea, button')
      inputs.forEach(el => {
        el.style.display = ''
        el.style.opacity = '1'
        el.style.visibility = 'visible'
        el.removeAttribute('aria-hidden')
      })
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.from(contactRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      // Title with 3D rotation
      gsap.from('.contact-title', {
        x: -150,
        opacity: 0,
        rotationY: -90,
        transformOrigin: 'left center',
        duration: 1.3,
        ease: 'back.out(1.7)',
        immediateRender: false,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.contact-title .title-number', {
        scale: 0,
        rotation: -720,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        immediateRender: false,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.contact-title .title-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power3.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Contact intro with clip-path reveal
      gsap.from('.contact-intro', {
        y: 40,
        opacity: 0,
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        duration: 1.2,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.to('.contact-intro', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Form groups with stagger
      gsap.from('.form-group', {
        x: -80,
        opacity: 0,
        scale: 0.95,
        rotationY: -15,
        transformOrigin: 'left center',
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.5)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Labels animation
      gsap.from('.form-group label', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Label brackets
      gsap.from('.label-bracket', {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        delay: 0.5,
        ease: 'elastic.out(1, 0.9)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Input fields
      gsap.from('.form-group input, .form-group textarea', {
        y: 20,
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.6,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Submit button with bounce
      gsap.from('.submit-button', {
        y: 50,
        scale: 0,
        opacity: 0,
        rotation: -10,
        duration: 1.2,
        delay: 1,
        ease: 'elastic.out(1, 0.6)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Button text and rocket
      gsap.from('.button-text', {
        x: -20,
        opacity: 0,
        duration: 0.8,
        delay: 1.3,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.button-rocket', {
        scale: 0,
        rotation: -360,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: 'elastic.out(1, 0.7)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Continuous rocket animation
      gsap.to('.button-rocket', {
        y: -5,
        rotation: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Button beam effect
      gsap.from('.button-beam', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        delay: 1.6,
        ease: 'power2.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Contact info items
      gsap.from('.contact-info-item', {
        x: 80,
        opacity: 0,
        scale: 0.9,
        rotationY: 15,
        transformOrigin: 'right center',
        duration: 1,
        stagger: 0.25,
        ease: 'back.out(1.5)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Info icons with rotation
      gsap.from('.info-icon', {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
        ease: 'elastic.out(1, 0.8)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Info content
      gsap.from('.info-content h4', {
        y: 15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.info-content p, .info-content a', {
        y: 10,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Social links title
      gsap.from('.social-links h4', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      // Social buttons with wave
      gsap.from('.social-button', {
        y: 30,
        scale: 0,
        opacity: 0,
        rotation: (index) => (index % 2 === 0 ? -15 : 15),
        duration: 0.8,
        stagger: 0.12,
        delay: 0.3,
        ease: 'elastic.out(1, 0.7)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      // Footer animations
      gsap.from('.footer', {
        y: 50,
        opacity: 0,
        scale: 0.98,
        duration: 1.2,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.code-tag', {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: 'elastic.out(1, 0.8)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.footer-text', {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        duration: 1,
        delay: 0.5,
        ease: 'power3.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.to('.footer-text', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1,
        delay: 0.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.footer-year', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      })

      // Parallax on satellite canvas
      gsap.to('.contact-canvas', {
        y: -120,
        rotationZ: 10,
        scale: 1.15,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Form wrapper parallax
      gsap.to('.contact-form-wrapper', {
        y: -20,
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 70%',
          end: 'bottom 90%',
          scrub: 1
        }
      })

      // Contact info parallax (opposite direction)
      gsap.to('.contact-info', {
        y: 20,
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 70%',
          end: 'bottom 90%',
          scrub: 1
        }
      })
    })

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Netlify Forms requires form data to be sent as form-encoded
    const formElement = e.target
    const formData = new FormData(formElement)
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      
      if (response.ok) {
        alert('Thank you! Your message has been sent successfully.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert('Oops! There was a problem sending your message.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Oops! There was a problem sending your message.')
    }
  }

  return (
    <section id="contact" ref={contactRef} className="contact-section">
      <div className="contact-canvas">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
          <Satellite />
        </Canvas>
      </div>

      <div className="container">
        <h2 className="contact-title">
          <span className="title-number">05.</span>
          <span className="title-text">GET_IN_TOUCH</span>
          <span className="title-line"></span>
        </h2>

        <div className="contact-grid">
          <div className="contact-form-wrapper">
            <p className="contact-intro">
              Have a project in mind or just want to chat about space and code? 
              Drop me a message and let's create something amazing together!
            </p>

            <form 
              className="contact-form" 
              onSubmit={handleSubmit} 
              id="contactForm"
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              {/* Hidden input for Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              
              {/* Honeypot field for spam protection */}
              <input type="hidden" name="bot-field" />
              
              <div className="form-group">
                <label htmlFor="name">
                  <span className="label-bracket">{'<'}</span>
                  NAME
                  <span className="label-bracket">{'/>'}</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  style={{ display: 'block', opacity: 1, visibility: 'visible' }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <span className="label-bracket">{'<'}</span>
                  EMAIL
                  <span className="label-bracket">{'/>'}</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  style={{ display: 'block', opacity: 1, visibility: 'visible' }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <span className="label-bracket">{'<'}</span>
                  MESSAGE
                  <span className="label-bracket">{'/>'}</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows="6"
                  required
                  style={{ display: 'block', opacity: 1, visibility: 'visible' }}
                />
              </div>

              <button type="submit" className="submit-button" style={{ display: 'flex', opacity: 1, visibility: 'visible' }}>
                <span className="button-text">SEND MESSAGE</span>
                <span className="button-rocket">🚀</span>
                <span className="button-beam"></span>
              </button>
            </form>
          </div>

          <div className="contact-info">
            <div className="contact-info-item">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h4>Email</h4>
                <a href="mailto:rhythmmehta29@gmail.com">rhythmmehta29@gmail.com</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="info-icon">🌐</div>
              <div className="info-content">
                <h4>Location</h4>
                <p>India,                 "AI/ML Engineer & Full-Stack Developer | Building Intelligent Systems from Fraud Detection to Smart Cities"Earth, Milky Way Galaxy</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="info-icon">💼</div>
              <div className="info-content">
                <h4>Work Status</h4>
                <p>Available for Projects</p>
              </div>
            </div>

            <div className="social-links">
              <h4>Connect in Space</h4>
              <div className="social-buttons">
                <a href="https://github.com/rhythm298" target="_blank" rel="noopener noreferrer" className="social-button">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/justrhythm" target="_blank" rel="noopener noreferrer" className="social-button">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://www.fiverr.com/justrhythm" target="_blank" rel="noopener noreferrer" className="social-button">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M23.004 15.588a.995.995 0 1 1 .995.995.995.995 0 0 1-.995-.995zm-.995-4.977a.995.995 0 1 0 .995-.995.995.995 0 0 0-.995.995zm-6.011-3.989v11.981a1.994 1.994 0 0 1-1.994 1.994H2.99a1.994 1.994 0 0 1-1.995-1.994V6.622A1.994 1.994 0 0 1 2.99 4.628h11.014a1.994 1.994 0 0 1 1.994 1.994zm-8.02 2.989a.995.995 0 1 0 .995.995.995.995 0 0 0-.995-.995zm3.989 0a.995.995 0 1 0 .995.995.995.995 0 0 0-.995-.995zm0 3.989a.995.995 0 1 0 .995.995.995.995 0 0 0-.995-.995zm-3.989 0a.995.995 0 1 0 .995.995.995.995 0 0 0-.995-.995zm-3.989 0a.995.995 0 1 0 .995.995.995.995 0 0 0-.995-.995z"/>
                  </svg>
                  <span>Fiverr</span>
                </a>
                <a href="https://t.me/rhythm298" target="_blank" rel="noopener noreferrer" className="social-button">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <p className="footer-text">
              <span className="code-tag">{'</'}</span>
              Designed & Built by Rhythm Mehta
              <span className="code-tag">{' />'}</span>
            </p>
            <p className="footer-year">© 2025 - Coded with ❤️ in the cosmos</p>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Contact
