import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleField from './ParticleField'

gsap.registerPlugin(ScrollTrigger)

export default function QuoteSection() {
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)
  const subRef = useRef(null)
  const sigRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Background parallax zoom
      gsap.fromTo(bgRef.current,
        { scale: 1 },
        {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )

      // Letter reveal for main quote
      const quote = quoteRef.current
      if (quote) {
        // Split by <br> to preserve intentional line breaks
        const lines = quote.innerHTML.split(/<br\s*\/?>/i);
        
        quote.innerHTML = lines.map(line => {
          // Use a temp element to decode HTML entities and strip tags
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = line;
          const cleanText = tempDiv.textContent.trim();
          if (!cleanText) return '';
          
          const words = cleanText.split(/\s+/);
          return words.map(word => {
            const chars = word.split('').map(char => 
              `<span class="char" style="display:inline-block;transform:translateY(80px);opacity:0">${char}</span>`
            ).join('');
            // Wrap each word in an inline-block to prevent mid-word breaking
            return `<span class="word" style="display:inline-block; white-space:nowrap">${chars}</span>`;
          }).join('<span class="space" style="display:inline-block;width:0.3em">&nbsp;</span>');
        }).join('<br />');

        const spans = quote.querySelectorAll('.char')
        gsap.to(spans, {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        })
      }

      // Sub text
      gsap.fromTo([subRef.current, sigRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 12vw, 12rem) 0',
        overflow: 'hidden',
        background: 'var(--charcoal)',
      }}
    >
      {/* Background gradient */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-10%',
          background: 'linear-gradient(180deg, var(--charcoal) 0%, #1F1A16 100%)',
        }}
      />

      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <ParticleField count={40} color="#A0522D" opacity={0.3} />
      </div>


      {/* Decorative lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--sienna), transparent)',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        {/* Section Heading */}
        <div
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'var(--sienna)',
            marginBottom: '1rem',
            display: 'block',
            fontWeight: 600,
          }}
        >
          Our Philosophy
        </div>

        <blockquote
          ref={quoteRef}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            fontWeight: 700,
            fontStyle: 'italic',
            color: 'var(--cashmere)',
            lineHeight: 1.25,
            marginBottom: '2.5rem',
            wordBreak: 'normal',
            overflowWrap: 'break-word',
            letterSpacing: '-0.01em',
          }}
        >
          Every journey changes <br />something within us.
        </blockquote>

        <p
          ref={subRef}
          style={{
            opacity: 0,
            fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
            color: 'rgba(232,220,200,0.55)',
            lineHeight: 1.9,
            fontStyle: 'italic',
            fontFamily: '"Cormorant Garamond", serif',
            marginBottom: '2.5rem',
            fontWeight: 300,
          }}
        >
          Our goal is not just to take you somewhere new —<br />
          but to help you experience India in a way you will never forget.
        </p>

        <div
          ref={sigRef}
          style={{
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ width: '2.5rem', height: '1px', background: 'var(--sienna)' }} />
          <span
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: 'var(--gold)',
            }}
          >
            Christiane
          </span>
          <div style={{ width: '2.5rem', height: '1px', background: 'var(--sienna)' }} />
        </div>
      </div>
    </section>
  )
}
