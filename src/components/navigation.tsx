"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, Code, Mail, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const navItems = [
  { icon: Home, label: "Home", href: "#home", sectionId: "home" },
  { icon: User, label: "About", href: "#about", sectionId: "about" },
  { icon: Briefcase, label: "Experience", href: "#experience", sectionId: "experience" },
  { icon: Layers, label: "Tech Stack", href: "#skills", sectionId: "skills" },
  { icon: Code, label: "Projects", href: "#projects", sectionId: "projects" },
  { icon: Mail, label: "Contact", href: "#contact", sectionId: "contact" },
]

export function Navigation() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [activeSection, setActiveSection] = React.useState("home")
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Encontramos la entrada que esté intersectando el centro de la pantalla
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      // Margen configurado para crear una línea de detección invisible exactamente en la mitad de la pantalla
      { rootMargin: "-50% 0px -49% 0px" }
    )

    navItems.forEach((item) => {
      const el = document.getElementById(item.sectionId)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav
      style={{ left: "calc(1.5rem + env(safe-area-inset-left, 0px))" }}
      className="fixed top-1/2 -translate-y-1/2 z-50"
    >
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 120, delay: 0.3 }}
        className="rounded-full py-3 px-2 flex flex-col items-center gap-1 shadow-2xl border border-purple-500/[0.18] bg-[#0a0a18]/80 backdrop-blur-xl"
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.sectionId

          return (
            <div
              key={item.label}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                href={item.href}
                onClick={() => setActiveSection(item.sectionId)}
                className="relative flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full transition-colors"
              >
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.2 : 1,
                    x: hoveredIndex === index ? 2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full transition-colors",
                    hoveredIndex === index
                      ? "bg-white/10 text-white"
                      : isActive
                      ? "text-white"
                      : "text-muted"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>

                {/* Active dot */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-dot"
                    className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_6px_2px_rgba(168,85,247,0.7)]"
                  />
                )}
              </Link>

              {/* Label espectacular — aparece a la derecha */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-[calc(100%+16px)] pointer-events-none whitespace-nowrap"
                  >
                    <span className="text-4xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                      {item.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </motion.div>
    </nav>
  )
}
