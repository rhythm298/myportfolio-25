import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

function AboutBlob() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[1.5, 4]}>
      <MeshDistortMaterial
        color="#6366f1"
        attach="material"
        distort={0.35}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        wireframe
        emissive="#6366f1"
        emissiveIntensity={0.3}
      />
    </Icosahedron>
  )
}

function About() {
  const aboutRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from('.about-card', {
        y: 120,
        opacity: 0,
        rotationX: -90,
        transformOrigin: 'bottom center',
        scale: 0.8,
        duration: 1.2,
        stagger: 0.15,
        ease: 'back.out(1.5)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.card-icon', {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: 'elastic.out(1, 0.7)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.about-card h3', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
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
        stagger: 0.1,
        delay: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

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

      gsap.from('.timeline-content p, .timeline-content li', {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

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
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AboutBlob />
        </Canvas>
      </div>

      <div className="container">
        <h2 className="about-title">
          <span className="title-number">02.</span>
          <span className="title-text">ABOUT_ME</span>
          <span className="title-line"></span>
        </h2>

        <div className="about-grid">
          <div className="about-card glass-card">
            <div className="card-icon">🚀</div>
            <h3>Full Stack Developer</h3>
            <p>Building end-to-end web applications with modern frameworks, clean architecture, and production-grade reliability.</p>
          </div>

          <div className="about-card glass-card">
            <div className="card-icon">⚛️</div>
            <h3>MERN Stack Developer</h3>
            <p>Crafting scalable full-stack solutions with MongoDB, Express, React, and Node.js — from API design to polished UIs.</p>
          </div>

          <div className="about-card glass-card">
            <div className="card-icon">🤖</div>
            <h3>AI & Automation</h3>
            <p>Engineering intelligent systems and workflow automations using PyTorch, TensorFlow, OpenAI, and n8n.</p>
          </div>

          <div className="about-card glass-card">
            <div className="card-icon">📊</div>
            <h3>Data Science</h3>
            <p>Turning data into decisions with statistical modeling, visualization, and machine learning pipelines.</p>
          </div>

          <div className="about-card glass-card">
            <div className="card-icon">🛡️</div>
            <h3>Cybersecurity Explorer</h3>
            <p>Actively building practical security knowledge — from secure coding practices to vulnerability assessment.</p>
          </div>

          <div className="about-card glass-card">
            <div className="card-icon">💼</div>
            <h3>Freelance Developer</h3>
            <p>Delivering contract projects and consulting — from full-stack prototypes to AI-powered automation solutions.</p>
          </div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="intro-text">
              <span className="section-label">INTRODUCTION</span>
            </p>
            <h2 className="overview-title">Overview.</h2>
            <p>
              I'm a developer who thrives at the intersection of <span className="highlight">full-stack engineering</span>, <span className="highlight">AI & automation</span>, and <span className="highlight">data science</span>. With a strong foundation in <span className="highlight">C</span> and <span className="highlight">Python</span>, I'm continuously sharpening my skills in <span className="highlight">JavaScript</span>, <span className="highlight">Java</span>, and <span className="highlight">Data Structures & Algorithms</span> to write cleaner, more efficient code.
            </p>
            <p>
              I build production web applications with the <span className="highlight">MERN stack</span>, integrate APIs and databases, and ship AI-driven features that solve real problems. I'm also actively exploring <span className="highlight">cybersecurity</span> — building practical knowledge in secure coding and vulnerability awareness.
            </p>
            <p>
              In 2025, I was selected as a finalist in the prestigious <span className="highlight">IIT Bombay Hackathon</span>, where I showcased my technical abilities, creativity, and teamwork in a high-pressure competitive environment.
            </p>
            <p>
              Let's work together to bring your ideas to life.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2025–26</div>
              <div className="timeline-content">
                <h4>MERN Stack Developer Intern</h4>
                <p className="timeline-company">Healtether Healthcare · Remote</p>
                <p className="timeline-period">Dec 2025 — Jun 2026</p>
                <ul className="timeline-bullets">
                  <li>Built scalable web applications using the MERN stack for real-world production use</li>
                  <li>Developed frontend and backend features with clean, maintainable code</li>
                  <li>Worked with REST APIs and database integration across the full stack</li>
                  <li>Collaborated on production projects in a remote, team-driven environment</li>
                  <li>Contributed to performance improvements and new feature delivery</li>
                </ul>
              </div>
              <div className="timeline-animation">
                <div className="mern-stack">
                  <span className="stack-letter">M</span>
                  <span className="stack-letter">E</span>
                  <span className="stack-letter">R</span>
                  <span className="stack-letter">N</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2025</div>
              <div className="timeline-content">
                <h4>Freelancing & Hackathons</h4>
                <p>Contract AI/ML projects, full-stack prototypes, and consulting services. IIT Bombay Hackathon finalist.</p>
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
                <p>Model prototyping, data pipelines, and prototype dashboards.</p>
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
                <p>Started my professional journey in web development — building, learning, and shipping.</p>
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
