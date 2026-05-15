import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// Placeholder gallery items — user replaces src with actual images
const galleryItems = [
  { id: 1, label: 'Cultural Moments', aspect: '3/4', color: 'linear-gradient(135deg, #2A1A0E, #4A2E1A)' },
  { id: 2, label: 'Sacred Temples', aspect: '4/3', color: 'linear-gradient(135deg, #1B3A2D, #2A4A35)' },
  { id: 3, label: 'Travel Journeys', aspect: '3/4', color: 'linear-gradient(135deg, #3A2010, #5A3020)' },
  { id: 4, label: 'Wellness Sessions', aspect: '1/1', color: 'linear-gradient(135deg, #1A2A3A, #2A3A4A)' },
  { id: 5, label: 'India Heritage', aspect: '4/3', color: 'linear-gradient(135deg, #2A1810, #4A2A18)' },
  { id: 6, label: 'Client Stories', aspect: '3/4', color: 'linear-gradient(135deg, #1B2A1B, #2B3A2B)' },
  { id: 7, label: 'Airport Moments', aspect: '4/3', color: 'linear-gradient(135deg, #2A2010, #3A3018)' },
]

export default function GallerySection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalWidth + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Heading reveal
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery"
      style={{
        background: 'transparent',
        position: 'relative',
      }}
    >
      <div ref={sectionRef}>
      {/* Header */}
      <div
        ref={headingRef}
        style={{
          opacity: 0,
          position: 'absolute',
          top: '3rem',
          left: 'clamp(1.5rem, 5vw, 4rem)',
          zIndex: 10,
        }}
      >
        <div className="flex items-center gap-3 mb-2" style={{ opacity: 0.6 }}>
          <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--sienna)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--sienna-light)', fontFamily: 'DM Sans' }}>
            Gallery
          </span>
        </div>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--cashmere)',
          }}
        >
          Moments & Memories
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
            alignItems: 'center',
            willChange: 'transform',
          }}
        >
          {/* Intro card */}
          <div
            style={{
              minWidth: '280px',
              flexShrink: 0,
              paddingTop: '8rem',
            }}
          >
            <p
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                fontStyle: 'italic',
                color: 'rgba(232,220,200,0.5)',
                lineHeight: 1.7,
                maxWidth: '220px',
              }}
            >
              Every frame a memory, every memory a transformation.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--oak)' }}>Drag to explore</span>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path d="M0 5h18M14 1l4 4-4 4" stroke="var(--oak)" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {galleryItems.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Drag hint overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '3rem',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(200,169,126,0.3)',
        }}
      >
        ← Scroll to explore →
      </div>
      </div>
    </section>
  )
}

function GalleryItem({ item, index }) {
  const getHeight = (aspect) => {
    if (aspect === '3/4') return 'clamp(320px, 50vw, 480px)'
    if (aspect === '4/3') return 'clamp(240px, 35vw, 360px)'
    return 'clamp(280px, 42vw, 420px)'
  }

  const getWidth = (aspect) => {
    if (aspect === '3/4') return 'clamp(220px, 30vw, 340px)'
    if (aspect === '4/3') return 'clamp(300px, 40vw, 460px)'
    return 'clamp(260px, 36vw, 390px)'
  }

  const offsetY = [0, -40, 30, -20, 40, -30, 10][index % 7]

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: offsetY - 6 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="gallery-item"
      style={{
        minWidth: getWidth(item.aspect),
        height: getHeight(item.aspect),
        flexShrink: 0,
        transform: `translateY(${offsetY}px)`,
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'none',
        border: '1px solid rgba(200,169,126,0.1)',
      }}
      data-cursor
    >
      {/* Placeholder gradient — replace with <img src="..." /> */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: item.color,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '1.5rem',
          position: 'relative',
          transition: 'transform 0.8s ease',
        }}
      >
        {/* Shimmer overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(200,169,126,0.05) 0%, transparent 60%)',
          }}
        />

        {/* Image placeholder icon */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.15,
            fontSize: '3rem',
            color: 'var(--oak)',
          }}
        >
          ◈
        </div>

        {/* Label */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'rgba(26,26,26,0.6)',
            backdropFilter: 'blur(8px)',
            padding: '0.5rem 1rem',
            borderRadius: '2px',
          }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--cashmere)',
              fontFamily: 'DM Sans',
            }}
          >
            {item.label}
          </p>
        </div>

        {/* Hover note */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            fontSize: '0.6rem',
            color: 'rgba(200,169,126,0.3)',
            letterSpacing: '0.1em',
          }}
        >
          Add image
        </div>
      </div>
    </motion.div>
  )
}
