import { motion } from 'framer-motion'
import { testimonials } from '../constants'
import { useScrollReveal } from '../hooks/useScrollReveal'

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(145, 94, 255, 0.2)',
      borderRadius: 24,
      padding: '2.5rem',
      boxShadow: '0 0 30px rgba(145,94,255,0.08)',
      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(145,94,255,0.6)'
      e.currentTarget.style.boxShadow = '0 0 40px rgba(145,94,255,0.2)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(145,94,255,0.2)'
      e.currentTarget.style.boxShadow = '0 0 30px rgba(145,94,255,0.08)'
    }}
  >
    <p style={{ color: '#915EFF', fontSize: '3rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.5rem' }}>"</p>

    <p style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: 1.7, letterSpacing: '0.02em' }}>
      {testimonial}
    </p>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.75rem', gap: '0.5rem' }}>
      <div>
        <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
          <span style={{ color: '#00f5ff' }}>@ </span>{name}
        </p>
        <p style={{ color: '#718096', fontSize: '0.8rem', marginTop: '0.25rem' }}>
          {designation} of {company}
        </p>
      </div>
      <img
        src={image}
        alt={name}
        style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #915EFF' }}
      />
    </div>
  </motion.div>
)

const Feedbacks = () => {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="testimonials" style={{ background: '#050510', padding: '5rem 0' }}>
      <div className="container">

        {/* Header */}
        <div ref={ref} style={{ marginBottom: '3rem' }}>
          <p className={`reveal ${visible ? 'reveal--visible' : ''}`}
            style={{ color: '#aaa6c3', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            What others say
          </p>
          <h2 className={`reveal ${visible ? 'reveal--visible' : ''} reveal-d1`}
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', marginTop: '0.25rem' }}>
            Testimonials.
          </h2>
        </div>

        {/* Cards */}
        <div className="feedback-cards">
          {testimonials.map((t, i) => (
            <FeedbackCard key={t.name} index={i} {...t} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Feedbacks