import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'
import VideoScrollSection from './components/VideoScrollSection'
import FounderSection from './components/FounderSection'
import ScrollGridSection from './components/ScrollGridSection'
import TimelineSection from './components/TimelineSection'
import NadijodtheshmSection from './components/NadijodtheshmSection'
import QuoteSection from './components/QuoteSection'
import GallerySection from './components/GallerySection'
import ConnectSection from './components/ConnectSection'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import LavaLampBackground from './components/LavaLampBackground'
import { Routes, Route, useNavigate } from 'react-router-dom'

import useCursor from './hooks/useCursor'
import useLenis from './hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const { dotRef, ringRef } = useCursor()
  const navigate = useNavigate()
  useLenis()

  useEffect(() => {
    // Reset to start path on refresh/load
    if (window.location.pathname !== '/') {
      navigate('/', { replace: true })
    }
    window.scrollTo(0, 0)
    // Force history reset to prevent browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [navigate])

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

      {/* LavaLamp Background */}
      <LavaLampBackground />

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
                  <ScrollGridSection />
                  <NadijodtheshmSection />
                  <TimelineSection />
                  <QuoteSection />
                  {/* <GallerySection /> */}
                  <ConnectSection />
                </>
              } />
            </Routes>
          </main>

          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </>
  )
}
