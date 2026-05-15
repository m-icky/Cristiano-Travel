import { useState } from 'react'
import { motion } from 'framer-motion'

export default function DiploFlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Animation variants
  const variants = {
    front: {
      rotateY: 0,
    },
    back: {
      rotateY: 180,
    }
  }

  return (
    <div 
      className="perspective-1000 w-full h-[400px] cursor-pointer"
      onClick={handleFlip}
      onMouseEnter={() => {
        setIsHovered(true)
        setIsFlipped(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsFlipped(false)
      }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={isFlipped ? "back" : "front"}
        variants={variants}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          mass: 1
        }}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center text-center overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 20px 40px rgba(139, 69, 19, 0.05)'
          }}
        >
          {/* Decorative background elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-sienna-light/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
          
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-4xl"
            style={{ 
              background: 'linear-gradient(135deg, var(--sienna-light) 0%, var(--sienna) 100%)',
              color: 'var(--ivory)',
              boxShadow: '0 10px 20px rgba(160, 82, 45, 0.2)'
            }}
          >
            {item.icon}
          </div>
          
          <h3 
            style={{ 
              fontFamily: 'DxLactos, "Playfair Display", serif',
              fontSize: '2rem',
              color: 'var(--sienna)',
              lineHeight: 1.2
            }}
          >
            {item.title}
          </h3>
          
          <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-sienna/60 font-bold">
            <span>Explore</span>
            <span className="w-8 h-px bg-sienna/30"></span>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 backface-hidden rounded-3xl p-8 flex flex-col items-start justify-center overflow-hidden"
          style={{
            background: 'var(--sienna)',
            transform: 'rotateY(180deg)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Decorative background elements */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
          
          <h3 
            className="mb-8 text-xl font-medium tracking-tight"
            style={{ 
              fontFamily: '"Playfair Display", serif',
              color: 'var(--ivory)'
            }}
          >
            {item.title}
          </h3>
          
          <ul className="space-y-4 w-full">
            {item.content.map((text, i) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={isFlipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-start gap-3 group"
              >
                <span className="mt-1.5 text-[8px] text-gold">✦</span>
                <span className="text-sm md:text-base leading-relaxed text-ivory/80 group-hover:text-ivory transition-colors">
                  {text}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-auto pt-6 text-[10px] uppercase tracking-[0.2em] text-ivory/40 font-bold">
            Nadijodtheshm Guidance
          </div>
        </div>
      </motion.div>
    </div>
  )
}
