import './index.css'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Feature from './components/Feature'
import Feedbacks from './components/Feedbacks'
import Footer from './components/Footer'
import { useLazyMount } from './hooks/useLazyMount'

const Tech = lazy(() => import('./components/Tech'))
const Earth = lazy(() => import('./components/Earth'))

const LazySection = ({ component: Component, minHeight }) => {
  const [ref, mounted] = useLazyMount()
  return (
    <div ref={ref} style={{ minHeight: mounted ? undefined : minHeight }}>
      {mounted && (
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      )}
    </div>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <LazySection component={Tech} minHeight={500} />
      <Feature />
      <Feedbacks />
      <LazySection component={Earth} minHeight={700} />
      <Footer />
    </>
  )
}

export default App
