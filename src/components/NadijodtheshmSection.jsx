import { motion } from 'framer-motion'
import FeatureFlipper from './FeatureFlipper'

export default function NadijodtheshmSection() {
  return (
    <section id="nadijodtheshm" className="py-24 relative overflow-hidden">
      {/* Decorative gradients */}
      <div
        style={{
          position: 'absolute',
          top: '0%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '80vw',
          maxWidth: '800px',
          maxHeight: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(160,82,45,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              fontFamily: 'DxLactos, "Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'var(--cashmere)',
              letterSpacing: '-0.01em',
              marginBottom: '1.5rem',
            }}
          >
            Ancient Insight.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--sienna-light)', fontWeight: 600 }}>
              Personal Guidance
            </em>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-px mx-auto"
            style={{ background: 'var(--sienna)' }}
          />
        </div>

        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="glass p-10 md:p-14 rounded-2xl mb-16 text-center shadow-2xl"
          style={{ background: 'rgba(22, 20, 17, 0.4)' }}
        >
          <div 
            className="text-xl md:text-3xl leading-relaxed" 
            style={{ 
              fontFamily: 'DxLactos, "Playfair Display", serif',
            }}
          >
            {"Nadijodtheshm is a traditional consultation practice that offers personalized insights to help individuals gain clarity in important aspects of life.".split(" ").map((word, wordIndex, wordsArray) => {
              const highlightWords = ["Nadijodtheshm", "traditional", "consultation", "personalized", "insights", "clarity"];
              const cleanWord = word.replace(/[^a-zA-Z]/g, '');
              const color = highlightWords.includes(cleanWord) ? 'var(--sienna-light)' : 'var(--cashmere)';

              return (
                <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em', color }}>
                  {word.split("").map((char, charIndex) => {
                    const globalIndex = wordsArray.slice(0, wordIndex).join("").length + wordIndex + charIndex;
                    return (
                      <motion.span
                        key={charIndex}
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + globalIndex * 0.015 }}
                        style={{ display: 'inline-block' }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Content Feature Flipper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <FeatureFlipper items={[
            {
              id: 'helps',
              title: 'How It Helps',
              icon: '✦',
              content: [
                "Gain clarity in decision-making",
                "Understand personal situations better",
                "Receive structured guidance",
                "Move forward with confidence"
              ]
            },
            {
              id: 'expect',
              title: 'What to Expect',
              icon: '◈',
              content: [
                "One-on-one consultation",
                "Personalized insights",
                "Confidential guidance"
              ]
            },
            {
              id: 'audience',
              title: "Who It's For",
              icon: '◇',
              content: [
                "Individuals seeking clarity",
                "Decision-making support",
                "Personal guidance"
              ]
            }
          ]} />
        </motion.div>

        {/* Trust Line */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mb-16 px-4 max-w-3xl mx-auto"
        >
          <p className="text-sm md:text-base tracking-widest uppercase" style={{ color: 'rgba(200, 169, 126, 0.6)', lineHeight: 1.8 }}>
            This consultation is designed for individuals seeking thoughtful, guided perspectives using traditional methods.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <a
            href="mailto:hello@cristianotravel.com?subject=Nadijodtheshm Consultation&body=Hello Cristiano Travel Team,%0D%0A%0D%0AI am interested in booking a Nadijodtheshm consultation. Please let me know the process, availability, and any details you need from me.%0D%0A%0D%0AName: %0D%0AContact Number: %0D%0APreferred Time for Contact: %0D%0A%0D%0ALooking forward to hearing from you."
            className="btn-luxury btn-luxury-filled glow-sienna"
            style={{ fontSize: '0.85rem', padding: '1.2rem 3rem' }}
          >
            Book Your Consultation
            <span style={{ opacity: 0.7 }}>✦</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

