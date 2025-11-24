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
                <a href="mailto:rhythm@example.com">rhythm29@gmail.com</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="info-icon">🌐</div>
              <div className="info-content">
                <h4>Location</h4>
                <p>India, Earth, Milky Way Galaxy</p>
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
                {['GitHub', 'LinkedIn', 'Twitter', 'Discord'].map((platform, i) => (
                  <a key={i} href="#" className="social-button">
                    <span>{platform}</span>
                  </a>
                ))}
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
