"use client"

import React from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowLeft, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const projects: { title: string; description: string; image: string; tags: string[]; live: string | null; github: string }[] = [
  {
    title: "JobTaylor",
    description: "AI-powered web app that tailors CVs to real job postings without fabricating experience or qualifications. Features job-posting search via Adzuna API, compatibility scoring, CV rewriting with Google Gemini, and export to PDF, DOCX and Markdown.",
    image: "/SocialPreviewJobtaylor.png",
    tags: ["React 19", "TypeScript", "Supabase", "Express", "Google Gemini", "Vitest", "Playwright"],
    live: "https://job-taylor.vercel.app",
    github: "https://github.com/andermanasalb/JobTaylor"
  },
  {
    title: "DeepKnight",
    description: "Full-stack chess app combining a custom alpha-beta negamax engine, a PyTorch neural network, and a Gemini-powered coaching layer. Three difficulty levels, real-time evaluation, and an LLM coach that explains every move.",
    image: "/SocialPreview Deepknight.png",
    tags: ["React", "TypeScript", "FastAPI", "PyTorch", "Google Gemini", "PostgreSQL", "Docker"],
    live: "https://deep-knight.vercel.app",
    github: "https://github.com/andermanasalb/DeepKnight"
  },
  {
    title: "InvoiceScan",
    description: "Production-grade invoice automation platform with Clean Architecture and strict TDD. Extracts structured data from PDFs via OCR (Tesseract + Gemini), processes async jobs with BullMQ, tracks events via Outbox pattern, and exports to CSV/JSON.",
    image: "/SocialPreviewInvoiceScan.png",
    tags: ["NestJS", "Next.js 15", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "OpenTelemetry"],
    live: "https://invoicescan-snowy.vercel.app",
    github: "https://github.com/andermanasalb/InvoiceScan"
  }
]

const cardVariants = {
  rest: {},
  hover: {},
}

const overlayVariants = {
  rest: { opacity: 0, y: 16 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
}

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.7, ease: "easeOut" as const } },
}

export function Projects() {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: "smooth" })
    }
  }

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-24 w-full overflow-hidden flex flex-col justify-center"
    >
      <div className="ambient-blob w-80 h-80 bg-white/[0.02] -top-20 -right-20" />

      {/* Header section con título perfectamente centrado */}
      <div className="relative flex flex-col items-center w-full mb-12 px-4">
        
        <div className="flex flex-col items-center space-y-4 max-w-xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">The <span className="gradient-aurora">Digital Vault</span></h2>
          <p className="text-muted">
            Real-world projects built with clean architecture, TDD, and AI integration.
          </p>
        </div>

        {/* Minimalist navigation pills absolutamente a la derecha para no romper el centro real */}
        <div className="hidden md:flex items-center gap-3 absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 mt-0">
          <button 
            onClick={scrollLeft}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-violet-500/50 bg-white/[0.02] hover:bg-violet-500/10 flex items-center justify-center transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
          </button>
          <button 
            onClick={scrollRight}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-violet-500/50 bg-white/[0.02] hover:bg-violet-500/10 flex items-center justify-center transition-all duration-300 group"
          >
            <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>

      {/* Contenedor tipo "cinta" horizontal con desplazamiento suave */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-6 lg:px-24 pb-12 snap-x snap-mandatory hide-scrollbar relative z-10"
        style={{ scrollBehavior: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
            // Mismo tamaño para todos (sin col-span-2 para jobtaylor)
            className="group relative shrink-0 w-[85vw] md:w-[600px] snap-center rounded-3xl overflow-hidden border border-purple-500/[0.15] bg-white/[0.04] backdrop-blur-xl hover:border-purple-400/40 hover:shadow-[0_-4px_30px_rgba(168,85,247,0.3)] transition-all duration-300"
          >
            <div className="relative w-full h-56 md:h-72 overflow-hidden">
              <motion.img
                variants={imageVariants}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <motion.div
                variants={overlayVariants}
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-8"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[9px] py-0.5 px-2 font-mono uppercase tracking-[0.15em] bg-white/10 border-white/10 text-white/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{project.description}</p>
                <div className="flex items-center gap-4">
                  {project.live && (
                    <Button variant="glass" size="sm" className="gap-2 rounded-full" asChild>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" /> Live Preview
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="gap-2 rounded-full text-white/60 hover:text-white" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" /> Source Code
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={{
                rest: { opacity: 1, height: "auto" },
                hover: { opacity: 0, height: 0, overflow: "hidden" },
              }}
              transition={{ duration: 0.2 }}
              className="px-8 py-5 flex items-center justify-between border-t border-white/5 bg-black/20"
            >
              <div>
                <h3 className="text-base font-bold tracking-tight">{project.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[9px] py-0.5 px-2 font-mono uppercase tracking-[0.15em] bg-white/5 border-white/5 text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[9px] text-muted-foreground font-mono">+{project.tags.length - 3} more</span>
                  )}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted/40 shrink-0" />
            </motion.div>
          </motion.div>
        ))}
      </div>
      
    </section>
  )
}
