import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useNavigate, useLocation } from 'react-router-dom'
import logoImg from '../assets/Trans-logo.png';
const navLinks = [
  { label: 'Founder', href: '#founder' },
  { label: 'Nadijodtheshm', href: '#nadijodtheshm' },
  { label: 'Journey', href: '#journey' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#cta' },
]

export default function Navigation() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 2.8, ease: 'power3.out' }
    )

    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e, href) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  /* ── glass style objects ── */
  const glassBase = {
    background: scrolled
      ? 'rgba(22, 20, 17, 0.55)'
      : 'rgba(22, 20, 17, 0.25)',
    backdropFilter: 'blur(18px) saturate(1.6)',
    WebkitBackdropFilter: 'blur(18px) saturate(1.6)',
    border: '1px solid rgba(200, 169, 126, 0.12)',
    borderRadius: scrolled ? '0' : '9999px',
    boxShadow: scrolled
      ? '0 4px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)'
      : '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
    transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
  }

  return (
    <motion.nav
      ref={navRef}
      style={{ opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-[9990]"
    >
      <div
        style={{
          ...glassBase,
          margin: scrolled ? '0' : '1rem auto 0',
          maxWidth: scrolled ? '100%' : '72rem',
          padding: scrolled ? '0.75rem 2rem' : '0.65rem 2rem',
          width: scrolled ? '100%' : 'calc(100% - 2rem)',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img
            src={logoImg}
            alt="Cristiano Travel Logo"
            style={{
              height: '38px',
              width: 'auto',
              display: 'block',
              cursor: 'pointer',
            }}
            onClick={(e) => handleAnchor(e, '#home')}
          />

          {/* Links - desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                onClick={(e) => handleAnchor(e, link.href)}
                style={{ fontSize: '0.8rem' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#cta"
            onClick={(e) => handleAnchor(e, '#cta')}
            className="btn-luxury btn-luxury-filled !hidden md:!inline-flex text-xs"
            style={{ padding: '0.55rem 1.4rem' }}
          >
            Start Journey
          </a>

          {/* Mobile menu icon */}
          <MobileMenu navLinks={navLinks} handleAnchor={handleAnchor} />
        </div>
      </div>
    </motion.nav>
  )
}

function MobileMenu({ navLinks, handleAnchor }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [open])

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1.5 cursor-none"
        aria-label="Toggle menu"
      >
        <span
          className="block w-6 h-px transition-all duration-300"
          style={{
            background: 'var(--cashmere)',
            transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none',
          }}
        />
        <span
          className="block w-4 h-px transition-all duration-300"
          style={{
            background: 'var(--cashmere)',
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block w-6 h-px transition-all duration-300"
          style={{
            background: 'var(--cashmere)',
            transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
          }}
        />
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="overflow-hidden absolute left-0 right-0"
        style={{
          top: 'calc(100% + 0.5rem)',
          background: 'rgba(22, 20, 17, 0.65)',
          backdropFilter: 'blur(20px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
          border: '1px solid rgba(200, 169, 126, 0.12)',
          borderRadius: '1rem',
          margin: '0 1rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-sm"
              onClick={(e) => { setOpen(false); handleAnchor(e, link.href) }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 mt-2 border-t border-[rgba(200,169,126,0.15)] flex">
            <a
              href="#cta"
              onClick={(e) => { setOpen(false); handleAnchor(e, '#cta') }}
              className="btn-luxury btn-luxury-filled w-full flex justify-center text-sm"
              style={{ padding: '0.8rem 1.4rem' }}
            >
              Start Journey
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
