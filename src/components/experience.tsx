import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    company: "Jet Aviation — Basel",
    role: "Stress Engineer · Maintenance",
    date: "2024 — Present",
    points: [
      "Perform structural analysis for composite and metallic aircraft components across multiple manufacturers.",
      "Produce technical calculations and substantiation reports in compliance with EASA/FAA requirements.",
      "Collaborate with internal teams and external stakeholders to deliver high-quality engineering solutions on schedule.",
      "Work with PLM Teamcenter in a fast-paced, international, and highly regulated environment."
    ],
    current: true
  },
  {
    company: "Aernnova — Bilbao",
    role: "Aeronautical Structural Calculation Engineer",
    date: "2022 — 2024",
    points: [
      "Worked on structural analysis and design activities for multiple aerospace programs.",
      "Contributed to aircraft and drone-related projects involving sizing, load analysis, and composite material behaviour.",
      "Updated technical analyses and reports for structural modifications and assembly-related changes.",
      "Applied structured problem-solving and engineering judgment in demanding multidisciplinary environments."
    ],
    current: false
  },
  {
    company: "ITP Aero — Bilbao",
    role: "Aeronautical Structural Calculation Engineer",
    date: "2020 — 2022",
    points: [
      "Designed and analysed bolted joints for aeronautical components in the Statics Department.",
      "Used engineering software including Unigraphics, Ansys, and Megalife to support design decisions.",
      "Contributed to technical validation work requiring precision, documentation, and attention to detail."
    ],
    current: false
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-24 px-4 max-w-4xl mx-auto w-full overflow-x-hidden">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-16 text-center">Work <span className="gradient-aurora">Experience</span></h2>
      <div className="relative border-l border-purple-500/20 ml-4 md:ml-0 group/timeline">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 ml-10 relative group/item"
          >
            {/* Glowing Dot */}
            <div className={cn(
               "absolute -left-[49px] top-1.5 w-4 h-4 rounded-full border-2 border-background z-10 transition-all duration-500",
               exp.current
                 ? "bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.9)] scale-110"
                 : "bg-surface group-hover/item:bg-purple-400/50"
            )} />
            
            <div className="flex flex-col gap-1 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                 <h3 className="text-xl font-bold tracking-tight group-hover/item:text-white transition-colors uppercase">{exp.company}</h3>
                 <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em]">{exp.date}</span>
              </div>
              <span className="text-muted-foreground/60 text-sm font-medium">{exp.role}</span>
            </div>

            <ul className="space-y-3">
              {exp.points.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/65 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-purple-400/70 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
