import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars, Text3D, Center, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import './SpaceIntro.css'

// Rotating Planet
function Planet() {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial
        color="#6366f1"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

// Orbiting Satellites/Rings
function OrbitingRings() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef}>
      {[2.5, 3.2, 4].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={i === 0 ? '#06b6d4' : i === 1 ? '#ec4899' : '#10b981'}
            emissive={i === 0 ? '#06b6d4' : i === 1 ? '#ec4899' : '#10b981'}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

// Floating Code Blocks
function FloatingCodeBlocks() {
  const blocks = [
    { pos: [-4, 2, -2], text: '</>', color: '#06b6d4' },
    { pos: [4, -1, -3], text: '{ }', color: '#ec4899' },
    { pos: [-3, -2, -1], text: '[ ]', color: '#10b981' },
    { pos: [3, 2, -2], text: '( )', color: '#fbbf24' }
  ]

  return (
    <>
      {blocks.map((block, i) => (
        <FloatingBlock key={i} position={block.pos} text={block.text} color={block.color} />
      ))}
    </>
  )
}

function FloatingBlock({ position, text, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

// Terminal Text Animation
function TerminalText() {
  const [text, setText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const commands = [
    'initializing systems...',
    'loading quantum processors...',
    'connecting to space network...',
    'rendering portfolio...',
    'SYSTEM READY'
  ]
  const [commandIndex, setCommandIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (commandIndex < commands.length) {
      const currentCommand = commands[commandIndex]
      
      if (charIndex < currentCommand.length) {
        const timeout = setTimeout(() => {
          setText(prev => prev + currentCommand[charIndex])
          setCharIndex(prev => prev + 1)
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setText(prev => prev + '\n')
          setCommandIndex(prev => prev + 1)
          setCharIndex(0)
        }, 500)
        return () => clearTimeout(timeout)
      }
    } else if (!isComplete) {
      setIsComplete(true)
    }
  }, [charIndex, commandIndex, isComplete])

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn-close"></span>
          <span className="btn-minimize"></span>
          <span className="btn-maximize"></span>
        </div>
        <div className="terminal-title">SPACE_TERMINAL v3.0.1</div>
      </div>
      <div className="terminal-body">
        <pre className="terminal-text">{text}<span className="cursor-blink">_</span></pre>
      </div>
    </div>
  )
}

function SpaceIntro({ onComplete }) {
  const containerRef = useRef()
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalComplete, setTerminalComplete] = useState(false)

  useEffect(() => {
    setShowTerminal(true)
    
    // Lock scrolling initially
    const element = containerRef.current
    if (element) {
      element.style.overflow = 'hidden'
    }

    // Listen for terminal completion
    const checkTerminal = setInterval(() => {
      const terminalText = document.querySelector('.terminal-text')
      if (terminalText && terminalText.textContent.includes('SYSTEM READY')) {
        setTerminalComplete(true)
        clearInterval(checkTerminal)
        
        // Unlock scrolling when terminal is ready
        if (element) {
          element.style.overflow = 'auto'
        }
      }
    }, 100)

    // Fade in animation
    const tl = gsap.timeline()
    
    tl.from('.space-intro-canvas', {
      opacity: 0,
      duration: 2,
      ease: 'power2.out'
    })
    .from('.terminal', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    }, '-=1')
    .from('.intro-title', {
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)'
    }, '-=0.5')

    return () => {
      clearInterval(checkTerminal)
    }
  }, [onComplete])

  useEffect(() => {
    if (terminalComplete) {
      gsap.from('.scroll-hint-intro', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3
      })

      // Add scroll listener after terminal completes
      let isTransitioning = false
      const MAX_SCROLL = 200 // Maximum allowed scroll before transition
      
      const handleScroll = () => {
        const element = containerRef.current
        if (!element || isTransitioning) return
        
        const scrollY = element.scrollTop
        
        // Limit scroll extent
        if (scrollY > MAX_SCROLL) {
          element.scrollTop = MAX_SCROLL
        }
        
        // Create 3D scroll effect based on scroll progress
        const progress = Math.min(scrollY / 100, 1)
        const canvas = element.querySelector('.space-intro-canvas')
        const terminal = element.querySelector('.terminal')
        
        if (canvas) {
          gsap.to(canvas, {
            rotateX: progress * 20,
            y: -scrollY * 0.8,
            opacity: 1 - (progress * 0.4),
            duration: 0.3,
            ease: 'none'
          })
        }
        
        if (terminal) {
          gsap.to(terminal, {
            y: -scrollY * 1.2,
            opacity: 1 - (progress * 0.6),
            duration: 0.3,
            ease: 'none'
          })
        }
        
        // Trigger transition when scroll reaches threshold
        if (scrollY >= 100 && !isTransitioning) {
          isTransitioning = true
          element.style.overflow = 'hidden'
          
          // 3D transition animation
          const tl = gsap.timeline({
            onComplete: () => {
              onComplete()
            }
          })
          
          tl.to(canvas, {
            rotateX: 90,
            y: -300,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut'
          }, 0)
          .to(terminal, {
            y: -400,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut'
          }, 0)
          .to(element, {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
          }, 0.5)
        }
      }

      const element = containerRef.current
      if (element) {
        element.addEventListener('scroll', handleScroll, { passive: true })
      }

      return () => {
        if (element) {
          element.removeEventListener('scroll', handleScroll)
        }
      }
    }
  }, [terminalComplete, onComplete])

  return (
    <div ref={containerRef} className="space-intro-container">
      <div className="space-intro-canvas">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />

          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
          <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#06b6d4" />

          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          <Planet />
          <OrbitingRings />
          <FloatingCodeBlocks />
        </Canvas>
      </div>

      <div className="intro-overlay">
        {showTerminal && <TerminalText />}
      </div>

      {terminalComplete && (
        <div className="scroll-hint-intro">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="hint-text">Scroll to Enter</span>
        </div>
      )}
      
      {/* Spacer to enable limited scrolling */}
      <div style={{ height: '120vh', pointerEvents: 'none' }}></div>
    </div>
  )
}

export default SpaceIntro
