import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ParticleField from './ParticleField'
import { PiArrowRight, PiSparkle } from 'react-icons/pi'

gsap.registerPlugin(ScrollTrigger)

const ctaButtons = [
  { label: 'Plan Your India Trip', icon: <PiArrowRight />, href: 'mailto:hello@cristianotravel.com?subject=India Trip Enquiry&body=Hello Cristiano Travel Team,%0D%0A%0D%0AI would like to inquire about planning an India trip.%0D%0A%0D%0AName: %0D%0AContact Number: %0D%0APreferred Travel Dates: %0D%0ANumber of Travelers: %0D%0A%0D%0APlease let me know how we can proceed.' },
  { label: 'Study Abroad Enquiry', icon: <PiArrowRight />, href: 'mailto:hello@cristianotravel.com?subject=Study Abroad Enquiry&body=Hello Cristiano Travel Team,%0D%0A%0D%0AI am reaching out to get more information about your Study Abroad programs.%0D%0A%0D%0AName: %0D%0AContact Number: %0D%0ACurrent Education Level: %0D%0APreferred Country/Course: %0D%0A%0D%0APlease provide me with more details.' },
  { label: 'Nadijodtheshm', icon: <PiSparkle />, href: '#nadijodtheshm' },
]

export default function ConnectSection() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const navigate = useNavigate()
  
  const [status, setStatus] = useState('') // '', 'submitting', 'success', 'error'
  const [message, setMessage] = useState('')

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Left side animation
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      )

      // Right side animation
      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setMessage('')
    
    // IMPORTANT: Get your access key from web3forms.com and replace the placeholder below
    const accessKey = 'web3forms key' 
    
    if (accessKey === 'web3forms key') {
      setStatus('error')
      setMessage('Please configure your Web3Forms access key.')
      return
    }

    const formData = new FormData(e.target)
    formData.append('access_key', accessKey)
    formData.append('subject', `New Contact from ${formData.get('name')} via Cristiano Travel`)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      
      if (data.success) {
        setStatus('success')
        setMessage('Thank you for reaching out. We will get back to you shortly.')
        e.target.reset()
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Network error. Please try again later.')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(139, 69, 19, 0.1)',
    borderRadius: '8px',
    color: '#1a1a1a',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '0.85rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  }

  const handleAnchor = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <ParticleField count={40} color="#C4A55A" opacity={0.15} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Side: CTA Content */}
          <div ref={leftRef}>
            <div className="flex items-center gap-3 mb-6">
              <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--sienna)' }} />
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--sienna-light)', fontFamily: 'DM Sans' }}>
                Begin Your Journey
              </span>
            </div>

            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: 'var(--sienna-dark)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              Start Your Journey<br />
              <em style={{ color: 'var(--sienna-light)', fontStyle: 'italic' }}>With Us</em>
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                color: '#8B4513',
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: '3rem',
                maxWidth: '500px'
              }}
            >
              Whether you are planning to study abroad, explore India, or experience traditional wellness guidance, we are here to guide every step of your journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {ctaButtons.map((btn, i) => (
                <motion.a
                  key={btn.label}
                  href={btn.href}
                  onClick={(e) => handleAnchor(e, btn.href)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`btn-luxury ${i === 0 ? 'btn-luxury-filled' : ''}`}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.85rem 1.8rem',
                    boxShadow: i === 0 ? '0 0 40px rgba(160,82,45,0.2)' : 'none',
                    color: i === 3 || i === 0 ? "var(--oak)" : "var(--cashmere)",
                  }}
                >
                  {btn.label}
                  <span className="ml-2">{btn.icon}</span>
                </motion.a>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 border-t border-[rgba(200,169,126,0.1)] pt-10">
              {[
                { num: '500+', label: 'Travelers' },
                { num: '8+', label: 'Years' },
                { num: '20+', label: 'Countries' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      color: 'var(--sienna-light)',
                      lineHeight: 1,
                      marginBottom: '0.3rem',
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--cashmere)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form with Glassmorphism */}
          <div ref={rightRef} className="glass" style={{
            padding: 'clamp(2rem, 4vw, 4rem)',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 20px 40px rgba(139, 69, 19, 0.08)',
          }}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--sienna)' }} />
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--sienna-light)', fontFamily: 'DM Sans' }}>
                  Let's Connect
                </span>
              </div>
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  color: 'var(--sienna-dark)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1
                }}
              >
                Get In <em style={{ color: 'var(--sienna-light)', fontStyle: 'italic' }}>Touch</em>
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  style={inputStyle}
                  className="focus:border-[var(--sienna)] focus:bg-[rgba(255,255,255,0.05)]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  required
                  style={inputStyle}
                  className="focus:border-[var(--sienna)] focus:bg-[rgba(255,255,255,0.05)]"
                />
              </div>

              <select
                name="inquiry_type"
                required
                defaultValue=""
                style={inputStyle}
                className="focus:border-[var(--sienna)] focus:bg-[rgba(255,255,255,0.05)]"
              >
                <option value="" disabled>Nature of Inquiry *</option>
                <option value="India Trip Planning" style={{ color: '#000' }}>India Trip Planning</option>
                <option value="Study Abroad Enquiry" style={{ color: '#000' }}>Study Abroad Enquiry</option>
                <option value="Nadijodtheshm Consultation" style={{ color: '#000' }}>Nadijodtheshm Consultation</option>
                <option value="Other Inquiry" style={{ color: '#000' }}>Other Inquiry</option>
              </select>

              <textarea
                name="message"
                placeholder="How can we help you? *"
                required
                rows={4}
                style={{ ...inputStyle, resize: 'none' }}
                className="focus:border-[var(--sienna)] focus:bg-[rgba(255,255,255,0.05)]"
              />

              {message && (
                <div
                  style={{
                    padding: '0.8rem',
                    borderRadius: '2px',
                    background: status === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                    color: status === 'success' ? '#81c784' : '#e57373',
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    border: `1px solid ${status === 'success' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`
                  }}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-luxury btn-luxury-filled"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  padding: '1rem 2rem',
                  borderRadius: '2px',
                  opacity: status === 'submitting' ? 0.7 : 1,
                  width: '100%',
                  border: 'none',
                  justifyContent: 'center',
                  color: 'var(--oak)',
                }}
              >
                {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
