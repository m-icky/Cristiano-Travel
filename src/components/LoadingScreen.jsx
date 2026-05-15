import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import logoImg from '../assets/Trans-logo.png'

export default function LoadingScreen({ onComplete }) {
  const counterRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setTimeout(onComplete, 300)
    })

    tl.to(barRef.current, {
      scaleX: 1,
      duration: 2.2,
      ease: 'power2.inOut',
    })

    let counter = { val: 0 }
    tl.to(counter, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.val)
        }
      }
    }, 0)
  }, [])

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Logo area */}
      <div className="text-center mb-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.img
          src={logoImg}
          alt="Cristiano Travel Logo"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
          style={{
            height: 'clamp(60px, 12vw, 100px)',
            width: 'auto',
            marginBottom: '1.5rem',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-display italic"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--oak)',
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          Journeys That Transform
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="w-64 md:w-96 relative">
        <div
          style={{
            height: '1px',
            background: 'rgba(200,169,126,0.2)',
            width: '100%',
          }}
        />
        <div
          ref={barRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '1px',
            width: '100%',
            background: 'linear-gradient(90deg, var(--sienna), var(--gold))',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />
        <div
          ref={counterRef}
          className="absolute right-0 top-4 text-xs font-body"
          style={{ color: 'var(--oak)', fontVariantNumeric: 'tabular-nums' }}
        >
          0
        </div>
      </div>

      {/* Decorative */}
      <div
        className="absolute bottom-12 text-xs tracking-[0.2em] uppercase"
        style={{ color: 'rgba(200,169,126,0.4)' }}
      >
        ✦ India · Wellness · Transformation ✦
      </div>
    </motion.div>
  )
}
