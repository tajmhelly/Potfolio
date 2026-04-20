import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CDN = 'https://cdn.jsdelivr.net/npm/three-globe@2.31.2/example/img'

const VERT_ATM = /* glsl */`
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const FRAG_ATM = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(0.15, 0.55, 1.0, 1.0) * intensity;
  }
`

export default function ProductViewer() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(W, H)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    mount.appendChild(renderer.domElement)

    // ── Scene / Camera ────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000)
    camera.position.z = 2.8

    // ── Lights ────────────────────────────────────────────────
    const sun = new THREE.DirectionalLight(0xfff5e0, 2.2)
    sun.position.set(5, 3, 5)
    scene.add(sun)
    scene.add(new THREE.AmbientLight(0x111133, 1.2))

    // ── Texture loader ────────────────────────────────────────
    const tl = new THREE.TextureLoader()
    const tex = (name) => tl.load(`${CDN}/${name}`)

    // ── Earth ─────────────────────────────────────────────────
    const earthMat = new THREE.MeshPhongMaterial({
      map:         tex('earth-blue-marble.jpg'),
      bumpMap:     tex('earth-topology.png'),
      bumpScale:   0.06,
      specularMap: tex('earth-water.png'),
      specular:    new THREE.Color(0x334455),
      shininess:   18,
    })
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMat)
    scene.add(earth)

    // ── Clouds ────────────────────────────────────────────────
    const cloudMat = new THREE.MeshPhongMaterial({
      map:         tex('earth-clouds.png'),
      transparent: true,
      opacity:     0.38,
      depthWrite:  false,
    })
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.008, 64, 64), cloudMat)
    scene.add(clouds)

    // ── Atmosphere fresnel glow ───────────────────────────────
    const atmMat = new THREE.ShaderMaterial({
      vertexShader:   VERT_ATM,
      fragmentShader: FRAG_ATM,
      blending:       THREE.AdditiveBlending,
      side:           THREE.BackSide,
      transparent:    true,
    })
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.15, 64, 64), atmMat))

    // ── Stars ─────────────────────────────────────────────────
    const starPos = new Float32Array(8000 * 3)
    for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 300
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.85,
    })))

    // ── Interaction ───────────────────────────────────────────
    let dragging = false
    let prev = { x: 0, y: 0 }
    let vel = { x: 0, y: 0 }
    let targetZ = camera.position.z

    const getXY = (e) => e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY }

    const onDown = (e) => {
      dragging = true
      prev = getXY(e)
      vel = { x: 0, y: 0 }
      mount.style.cursor = 'grabbing'
    }
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
    const onWheel = (e) => {
      e.preventDefault()
      targetZ = Math.min(7, Math.max(1.4, targetZ + e.deltaY * 0.004))
    }

    mount.addEventListener('mousedown', onDown)
    mount.addEventListener('touchstart', onDown, { passive: true })
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    mount.addEventListener('wheel', onWheel, { passive: false })

    // ── Animation loop ────────────────────────────────────────
    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!dragging) {
        earth.rotation.y += 0.0015
        clouds.rotation.y += 0.0018
        vel.x *= 0.92
        vel.y *= 0.92
        earth.rotation.y += vel.y
        earth.rotation.x = Math.max(-0.6, Math.min(0.6, earth.rotation.x + vel.x))
        clouds.rotation.x = earth.rotation.x
      }
      camera.position.z += (targetZ - camera.position.z) * 0.08
      renderer.render(scene, camera)
    }
    animate()

    // ── Resize ────────────────────────────────────────────────
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
    <section id="earth" style={{ background: '#050510', padding: '4rem 0 2rem' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="shimmer-text" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Global Reach
        </h2>
        <p style={{ color: '#718096' }}>Drag to rotate · Scroll to zoom</p>
      </div>
      <div
        ref={mountRef}
        style={{ width: '100%', height: '600px', cursor: 'grab' }}
      />
    </section>
  )
}