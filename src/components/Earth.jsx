import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

const CDN = 'https://cdn.jsdelivr.net/npm/three-globe@2.31.2/example/img'

const VERT_ATM = /* glsl */`
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const FRAG_ATM = /* glsl */`
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(0.15, 0.55, 1.0, 1.0) * intensity;
  }
`

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(0,245,255,0.2)',
  borderRadius: 10,
  color: '#e2e8f0',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const labelStyle = {
  display: 'block',
  marginBottom: '0.4rem',
  color: '#aaa6c3',
  fontSize: '0.85rem',
  fontWeight: 500,
}

export default function Earth() {
  const mountRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [focus, setFocus] = useState(null)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xyklpwee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  useEffect(() => {
    const mount = mountRef.current
    const W = mount.clientWidth
    const H = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(W, H)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000)
    camera.position.z = 2.8

    const sun = new THREE.DirectionalLight(0xfff5e0, 2.2)
    sun.position.set(5, 3, 5)
    scene.add(sun)
    scene.add(new THREE.AmbientLight(0x111133, 1.2))

    const tl = new THREE.TextureLoader()
    const tex = (name) => tl.load(`${CDN}/${name}`)

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({
        map: tex('earth-blue-marble.jpg'),
        bumpMap: tex('earth-topology.png'),
        bumpScale: 0.06,
        specularMap: tex('earth-water.png'),
        specular: new THREE.Color(0x334455),
        shininess: 18,
      })
    )
    scene.add(earth)

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.008, 64, 64),
      new THREE.MeshPhongMaterial({
        map: tex('earth-clouds.png'), transparent: true, opacity: 0.38, depthWrite: false,
      })
    )
    scene.add(clouds)

    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: VERT_ATM, fragmentShader: FRAG_ATM,
        blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true,
      })
    ))

    const starPos = new Float32Array(8000 * 3)
    for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 300
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.85,
    })))

    let dragging = false
    let prev = { x: 0, y: 0 }
    let vel = { x: 0, y: 0 }
    let targetZ = camera.position.z

    const getXY = (e) => e.touches
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY }

    const onDown = (e) => { dragging = true; prev = getXY(e); vel = { x: 0, y: 0 }; mount.style.cursor = 'grabbing' }
    const onMove = (e) => {
      if (!dragging) return
      const cur = getXY(e)
      vel.y = (cur.x - prev.x) * 0.006
      vel.x = (cur.y - prev.y) * 0.006
      earth.rotation.y += vel.y
      earth.rotation.x = Math.max(-0.6, Math.min(0.6, earth.rotation.x + vel.x))
      clouds.rotation.y = earth.rotation.y
      clouds.rotation.x = earth.rotation.x
      prev = cur
    }
    const onUp = () => { dragging = false; mount.style.cursor = 'grab' }
    const onWheel = (e) => { e.preventDefault(); targetZ = Math.min(7, Math.max(1.4, targetZ + e.deltaY * 0.004)) }

    mount.addEventListener('mousedown', onDown)
    mount.addEventListener('touchstart', onDown, { passive: true })
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    mount.addEventListener('wheel', onWheel, { passive: false })

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!dragging) {
        earth.rotation.y += 0.0015
        clouds.rotation.y += 0.0018
        vel.x *= 0.92; vel.y *= 0.92
        earth.rotation.y += vel.y
        earth.rotation.x = Math.max(-0.6, Math.min(0.6, earth.rotation.x + vel.x))
        clouds.rotation.x = earth.rotation.x
      }
      camera.position.z += (targetZ - camera.position.z) * 0.08
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      mount.removeEventListener('mousedown', onDown)
      mount.removeEventListener('touchstart', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
      mount.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section id="contact" style={{ position: 'relative', background: '#050510', minHeight: 700, overflow: 'hidden' }}>

      {/* Earth canvas — full background */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'grab' }} />

      {/* Dark gradient fade on left so form is readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(5,5,16,0.97) 0%, rgba(5,5,16,0.85) 42%, transparent 75%)',
        pointerEvents: 'none',
      }} />

      {/* Contact form overlay */}
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '5rem 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ maxWidth: 480 }}
        >
          <p style={{ color: '#aaa6c3', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Get in touch
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: '2rem' }}>
            Contact.
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                required
                style={{
                  ...inputStyle,
                  borderColor: focus === 'name' ? '#00f5ff' : 'rgba(0,245,255,0.2)',
                  boxShadow: focus === 'name' ? '0 0 0 3px rgba(0,245,255,0.1)' : 'none',
                }}
                onFocus={() => setFocus('name')}
                onBlur={() => setFocus(null)}
              />
            </div>

            <div>
              <label style={labelStyle}>Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                required
                style={{
                  ...inputStyle,
                  borderColor: focus === 'email' ? '#00f5ff' : 'rgba(0,245,255,0.2)',
                  boxShadow: focus === 'email' ? '0 0 0 3px rgba(0,245,255,0.1)' : 'none',
                }}
                onFocus={() => setFocus('email')}
                onBlur={() => setFocus(null)}
              />
            </div>

            <div>
              <label style={labelStyle}>Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                rows={5}
                required
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  borderColor: focus === 'message' ? '#00f5ff' : 'rgba(0,245,255,0.2)',
                  boxShadow: focus === 'message' ? '0 0 0 3px rgba(0,245,255,0.1)' : 'none',
                }}
                onFocus={() => setFocus('message')}
                onBlur={() => setFocus(null)}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: status === 'sending' ? 1 : 1.03 }}
              whileTap={{ scale: status === 'sending' ? 1 : 0.97 }}
              style={{
                padding: '0.85rem 2rem',
                borderRadius: 12,
                border: 'none',
                background:
                  status === 'sent'    ? 'linear-gradient(135deg, #00d084, #00b4d8)' :
                  status === 'error'   ? 'linear-gradient(135deg, #ff3d77, #ff8c00)' :
                                         'linear-gradient(135deg, #915EFF, #534ab7)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                opacity: status === 'sending' ? 0.7 : 1,
                boxShadow:
                  status === 'sent'  ? '0 0 24px rgba(0,208,132,0.4)' :
                  status === 'error' ? '0 0 24px rgba(255,61,119,0.4)' :
                                       '0 0 24px rgba(145,94,255,0.4)',
                transition: 'background 0.3s, box-shadow 0.3s, opacity 0.2s',
                alignSelf: 'flex-start',
              }}
            >
              {status === 'sending' ? 'Sending...' :
               status === 'sent'    ? '✓ Message Sent!' :
               status === 'error'   ? '✕ Failed — Try Again' :
                                      'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </div>

    </section>
  )
}