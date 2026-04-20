import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from './CanvasLoader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  return (
    <mesh>
      <hemisphereLight intensity={2} groundColor='#ffffff' />
      <ambientLight intensity={2} />
      <spotLight position={[0, 20, 10]} angle={0.3} penumbra={0.5} intensity={4} castShadow shadow-mapSize={1024} />
      <pointLight position={[10, 10, 10]} intensity={3} />
      <pointLight position={[-10, 5, 5]} intensity={2} color='#915EFF' />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const AutoResetControls = ({ isMobile }) => {
  const controlsRef = useRef()
  const interacting = useRef(false)

  useFrame(() => {
    const c = controlsRef.current
    if (!c || interacting.current) return
    const az = c.getAzimuthalAngle()
    if (Math.abs(az) > 0.001) {
      c.setAzimuthalAngle(az * 0.94)
      c.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enabled={!isMobile}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
      onStart={() => { interacting.current = true }}
      onEnd={() => { interacting.current = false }}
    />
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <Canvas frameloop='always' shadows dpr={[1, 2]} camera={{ position: [20, 3, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <AutoResetControls isMobile={isMobile} />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas