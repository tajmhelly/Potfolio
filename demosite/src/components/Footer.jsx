import { useScrollReveal } from '../hooks/useScrollReveal'

const links = [
  { label: 'GitHub', href: 'https://github.com/tajmhelly' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/oswaldmiller/' },
  { label: 'Twitter', href: 'https://x.com/aent_Tech?s=21' },
  { label: 'Email', href: 'oswaldmiller123@gmail.com' },
]

const Footer = () => {
  const [ref, visible] = useScrollReveal()

  return (
    <footer
      ref={ref}
      className={`reveal ${visible ? 'reveal--visible' : ''}`}
      style={{ borderTop: '1px solid rgba(0, 245, 255, 0.1)', padding: '2.5rem 0', background: '#050510' }}
    >
      <div className="container footer-inner">
        <span className="nav-brand" style={{ fontSize: '1.2rem' }}>Portfolio</span>
        <div className="flex" style={{ gap: '1.5rem' }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href} style={{ color: '#718096', fontSize: '0.9rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#00f5ff'}
              onMouseLeave={e => e.target.style.color = '#718096'}
            >{label}</a>
          ))}
        </div>
        <p style={{ color: '#4a5568', fontSize: '0.85rem', margin: 0 }}>
          © {new Date().getFullYear()} — Built with React & Vite
        </p>
      </div>
    </footer>
  )
}

export default Footer