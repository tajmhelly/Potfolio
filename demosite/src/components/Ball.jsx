import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Decal, Float, Preload, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import CanvasLoader from './CanvasLoader'

// Single ball — uses R3F pointer events so no extra canvas per ball
export const SkillBall = ({ position, imgUrl }) => {
  const groupRef = useRef()
  const isDragging = useRef(false)
  const prev = useRef({ x: 0, y: 0 })
  const [decal] = useTexture([imgUrl])

  useFrame(() => {
    if (!groupRef.current) return
    if (!isDragging.current) {
      // lerp rotation back to origin
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.06)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.06)
    }
  })

  const onDown = (e) => {
    e.stopPropagation()
    isDragging.current = true
    prev.current = { x: e.clientX, y: e.clientY }
  }

  const onMove = (e) => {
    if (!isDragging.current) return
    const dx = e.clientX - prev.current.x
    const dy = e.clientY - prev.current.y
    groupRef.current.rotation.y += dx * 0.012
    groupRef.current.rotation.x += dy * 0.012
    prev.current = { x: e.clientX, y: e.clientY }
  }

  const onUp = () => { isDragging.current = false }

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 0, 1]} intensity={0.8} />
        <pointLight position={[2, 2, 2]} intensity={0.4} color='#915EFF' />
        <mesh
          scale={1.15}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          castShadow
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color='#0d2a5e'
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
            roughness={0.4}
            metalness={0.3}
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={decal}
          />
        </mesh>
      </Float>
    </group>
  )
}

function useResponsive() {
  const get = () => window.innerWidth < 768
    ? { cols: 6, gap: 2.0, rowH: 130 }
    : { cols: 6, gap: 3.2, rowH: 160 }
  const [val, setVal] = useState(get)
  useEffect(() => {
    const handler = () => setVal(get())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return val
}

const BallGrid = ({ skills, cols, gap }) => {
  return skills.map((skill, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const totalCols = Math.min(skills.length, cols)
    const x = (col - (totalCols - 1) / 2) * gap
    const y = -(row - (Math.ceil(skills.length / cols) - 1) / 2) * gap
    return <SkillBall key={skill.name} position={[x, y, 0]} imgUrl={skill.icon} />
  })
}

export const TechCanvas = ({ skills }) => {
  const { cols, gap, rowH } = useResponsive()
  const rows = Math.ceil(skills.length / cols)
  const height = Math.max(240, rows * rowH)
  const camZ = rows > 1 ? (gap < 3 ? 12 : 14) : 9

  return (
    <div style={{ width: '100%', height }}>
      <Canvas
        frameloop='always'
        dpr={[1, 2]}
        camera={{ position: [0, 0, camZ], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <BallGrid skills={skills} cols={cols} gap={gap} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}
