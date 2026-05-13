import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ParticleField from './ParticleField'

gsap.registerPlugin(ScrollTrigger)

const ctaButtons = [
  { label: 'Plan Your India Trip', icon: '→', href: 'mailto:hello@cristianotravel.com?subject=India Trip Enquiry&body=Hello Cristiano Travel Team,%0D%0A%0D%0AI would like to inquire about planning an India trip.%0D%0A%0D%0AName: %0D%0AContact Number: %0D%0APreferred Travel Dates: %0D%0ANumber of Travelers: %0D%0A%0D%0APlease let me know how we can proceed.' },
  { label: 'Study Abroad Enquiry', icon: '→', href: 'mailto:hello@cristianotravel.com?subject=Study Abroad Enquiry&body=Hello Cristiano Travel Team,%0D%0A%0D%0AI am reaching out to get more information about your Study Abroad programs.%0D%0A%0D%0AName: %0D%0AContact Number: %0D%0ACurrent Education Level: %0D%0APreferred Country/Course: %0D%0A%0D%0APlease provide me with more details.' },
  { label: 'Book Nadijodtheshm Consultation', icon: '✦', route: '/nadijodtheshm' },
]

export default function CTASection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    let ctx = gsap.context(() => {
      const children = contentRef.current?.children
      if (!children) return

      gsap.fromTo(
        Array.from(children),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 12vw, 12rem) 0',
        background: 'linear-gradient(180deg, #111 0%, var(--charcoal) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <ParticleField count={60} color="#C4A55A" opacity={0.2} />
      </div>

      {/* Decorative gradients */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '60vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(160,82,45,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
        }}
      >
        {/* Label */}
        <div
          style={{ opacity: 0 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--sienna)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--sienna-light)', fontFamily: 'DM Sans' }}>
            Begin Your Journey
          </span>
          <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--sienna)' }} />
        </div>

        {/* Heading */}
        <h2
          style={{
            opacity: 0,
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--cashmere)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}
        >
          Start Your Journey<br />
          <em style={{ color: 'var(--sienna-light)', fontStyle: 'italic' }}>With Us</em>
        </h2>

        {/* Description */}
        <p
          style={{
            opacity: 0,
            fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)',
            color: 'rgba(232,220,200,0.6)',
            lineHeight: 1.85,
            fontWeight: 300,
            maxWidth: '560px',
            margin: '0 auto 3.5rem',
          }}
        >
          Whether you are planning to study abroad, explore India, or experience traditional wellness guidance, we are here to guide every step of your journey.
        </p>

        {/* Buttons */}
        <div
          style={{ opacity: 0 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4"
        >
          {ctaButtons.map((btn, i) => (
            <motion.a
              key={btn.label}
              href={btn.href || btn.route}
              onClick={btn.route ? (e) => { e.preventDefault(); navigate(btn.route); } : undefined}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className={`btn-luxury ${i === 0 ? 'btn-luxury-filled' : ''}`}
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                padding: '0.9rem 2rem',
                borderRadius: '2px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: i === 0 ? '0 0 40px rgba(160,82,45,0.3)' : 'none',
              }}
            >
              {btn.label}
              <span style={{ opacity: 0.7 }}>{btn.icon}</span>
            </motion.a>
          ))}
        </div>

        {/* Trust indicators */}
        <div
          style={{
            opacity: 0,
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(2rem, 5vw, 4rem)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '500+', label: 'Travelers Guided' },
            { num: '8+', label: 'Years Experience' },
            { num: '20+', label: 'Countries Served' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  color: 'var(--sienna-light)',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,169,126,0.5)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
