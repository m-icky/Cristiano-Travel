import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
      },
    })
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{
        width: '100%',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
      }}
    />
  )
}
