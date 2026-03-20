"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const infoCols = [
  {
    title: "Background",
    body: "BS and two MS degrees in Industrial and Aerospace Engineering from UPV/EHU, with 5+ years of experience across structures, engines, and completion projects at ITP Aero, Aernnova, and Jet Aviation. This background shaped my engineering mindset: rigorous problem-solving, mastery of complex systems, and absolute precision in every detail.",
  },
  {
    title: "Current Role",
    body: "Transitioning into full-stack development, building modern, AI-enhanced solutions through hands-on projects and product-focused development. I bring an aerospace engineering approach to software: clear architecture, high reliability, and a \"zero critical error\" standard in execution.",
  },
  {
    title: "Education",
    body: "Completed a Master’s in AI-Driven Software Development at Universidad Isabel I, complemented by IBM’s Generative AI professional training. My path combines deep software fundamentals with modern full-stack development and applied AI for real-world products.",
  },
]

const techTags = [
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Python", slug: "python" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Docker", slug: "docker" },
  { name: "NestJS", slug: "nestjs" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Redis", slug: "redis" },
]

/* ─── Info column — independently hoverable ─────────────────────────────────── */

function InfoCol({ col, isHovered, isDefault, index }: { col: typeof infoCols[0], isHovered: boolean, isDefault: boolean, index: number }) {
  let yPos = 0;
  if (isHovered) yPos = -45;
  else if (isDefault) yPos = index === 1 ? -10 : 15;
  else yPos = 40;

  let scale = 1;
  if (isHovered) scale = 1.05;
  else if (isDefault) scale = index === 1 ? 1 : 0.85;
  else scale = 0.85;

  let opacity = 1;
  if (isHovered) opacity = 1;
  else if (isDefault) opacity = index === 1 ? 1 : 0.5;
  else opacity = 0.3;

  let zIndex = 10;
  if (isHovered) zIndex = 50;
  else if (isDefault && index === 1) zIndex = 20;

  let rotate = 0;
  if (index === 0) rotate = -6;
  else if (index === 2) rotate = 6;
  else rotate = 0;

  const textAlignClass = index === 0 ? "text-left items-start" : index === 1 ? "text-center items-center" : "text-right items-end";

  return (
    <motion.div
      initial={false}
      animate={{
        y: yPos,
        scale,
        rotate,
        zIndex,
        opacity,
        x: index === 1 ? "-50%" : "0%",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "absolute top-14 w-[46%] sm:w-[42%] h-auto p-3 sm:p-4 flex flex-col gap-1 sm:gap-1.5 rounded-2xl border transition-colors duration-300",
        "bg-[#11111a] shadow-2xl",
        isHovered ? "border-purple-500/60 shadow-[0_0_40px_rgba(168,85,247,0.3)]" : "border-white/5 shadow-black/80",
        textAlignClass,
        "hidden md:flex" // ONLY ON DESKTOP
      )}
      style={{
        left: index === 0 ? "2%" : index === 1 ? "50%" : "auto",
        right: index === 2 ? "2%" : "auto",
      }}
    >
      <h3 className="text-[10px] font-black tracking-normal text-white uppercase">
        {col.title}
      </h3>
      <p className="text-[9px] leading-[1.3] text-white/50 font-medium whitespace-pre-wrap">
        {col.body}
      </p>
    </motion.div>
  )
}

function InfoMobileList() {
  return (
    <div className="flex flex-col gap-3 p-4 md:hidden">
      {infoCols.map((col) => (
        <div key={col.title} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
           <h3 className="text-[10px] font-black uppercase text-purple-400 mb-1">{col.title}</h3>
           <p className="text-xs text-white/60 leading-relaxed">{col.body}</p>
        </div>
      ))}
    </div>
  )
}

function InfoColGroup() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const isHoveringAny = hoveredIndex !== null;

  return (
    <div className="relative w-full h-full">
      {/* Mobile-Safe View */}
      <InfoMobileList />

      {/* Desktop Hover View */}
      <div className="hidden md:block absolute inset-0">
        <motion.div
          animate={{ opacity: isHoveringAny ? 0 : 1, y: isHoveringAny ? -10 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-30"
        >
          <div className="flex items-center justify-center px-4 py-1 rounded-full border border-white/5 bg-black/40 backdrop-blur-md">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#818cf8] ml-[0.2em]">
              Hover to read more
            </span>
          </div>
        </motion.div>

        {infoCols.map((col, idx) => (
          <div
            key={col.title}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="contents"
          >
            <InfoCol
              col={col}
              isHovered={hoveredIndex === idx}
              isDefault={!isHoveringAny}
              index={idx}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Scrolling tech strip ──────────────────────────────────────────────────── */

function TagStrip() {
  const doubled = [...techTags, ...techTags]
  return (
    <div className="relative overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-2 min-w-max"
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/70 whitespace-nowrap shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://cdn.simpleicons.org/${t.slug}/888888`} alt={t.name} className="w-3 h-3" />
            {t.name}
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#0d0d1a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#0d0d1a] to-transparent" />
    </div>
  )
}

/* ─── Radar for location card ───────────────────────────────────────────────── */

function RadarMap() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 opacity-100 grayscale contrast-[1.3] brightness-100"
        style={{
          backgroundImage: "url('/basel-map.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <motion.div
        animate={{ x: ["-500%", "500%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none"
      />
      <motion.div
        animate={{ x: ["-400px", "400px"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-y-0 w-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8),0_0_30px_rgba(34,211,238,0.4)] pointer-events-none"
      />
    </div>
  )
}

/* ─── Main component ────────────────────────────────────────────────────────── */

const cardClasses = "rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-purple-500/[0.15] overflow-hidden transition-all duration-300 hover:border-purple-500/[0.3]"

function DeckPhotos() {
  const [clickedIndex, setClickedIndex] = React.useState<number | null>(null)

  const cards = [
    {
      id: 0,
      base: { rotate: -15, x: -45, y: 10, scale: 0.9, zIndex: 1, opacity: 1 },
      hover: { rotate: -25, x: -60, scale: 0.95, zIndex: 10 },
      className: "w-[80px] h-[100px] sm:w-[100px] sm:h-[125px] bg-white/[0.03] border-white/10"
    },
    {
      id: 1,
      base: { rotate: 0, x: 0, y: 0, scale: 1, zIndex: 2, opacity: 1 },
      hover: { scale: 1.05, zIndex: 10 },
      className: "w-[90px] h-[115px] sm:w-[115px] sm:h-[140px] bg-white/[0.06] border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
    },
    {
      id: 2,
      base: { rotate: 15, x: 45, y: 10, scale: 0.9, zIndex: 1, opacity: 1 },
      hover: { rotate: 25, x: 60, scale: 0.95, zIndex: 10 },
      className: "w-[80px] h-[100px] sm:w-[100px] sm:h-[125px] bg-white/[0.03] border-white/10"
    }
  ]

  return (
    <div className="relative w-full h-[140px] sm:h-[150px] my-3 flex justify-center items-center">
      {cards.map((c, i) => {
        const isClicked = clickedIndex === i;
        const isOtherClicked = clickedIndex !== null && clickedIndex !== i;
        
        let animateState = { ...c.base };
        if (isClicked) {
          animateState = { rotate: 0, x: 0, y: -5, scale: 1.2, zIndex: 50, opacity: 1 };
        } else if (isOtherClicked) {
          animateState = { 
            rotate: c.base.rotate * 1.5, 
            x: c.base.x * 1.4, 
            y: c.base.y + 15, 
            scale: c.base.scale * 0.85, 
            zIndex: 0, 
            opacity: 0.4 
          };
        }

        return (
          <motion.div
            key={c.id}
            className={cn("absolute rounded-xl shadow-lg border cursor-pointer", c.className)}
            initial={c.base}
            animate={animateState}
            whileHover={clickedIndex === null ? c.hover : undefined}
            onClick={() => setClickedIndex(isClicked ? null : i)}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ transformOrigin: "bottom center" }}
          />
        )
      })}
    </div>
  )
}

function ChessSlider() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 120) {
      window.open("https://deep-knight.vercel.app", "_blank");
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-[200px] h-7 bg-white/5 rounded-full border border-white/10 flex items-center px-1 overflow-hidden mt-1 mx-auto"
    >
      <span className="absolute w-full left-0 text-center text-[8px] sm:text-[9px] font-mono text-white/50 uppercase tracking-widest pointer-events-none">
        Slide to play &gt;&gt;&gt;
      </span>
      <motion.div
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.05}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        className="w-5 h-5 bg-gradient-to-tr from-purple-500 to-cyan-400 rounded-full flex justify-center items-center cursor-grab active:cursor-grabbing z-10"
      >
        <span className="text-white text-[10px] leading-none mb-0.5">♟</span>
      </motion.div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-10 px-4 md:px-6 max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* Name card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={cn(cardClasses, "flex flex-col items-center justify-center p-6 h-[145px] text-center order-1")}
        >
          <div className="flex flex-col items-center pt-2">
            <h2 className="text-[30px] sm:text-[34px] font-black tracking-tighter leading-[1.0] text-white uppercase mb-3 text-center">
              ANDER<br />MAÑAS
            </h2>
            <div className="w-10 h-[1px] bg-white/10 mb-3" />
            <p className="text-[8.5px] font-mono uppercase tracking-[0.35em] text-white/40">
              Fullstack Developer | AI Developer
            </p>
          </div>
        </motion.div>

        {/* Info card (Interactive on desktop, Static list on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.07 }}
          className={cn(cardClasses, "md:col-span-2 relative p-0 overflow-hidden min-h-[145px] order-2")}
        >
          <InfoColGroup />
        </motion.div>

        {/* Beyond the Code */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.12 }}
          className={cn(cardClasses, "p-6 flex flex-col order-3")}
        >
          <h3 className="text-xl md:text-2xl font-black tracking-tight mb-1 uppercase text-white">Beyond the CODE</h3>
          <div className="h-0.5 w-8 bg-purple-500/50 rounded-full mb-4" />
          <DeckPhotos />
          <p className="text-xs leading-relaxed text-white/70 mt-2">
            When I’m not building software or exploring new AI models, you’ll probably find me hiking in the mountains, staying active, or planning my next travel itinerary. I believe that stepping away from the screen is the best way to solve complex problems.
          </p>
        </motion.div>

        {/* Center column — photo + location stacked */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.18 }}
          className="flex flex-col gap-3 order-4"
        >
          <div className="rounded-2xl overflow-hidden h-[240px] md:h-auto md:flex-1 relative border border-white/5">
            <img src="/PhotoCV.PNG" alt="Ander Mañas" className="absolute inset-0 w-full h-full object-cover object-[center_20%]" />
          </div>
          <div className={cn(cardClasses, "relative h-[120px]")}>
            <RadarMap />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-3 h-3 text-white/70" />
                <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/80">Location</span>
              </div>
              <p className="text-lg font-black tracking-tighter leading-tight text-white">BASEL, SWITZERLAND</p>
            </div>
          </div>
        </motion.div>

        {/* Craft */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.24 }}
          className={cn(cardClasses, "p-6 flex flex-col order-5")}
        >
          <h3 className="text-xl md:text-2xl font-black tracking-tight mb-1 uppercase text-white">CRAFT</h3>
          <div className="h-0.5 w-8 bg-purple-500/50 rounded-full mb-4" />
          <p className="text-xs leading-relaxed text-white/80 mb-4">
            Building end-to-end software solutions where <strong className="text-white">architecture, security, and testability</strong> come first. 
          </p>
          <TagStrip />
          <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-white/[0.05]">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-1 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                Open to full-time roles &amp; collaborations
              </span>
            </div>
            <ChessSlider />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
