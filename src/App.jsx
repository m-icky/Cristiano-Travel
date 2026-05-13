import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'
import VideoScrollSection from './components/VideoScrollSection'
import FounderSection from './components/FounderSection'
import TimelineSection from './components/TimelineSection'
import QuoteSection from './components/QuoteSection'
import GallerySection from './components/GallerySection'
import CTASection from './components/CTASection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import NadijodtheshmPage from './components/NadijodtheshmPage'
import { Routes, Route } from 'react-router-dom'

import useCursor from './hooks/useCursor'
import useLenis from './hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const { dotRef, ringRef } = useCursor()
  useLenis()

  useEffect(() => {
    // Prevent scroll during loading
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Refresh ScrollTrigger after load
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    }
  }, [loading])

  return (
    <>
      {/* Custom cursor */}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main site */}
      {!loading && (
        <>
          <ScrollProgress />
          <Navigation />

          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <VideoScrollSection />
                  <FounderSection />
                  <TimelineSection />
                  <QuoteSection />
                  <GallerySection />
                  <CTASection />
                  <ContactSection />
                </>
              } />
              <Route path="/nadijodtheshm" element={<NadijodtheshmPage />} />
            </Routes>
          </main>

          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </>
  )
}
