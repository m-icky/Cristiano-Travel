import { motion } from 'framer-motion'
import logoImg from '../assets/Trans-logo.png'
import footerBg from '../assets/footer-bg.svg'
import { 
  PiInstagramLogo, 
  PiWhatsappLogo, 
  PiFacebookLogo, 
  PiEnvelopeSimple, 
  PiPhone, 
  PiMapPin 
} from 'react-icons/pi'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Founder', href: '#founder' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Nadijodtheshm', href: '#nadijodtheshm' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#cta' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: <PiInstagramLogo size={20} />,
  },
  {
    label: 'WhatsApp',
    href: '#',
    icon: <PiWhatsappLogo size={20} />,
  },
  {
    label: 'Facebook',
    href: '#',
    icon: <PiFacebookLogo size={20} />,
  },
  {
    label: 'Email',
    href: 'mailto:hello@cristianotravel.com?subject=Inquiry via Website&body=Hello Cristiano Travel Team,%0D%0A%0D%0A[Please write your message here]%0D%0A%0D%0AName: %0D%0AContact Number: %0D%0A',
    icon: <PiEnvelopeSimple size={20} />,
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
        backgroundColor: 'rgb(178 132 80)', // Matches SVG top fill
        borderTop: '1px solid rgba(200,169,126,0.1)',
        padding: 'clamp(3rem, 6vw, 5rem) 0 2rem',
        position: 'relative',
      }}
    >

       <div
        style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${footerBg})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.2, // Adjust opacity here
        zIndex: 0,
        }}
      />

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
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoImg}
                alt="Cristiano Travel Logo"
                style={{
                  height: '52px',
                  width: 'auto',
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                }}
                onClick={(e) => handleAnchor(e, '#home')}
              />
            </div>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'hsla(0, 0%, 100%, 0.9)',
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: '320px',
                marginBottom: '2rem',
              }}
            >
              Guiding journeys that transform lives through authentic India experiences and traditional wellness.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, color: 'var(--oak)' }}
                  transition={{ duration: 0.2 }}
                  aria-label={social.label}
                  style={{
                    color: 'rgba(255, 255, 255, 1)',
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
          <div className="flex flex-col items-center md:items-start">
            <h4
              style={{
                fontSize: '0.9rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'white',
                marginBottom: '1.5rem',
                fontWeight: 600,
              }}
            >
              Navigation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-y-4 text-center md:text-left">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="nav-link"
                  style={{ 
                    fontSize: '1rem',
                    textTransform: 'none',
                    letterSpacing: '0.02em',
                    opacity: 0.9
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-12 md:gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4
                style={{
                  fontSize: '0.9rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'white',
                  marginBottom: '1.5rem',
                  fontWeight: 600,
                }}
              >
                Contact
              </h4>
              <div className="flex flex-col gap-5">
                {[
                  { icon: <PiEnvelopeSimple />, text: 'hello@cristianotravel.com', href: 'mailto:hello@cristianotravel.com?subject=Inquiry via Website&body=Hello Cristiano Travel Team,%0D%0A%0D%0AName: %0D%0AContact Number: %0D%0A' },
                  { icon: <PiPhone />, text: '+91 XXXXX XXXXX', href: 'tel:+91XXXXXXXXXX' },
                  { icon: <PiMapPin />, text: 'Kerala, India', href: '#' },
                ].map((contact) => (
                  <a
                    key={contact.text}
                    href={contact.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '1rem',
                      cursor: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--oak)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                  >
                    <span style={{ color: '#ffffff', fontSize: '1.2rem', display: 'flex' }}>{contact.icon}</span>
                    {contact.text}
                  </a>
                ))}
              </div>
            </div>

            {/* Services quick links */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4
                style={{
                  fontSize: '0.9rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'white',
                  marginBottom: '1.5rem',
                  fontWeight: 600,
                }}
              >
                Services
              </h4>
              <div className="flex flex-col gap-3">
                {['India Travel Programs', 'Student Guidance', 'Nadijodtheshm Consultation', 'Wellness Journeys'].map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.8)',
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
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.6)',
              letterSpacing: '0.05em',
            }}
          >
            © {new Date().getFullYear()} Cristiano Travel. All rights reserved.
          </p>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            India · Wellness · Transformation · Spirituality
          </p>
        </div>
      </div>
    </footer>
  )
}
