import { motion } from 'framer-motion'
import logoImg from '../assets/Trans-logo.png'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Founder', href: '#founder' },
  { label: 'Journey', href: '#journey' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#cta' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@cristianotravel.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const handleAnchor = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: '#0D0B09',
        borderTop: '1px solid rgba(200,169,126,0.1)',
        padding: 'clamp(3rem, 6vw, 5rem) 0 2rem',
        position: 'relative',
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--sienna), var(--gold), var(--sienna), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logoImg}
                alt="Cristiano Travel Logo"
                style={{
                  height: '42px',
                  width: 'auto',
                  display: 'block',
                }}
                onClick={(e) => handleAnchor(e, '#home')}
              />
            </div>
            <p
              style={{
                fontSize: '0.83rem',
                color: 'rgba(232,220,200,0.45)',
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: '260px',
                marginBottom: '1.5rem',
              }}
            >
              Guiding journeys that transform lives through authentic India experiences, student guidance, and traditional wellness.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, color: 'var(--sienna-light)' }}
                  transition={{ duration: 0.2 }}
                  aria-label={social.label}
                  style={{
                    color: 'rgba(200,169,126,0.5)',
                    cursor: 'none',
                    padding: '0.4rem',
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--oak)',
                marginBottom: '1.5rem',
              }}
            >
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="nav-link"
                  style={{ width: 'fit-content' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--oak)',
                marginBottom: '1.5rem',
              }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { icon: '✉', text: 'hello@cristianotravel.com', href: 'mailto:hello@cristianotravel.com' },
                { icon: '☎', text: '+91 XXXXX XXXXX', href: 'tel:+91XXXXXXXXXX' },
                { icon: '◈', text: 'Kerala, India', href: '#' },
              ].map((contact) => (
                <a
                  key={contact.text}
                  href={contact.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'rgba(232,220,200,0.5)',
                    fontSize: '0.83rem',
                    cursor: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--cashmere)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(232,220,200,0.5)'}
                >
                  <span style={{ color: 'var(--sienna-light)', fontSize: '0.9rem' }}>{contact.icon}</span>
                  {contact.text}
                </a>
              ))}
            </div>

            {/* Services quick links */}
            <div style={{ marginTop: '2rem' }}>
              <h4
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--oak)',
                  marginBottom: '1rem',
                }}
              >
                Services
              </h4>
              <div className="flex flex-col gap-2">
                {['India Travel Programs', 'Student Guidance', 'Nadijodtheshm Consultation', 'Wellness Journeys'].map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: '0.78rem',
                      color: 'rgba(232,220,200,0.35)',
                      lineHeight: 1.5,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(200,169,126,0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              color: 'rgba(200,169,126,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            © {new Date().getFullYear()} Cristiano Travel. All rights reserved.
          </p>
          <p
            style={{
              fontSize: '0.65rem',
              color: 'rgba(200,169,126,0.2)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            ✦ India · Wellness · Transformation · Spirituality
          </p>
        </div>
      </div>
    </footer>
  )
}
