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
  const [messages, setMessages] = React.useState<{role: 'user' | 'assistant', content: string}[]>([])
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPills, setShowPills] = React.useState(true)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  // A chat is "active" if it has messages
  const hasActiveChat = messages.length > 0 || isLoading
  // The chat window is visible ONLY if active AND not minimized
  const isChatWindowOpen = hasActiveChat && !isMinimized

  // Auto-scroll logic for chat
  const scrollRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  // Fullscreen management: Scroll Lock + Navigation Hide
  React.useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden"
      document.body.classList.add("chat-fullscreen")
    } else {
      document.body.style.overflow = "unset"
      document.body.classList.remove("chat-fullscreen")
    }
    return () => { 
      document.body.style.overflow = "unset";
      document.body.classList.remove("chat-fullscreen")
    }
  }, [isFullscreen])

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
    const userMsg = { role: 'user' as const, content: query }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)
    setIsMinimized(false) // Always restore if user sends msg
    setInputValue("")
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      })
      const data = await res.json()
      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant' as const, content: data.text }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant' as const, content: "Lo siento, algo ha fallado. ¿Tienes la API Key configurada?" }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant' as const, content: "Error de conexión. Inténtalo de nuevo." }])
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
      "Contact": "How can I collaborate with Ander?"
    }
    handleChat(prompts[label] || label)
  }

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className={cn("relative z-10 flex flex-col items-center w-full max-w-5xl h-full transition-all duration-500", isChatWindowOpen && !isFullscreen ? "pt-2 md:pt-4 pb-2 md:pb-4" : "pt-4 md:pt-12 pb-8 md:pb-16")}>
        
        {/* Title Section (Visible when Window is CLOSED/MINIMIZED) */}
        <AnimatePresence mode="wait">
          {!isChatWindowOpen && (
            <motion.div
              key="hero-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              className="flex flex-col items-center mb-2 md:mb-4"
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
              <div className="mt-4 flex items-center justify-center gap-3">
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

        {/* 3D Avatar (Only visible when chat is NOT open) */}
        {!isFullscreen && !isChatWindowOpen && (
          <motion.div
            animate={{ 
              y: 0, 
              scale: 1,
              height: "240px"
            }}
            className="relative flex items-center justify-center w-full z-20"
          >
            <div className="w-[280px] h-[240px] flex items-center justify-center">
              <Avatar3D mouseX={mouseX} mouseY={mouseY} />
            </div>
          </motion.div>
        )}

        <div className="flex-1 flex flex-col items-center w-full min-h-0 relative">
          <AnimatePresence mode="wait">
            {isChatWindowOpen && (
              <motion.div 
                layoutId="chat-ui"
                initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.9, y: 20 }} 
                className={cn(
                  "flex flex-col transition-all duration-500",
                  isFullscreen 
                    ? "fixed inset-0 z-[1000] bg-[#0c0c14] h-screen w-screen" 
                    : "relative w-full max-w-4xl h-[75vh] md:h-[82vh] py-2"
                )}
              >
                <div className={cn(
                   "bg-[#0c0c14] backdrop-blur-3xl flex-1 flex flex-col overflow-hidden shadow-2xl transition-all duration-500",
                   isFullscreen ? "rounded-none border-none" : "rounded-2xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
                )}>
                  {/* macOS Window Header */}
                  <div className="flex items-center px-5 py-3 border-b border-white/5 bg-white/[0.03] select-none group/header">
                    <div className="flex gap-2 relative">
                       <button 
                        onClick={() => { setMessages([]); setIsFullscreen(false); setIsMinimized(false); }} 
                        className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center group/red transition-all shadow-[0_0_8px_rgba(255,95,86,0.3)]"
                       >
                         <span className="text-[9px] text-black opacity-0 group-hover/header:opacity-100 transition-opacity">✕</span>
                       </button>
                       <button 
                        onClick={() => { setIsMinimized(true); setIsFullscreen(false); }} 
                        className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center group/yellow transition-all shadow-[0_0_8px_rgba(255,189,46,0.3)]"
                       >
                         <span className="text-[9px] text-black font-bold -mt-0.5 opacity-0 group-hover/header:opacity-100 transition-opacity">−</span>
                       </button>
                       <button 
                        onClick={() => setIsFullscreen(!isFullscreen)} 
                        className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:brightness-110 flex items-center justify-center group/green transition-all shadow-[0_0_8px_rgba(39,201,63,0.3)]"
                       >
                         <span className="text-[7px] text-black opacity-0 group-hover/header:opacity-100 transition-opacity">▲</span>
                       </button>
                    </div>
                    <div className="flex-1 flex justify-center -ml-16">
                       <div className="flex items-center gap-2">
                          <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isFullscreen ? "bg-purple-500" : "bg-emerald-500")} />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                            {isFullscreen ? "Neural Core (Root Access)" : "Assistant Terminal"}
                          </span>
                       </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div 
                    ref={scrollRef}
                    className={cn(
                      "flex-1 overflow-y-auto p-4 custom-scrollbar scroll-smooth",
                      isFullscreen ? "md:p-12 md:px-[20vw]" : "md:p-10"
                    )}
                  >
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        layout
                        initial={{ opacity: 0, x: msg.role === 'user' ? 15 : -15, y: 10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        className={cn(
                          "flex w-full mb-10",
                          msg.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div className={cn(
                          "relative px-6 py-4 rounded-2xl text-[14px] leading-relaxed transition-all",
                          msg.role === "user" 
                            ? "bg-violet-600 border border-violet-500/50 text-white rounded-tr-sm shadow-[0_0_30px_rgba(139,92,246,0.2)]" 
                            : "bg-white/[0.05] border border-white/10 text-white/90 rounded-tl-sm backdrop-blur-md ml-14",
                          isFullscreen ? "max-w-[70%]" : "max-w-[85%] md:max-w-[75%]"
                        )}>
                          {msg.role === "assistant" && (
                            <div className="absolute -left-16 top-0 hidden md:flex w-12 h-12 items-center justify-center transition-all duration-500">
                              <img src="/me-avatar.png" alt="Ander Avatar" className="w-full h-full object-contain" />
                            </div>
                          )}
                          <div className="font-medium whitespace-pre-wrap">
                            {msg.content}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start ml-14">
                         <div className="bg-white/[0.05] border border-white/10 px-6 py-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                            <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-duration:0.6s]" />
                            <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                            <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
                         </div>
                      </div>
                    )}
                  </div>

                  {/* Integrated input in FULLSCREEN - Mimic Home's chatting style */}
                  {isFullscreen && (
                    <div className="p-4 md:px-[20vw] pb-8 border-t border-white/5 bg-white/[0.01] mt-auto">
                       <div className="max-w-3xl mx-auto flex flex-col items-center gap-1">
                            <div className="flex flex-col items-center gap-1.5 mb-1.5">
                                <button onClick={() => setShowPills(!showPills)} className="text-[9px] text-white/30 hover:text-white/60 tracking-[0.2em] uppercase transition-colors">
                                  {showPills ? "▼ Hide quick questions" : "▲ Show quick questions"}
                                </button>
                                {showPills && (
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center gap-1.5">
                                    {quickLinks.map(item => (
                                      <button key={item.label} onClick={() => promptQuickLink(item.label)} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all flex items-center gap-2">
                                        <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                                        <span className="text-[10px] text-white/50">{item.label}</span>
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                            </div>
                          <div className="w-full relative">
                            <div className="relative flex items-center rounded-2xl bg-white/[0.04] backdrop-blur-3xl border border-white/10 pr-1.5">
                              <Search className="absolute left-6 w-5 h-5 text-white/20" />
                              <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === "Enter" && handleChat(inputValue)} placeholder="Reply..." className="w-full bg-transparent pl-15 pr-18 py-3.5 text-sm text-white outline-none" />
                              <button onClick={() => handleChat(inputValue)} disabled={isLoading} className="absolute right-3 w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105 active:scale-95"><ArrowRight className="w-4 h-4 text-white" /></button>
                            </div>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {isMinimized && (
              <motion.button
                layoutId="chat-ui"
                onClick={() => { 
                  setIsMinimized(false); 
                  setIsFullscreen(false); 
                  const homeElement = document.getElementById('home');
                  if (homeElement) {
                    homeElement.scrollIntoView({ behavior: 'smooth' });
                  }
                  window.location.hash = "home";
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[1100] w-14 h-14 rounded-full bg-[#0c0c14] border-2 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.4)] overflow-hidden p-0.5 group"
              >
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img src="/me-avatar.png" alt="Restore Chat" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM UI SECTION */}
        {!isFullscreen && (
          <motion.div 
            className={cn("w-full flex flex-col items-center gap-2 md:gap-3 mt-auto", isChatWindowOpen ? "mb-0 md:mb-1" : "mb-4 md:mb-8")}
          >
            {isChatWindowOpen && (
               <div className="flex flex-col items-center gap-1 mb-1">
                  <button onClick={() => setShowPills(!showPills)} className="text-[10px] text-white/30 hover:text-white/60 tracking-widest uppercase mb-0.5">
                    {showPills ? "▼ Hide quick questions" : "▲ Show quick questions"}
                  </button>
                  {showPills && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center gap-2">
                      {quickLinks.map(item => (
                        <button key={item.label} onClick={() => promptQuickLink(item.label)} className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all flex items-center gap-2">
                          <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                          <span className="text-[11px] text-white/50">{item.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
               </div>
            )}

            <div className={cn("w-full max-w-2xl relative", isChatWindowOpen && "max-w-xl transition-all")}>
              <div className="relative flex items-center rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 pr-1.5 focus-within:border-purple-500/50 transition-all">
                <Search className="absolute left-5 w-5 h-5 text-white/20" />
                <input 
                  type="text" 
                  value={inputValue} 
                  onChange={e => setInputValue(e.target.value)} 
                  onKeyDown={e => e.key === "Enter" && handleChat(inputValue)} 
                  placeholder={isChatWindowOpen ? "Reply..." : "Ask me anything..."} 
                  className={cn("w-full bg-transparent pl-14 pr-16 text-white outline-none py-5", isChatWindowOpen ? "py-4 text-sm" : "py-5 text-sm md:text-base")} 
                />
                <button 
                  onClick={() => handleChat(inputValue)} 
                  disabled={isLoading} 
                  className={cn("absolute right-3 rounded-xl bg-violet-600 flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-lg", isChatWindowOpen ? "w-9 h-9" : "w-11 h-11")}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {!isChatWindowOpen && (
              <div className="flex gap-3 flex-wrap justify-center mt-2">
                {quickLinks.map(item => (
                  <button 
                    key={item.label} 
                    onClick={() => promptQuickLink(item.label)} 
                    className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all flex items-center gap-2 group"
                  >
                    <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", item.color)} />
                    <span className="text-[13px] text-white/50 group-hover:text-white/80">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
