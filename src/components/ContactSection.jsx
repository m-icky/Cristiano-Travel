import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [status, setStatus] = useState('') // '', 'submitting', 'success', 'error'
  const [message, setMessage] = useState('')

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
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

  // Define common styles for the luxury aesthetic
  const inputStyle = {
    width: '100%',
    padding: '1.2rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(200, 169, 126, 0.2)', // Sienna/Gold subtle border
    borderRadius: '2px',
    color: 'var(--cashmere)',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, background 0.3s ease',
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        background: 'var(--charcoal)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          maxWidth: '600px',
          maxHeight: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(160,82,45,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--sienna)' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--sienna-light)', fontFamily: 'DM Sans' }}>
              Let's Connect
            </span>
            <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--sienna)' }} />
          </div>
          
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 800,
              color: 'var(--cashmere)',
              letterSpacing: '-0.01em',
            }}
          >
            Get In <em style={{ color: 'var(--sienna-light)', fontStyle: 'italic' }}>Touch</em>
          </h2>
        </div>

        {/* Contact Form */}
        <div ref={formRef}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'none' }}>Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name *"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--sienna)'
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(200, 169, 126, 0.2)'
                    e.target.style.background = 'rgba(255, 255, 255, 0.03)'
                  }}
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'none' }}>Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email *"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--sienna)'
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(200, 169, 126, 0.2)'
                    e.target.style.background = 'rgba(255, 255, 255, 0.03)'
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="inquiry" style={{ display: 'none' }}>Inquiry Type</label>
              <select
                name="inquiry_type"
                id="inquiry"
                required
                defaultValue=""
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  color: 'rgba(232, 220, 200, 0.8)',
                  // Add a small dropdown arrow via CSS background if desired
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--sienna)'
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(200, 169, 126, 0.2)'
                  e.target.style.background = 'rgba(255, 255, 255, 0.03)'
                }}
              >
                <option value="" disabled>Nature of Inquiry *</option>
                <option value="India Trip Planning" style={{ color: '#000' }}>India Trip Planning</option>
                <option value="Study Abroad Enquiry" style={{ color: '#000' }}>Study Abroad Enquiry</option>
                <option value="Nadijodtheshm Consultation" style={{ color: '#000' }}>Nadijodtheshm Consultation</option>
                <option value="Other Inquiry" style={{ color: '#000' }}>Other Inquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'none' }}>Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="How can we help you? *"
                required
                rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--sienna)'
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(200, 169, 126, 0.2)'
                  e.target.style.background = 'rgba(255, 255, 255, 0.03)'
                }}
              />
            </div>

            {/* Form Message */}
            {message && (
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '2px',
                  background: status === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                  color: status === 'success' ? '#81c784' : '#e57373',
                  fontSize: '0.9rem',
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
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                padding: '1.2rem 2rem',
                borderRadius: '2px',
                marginTop: '1rem',
                opacity: status === 'submitting' ? 0.7 : 1,
                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                boxShadow: '0 0 40px rgba(160,82,45,0.2)',
                border: 'none',
              }}
            >
              {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
