"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const infoCols = [
  {
    title: "Background",
    body: "BEng in Aerospace Engineering from UPV/EHU. 5+ years at ITP Aero, Aernnova, and Jet Aviation across structures, engines and maintenance.",
  },
  {
    title: "Current Role",
    body: "Aerospace Mechanical Engineer specializing in VIP aircraft maintenance and modifications at one of Europe's leading MRO centres.",
  },
  {
    title: "Education",
    body: "Pursuing a master's in AI-Driven Software Development at Universidad Isabel I, bridging aerospace expertise with modern full-stack engineering.",
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
  if (isHovered) yPos = -60;
  else if (isDefault) yPos = index === 1 ? -15 : 15;
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
        "absolute top-20 w-[42%] min-h-[150px] p-5 sm:p-6 flex flex-col gap-3 rounded-2xl border transition-colors duration-300",
        "bg-[#11111a] shadow-2xl",
        isHovered ? "border-purple-500/60 shadow-[0_0_40px_rgba(168,85,247,0.3)]" : "border-white/5 shadow-black/80",
        textAlignClass
      )}
      style={{
        left: index === 0 ? "2%" : index === 1 ? "50%" : "auto",
        right: index === 2 ? "2%" : "auto",
      }}
    >
      <h3 className="text-[11px] sm:text-xs font-black tracking-normal text-white uppercase">
        {col.title}
      </h3>
      <p className="text-[10px] sm:text-[12px] leading-relaxed text-white/50 font-medium">
        {col.body}
      </p>
    </motion.div>
  )
}

function InfoColGroup() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const isHoveringAny = hoveredIndex !== null;

  return (
    <div className="relative w-full h-[180px] overflow-hidden">
      {/* HOVER TO READ MORE label */}
      <motion.div
        animate={{ opacity: isHoveringAny ? 0 : 1, y: isHoveringAny ? -10 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-30"
      >
        <div className="px-5 py-1.5 rounded-full border border-white/5 bg-black/40 backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#818cf8]">Hover to read more</span>
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
      {/* Map Background — Much sharper and more defined */}
      <div
        className="absolute inset-0 opacity-100 grayscale contrast-[1.3] brightness-100"
        style={{
          backgroundImage: "url('/basel-map.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Vertical Neon Line — Sweeping Left to Right */}
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

const card = "rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-purple-500/[0.15] overflow-hidden transition-all duration-300 hover:border-purple-500/[0.3]"

export function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center py-10 px-4 max-w-5xl mx-auto w-full"
    >
      <div className="grid grid-cols-3 gap-2">

        {/* ── ROW 1 ──────────────────────────────────────────────────────── */}

        {/* Name card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={cn(card, "flex flex-col items-center justify-center p-8 h-[180px] text-center")}
        >
          <div className="flex flex-col items-center">
            <h2 className="text-[36px] font-black tracking-tighter leading-[1.0] text-white uppercase mb-4">
              ANDER<br />MAÑAS
            </h2>
            <div className="w-12 h-[1px] bg-white/10 mb-5" />
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-white/40">
              Fullstack Developer
            </p>
          </div>
        </motion.div>

        {/* Hover-to-read info card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.07 }}
          className={cn(card, "col-span-2 relative p-0 overflow-hidden h-[180px]")}
        >
          <div className="absolute inset-0 pt-0">
            <InfoColGroup />
          </div>
        </motion.div>

        {/* ── ROW 2 ──────────────────────────────────────────────────────── */}

        {/* Mindset */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.12 }}
          className={cn(card, "p-6 flex flex-col")}
        >
          <h3 className="text-2xl font-black tracking-tight mb-1">Mindset</h3>
          <div className="h-0.5 w-8 bg-purple-500/50 rounded-full mb-4" />

          <p className="text-sm leading-relaxed text-white/80 mb-3">
            <strong className="text-white">Building more than software.</strong> My aerospace background provides the{" "}
            <strong className="text-white">discipline and focus</strong> I need to grow.
          </p>

          {/* Hobby photo */}
          <div className="relative rounded-xl overflow-hidden my-3 h-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
              alt="Aerospace"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(0.6)", opacity: 0.7 }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Aerospace</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-white/60 mt-auto">
            <strong className="text-white/80">Mastering complexity</strong> is my path to{" "}
            <strong className="text-white/80">excellence</strong>.
          </p>
        </motion.div>

        {/* Center column — photo + location stacked */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.18 }}
          className="flex flex-col gap-2"
        >
          {/* Profile photo */}
          <div className="rounded-2xl overflow-hidden flex-1 relative min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/PhotoCV.PNG"
              alt="Ander Mañas"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
            />
          </div>

          {/* Location card */}
          <div className={cn(card, "relative h-[110px]")}>
            <RadarMap />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-3 h-3 text-white/70" />
                <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/80">Location</span>
              </div>
              <p className="text-lg font-black tracking-tighter leading-tight text-white">BASEL, SWITZERLAND</p>
              <p className="text-[9px] font-mono text-white/70 mt-0.5">
                47.5596° N, 7.5886° E<br />
                – GMT+1
              </p>
            </div>
          </div>
        </motion.div>

        {/* Craft */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.24 }}
          className={cn(card, "p-6 flex flex-col")}
        >
          <h3 className="text-2xl font-black tracking-tight mb-1">Craft</h3>
          <div className="h-0.5 w-8 bg-purple-500/50 rounded-full mb-4" />

          <p className="text-sm leading-relaxed text-white/80 mb-1">
            Building scalable <strong className="text-white">apps, APIs, and automations</strong>.
          </p>
          <p className="text-sm leading-relaxed text-white/55 mb-4">
            I understand what advantages modern tech can provide, helping me build the solutions that actually work in production.
          </p>

          {/* Scrolling tags */}
          <TagStrip />

          <p className="text-sm leading-relaxed text-white/60 mt-4">
            Aerospace Engineer turned Full Stack Developer. Feel free to{" "}
            <strong className="text-white/80">invite me to collaborate</strong>.
          </p>

          {/* Open to collab */}
          <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/[0.05]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Open to collaboration &amp; freelance</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
