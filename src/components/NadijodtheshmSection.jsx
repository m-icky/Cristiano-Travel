import { motion } from 'framer-motion'
import DiploFlipCard from './DiploFlipCard'
import { PiSparkle, PiFlowerLotus, PiUsersThree } from 'react-icons/pi'

export default function NadijodtheshmSection() {
  const items = [
    {
      id: 'helps',
      title: 'How It Helps',
      icon: <PiSparkle />,
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
      icon: <PiFlowerLotus />,
      content: [
        "One-on-one consultation",
        "Personalized insights",
        "Confidential guidance"
      ]
    },
    {
      id: 'audience',
      title: "Who It's For",
      icon: <PiUsersThree />,
      content: [
        "Individuals seeking clarity",
        "Decision-making support",
        "Personal guidance"
      ]
    }
  ];

  return (
    <section id="nadijodtheshm" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
          className="nadijodtheshm-intro"
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

        {/* Content DiploFlipCards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {items.map((item) => (
            <DiploFlipCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* Trust Line */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mb-16 px-4 max-w-3xl mx-auto"
        >
          <p className="text-sm md:text-base tracking-widest" style={{ color: 'var(--cashmere)', lineHeight: 1.8 }}>
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
            style={{ fontSize: '0.85rem', padding: '1.2rem 3rem', color: 'var(--oak)' }}
          >
            Begin Your Consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}

