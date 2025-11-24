/**
 * Portfolio Application - Main Component
 * Copyright (c) 2025 Rhythm Mehta. All rights reserved.
 * This code is proprietary and confidential.
 */

import { useState, useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import SignatureIntro from './components/SignatureIntro'
import SpaceIntro from './components/SpaceIntro'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import TechBadges from './components/TechBadges'
import Contact from './components/Contact'
import ProtectionLayer from './components/ProtectionLayer'
import { initSmoothScroll } from './utils/smoothScroll'
import './App.css'

function App() {
  const [signatureComplete, setSignatureComplete] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    if (introComplete) {
      initSmoothScroll()
    }
  }, [introComplete])

  return (
    <>
      <ProtectionLayer />
      <CustomCursor />
      
      {!signatureComplete ? (
        <SignatureIntro onComplete={() => setSignatureComplete(true)} />
      ) : !introComplete ? (
        <SpaceIntro onComplete={() => setIntroComplete(true)} />
      ) : (
        <>
          <Navigation />
          <main>
            <Hero />
            <About />
            <Skills />
            <TechBadges />
            <Projects />
            <Contact />
          </main>
        </>
      )}
    </>
  )
}

export default App
