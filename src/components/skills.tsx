"use client"

import { motion } from "framer-motion"

const row1 = [
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "Express", slug: "express", color: "FFFFFF" },
  { name: "NestJS", slug: "nestjs", color: "E0234E" },
  { name: "Flask", slug: "flask", color: "FFFFFF" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
]

const row2 = [
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  { name: "Redis", slug: "redis", color: "FF4438" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "Vitest", slug: "vitest", color: "6E9F18" },
  { name: "Playwright", slug: "playwright", color: "2EAD33" },
  { name: "GitHub", slug: "github", color: "FFFFFF" },
]

function TechCard({ name, slug, color }: { name: string; slug: string; color: string }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-purple-500/[0.12] bg-white/[0.04] backdrop-blur-sm hover:border-purple-400/40 hover:bg-purple-500/[0.08] hover:shadow-[0_0_16px_rgba(168,85,247,0.25)] transition-all duration-300 shrink-0 group">
      <div className="w-10 h-10 flex items-center justify-center shrink-0">
        <img
          src={slug === "playwright" ? "https://playwright.dev/img/playwright-logo.svg" : `https://cdn.simpleicons.org/${slug}/${color}`}
          alt={name}
          className="w-9 h-9 object-contain transition-all duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold tracking-tight text-white whitespace-nowrap">{name}</span>
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted/60">Technology</span>
      </div>
    </div>
  )
}

function MarqueeRow({ items, direction }: { items: typeof row1; direction: "left" | "right" }) {
  const fromX = direction === "left" ? "0%" : "-50%"
  const toX = direction === "left" ? "-50%" : "0%"
  const duration = direction === "left" ? 30 : 36

  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        animate={{ x: [fromX, toX] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 min-w-max"
      >
        {/* Duplicated for seamless loop */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-4">
            {items.map((tech) => (
              <TechCard key={`${i}-${tech.slug}`} {...tech} />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="min-h-screen py-24 w-full overflow-hidden flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col items-center mb-16 px-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-white/20" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted/60">Inventory</span>
          <div className="h-px w-12 bg-white/20" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-center">
          The <span className="gradient-aurora">Tech Stack</span>
        </h2>
      </div>

      {/* Marquee rows */}
      <div className="flex flex-col gap-4">
        {/* Row 1 — scrolls left */}
        <div className="relative">
          <MarqueeRow items={row1} direction="left" />
          {/* Fade masks */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative">
          <MarqueeRow items={row2} direction="right" />
          {/* Fade masks */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
