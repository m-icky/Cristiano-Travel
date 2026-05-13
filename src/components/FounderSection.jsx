import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import founderImg from '../assets/cristiano.jpg'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    icon: '✦',
    title: 'Global Student Guidance',
    text: 'Helping students confidently begin international education journeys.',
    accent: 'var(--sienna-light)',
  },
  {
    icon: '◈',
    title: 'Authentic India Experiences',
    text: 'Curated spiritual, cultural, wellness, and heritage travel programs.',
    accent: 'var(--gold)',
  },
  {
    icon: '◇',
    title: 'Nadijodtheshm Consultations',
    text: 'Ancient guidance practices integrated with modern wellness journeys.',
    accent: 'var(--oak)',
  },
]

export default function FounderSection() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const cardsRef = useRef([])
  const headingRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    // Image parallax
    gsap.to(imgRef.current, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    // Text reveal
    const lines = textRef.current?.querySelectorAll('.reveal-line')
    if (lines) {
      gsap.fromTo(lines,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.08,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
          },
        }
      )
    }

    // Cards stagger
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.12,
        }
      )
    })

    // Heading
    gsap.fromTo(headingRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="founder"
      style={{
        background: 'linear-gradient(180deg, var(--charcoal) 0%, #1F1A16 100%)',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        position: 'relative',
      }}
    >
      {/* Decorative top line */}
      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', marginBottom: '6rem' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div
          className="flex items-center gap-3 mb-4"
          style={{ opacity: 0.6 }}
        >
          <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--sienna)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--sienna-light)', fontFamily: 'DM Sans' }}>
            The Founder
          </span>
        </div>

        {/* Main layout: 2 col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT: Portrait */}
          <div
            ref={imgRef}
            className="relative"
            style={{ aspectRatio: '3/4', maxHeight: '680px' }}
          >
            {/* Background shape */}
            <div
              style={{
                position: 'absolute',
                inset: '-1.5rem',
                background: 'linear-gradient(135deg, var(--sienna) 0%, var(--bush) 100%)',
                borderRadius: '4px',
                opacity: 0.15,
                transform: 'rotate(-2deg)',
              }}
            />

            {/* Main image container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: '4px',
                border: '1px solid rgba(200,169,126,0.2)',
              }}
            >
              {/* Founder Image */}
              <img
                src={founderImg}
                alt="Cristiano"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Overlay for depth */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(26,26,26,0.7), transparent)',
                }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="glass"
              style={{
                position: 'absolute',
                bottom: '2rem',
                right: '-1.5rem',
                padding: '1rem 1.5rem',
                borderRadius: '4px',
              }}
            >
              <div style={{ fontSize: '1.6rem', fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'var(--cashmere)' }}>
                8+
              </div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--oak)' }}>
                Years of Experience
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Story */}
          <div ref={textRef} className="flex flex-col justify-start pt-4 lg:pt-8">

            <div ref={headingRef} style={{ opacity: 0, marginBottom: '2rem' }}>
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: 'var(--cashmere)',
                  marginBottom: '0.75rem',
                }}
              >
                More Than Travel —<br />
                <em style={{ color: 'var(--sienna-light)', fontStyle: 'italic' }}>
                  A Journey Guided
                </em>{' '}
                by Purpose
              </h2>
              <p
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  color: 'var(--gold)',
                  fontFamily: 'DM Sans',
                  fontStyle: 'italic',
                  opacity: 0.8,
                }}
              >
                Meet Christiane, the heart behind Cristiano Travel.
              </p>
            </div>

            {/* Story paragraphs */}
            {[
              'For years, Christiane has helped travelers discover India not just as a destination, but as a life-changing experience.',
              'What began as a personal passion for culture, spirituality, and meaningful human connection gradually transformed into Cristiano Travel — a platform designed to guide international visitors through authentic Indian experiences with trust, comfort, and care.',
              'From helping students explore global opportunities to organizing customized India journeys and traditional Nadijodtheshm consultations, her mission has always remained the same.',
            ].map((para, i) => (
              <div
                key={i}
                className="clip-text"
                style={{ marginBottom: '1rem', overflow: 'hidden' }}
              >
                <p
                  className="reveal-line"
                  style={{
                    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                    lineHeight: 1.85,
                    color: 'rgba(232,220,200,0.7)',
                    fontWeight: 300,
                    transform: 'translateY(100%)',
                    opacity: 0,
                  }}
                >
                  {para}
                </p>
              </div>
            ))}

            {/* Quote */}
            <div
              style={{
                margin: '1.5rem 0 2.5rem',
                padding: '1.25rem 0 1.25rem 1.5rem',
                borderLeft: '2px solid var(--sienna)',
              }}
            >
              <p
                className="reveal-line"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                  fontStyle: 'italic',
                  color: 'var(--cashmere)',
                  lineHeight: 1.6,
                  transform: 'translateY(100%)',
                  opacity: 0,
                }}
              >
                "To create journeys that heal, inspire, and transform."
              </p>
            </div>

            <div className="clip-text" style={{ overflow: 'hidden' }}>
              <p
                className="reveal-line"
                style={{
                  fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                  lineHeight: 1.85,
                  color: 'rgba(232,220,200,0.7)',
                  fontWeight: 300,
                  transform: 'translateY(100%)',
                  opacity: 0,
                }}
              >
                Today, Cristiano Travel serves travelers from different parts of the world who seek more than sightseeing — they seek connection, understanding, wellness, and unforgettable memories.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  ref={(el) => (cardsRef.current[i] = el)}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="glass"
                  style={{
                    opacity: 0,
                    padding: '1.5rem 1.25rem',
                    borderRadius: '4px',
                    cursor: 'default',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.2rem',
                      color: card.accent,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {card.icon}
                  </div>
                  <h4
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--cashmere)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'rgba(232,220,200,0.55)',
                      lineHeight: 1.6,
                    }}
                  >
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
