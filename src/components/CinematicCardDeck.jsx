import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Default cards ─────────────────────────────────────────────────────────
const DEFAULTS = [
  {
    title: "Design Systems",
    description: "Build consistent, scalable interfaces with reusable components and shared design tokens across your entire product.",
    tag: "Foundation",
    cardColor: "#0A0A0A",
    accentColor: "#FF6B4A",
  },
];

// ─── Intensity presets ──────────────────────────────────────────────────────
const INTENSITY = {
  subtle: { scaleBack: 0.9, zBack: -180, rotExit: -38, yBack: 18, blurMax: 4 },
  standard: { scaleBack: 0.87, zBack: -240, rotExit: -52, yBack: 24, blurMax: 6 },
  cinematic: { scaleBack: 0.82, zBack: -340, rotExit: -64, yBack: 34, blurMax: 9 },
};

// ─── Utils ──────────────────────────────────────────────────────────────────
function luminance(hex = "#000000") {
  const h = hex.replace("#", "").padEnd(6, "0");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// ─── Single card — hooks at top level ──────────────────────────────────────
function DeckCard({
  activeIndex,
  index,
  total,
  card,
  cardWidth,
  cardHeight,
  borderRadius,
  preset,
  exitDirection,
  showAccent,
  cursorX,
  cursorY,
}) {
  const depth = useTransform(activeIndex, (v) => v - index);
  const dir = exitDirection === "down" ? 1 : -1;
  const yExit = dir * cardHeight * 0.9;
  const rotateBase = exitDirection === "down" ? -preset.rotExit : preset.rotExit;

  const scale = useTransform(
    depth,
    [-4, -3, -2, -1, 0, 0.5, 1],
    [
      preset.scaleBack - 0.1,
      preset.scaleBack - 0.05,
      preset.scaleBack,
      preset.scaleBack + (1 - preset.scaleBack) * 0.6,
      1,
      0.98,
      0.92,
    ]
  );
  const y = useTransform(
    depth,
    [-4, -3, -2, -1, 0, 1],
    [preset.yBack * 3, preset.yBack * 2.3, preset.yBack * 1.5, preset.yBack * 0.75, 0, yExit],
    { clamp: false }
  );
  const z = useTransform(
    depth,
    [-4, -3, -2, -1, 0, 0.4, 1],
    [preset.zBack * 1.6, preset.zBack * 1.15, preset.zBack * 0.75, preset.zBack * 0.35, 0, 60, 140],
    { clamp: false }
  );
  const opacity = useTransform(depth, [-4, -3.2, -3, -1, 0, 0.88, 1.02], [0, 0.25, 0.55, 0.95, 1, 1, 0]);
  const rotateX = useTransform(depth, [0, 1], [0, rotateBase]);
  const blurAmount = useTransform(
    depth,
    [-4, -3, -2, -1, 0, 0.8, 1],
    [preset.blurMax, preset.blurMax * 0.7, preset.blurMax * 0.45, preset.blurMax * 0.2, 0, preset.blurMax * 0.4, preset.blurMax]
  );
  const filter = useMotionTemplate`blur(${blurAmount}px)`;

  // Shadow grows when card is active
  const shadowOpacity = useTransform(depth, [-3, -1, 0, 1], [0, 0.2, 0.45, 0]);
  const boxShadow = useMotionTemplate`0 40px 80px rgba(0, 0, 0, ${shadowOpacity})`;

  // Cursor parallax — only when card is near active
  const proximity = useTransform(depth, [-1, 0, 1], [0, 1, 0]);
  const tiltX = useTransform([cursorY, proximity], ([cy, p]) => cy * 5 * p);
  const tiltY = useTransform([cursorX, proximity], ([cx, p]) => -cx * 6 * p);
  const finalRotX = useTransform([rotateX, tiltX], ([rx, tx]) => rx + tx);
  
  // Create motion templates to guarantee explicit CSS strings for 3D transforms
  const yTransform = useMotionTemplate`${y}px`;
  const zTransform = useMotionTemplate`${z}px`;
  const rotateXTransform = useMotionTemplate`${finalRotX}deg`;
  const rotateYTransform = useMotionTemplate`${tiltY}deg`;

  // Inner parallax for text layers
  const innerP = useTransform(depth, [-1, 0, 1], [14, 0, -10]);
  const titleP = useTransform(innerP, (v) => v * 1.6);
  const descP = useTransform(innerP, (v) => v * 0.7);
  const accentOp = proximity;

  // Colors — auto contrast
  const isLight = luminance(card.cardColor || "#0A0A0A") > 145;
  const textPrimary = isLight ? "rgba(0,0,0,0.92)" : "rgba(255,255,255,0.97)";
  const textMuted = isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.46)";
  const textDim = isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.24)";
  const tagBg = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.09)";
  const edgeHigh = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.14)";
  const accent = card.accentColor || "#FFFFFF";

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: cardWidth,
        height: cardHeight,
        borderRadius,
        backgroundColor: card.cardColor || "#0A0A0A",
        padding: "clamp(30px, 5.5%, 52px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        transformOrigin: "50% 100%",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity, filter",
        scale,
        y,
        z,
        opacity,
        rotateX: finalRotX,
        rotateY: tiltY,
        filter,
        boxShadow,
        zIndex: total - index,
        overflow: "hidden",
        backgroundImage: `linear-gradient(180deg, ${edgeHigh} 0%, transparent 2px)`,
      }}
    >
      <motion.div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          y: innerP,
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 7,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.14em",
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          <span style={{ color: textPrimary }}>{String(index + 1).padStart(2, "0")}</span>
          <span style={{ color: textDim }}>—</span>
          <span style={{ color: textMuted }}>{String(total).padStart(2, "0")}</span>
        </div>
        {card.tag && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: textPrimary,
              background: tagBg,
              padding: "6px 14px",
              borderRadius: 99,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              backdropFilter: "blur(8px)",
            }}
          >
            {card.tag}
          </span>
        )}
      </motion.div>

      {showAccent && (
        <motion.div
          style={{
            position: "absolute",
            top: "clamp(30px, 5.5%, 52px)",
            left: "50%",
            width: 5,
            height: 5,
            marginLeft: -2.5,
            borderRadius: 99,
            background: accent,
            boxShadow: `0 0 20px ${accent}, 0 0 8px ${accent}`,
            opacity: accentOp,
          }}
        />
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          style={{
            fontSize: "clamp(28px, 4.4vw, 42px)",
            fontWeight: 700,
            color: textPrimary,
            lineHeight: 1.06,
            marginBottom: 18,
            letterSpacing: "-0.028em",
            y: titleP,
          }}
        >
          {card.title}
        </motion.div>
        <motion.div
          style={{
            fontSize: 14,
            color: textMuted,
            lineHeight: 1.72,
            fontWeight: 400,
            maxWidth: "86%",
            y: descP,
          }}
        >
          {card.description}
        </motion.div>
      </div>

      {showAccent && (
        <motion.div
          style={{
            position: "absolute",
            left: "clamp(30px, 5.5%, 52px)",
            bottom: "clamp(30px, 5.5%, 52px)",
            width: 40,
            height: 2,
            borderRadius: 99,
            background: accent,
            boxShadow: `0 0 14px ${accent}`,
            opacity: accentOp,
          }}
        />
      )}
    </motion.div>
  );
}

// ─── Progress dot (sub-component to keep hooks clean) ───────────────────────
function ProgressDot({ activeIndex, index, indicatorColor }) {
  const distance = useTransform(activeIndex, (v) => Math.abs(v - index));
  const scale = useTransform(distance, [0, 1, 3], [2.4, 1, 0.8]);
  const opacity = useTransform(distance, [0, 1, 3], [1, 0.4, 0.15]);

  return (
    <motion.div
      style={{
        width: 4,
        height: 4,
        borderRadius: 99,
        background: indicatorColor,
        scale,
        opacity,
      }}
    />
  );
}

// ─── Ambient glow — changes with active card ────────────────────────────────
function AmbientGlow({ activeIndex, data, glowOpacity }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const unsub = activeIndex.on("change", (v) => {
      const i = Math.round(Math.max(0, Math.min(data.length - 1, v)));
      setIdx(i);
    });
    return () => unsub();
  }, [activeIndex, data.length]);

  const color = data[idx]?.accentColor || "#FFFFFF";

  return (
    <motion.div
      key={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: glowOpacity }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        inset: "-20%",
        background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 55%)`,
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(40px)",
      }}
    />
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────

export default function CinematicCardDeck({
  cards = DEFAULTS,
  intensity = "standard",
  exitDirection = "up",
  cardWidth = 520,
  cardHeight = 360,
  borderRadius = "28px",
  sectionHeight = 400,
  smoothing = 0.7,
  showAccent = true,
  showProgress = true,
  progressPosition = "right",
  showAmbientGlow = true,
  glowIntensity = 0.18,
  indicatorColor = "#FFFFFF",
  backgroundColor = "transparent",
  style,
}) {
  const ref = useRef(null);
  const data = cards && cards.length > 0 ? cards : DEFAULTS;
  const total = data.length;
  const preset = INTENSITY[intensity] || INTENSITY.standard;

  const progress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on start and end
      // start: element top hits window top
      // end: element bottom hits window bottom
      const startScroll = rect.top;
      const totalScroll = rect.height - windowHeight;
      
      if (totalScroll <= 0) return;
      
      // Calculate percentage
      let p = -startScroll / totalScroll;
      p = Math.max(0, Math.min(1, p)); // Clamp between 0 and 1
      
      progress.set(p);
    };

    // Attach to native scroll and Lenis if possible
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    // Fallback animation frame to guarantee sync with Lenis
    let rafId;
    const loop = () => {
      handleScroll();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const smooth = useSpring(progress, {
    stiffness: 40 + (1 - smoothing) * 200,
    damping: 16 + smoothing * 26,
    mass: 0.45,
  });

  const activeIndex = useTransform(smooth, [0, 1], [0, Math.max(total - 1, 0.0001)]);

  // Cursor parallax
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const sCursorX = useSpring(cursorX, { stiffness: 130, damping: 22 });
  const sCursorY = useSpring(cursorY, { stiffness: 130, damping: 22 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set((e.clientX - rect.left) / rect.width - 0.5);
    cursorY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    cursorX.set(0);
    cursorY.set(0);
  };

  return (
    <div
      ref={ref}
      style={{
        ...style,
        height: `${sectionHeight}vh`,
        width: "100%",
        position: "relative",
      }}
    >
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1600px",
          background: backgroundColor,
        }}
      >
        {showAmbientGlow && (
          <AmbientGlow activeIndex={activeIndex} data={data} glowOpacity={glowIntensity} />
        )}

        <div
          style={{
            position: "relative",
            width: cardWidth,
            height: cardHeight,
            transformStyle: "preserve-3d",
            zIndex: 1,
            maxWidth: '90vw',
          }}
        >
          {data.map((card, i) => (
            <DeckCard
              key={i}
              activeIndex={activeIndex}
              index={i}
              total={total}
              card={card}
              cardWidth="100%"
              cardHeight="100%"
              borderRadius={borderRadius}
              preset={preset}
              exitDirection={exitDirection}
              showAccent={showAccent}
              cursorX={sCursorX}
              cursorY={sCursorY}
            />
          ))}
        </div>

        {showProgress && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: progressPosition === "left" ? 36 : "auto",
              right: progressPosition === "right" ? 36 : "auto",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {data.map((_, i) => (
              <ProgressDot key={i} activeIndex={activeIndex} index={i} indicatorColor={indicatorColor} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
