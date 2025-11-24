import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initCursorZoom } from '../utils/cursorZoom'
import { initDragScroll } from '../utils/dragScroll'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

function FloatingCubes() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 2,
            Math.sin(i) * 0.5,
            Math.sin((i / 5) * Math.PI * 2) * 2
          ]}
          args={[0.5, 0.5, 0.5]}
        >
          <meshStandardMaterial
            color={['#6366f1', '#ec4899', '#10b981', '#fbbf24', '#06b6d4'][i]}
            wireframe
          />
        </Box>
      ))}
    </group>
  )
}

function Projects() {
  const projectsRef = useRef()

  const projects = [
    {
      title: 'Jagrut AI',
      description: 'Comprehensive AI-powered fraud detection system with multilingual support for text, audio, and URL analysis to protect users from scams and phishing.',
      tech: ['Python', 'Streamlit', 'OpenAI Whisper', 'PyTorch', 'BERT', 'scikit-learn', 'MongoDB', 'Plotly'],
      github: 'https://github.com/rhythm298/jagrut-ai',
      demo: 'https://drive.google.com/file/d/17AhsWHe4K-SDeHpQDnOVA4cuOKBhUfUH/view?usp=sharing',
      color: '#6366f1',
      featured: true
    },
    {
      title: 'DivyaFlow',
      description: 'AI-powered temple crowd management system with virtual queuing, real-time analytics, and multi-role dashboards for efficient pilgrim flow management.',
      tech: ['Next.js', 'TypeScript', 'Supabase', 'NextAuth', 'Zustand', 'Recharts', 'shadcn/ui'],
      github: 'https://github.com/rhythm298/DivyaFlow',
      demo: 'https://divyaflow.vercel.app',
      color: '#ec4899',
      featured: true
    },
    {
      title: 'CodeCrushers',
      description: 'Responsible Gaming and Tech-Driven Solutions with user safety, addiction prevention, and blockchain verification systems.',
      tech: ['Python', 'Flask', 'Node.js', 'Web3.js', 'scikit-learn', 'XGBoost', 'Blockchain', 'JWT'],
      github: 'https://github.com/rhythm298/codecrushers',
      demo: null,
      color: '#10b981'
    },
    {
      title: 'SkillXchange',
      description: 'Peer-to-peer skill exchange platform where users can swap skills, book sessions, and build communities. Built for Odoo Hackathon 2025.',
      tech: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Vite', 'shadcn/ui'],
      github: 'https://github.com/rhythm298/skillxchange',
      demo: null,
      color: '#fbbf24'
    },
    {
      title: 'GovHackathon',
      description: 'AI-powered traffic congestion prediction and disease surveillance system for smart city management with real-time monitoring dashboards.',
      tech: ['Python', 'Flask', 'TensorFlow', 'LSTM', 'MongoDB', 'Plotly Dash', 'Redis'],
      github: 'https://github.com/rhythm298/govhackathon',
      demo: null,
      color: '#06b6d4'
    },
    {
      title: 'RasoiLink',
      description: 'Trusted supply chain platform connecting street food vendors with verified suppliers for streamlined inventory and order management.',
      tech: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/rhythm298/rasoilink',
      demo: null,
      color: '#8b5cf6'
    },
    {
      title: 'Emoji Encoder',
      description: 'Emoji-based steganography tool for hiding secret messages using Unicode variation selectors, available as both web app and CLI.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Unicode'],
      github: 'https://github.com/rhythm298/emoji-encoder',
      demo: 'https://cipher-moji.netlify.app',
      color: '#f59e0b'
    }
  ]

  useEffect(() => {
    // Initialize cursor zoom effects
    initCursorZoom()
    
    // Initialize drag scroll for projects grid
    initDragScroll('.projects-grid')
    
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.from(projectsRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 85%',
          once: true
        }
      })

      // Title animation
      gsap.from('.projects-title', {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 80%',
          once: true
        }
      })

      // Project cards with simple stagger
      gsap.from('.project-card', {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 75%',
          once: true
        }
      })

      // Continuous rotation for project numbers
      gsap.to('.project-number', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      })

      // Continuous glow pulse
      gsap.to('.project-glow', {
        opacity: 0.6,
        scale: 1.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.3,
          from: 'random'
        }
      })

      // Parallax effects on canvas
      gsap.to('.projects-canvas', {
        y: -150,
        rotationZ: 5,
        scale: 1.2,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Card parallax on scroll
      gsap.to('.project-card', {
        y: (index) => -15 - (index % 3) * 8,
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 70%',
          end: 'bottom 90%',
          scrub: 1.2
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={projectsRef} className="projects-section">
      <div className="projects-canvas">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingCubes />
        </Canvas>
      </div>

      <div className="container">
        <h2 className="projects-title">
          <span className="title-number">04.</span>
          <span className="title-text">PROJECTS</span>
          <span className="title-line"></span>
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card" style={{ '--accent-color': project.color }}>
              {project.featured && <div className="featured-badge">Featured</div>}
              <div className="project-number">0{index + 1}</div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag" title={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <span>GitHub</span>
                    <span className="link-icon">{'</>'}</span>
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link secondary">
                      <span>Live Demo</span>
                      <span className="link-arrow">→</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="project-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
