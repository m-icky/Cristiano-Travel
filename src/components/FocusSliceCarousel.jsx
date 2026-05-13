import React, { useState, useEffect, useRef, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FocusSliceCarousel({
  images = [],
  activeWidth = 55,
  inactiveWidth = 8,
  gap = 12,
  borderRadius = 32,
  animationDuration = 0.6,
  carouselWidth = 1200,
  inactiveBorderRadius = 32,
  style = {}
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const lastScrollTime = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Wheel event handler for desktop scroll navigation
  useEffect(() => {
    if (isMobile) return;
    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 100 || isAnimating) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 10) return;
      
      lastScrollTime.current = now;
      if (delta > 0 && activeIndex < images.length - 1) {
        startTransition(() => {
          setActiveIndex(activeIndex + 1);
          setIsAnimating(true);
        });
      } else if (delta < 0 && activeIndex > 0) {
        startTransition(() => {
          setActiveIndex(activeIndex - 1);
          setIsAnimating(true);
        });
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isMobile, activeIndex, images.length, isAnimating]);

  // Touch handlers
  useEffect(() => {
    if (!isMobile) return;
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (isAnimating) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;
      
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && activeIndex < images.length - 1) {
          startTransition(() => { setActiveIndex(activeIndex + 1); setIsAnimating(true); });
        } else if (deltaY < 0 && activeIndex > 0) {
          startTransition(() => { setActiveIndex(activeIndex - 1); setIsAnimating(true); });
        }
      }
    };
    
    const container = mobileScrollRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isMobile, activeIndex, images.length, isAnimating]);

  // Reset animation lock
  useEffect(() => {
    if (!isAnimating) return;
    const timeout = setTimeout(() => {
      startTransition(() => { setIsAnimating(false); });
    }, animationDuration * 1000);
    return () => clearTimeout(timeout);
  }, [isAnimating, animationDuration]);

  const handleSliceClick = (index) => {
    if (isAnimating) return;
    startTransition(() => {
      setActiveIndex(index);
      setIsAnimating(true);
    });
  };

  const transition = { duration: animationDuration, ease: [0.42, 0, 0.58, 1] };
  
  if (images.length === 0) return null;

  const actualCarouselWidth = typeof window !== "undefined" ? Math.min(carouselWidth, window.innerWidth - 64) : carouselWidth;
  const totalGaps = gap * (images.length - 1);
  const availableWidth = actualCarouselWidth - totalGaps;
  const activeImageWidth = (availableWidth * activeWidth) / 100;
  const inactiveImageWidth = (availableWidth * inactiveWidth) / 100;
  const activeImageHeight = (activeImageWidth * 3) / 4;

  if (isMobile) {
    return (
      <div style={{ ...style, display: "flex", flexDirection: "column", width: "100%", padding: "20px" }}>
        <div ref={mobileScrollRef} style={{ display: "flex", flexDirection: "column", gap, borderRadius, overflow: "hidden" }}>
          {images.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={index}
                onClick={() => handleSliceClick(index)}
                style={{ position: "relative", cursor: "pointer", borderRadius, overflow: "hidden", scrollSnapAlign: "start" }}
                animate={{ height: isActive ? "300px" : "60px" }}
                transition={transition}
              >
                <div style={{
                  width: "100%", height: "100%",
                  backgroundImage: `url(${item.image.src})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  transition: `background-size ${animationDuration * 1.5}s ease`
                }} />
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: animationDuration * 0.5, delay: animationDuration * 0.5 }}
                      style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`,
                        padding: 24, display: "flex", flexDirection: "column", gap: 4
                      }}
                    >
                      <h3 style={{ color: "#FFF", margin: 0, fontSize: "24px", fontFamily: '"Playfair Display", serif' }}>
                        {item.title}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "14px", fontFamily: '"DM Sans", sans-serif' }}>
                        {item.subtitle}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ ...style, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, borderRadius, overflow: "hidden", width: "100%" }}>
      <div style={{ display: "flex", gap, width: actualCarouselWidth, height: activeImageHeight, alignItems: "stretch", justifyContent: "center" }}>
        {images.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={index}
              onClick={() => handleSliceClick(index)}
              style={{ position: "relative", cursor: "pointer", overflow: "hidden", flexShrink: 0, borderRadius: isActive ? borderRadius : inactiveBorderRadius }}
              animate={{ width: isActive ? activeImageWidth : inactiveImageWidth }}
              transition={transition}
            >
              <div style={{
                width: "100%", height: "100%",
                backgroundImage: `url(${item.image.src})`,
                backgroundSize: "cover", backgroundPosition: "center",
                transition: `transform ${animationDuration * 1.5}s ease`
              }} />
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: animationDuration * 0.5, delay: animationDuration * 0.4 }}
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`,
                      padding: 32, display: "flex", flexDirection: "column", gap: 8
                    }}
                  >
                    <h3 style={{ color: "#FFF", margin: 0, fontSize: "32px", fontFamily: '"Playfair Display", serif' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "16px", fontFamily: '"DM Sans", sans-serif', maxWidth: "80%" }}>
                      {item.subtitle}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
