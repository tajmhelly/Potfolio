import { useState } from 'react'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <nav className="nav-container">

        {/* 3D Logo */}
        <div className="logo-3d">
          <span className="logo-3d__text">AENT</span>
          <span className="logo-3d__accent"> TECH</span>
        </div>

        {/* Nav links — centered */}
        <ul className={`nav-menu${open ? ' nav-menu--open' : ''}`}>
          <li><a href="#home"     onClick={() => setOpen(false)}>Home</a></li>
          <li><a href="#about"    onClick={() => setOpen(false)}>About</a></li>
          <li><a href="#projects" onClick={() => setOpen(false)}>Projects</a></li>
          <li><a href="#contact"  onClick={() => setOpen(false)}>Contact</a></li>
        </ul>

        {/* Bubbly CTA */}
        <a href="#contact" className="btn-bubble">Hire Me ✦</a>

        {/* Mobile toggle */}
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(o => !o)}
        >
          {open ? '✕' : '☰'}
        </button>

      </nav>
    </header>
  )
}

export default Navbar