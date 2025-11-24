import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

function RotatingCube() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Box ref={meshRef} args={[2, 2, 2]}>
      <meshStandardMaterial
        color="#ec4899"
        wireframe
        emissive="#ec4899"
        emissiveIntensity={0.5}
      />
    </Box>
  )
}

function About() {
  const aboutRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.from(aboutRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      // Title animation with split reveal
      gsap.from('.about-title', {
        x: -150,
        opacity: 0,
        rotationY: -90,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'back.out(1.7)',
        immediateRender: false,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.title-number', {
        scale: 0,
        rotation: -360,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
        immediateRender: false,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.title-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power3.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Cards with 3D flip effect
      gsap.from('.about-card', {
        y: 120,
        opacity: 0,
        rotationX: -90,
        transformOrigin: 'bottom center',
        scale: 0.8,
        duration: 1.2,
        stagger: 0.25,
        ease: 'back.out(1.5)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Card icons animation
      gsap.from('.card-icon', {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
        ease: 'elastic.out(1, 0.7)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Card titles and text
      gsap.from('.about-card h3', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.about-card p', {
        y: 15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // About text with character reveal
      gsap.from('.about-text p', {
        x: -50,
        opacity: 0,
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.to('.about-text p', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Highlight text animation
      gsap.from('.highlight', {
        backgroundSize: '0% 100%',
        duration: 1,
        delay: 0.5,
        ease: 'power2.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Timeline items with slide and scale
      gsap.from('.timeline-item', {
        x: -80,
        opacity: 0,
        scale: 0.9,
        rotation: -5,
        duration: 1,
        stagger: 0.35,
        ease: 'back.out(1.5)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Timeline dates
      gsap.from('.timeline-date', {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        delay: 0.3,
        ease: 'elastic.out(1, 0.8)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Timeline content
      gsap.from('.timeline-content h4', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.25,
        delay: 0.5,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.timeline-content p', {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.25,
        delay: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Parallax effects
      gsap.to('.about-canvas', {
        y: -80,
        rotationY: 15,
        scale: 1.15,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Card hover-like animation on scroll
      gsap.to('.about-card', {
        y: -10,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 0.5
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={aboutRef} className="about-section">
      <div className="about-canvas">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <RotatingCube />
        </Canvas>
      </div>

      <div className="container">
        <h2 className="about-title">
          <span className="title-number">02.</span>
          <span className="title-text">ABOUT_ME</span>
          <span className="title-line"></span>
        </h2>

        <div className="about-grid">
          <div className="about-card">
            <div className="card-icon">💻</div>
            <h3>Full-Stack Developer</h3>
            <p>Building end-to-end solutions with modern frameworks and cutting-edge technologies.</p>
          </div>

          <div className="about-card">
            <div className="card-icon">🤖</div>
            <h3>AI/ML Engineer</h3>
            <p>Building machine learning models and AI automation solutions with PyTorch, TensorFlow, and OpenAI.</p>
          </div>

          <div className="about-card">
            <div className="card-icon">⚙️</div>
            <h3>Backend Developer</h3>
            <p>Architecting robust server-side applications and RESTful APIs.</p>
          </div>

          <div className="about-card">
            <div className="card-icon">✨</div>
            <h3>UI UX Designer</h3>
            <p>Crafting intuitive user experiences through thoughtful design and research.</p>
          </div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="intro-text">
              <span className="section-label">INTRODUCTION</span>
            </p>
            <h2 className="overview-title">Overview.</h2>
            <p>
              I have a strong foundation in programming, having learned <span className="highlight">C</span> and <span className="highlight">Python</span>. Currently, I am enhancing my skills by learning <span className="highlight">CSS</span> and <span className="highlight">JavaScript</span> for front-end development, as well as <span className="highlight">Java</span> and <span className="highlight">Data Structures and Algorithms (DSA)</span> to deepen my understanding of software development.
            </p>
            <p>
              In 2025, I was selected as a finalist in the prestigious <span className="highlight">IIT Bombay Hackathon</span>, where I had the opportunity to showcase my technical abilities, creativity, and teamwork in a competitive environment.
            </p>
            <p>
              Let's work together to bring your ideas to life!
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2025</div>
              <div className="timeline-content">
                <h4>Freelancing</h4>
                <p>Contract AI/ML projects, full-stack prototypes, and consulting services</p>
              </div>
              <div className="timeline-animation">
                <div className="code-lines">
                  <span className="code-line">{'<AI />'}</span>
                  <span className="code-line">{'model.train()'}</span>
                  <span className="code-line">{'deploy()'}</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2023</div>
              <div className="timeline-content">
                <h4>AI Research Intern</h4>
                <p>Model prototyping, data pipelines, and prototype dashboards</p>
              </div>
              <div className="timeline-animation">
                <div className="neural-network">
                  <div className="neuron"></div>
                  <div className="neuron"></div>
                  <div className="neuron"></div>
                  <div className="connection"></div>
                  <div className="connection"></div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2021</div>
              <div className="timeline-content">
                <h4>Web Developer</h4>
                <p>Started professional journey in web development</p>
              </div>
              <div className="timeline-animation">
                <div className="typing-code">
                  <span className="cursor-blink">{'<code>'}</span>
                  <span className="tag">{'</>'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
