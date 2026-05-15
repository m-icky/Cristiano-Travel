import React, { useEffect, useRef, useState } from 'react';
import './BloomingFlower.scss';

const BloomingFlower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it's visible and starts blooming, we can stop observing if we only want it to bloom once
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the component is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`blooming-flower-root ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="blooming-flower-head" />
      <div className="blooming-flower-body" />
    </div>
  );
};

export default BloomingFlower;
