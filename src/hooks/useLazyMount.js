import { useEffect, useRef, useState } from 'react'

export const useLazyMount = (rootMargin = '300px') => {
  const [mounted, setMounted] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMounted(true); observer.disconnect() } },
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, mounted]
}
