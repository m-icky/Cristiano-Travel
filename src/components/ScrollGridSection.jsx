import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollGridSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollGridSection() {
  const sectionRef = useRef(null);
  const mainSectionRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      console.log('Reduced motion preference detected - skipping animations');
      return;
    }

    let ctx = gsap.context(() => {
      const image = document.querySelector('.scaler img');
      const layers = document.querySelectorAll('.grid-container > .layer');

      const naturalWidth = image.offsetWidth;
      const naturalHeight = image.offsetHeight;

      // Animate image on scroll - shrink from full screen to natural size
      gsap.fromTo(image, 
        { 
          width: "100vw", 
          height: "100vh",
          borderRadius: "0px"
        },
        { 
          width: "100%", 
          height: "100%", 
          borderRadius: "1rem",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: mainSectionRef.current,
            start: "top top",
            end: "80% 100%",
            scrub: true
          }
        }
      );

      // Animate each layer with staggered timing
      const scaleEasings = [
        "power1.inOut",
        "power3.inOut",
        "power4.inOut"
      ];
      
      layers.forEach((layer, index) => {
        // Calculate different end points for each layer
        const endOffset = 100 - (index * 5); // 1, 0.95, 0.9 -> 100%, 95%, 90%
        
        // fade: opacity stays 0 until 55% of scroll progress, then fades to 1
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainSectionRef.current,
            start: "top top",
            end: `${endOffset}% 100%`,
            scrub: true
          }
        });

        // 0 to 0.55 it stays 0, 0.55 to 1 it goes to 1
        tl.fromTo(layer, { opacity: 0 }, { opacity: 0, duration: 0.55 })
          .to(layer, { opacity: 1, duration: 0.45, ease: "sine.out" }, ">");
          
        // reveal: scale stays 0 until 30% of scroll progress, then scales to 1
        const tlScale = gsap.timeline({
          scrollTrigger: {
            trigger: mainSectionRef.current,
            start: "top top",
            end: `${endOffset}% 100%`,
            scrub: true
          }
        });

        tlScale.fromTo(layer, { scale: 0 }, { scale: 0, duration: 0.30 })
               .to(layer, { scale: 1, duration: 0.70, ease: scaleEasings[index] }, ">");
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="content-wrap scroll-grid-section" id='gallery' ref={sectionRef}>
      <header className="scroll-grid-section-header">
        <h1 className="scroll-grid-section-fluid">Moments & Memories</h1>
      </header>
      <main>
        <section className="main-section" ref={mainSectionRef}>
          <div className="content">
            <div className="grid-container">
              {/* Layer 1: Outer edges (6 images) */}
              <div className="layer">
                <div>
                  <img src="https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1556304044-0699e31c6a34?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1565321590372-09331b9dd1eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
              </div>
              {/* Layer 2: Inner columns (6 images) */}
              <div className="layer">
                <div>
                  <img src="https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://plus.unsplash.com/premium_photo-1706078438060-d76ced26d8d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1525385444278-b7968e7e28dc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
              </div>
              {/* Layer 3: Center column top and bottom (2 images) */}
              <div className="layer">
                <div>
                  <img src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="" />
                </div>
              </div>
              {/* Center scaler image */}
              <div className="scaler">
                <img src="https://assets.codepen.io/605876/model-shades.jpg?format=auto&quality=100" alt="" />
              </div>
            </div>
          </div>
        </section>
        {/* We can remove or keep the fin section. Let's keep it but style it locally */}
        {/* <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
          <h2 className="scroll-grid-section-fluid">fin.</h2>
        </section> */}
      </main>
    </div>
  );
}
