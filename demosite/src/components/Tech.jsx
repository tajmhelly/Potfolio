import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TechCanvas } from './Ball'
import { skills } from '../constants'

const Tech = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const visibleSkills = isMobile ? skills.slice(0, 6) : skills

  return (
    <section id="tech" style={{ background: '#050510', padding: '5rem 0' }}>
      <div className="container">

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ color: '#aaa6c3', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          What I work with
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', marginTop: '0.25rem', marginBottom: '2rem' }}
        >
          Skills & Technologies.
        </motion.h2>

        {/* Single shared WebGL canvas for all balls */}
        <TechCanvas skills={visibleSkills} />

        {/* Name labels — col count mirrors Ball.jsx useCols() */}
        <div className="tech-labels">
          {visibleSkills.map((skill, i) => (
            <motion.p
              key={skill.name}
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.3 }}
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                textAlign: 'center',
                background: `linear-gradient(135deg, #00f5ff, #bf5fff, #ff3d77, #ff8c00)`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${(i / skills.length) * 100}% 50%`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 6px rgba(0,245,255,0.3))',
              }}
            >
              {skill.name}
            </motion.p>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Tech