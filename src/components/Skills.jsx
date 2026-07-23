import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

function Skills() {
  const skillsRef = useRef()

  const skills = [
    { name: 'HTML5', level: 95, icon: '🌐', color: '#E34F26' },
    { name: 'CSS3 / Tailwind', level: 92, icon: '🎨', color: '#1572B6' },
    { name: 'JavaScript / ES6+', level: 90, icon: '⚡', color: '#F7DF1E' },
    { name: 'React / Next.js', level: 88, icon: '⚛️', color: '#61DAFB' },
    { name: 'Node.js / Express', level: 85, icon: '🟢', color: '#68A063' },
    { name: 'MongoDB / PostgreSQL', level: 85, icon: '🗄️', color: '#4DB33D' },
    { name: 'Python / Flask', level: 92, icon: '🐍', color: '#3776AB' },
    { name: 'PyTorch / TensorFlow', level: 80, icon: '🔥', color: '#EE4C2C' },
    { name: 'OpenAI / Hugging Face', level: 78, icon: '🤖', color: '#10B981' },
    { name: 'n8n / Automation', level: 75, icon: '🔄', color: '#FF6D5A' },
    { name: 'Data Science / ML', level: 82, icon: '📊', color: '#F7931E' },
    { name: 'Cybersecurity Basics', level: 70, icon: '🛡️', color: '#EF4444' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.from(skillsRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      // Title with 3D rotation
      gsap.from('.skills-title', {
        x: -150,
        opacity: 0,
        rotationY: -90,
        transformOrigin: 'left center',
        duration: 1.3,
        ease: 'back.out(1.7)',
        immediateRender: false,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.skills-title .title-number', {
        scale: 0,
        rotation: -720,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        immediateRender: false,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.skills-title .title-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power3.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Skill cards with wave effect
      gsap.from('.skill-card', {
        y: 100,
        opacity: 0,
        scale: 0.7,
        rotationX: -45,
        transformOrigin: 'center center',
        duration: 1,
        stagger: {
          each: 0.12,
          from: 'start',
          ease: 'power2.inOut'
        },
        ease: 'back.out(1.4)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Skill icons with rotation
      gsap.from('.skill-icon', {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: 'elastic.out(1, 0.8)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Skill names slide in
      gsap.from('.skill-name', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.4,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Percentages pop in
      gsap.from('.skill-percentage', {
        scale: 0,
        opacity: 0,
        rotation: 90,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.5,
        ease: 'back.out(2)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      // Progress bars with elastic effect
      gsap.from('.skill-progress', {
        scaleX: 0,
        transformOrigin: 'left center',
        opacity: 0.5,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.6,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Progress fill with bounce
      gsap.from('.skill-progress-fill', {
        width: 0,
        duration: 2,
        stagger: 0.15,
        delay: 0.8,
        ease: 'elastic.out(1, 0.5)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 65%',
          toggleActions: 'play none none reverse'
        }
      })

      // Glow effect animation
      gsap.from('.skill-glow', {
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        stagger: 0.12,
        delay: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 65%',
          toggleActions: 'play none none reverse'
        }
      })

      // Continuous glow pulse
      gsap.to('.skill-glow', {
        opacity: 0.8,
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.1
      })

      // Floating particles reveal
      gsap.from('.particle', {
        opacity: 0,
        scale: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Parallax scroll effects
      gsap.to('.skill-card', {
        y: (index) => -10 - (index % 2) * 5,
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 70%',
          end: 'bottom 90%',
          scrub: 1
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={skillsRef} className="skills-section">
      <div className="container">
        <h2 className="skills-title">
          <span className="title-number">03.</span>
          <span className="title-text">TECH_STACK</span>
          <span className="title-line"></span>
        </h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-header">
                <div className="skill-info">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              
              <div className="skill-progress">
                <div 
                  className="skill-progress-fill" 
                  style={{ 
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${skill.color}, var(--space-purple))`
                  }}
                >
                  <div className="skill-glow" style={{ boxShadow: `0 0 20px ${skill.color}` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  )
}

export default Skills
