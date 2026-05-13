import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FeatureFlipper({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div 
      className="w-full flex gap-4"
      style={{
        flexDirection: isMobile ? 'column' : 'row',
        height: isMobile ? '700px' : '450px'
      }}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index
        
        return (
          <motion.div
            key={item.id}
            layout
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => !isMobile && setActiveIndex(index)}
            className="relative rounded-2xl overflow-hidden flex flex-col"
            style={{
              flex: isActive ? (isMobile ? 4 : 3) : 1,
              background: isActive ? 'rgba(35, 28, 22, 0.35)' : 'rgba(20, 18, 15, 0.2)',
              border: isActive ? '1px solid rgba(200, 169, 126, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: isActive ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              cursor: isMobile ? 'pointer' : 'default',
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background Image / Gradient for Active State */}
            <AnimatePresence>
              {isActive && item.bgImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.15
                  }}
                />
              )}
            </AnimatePresence>

            <div className="absolute inset-0 z-0" style={{
              background: isActive 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)',
              pointerEvents: 'none'
            }} />

            {/* Inner Content Container */}
            <motion.div 
              layout
              className="relative z-10 flex flex-col h-full"
              style={{
                padding: isMobile ? '1.5rem' : '2rem',
                justifyContent: isActive ? 'flex-start' : 'center',
                alignItems: isActive ? 'flex-start' : 'center'
              }}
            >
              {/* Header/Icon area */}
              <motion.div 
                layout
                className="flex items-center gap-4 w-full"
                style={{
                  flexDirection: isActive ? 'row' : (isMobile ? 'row' : 'column'),
                  justifyContent: isActive ? 'flex-start' : 'center'
                }}
              >
                <motion.div 
                  layout
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: isActive ? '3rem' : '3.5rem',
                    height: isActive ? '3rem' : '3.5rem',
                    background: isActive ? 'rgba(200, 169, 126, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: isActive ? 'var(--gold)' : 'var(--sienna)',
                    fontSize: '1.25rem'
                  }}
                >
                  {item.icon}
                </motion.div>
                
                <motion.h2 
                  layout
                  className="whitespace-nowrap"
                  style={{ 
                    fontFamily: '"Playfair Display", serif', 
                    color: isActive ? 'var(--cashmere)' : 'rgba(232, 220, 200, 0.6)',
                    fontSize: isActive ? '1.75rem' : '1.25rem',
                    opacity: (isActive || isMobile) ? 1 : 0,
                    display: (!isActive && !isMobile) ? 'none' : 'block' // Hide text on desktop inactive
                  }}
                >
                  {item.title}
                </motion.h2>

                {/* Vertical text for desktop inactive state */}
                {!isActive && !isMobile && (
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      fontFamily: '"Playfair Display", serif', 
                      color: 'rgba(232, 220, 200, 0.6)',
                      fontSize: '1.25rem',
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      marginTop: '1rem',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {item.title}
                  </motion.h2>
                )}
              </motion.div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-8 w-full"
                  >
                    <div className="space-y-4">
                      {item.content.map((text, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="mt-1.5 text-xs" style={{ color: 'var(--sienna)' }}>◈</span>
                          <span className="text-[0.95rem] md:text-base leading-relaxed" style={{ color: 'rgba(232, 220, 200, 0.8)' }}>
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
