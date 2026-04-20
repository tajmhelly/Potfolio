import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
const ComputersCanvas = lazy(() => import('./ComputersCanvas'))

const Hero = () => {
  return (
    <section id="home" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#050510' }}>

      {/* Left accent line + text */}
      <div className="hero-text-wrapper">
        {/* Purple dot + gradient line */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.25rem' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#915EFF', boxShadow: '0 0 12px #915EFF' }} />
          <div className="hero-accent-line" style={{
            width: 4, height: 320,
            background: 'linear-gradient(to bottom, #915EFF, transparent)',
            borderRadius: 2,
          }} />
        </div>

        {/* Headline */}
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontWeight: 900,
              color: '#fff',
              fontSize: 'clamp(2.2rem, 7vw, 5rem)',
              lineHeight: 1.1,
              marginTop: '0.5rem',
            }}
          >
            Hi, I'm <span style={{ color: '#915EFF', textShadow: '0 0 30px #915EFF88' }}>Tahj</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: '#dfd9ff',
              fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
              marginTop: '1rem',
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
           <p>
            Software Engineer who bridges the gap between{' '}
            <span className="neon-text-blue">great engineering</span> and{' '}
            <span className="neon-text-purple">beautiful user experience</span> —{' '}
            building 3D visuals, web apps and everything in between.
          </p>
          </motion.p>
        </div>
      </div>

      {/* 3D computer */}
      <div className="hero-canvas-wrapper">
        <Suspense fallback={null}>
          <ComputersCanvas />
        </Suspense>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, width: '100%',
        display: 'flex', justifyContent: 'center', zIndex: 2,
      }}>
        <a href='#projects'>
          <div style={{
            width: 35, height: 64, borderRadius: 24,
            border: '3px solid #aaa6c3',
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
            padding: 8,
          }}>
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
              style={{ width: 12, height: 12, borderRadius: '50%', background: '#aaa6c3' }}
            />
          </div>
        </a>
      </div>

    </section>
  )
}

export default Hero