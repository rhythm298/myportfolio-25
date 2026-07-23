import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initDragScroll } from '../utils/dragScroll'
import './TechBadges.css'

gsap.registerPlugin(ScrollTrigger)

function TechBadges() {
  const railRef = useRef()

  const technologies = [
    { name: 'HTML5', icon: '🌐', color: '#E34F26' },
    { name: 'CSS3', icon: '🎨', color: '#1572B6' },
    { name: 'JavaScript', icon: '⚡', color: '#F7DF1E' },
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'Next.js', icon: '▲', color: '#000000' },
    { name: 'Node.js', icon: '🟢', color: '#68A063' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'Flask', icon: '🌶️', color: '#000000' },
    { name: 'FastAPI', icon: '⚡', color: '#009688' },
    { name: 'PyTorch', icon: '🔥', color: '#EE4C2C' },
    { name: 'TensorFlow', icon: '🧠', color: '#FF6F00' },
    { name: 'OpenAI', icon: '🤖', color: '#10B981' },
    { name: 'Hugging Face', icon: '🤗', color: '#FFD21E' },
    { name: 'Streamlit', icon: '🎈', color: '#FF4B4B' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
    { name: 'Firebase', icon: '🔥', color: '#FFCA28' },
    { name: 'Supabase', icon: '⚡', color: '#3ECF8E' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
    { name: 'Git', icon: '📦', color: '#F05032' },
    { name: 'TypeScript', icon: '📘', color: '#3178C6' },
    { name: 'Tailwind CSS', icon: '💨', color: '#06B6D4' },
    { name: 'GSAP', icon: '✨', color: '#88CE02' },
    { name: 'Three.js', icon: '🎮', color: '#000000' },
    { name: 'Vite', icon: '⚡', color: '#646CFF' },
    { name: 'n8n', icon: '🔄', color: '#FF6D5A' },
    { name: 'Whisper', icon: '🎤', color: '#10B981' },
    { name: 'BERT', icon: '📝', color: '#4285F4' },
    { name: 'scikit-learn', icon: '📊', color: '#F7931E' },
    { name: 'Plotly', icon: '📈', color: '#3F4F75' },
    { name: 'Express', icon: '🚂', color: '#000000' },
    { name: 'JWT', icon: '🔐', color: '#D63AFF' },
    { name: 'Kali Linux', icon: '🐉', color: '#367BF0' },
    { name: 'OWASP', icon: '🛡️', color: '#000000' }
  ]

  useEffect(() => {
    // Automatic scrolling animation
    const track = document.querySelector('.tech-rail-track')
    const rail = document.querySelector('.tech-rail')
    
    if (track) {
      const animation = gsap.to(track, {
        x: '-50%',
        duration: 30,
        ease: 'none',
        repeat: -1
      })

      // Pause animation on hover
      if (rail) {
        rail.addEventListener('mouseenter', () => animation.pause())
        rail.addEventListener('mouseleave', () => animation.resume())
      }
    }
    
    // Animate badges on scroll
    gsap.from('.tech-badge', {
      scrollTrigger: {
        trigger: railRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      scale: 0.8,
      y: 20,
      duration: 0.6,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      immediateRender: false
    })

    // Continuous subtle animation
    gsap.to('.tech-badge', {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.1,
        from: 'random'
      }
    })
  }, [])

  return (
    <div className="tech-badges-section">
      <div className="container">
        <h3 className="tech-badges-title">
          <span className="title-bracket">{'{ '}</span>
          TECH STACK
          <span className="title-bracket">{' }'}</span>
        </h3>
        
        <div className="tech-rail" ref={railRef}>
          <div className="tech-rail-track">
            {/* Duplicate technologies twice for seamless infinite scroll */}
            {[...technologies, ...technologies].map((tech, index) => (
              <div 
                key={index} 
                className="tech-badge"
                style={{ '--badge-color': tech.color }}
                title={tech.name}
              >
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechBadges
