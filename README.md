# Cristiano Travel — Luxury Personal Brand Website

A cinematic, scroll-driven luxury travel & wellness brand website built with React + Vite, GSAP, Framer Motion, Three.js, and Tailwind CSS.

## Features

- **Scroll-Driven Video Playback** — Place frame images in `/public/frames/` and they play like a video as the user scrolls
- **Cinematic GSAP Animations** — ScrollTrigger-powered reveals, parallax, text masking
- **Three.js Ambient Particles** — Floating particle fields on hero, quote, and CTA sections
- **Framer Motion Micro-interactions** — Hover effects, stagger reveals, smooth transitions
- **Custom Cursor** — Luxury ring+dot cursor with hover scale effects
- **Lenis Smooth Scroll** — Buttery premium scrolling
- **Horizontal Gallery** — GSAP-pinned horizontal scroll gallery
- **Timeline Section** — Alternating scroll-animated timeline
- **Glassmorphism Cards** — Founder feature cards with backdrop blur
- **Loading Screen** — Cinematic count-up loading animation

## Color Palette (from image)

| Color | Hex | Usage |
|-------|-----|-------|
| Sienna | `#A0522D` | Primary accent, CTAs |
| Oak | `#C8A97E` | Secondary accent, borders |
| Cashmere | `#E8DCC8` | Body text |
| Bush | `#1B3A2D` | Dark accents |
| Charcoal | `#1A1A1A` | Background |
| Gold | `#C4A55A` | Highlights, timeline |

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Adding the Video Frames

1. Extract frames from your video using FFmpeg:
   ```
   ffmpeg -i your-video.mp4 -vf "fps=24,scale=1920:1080" public/frames/frame_%03d.jpg -q:v 3
   ```

2. Place all frames in `/public/frames/`

3. Open `src/components/VideoScrollSection.jsx` and update:
   ```js
   const TOTAL_FRAMES = 120  // ← your actual frame count
   ```

> **Note:** Without frames, the website displays a beautiful animated gradient fallback.

## Adding Images

- **Founder portrait**: Edit `FounderSection.jsx`, replace the placeholder div with `<img src="/founder.jpg" />`
- **Gallery images**: Edit `GallerySection.jsx`, replace placeholder divs with `<img src="..." />`

Place images in `/public/` directory.

## Project Structure

```
src/
  components/
    LoadingScreen.jsx     — Cinematic loading animation
    Navigation.jsx        — Sticky nav with mobile menu
    ScrollProgress.jsx    — Top scroll progress bar
    ParticleField.jsx     — Three.js ambient particles
    VideoScrollSection.jsx — Frame sequence hero
    FounderSection.jsx    — Founder bio + cards
    TimelineSection.jsx   — Journey timeline
    QuoteSection.jsx      — Full-width quote block
    GallerySection.jsx    — Horizontal scroll gallery
    CTASection.jsx        — Call to action
    Footer.jsx            — Footer with contact
  hooks/
    useCursor.js          — Custom cursor behavior
    useLenis.js           — Smooth scroll setup
public/
  frames/                 — Place video frames here
    README.txt            — Frame naming instructions
```

## Customization

- **Colors**: Update `tailwind.config.js` and `src/index.css` CSS variables
- **Fonts**: Change Google Fonts import in `index.html` and `tailwind.config.js`
- **Frame count**: Update `TOTAL_FRAMES` in `VideoScrollSection.jsx`
- **Content**: All text is editable directly in each component
- **Contact email**: Update `mailto:` links in `CTASection.jsx` and `Footer.jsx`
