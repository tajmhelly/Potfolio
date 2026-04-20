import { useScrollReveal } from '../hooks/useScrollReveal'

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack marketplace with real-time inventory, Stripe payments, and an admin dashboard.',
    tags: ['React', 'Django', 'PostgreSQL', 'Stripe'],
    color: '#00f5ff',
  },
  {
    title: 'AI Chat Interface',
    description: 'Streaming chat UI backed by Claude API with conversation history and markdown rendering.',
    tags: ['Python', 'Claude API', 'Tailwind'],
    color: '#bf5fff',
  },
  {
    title: 'Dev Analytics Dashboard',
    description: 'Real-time metrics board pulling from GitHub and Jira APIs with customizable widgets.',
    tags: ['FastAPI', 'D3.js', 'REST APIs'],
    color: '#ff3d77',
  },
  {
    title: 'Mobile Expense Tracker',
    description: 'Cross-platform app with OCR receipt scanning, budget alerts, and spending insights.',
    tags: ['React Native', 'Expo', 'MS SQL'],
    color: '#ff8c00',
  },
  {
    title: 'Real-Time Collaboration',
    description: 'Google Docs-style editor with operational transforms, presence indicators, and version history.',
    tags: ['WebSockets', 'CRDTs', 'Redis'],
    color: '#00f5ff',
  },
  {
    title: 'Open Source CLI',
    description: 'Developer productivity tool with 2k+ GitHub stars for scaffolding and code generation.',
    tags: ['Python', 'Click', 'Jinja2'],
    color: '#bf5fff',
  },
]

const delays = ['reveal-d1', 'reveal-d2', 'reveal-d3', 'reveal-d4', 'reveal-d5', 'reveal-d6']

const Feature = () => {
  const [headRef, headVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useScrollReveal()
  const headV = headVisible ? 'reveal reveal--visible' : 'reveal'

  return (
    <section id="projects" className="section" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="container">

        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className={`shimmer-text ${headV}`} style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Featured Projects
          </h2>
          <p className={`${headV} reveal-d2`} style={{ color: '#a0aec0', maxWidth: '480px', margin: '0 auto' }}>
            A selection of things I've shipped — side projects, client work, and open source.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
          {projects.map(({ title, description, tags, color }, i) => (
            <div
              key={title}
              className={`card neon-border reveal ${gridVisible ? 'reveal--visible' : ''} ${delays[i]}`}
            >
              <div className="card-body">
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, marginBottom: '1rem', boxShadow: `0 0 12px ${color}` }} />
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#f7fafc' }}>{title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#718096' }}>{description}</p>
                <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                  {tags.map(t => (
                    <span key={t} className="badge" style={{ fontSize: '0.7rem', borderColor: `${color}55`, color }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Feature