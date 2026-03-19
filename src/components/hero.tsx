"use client"

import React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Search, Smile, GraduationCap, Layers, Briefcase, Mail, UserPlus, Download } from "lucide-react"
import { Avatar3D } from "@/components/avatar-3d"
import Link from "next/link"

const quickLinks = [
  { label: "Me", icon: Smile, color: "text-emerald-400", href: "#about" },
  { label: "Education", icon: GraduationCap, color: "text-blue-400", href: "#experience" },
  { label: "Tech Stack", icon: Layers, color: "text-purple-400", href: "#skills" },
  { label: "Projects", icon: Briefcase, color: "text-pink-400", href: "#projects" },
  { label: "Contact", icon: Mail, color: "text-amber-400", href: "#contact" },
]

export function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  React.useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [mouseX, mouseY])

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl h-full">

        {/* Top — title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", damping: 20 }}
          className="pt-10 md:pt-14 flex flex-col items-center"
        >
          <h1 className="flex flex-col items-center text-center font-black tracking-tighter">
            <span className="text-lg md:text-2xl text-white/80 mb-1 md:mb-2 font-semibold tracking-tight">
              Hey, I&apos;m <span className="text-white">Ander</span> 👋
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl tracking-tighter py-1">
              <span className="gradient-aurora">FULL STACK ENGINEER</span>
              <span className="text-white/20 font-light mx-2 md:mx-4 hidden lg:inline">|</span>
              <span className="gradient-aurora block lg:inline mt-1 lg:mt-0">AI DEVELOPER</span>
            </span>
          </h1>
          
          {/* Action Buttons with a subtle funny touch */}
          <div className="mt-5 md:mt-6 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link 
                href="#contact"
                className="group relative flex items-center gap-1.5 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-[10px] md:text-[11px] tracking-widest rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.04] active:scale-95"
              >
                <span>LET&apos;S COLLABORATE</span>
                <UserPlus className="w-3.5 h-3.5 ml-1 group-hover:rotate-12 transition-transform" strokeWidth={2} />
                
                {/* The subtle funny touch: Hover tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-[10px] bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none hidden md:block border border-white/5 font-normal tracking-normal normal-case">
                  (I promise no `console.logs` in prod 🤞)
                </div>
              </Link>
              
              <a 
                href="/Ander_manas_CV.pdf" 
                download="Ander_manas_CV.pdf"
                className="group flex items-center gap-1.5 px-5 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] text-white/90 font-bold text-[10px] md:text-[11px] tracking-widest rounded-xl border border-white/10 hover:border-violet-500/50 transition-all hover:scale-[1.04] active:scale-95 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
              >
                <span>GET RESUME</span>
                <Download className="w-3.5 h-3.5 ml-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Center — 3D Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", damping: 18, stiffness: 70 }}
          className="flex-1 flex items-center justify-center w-full"
        >
          <Avatar3D mouseX={mouseX} mouseY={mouseY} />
        </motion.div>

        {/* Bottom — search + pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", damping: 20 }}
          className="pb-4 md:pb-8 flex flex-col items-center gap-4 w-full mt-auto"
        >
          <div className="w-full max-w-lg">
            <div className="relative flex items-center rounded-2xl shadow-2xl overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-purple-500/[0.15]">
              <Search className="absolute left-5 w-4 h-4 text-white/25 shrink-0" />
              <input
                type="text"
                placeholder="Ask me anything about me..."
                className="w-full bg-transparent pl-12 pr-16 py-3.5 text-sm text-white placeholder:text-white/22 outline-none"
                readOnly
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="absolute right-3 w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-lg"
              >
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </motion.button>
            </div>
          </div>

          <div className="flex gap-2 md:gap-3 flex-wrap justify-center mt-2">
            {quickLinks.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1.5 md:gap-2 w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all group hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.07, type: "spring" }}
                  className="flex flex-col items-center justify-center"
                >
                  <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.color} group-hover:scale-110 transition-transform duration-300`} strokeWidth={1.5} />
                  <span className="text-[10px] md:text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
