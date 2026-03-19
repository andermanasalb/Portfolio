"use client"

import React from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { ArrowRight, Search, Smile, GraduationCap, Layers, Briefcase, Mail, UserPlus, Download } from "lucide-react"
import { Avatar3D } from "@/components/avatar-3d"
import Link from "next/link"
import { cn } from "@/lib/utils"

const quickLinks = [
  { label: "Me", icon: Smile, color: "text-emerald-400" },
  { label: "Education", icon: GraduationCap, color: "text-blue-400" },
  { label: "Tech Stack", icon: Layers, color: "text-purple-400" },
  { label: "Projects", icon: Briefcase, color: "text-pink-400" },
  { label: "Contact", icon: Mail, color: "text-amber-400" },
]

export function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [inputValue, setInputValue] = React.useState("")
  const [response, setResponse] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPills, setShowPills] = React.useState(true)

  const isChatting = response !== null || isLoading

  React.useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [mouseX, mouseY])

  const handleChat = async (query: string) => {
    if (!query.trim()) return
    setIsLoading(true)
    setResponse(null)
    setInputValue("")
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      })
      const data = await res.json()
      if (data.text) setResponse(data.text)
      else setResponse("Lo siento, algo ha fallado. ¿Tienes la API Key configurada?")
    } catch (err) {
      setResponse("Error de conexión. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const promptQuickLink = (label: string) => {
    const prompts: Record<string, string> = {
      "Me": "Tell me more about Ander's background and engineering mindset.",
      "Education": "What are Ander's most relevant studies in software and aerospace?",
      "Tech Stack": "What is Ander's current tech stack and core skills?",
      "Projects": "Explain the most important projects Ander has built recently.",
      "Contact": "How can I collaborate with Ander or reach out to him?"
    }
    handleChat(prompts[label] || label)
  }

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl h-full py-4 md:py-8">
        
        <AnimatePresence mode="wait">
          {!isChatting && (
            <motion.div
              key="hero-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              className="flex flex-col items-center mb-4 md:mb-6"
            >
              <h1 className="flex flex-col items-center text-center font-black tracking-tighter">
                <span className="text-lg md:text-xl text-white/80 mb-1 font-semibold">
                  Hey, I&apos;m <span className="text-white">Ander</span> 👋
                </span>
                <span className="block text-2xl md:text-4xl lg:text-5xl tracking-tighter py-1">
                  <span className="gradient-aurora">FULL STACK ENGINEER</span>
                  <span className="text-white/20 font-light mx-4 hidden lg:inline">|</span>
                  <span className="gradient-aurora block lg:inline mt-1 lg:mt-0">AI DEVELOPER</span>
                </span>
              </h1>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Link href="#contact" className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-[10px] md:text-[11px] tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  LET&apos;S COLLABORATE <UserPlus className="inline w-3.5 h-3.5 ml-1 mb-0.5" />
                </Link>
                <a href="/Ander_manas_CV.pdf" download className="px-5 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] text-white/90 font-bold text-[10px] md:text-[11px] tracking-widest rounded-xl border border-white/10 transition-all">
                  GET RESUME <Download className="inline w-3.5 h-3.5 ml-1 mb-0.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ 
            y: isChatting ? -30 : 0, 
            scale: isChatting ? 0.35 : 1,
            height: isChatting ? "80px" : "260px"
          }}
          className="relative flex items-center justify-center w-full z-20"
        >
          <div className="w-[300px] h-[300px] flex items-center justify-center">
            <Avatar3D mouseX={mouseX} mouseY={mouseY} />
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center items-center w-full overflow-hidden py-4">
          <AnimatePresence>
            {isChatting && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-2xl">
                <div className="bg-white/[0.04] backdrop-blur-3xl border border-white/5 p-6 rounded-[2rem] w-full shadow-2xl">
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 text-left">Ander&apos;s Assistant</span>
                    <button onClick={() => setResponse(null)} className="ml-auto text-white/20 hover:text-white transition-colors">✕</button>
                  </div>
                  {isLoading ? (
                    <div className="flex gap-2 py-4"><span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" /><span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" /><span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]" /></div>
                  ) : (
                    <div className="max-h-[35vh] overflow-y-auto pr-2 text-left font-medium text-white/90 text-sm md:text-base leading-relaxed custom-scrollbar">
                      {response}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div className="w-full flex flex-col items-center gap-4 mt-auto">
          {isChatting && (
             <div className="flex flex-col items-center gap-2 mb-2">
                <button onClick={() => setShowPills(!showPills)} className="text-[10px] text-white/30 hover:text-white/60 tracking-widest uppercase">
                  {showPills ? "▼ Hide quick questions" : "▲ Show quick questions"}
                </button>
                {showPills && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center gap-2">
                    {quickLinks.map(item => (
                      <button key={item.label} onClick={() => promptQuickLink(item.label)} className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all flex items-center gap-2">
                        <item.icon className={cn("w-3.5 h-3.5 opacity-70", item.color)} />
                        <span className="text-[11px] text-white/50">{item.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
             </div>
          )}
          <div className="w-full max-w-lg relative">
            <div className={cn("relative flex items-center rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 group-hover:border-purple-500/30 transition-all", isChatting && "border-purple-500/20")}>
              <Search className="absolute left-5 w-4 h-4 text-white/20" />
              <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === "Enter" && handleChat(inputValue)} placeholder="Ask me anything..." className="w-full bg-transparent pl-12 pr-16 py-4 text-sm text-white outline-none" />
              <button onClick={() => handleChat(inputValue)} disabled={isLoading} className="absolute right-3 w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center disabled:opacity-50"><ArrowRight className="w-4 h-4 text-white" /></button>
            </div>
          </div>
          {!isChatting && (
            <div className="flex gap-3 flex-wrap justify-center mt-2">
              {quickLinks.map(item => (
                <button key={item.label} onClick={() => promptQuickLink(item.label)} className="flex flex-col items-center justify-center gap-2 w-20 h-20 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all">
                  <item.icon className={cn("w-6 h-6", item.color)} />
                  <span className="text-xs font-medium text-white/60">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
