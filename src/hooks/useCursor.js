import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function useCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let raf

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
    }

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
      gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y })
      raf = requestAnimationFrame(animateRing)
    }

    const onMouseEnterLink = () => {
      gsap.to(ring, { scale: 1.8, borderColor: 'var(--sienna-light)', duration: 0.3 })
      gsap.to(dot, { scale: 0.5, duration: 0.3 })
    }
    const onMouseLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: 'var(--oak)', duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMouseMove)
    raf = requestAnimationFrame(animateRing)

    const links = document.querySelectorAll('a, button, .btn-luxury, [data-cursor]')
    links.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { dotRef, ringRef }
}
