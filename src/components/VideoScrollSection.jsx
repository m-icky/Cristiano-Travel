import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleField from './ParticleField'

gsap.registerPlugin(ScrollTrigger)

// Frame image sequence loader
// User should place frames as: /frames/frame_001.jpg, frame_002.jpg, etc.
// This component handles both: actual frames OR a graceful fallback gradient
const TOTAL_FRAMES = 192 // Extracted from cristiano.mp4 (8s @ 24fps)
const FRAME_PATH = (i) => `/frames/frame_${String(i).padStart(3, '0')}.jpg`

export default function VideoScrollSection() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const canvasRef = useRef(null)
  const overlayRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const labelRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const [framesLoaded, setFramesLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const framesRef = useRef([])
  const currentFrameRef = useRef(0)
  const isUsingFrames = useRef(false)

  // Attempt to load frames
  useEffect(() => {
    let loaded = 0
    let failed = 0
    const frames = []

    const checkIfFramesExist = () => {
      const testImg = new Image()
      testImg.onload = () => {
        isUsingFrames.current = true
        // Load all frames
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
          const img = new Image()
          img.onload = () => {
            frames[i - 1] = img
            loaded++
            setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
            if (loaded === TOTAL_FRAMES) {
              framesRef.current = frames
              setFramesLoaded(true)
              drawFrame(0)
            }
          }
          img.onerror = () => {
            failed++
            loaded++
            if (loaded === TOTAL_FRAMES) {
              framesRef.current = frames.filter(Boolean)
              setFramesLoaded(true)
            }
          }
          img.src = FRAME_PATH(i)
        }
      }
      testImg.onerror = () => {
        // No frames — use gradient fallback
        isUsingFrames.current = false
        setFramesLoaded(true)
        drawFallback(0)
      }
      testImg.src = FRAME_PATH(1)
    }

    checkIfFramesExist()
  }, [])

  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const frames = framesRef.current
    if (!frames[frameIndex]) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const img = frames[frameIndex]
    const { width: cw, height: ch } = canvas
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const dw = img.naturalWidth * scale
    const dh = img.naturalHeight * scale
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
  }

  const drawFallback = (progress) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { width: w, height: h } = canvas

    // Cinematic gradient that shifts based on scroll
    const r1 = Math.floor(26 + progress * 20)
    const g1 = Math.floor(26 + progress * 10)
    const b1 = Math.floor(26)

    const grad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.8)
    grad.addColorStop(0, `rgba(${r1 + 60}, ${g1 + 30}, ${b1 + 10}, 1)`)
    grad.addColorStop(0.4, `rgba(${r1 + 30}, ${g1 + 15}, ${b1}, 1)`)
    grad.addColorStop(1, `rgba(${r1}, ${g1}, ${b1}, 1)`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    // Dust particles for atmosphere
    ctx.fillStyle = `rgba(200, 169, 126, ${0.03 + progress * 0.04})`
    for (let i = 0; i < 40; i++) {
      const px = (Math.sin(i * 2.3 + progress * 3) * 0.5 + 0.5) * w
      const py = (Math.cos(i * 1.7 + progress * 2) * 0.5 + 0.5) * h
      const size = Math.max(0, 1 + Math.sin(i * 0.9) * 1.5)
      ctx.beginPath()
      ctx.arc(px, py, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (!isUsingFrames.current) {
        drawFallback(0)
      } else {
        drawFrame(currentFrameRef.current)
      }
    }
    setSize()
    window.addEventListener('resize', setSize)
    return () => window.removeEventListener('resize', setSize)
  }, [framesLoaded])

  // Ref for the hero content wrapper (for left→right animation)
  const contentWrapperRef = useRef(null)

  // GSAP scroll-driven frame animation
  useEffect(() => {
    if (!framesLoaded) return

    const section = sectionRef.current
    const sticky = stickyRef.current
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    const contentWrapper = contentWrapperRef.current

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initial draw
    if (isUsingFrames.current && framesRef.current[0]) {
      drawFrame(0)
    } else {
      drawFallback(0)
    }

    // Scroll-driven frame sequence
    const frameObj = { frame: 0, progress: 0 }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        frameObj.progress = progress

        if (isUsingFrames.current) {
          const totalFrames = framesRef.current.length - 1
          const frame = Math.min(
            Math.floor(progress * totalFrames),
            totalFrames
          )
          if (frame !== currentFrameRef.current) {
            currentFrameRef.current = frame
            drawFrame(frame)
          }
        } else {
          drawFallback(progress)
        }

        // Overlay opacity: darken slightly mid-scroll, lift at end
        if (overlay) {
          const overOpacity = 0.15 + progress * 0.35
          overlay.style.opacity = overOpacity
        }

        // Content position: left side for first half, slide to right side at halfway
        if (contentWrapper) {
          // progress 0→0.5 = left side, 0.5→1 = right side
          // Smooth transition zone between 0.35 and 0.65
          let shiftProgress = 0
          if (progress <= 0.35) {
            shiftProgress = 0
          } else if (progress >= 0.65) {
            shiftProgress = 1
          } else {
            const raw = (progress - 0.35) / 0.3
            shiftProgress = raw * raw * (3 - 2 * raw) // smoothstep
          }

          // Calculate how far to shift: wrapper width minus inner content width
          const innerDiv = contentWrapper.firstElementChild
          if (innerDiv) {
            const wrapperWidth = contentWrapper.clientWidth
            const padding = parseFloat(getComputedStyle(contentWrapper).paddingLeft) || 0
            const innerWidth = innerDiv.offsetWidth
            const maxShift = wrapperWidth - innerWidth - padding * 2
            innerDiv.style.transform = `translateX(${shiftProgress * maxShift}px)`
            innerDiv.style.opacity = 1

            // Align all flex children and text to the right when shifted
            const isRight = shiftProgress > 0.5
            innerDiv.style.alignItems = isRight ? 'flex-end' : 'flex-start'

            // Right-align the heading text
            const heading = headingRef.current
            if (heading) {
              heading.style.textAlign = isRight ? 'right' : 'left'
            }

            // Right-align the sub-paragraph text and push it right
            const subP = subRef.current
            if (subP) {
              subP.style.textAlign = isRight ? 'right' : 'left'
              subP.style.marginLeft = isRight ? 'auto' : '0'
            }

            // Right-align the label row
            const label = labelRef.current
            if (label) {
              label.style.justifyContent = isRight ? 'flex-end' : 'flex-start'
              label.style.flexDirection = isRight ? 'row-reverse' : 'row'
            }

            // Right-align the CTA buttons row
            const cta = ctaRef.current
            if (cta) {
              cta.style.justifyContent = isRight ? 'flex-end' : 'flex-start'
            }
          }
        }
      },
    })

    // Initial entrance - start immediately visible with a gentle slide up
    gsap.from(
      [labelRef.current, headingRef.current, subRef.current, ctaRef.current],
      { y: 30, stagger: 0.1, duration: 1.2, ease: 'power3.out' }
    )

    // Scroll indicator pulse
    gsap.to(scrollIndicatorRef.current, {
      y: 12,
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut',
      delay: 4,
    })

    return () => {
      st.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [framesLoaded])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="video-scroll-section"
      style={{ height: `${TOTAL_FRAMES * 3}vh` }}
    >
      {/* Sticky container */}
      <div ref={stickyRef} className="frame-sequence-container">
        {/* Canvas - frame playback */}
        <canvas
          ref={canvasRef}
          className="frame-canvas"
          style={{ zIndex: 1 }}
        />

        {/* Gradient overlay */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(26,26,26,0.3) 0%, rgba(26,26,26,0.1) 40%, rgba(26,26,26,0.6) 100%)',
            zIndex: 2,
            opacity: 0.3,
            transition: 'opacity 0.1s',
          }}
        />

        {/* Particles */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
          <ParticleField count={50} color="#C8A97E" opacity={0.25} />
        </div>

        {/* Hero content */}
        <div
          ref={contentWrapperRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 'clamp(2rem, 6vw, 8rem)',
          }}
        >
          <div style={{
            maxWidth: '720px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            willChange: 'transform',
          }}>
            {/* Label */}
            <div
              ref={labelRef}
              style={{ opacity: 1 }}
              className="flex items-center gap-3 mb-6"
            >
              <span
                style={{
                  display: 'block',
                  width: '2rem',
                  height: '1px',
                  background: 'var(--gold)',
                }}
              />
              <span
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                }}
              >
                Cristiano Travel
              </span>
            </div>

            {/* Main Heading */}
            <h1
              ref={headingRef}
              style={{
                opacity: 1,
                fontFamily: 'DxLactos, "Playfair Display", serif',
                fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                color: 'var(--cashmere)',
                letterSpacing: '-0.01em',
                marginBottom: '1.5rem',
              }}
            >
              Guiding Journeys<br />
              <em style={{ fontStyle: 'italic', color: 'var(--sienna-light)', fontWeight: 600 }}>
                That Transform
              </em>{' '}
              Lives
            </h1>

            {/* Sub */}
            <p
              ref={subRef}
              style={{
                opacity: 1,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                color: 'rgba(232,220,200,0.75)',
                maxWidth: '520px',
                lineHeight: 1.75,
                marginBottom: '2.5rem',
                fontWeight: 300,
              }}
            >
              Travel, spirituality, wellness, and global experiences
              crafted with care and purpose.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} style={{ opacity: 1 }} className="flex flex-wrap gap-4">
              <a
                href="#founder"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#founder')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-luxury btn-luxury-filled"
              >
                Explore Her Journey
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </a>
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-luxury"
              >
                Start Your Journey
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--oak)',
            }}
          >
            Scroll
          </span>
          <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
            <rect x="1" y="1" width="16" height="26" rx="8" stroke="var(--oak)" strokeWidth="1"/>
            <circle cx="9" cy="8" r="2.5" fill="var(--sienna-light)"/>
          </svg>
        </div>

        {/* Frame counter — only shows when no frames loaded as indicator */}
        {!isUsingFrames.current && framesLoaded && (
          <div
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              right: '2rem',
              zIndex: 10,
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              color: 'rgba(200,169,126,0.4)',
            }}
          >
            Add /public/frames/frame_001.jpg ... frame_{TOTAL_FRAMES.toString().padStart(3, '0')}.jpg
          </div>
        )}
      </div>
    </section>
  )
}
