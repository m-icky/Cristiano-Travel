import { useEffect, useState } from 'react'
import FocusSliceCarousel from './FocusSliceCarousel'

const timeline = [
  {
    year: '2016',
    title: 'The Beginning',
    desc: 'Started assisting travelers and students with personalized guidance and support — built on trust, empathy, and purpose.',
    src: 'https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg'
  },
  {
    year: '2018',
    title: 'Building Cultural Connections',
    desc: 'Expanded services to include customized India travel experiences focused on spirituality, wellness, and heritage.',
    src: 'https://framerusercontent.com/images/2uTNEj5aTl2K3NJaEFWMbnrA.jpg'
  },
  {
    year: '2020',
    title: 'Supporting International Clients',
    desc: 'Worked closely with travelers from different countries seeking authentic and safe India experiences.',
    src: 'https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg'
  },
  {
    year: '2022',
    title: 'Wellness & Traditional Guidance',
    desc: 'Introduced Nadijodtheshm consultation experiences for clients seeking deeper personal and spiritual understanding.',
    src: 'https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg'
  },
  {
    year: '2024',
    title: 'Cristiano Travel Expansion',
    desc: 'Launched a modern digital platform to connect global travelers with meaningful Indian experiences.',
    src: 'https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg'
  },
  {
    year: 'Today',
    title: 'Growing Community',
    desc: 'Continuing to build a trusted international travel and wellness community centered around authenticity, care, and transformation.',
    src: 'https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg'
  },
]

export default function TimelineSection() {
  const imagesData = timeline.map(item => ({
    image: { src: item.src },
    title: `${item.year}: ${item.title}`,
    subtitle: item.desc
  }))

  return (
    <section id="journey" style={{ background: 'transparent', position: 'relative', padding: '120px 0' }}>
      <div className="text-center relative z-10 mb-12">
        <div className="flex items-center justify-center gap-3 mb-4" style={{ opacity: 0.6 }}>
          <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--sienna)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--sienna-light)', fontFamily: 'DM Sans' }}>
            Timeline
          </span>
          <span style={{ display: 'block', width: '2rem', height: '1px', background: 'var(--sienna)' }} />
        </div>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            color: 'var(--cashmere)',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}
        >
          Her Journey
        </h2>
        <p
          style={{
            fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
            color: 'var(--cashmere)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontFamily: '"Cormorant Garamond", serif',
          }}
        >
          A timeline of passion, purpose, and global connections.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto w-full">
        <FocusSliceCarousel 
          images={imagesData}
          carouselWidth={1200}
        />
      </div>
    </section>
  )
}
