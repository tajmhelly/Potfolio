import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { services } from '../constants'
import { useScrollReveal } from '../hooks/useScrollReveal'

const fadeIn = (direction, delay) => ({
  hidden: {
    x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
    y: direction === 'up' ? 60 : 0,
    opacity: 0,
  },
  show: {
    x: 0, y: 0, opacity: 1,
    transition: { type: 'spring', delay, duration: 0.8 },
  },
})

const ServiceCard = ({ index, title, icon }) => (
  <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} transitionSpeed={400} className="service-card-wrap">
    <motion.div
      variants={fadeIn('right', index * 0.15)}
      style={{
        background: 'linear-gradient(135deg, #915EFF33, #00f5ff22)',
        padding: 1,
        borderRadius: 20,
        boxShadow: '0 0 30px rgba(145,94,255,0.15)',
      }}
    >
      <div style={{
        background: '#0a0a1a',
        borderRadius: 20,
        padding: '2rem 2.5rem',
        minHeight: 240,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
        <img src={icon} alt={title} style={{ width: 64, height: 64, objectFit: 'contain' }} />
        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, textAlign: 'center' }}>{title}</h3>
      </div>
    </motion.div>
  </Tilt>
)

const About = () => {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="about" style={{ background: '#050510', padding: '5rem 0' }}>
      <div className="container" ref={ref}>

        {/* Labels */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ color: '#aaa6c3', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          Introduction
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', marginTop: '0.25rem', marginBottom: '1.5rem' }}
        >
          Overview.
        </motion.h2>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ color: '#aaa6c3', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.9 }}
        >
          I'm a skilled <span> Software Engineer</span> with experience in JavaScript, Python and C++
          and expertise in frameworks like React, Django, Rest framework, QT, Pytorch and Three . I'm a quick learner
          and collaborate closely with clients to create efficient, scalable, and user-friendly
          solutions that solve real-world problems. Let's work together to bring your ideas to life!
        </motion.p>

        {/* Service cards */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="service-cards"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default About