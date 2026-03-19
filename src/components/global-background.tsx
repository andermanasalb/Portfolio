"use client"

import { useEffect } from "react"
import { useMotionValue, useSpring } from "framer-motion"

export function GlobalBackground() {
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  // Slow, heavy spring — el glow sigue el cursor con inercia
  const springX = useSpring(mouseX, { stiffness: 25, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 25, damping: 20 })

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100)
      mouseY.set((e.clientY / window.innerHeight) * 100)
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [mouseX, mouseY])

  // Actualiza CSS custom properties — sin re-renders, máximo rendimiento
  useEffect(() => {
    const u1 = springX.on("change", (v) =>
      document.documentElement.style.setProperty("--glow-x", `${v}%`)
    )
    const u2 = springY.on("change", (v) =>
      document.documentElement.style.setProperty("--glow-y", `${v}%`)
    )
    return () => { u1(); u2() }
  }, [springX, springY])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Mouse glow — sigue el cursor */}
      <div className="mouse-glow absolute inset-0" />

      {/* Blobs ambientales optimizados con menos blur y will-change */}
      <div 
        className="animate-blob absolute -top-32 -left-20 w-[650px] h-[650px] rounded-full bg-violet-600/[0.12] blur-[80px] will-change-transform" 
      />
      <div 
        className="animate-blob delay-2000 absolute -top-16 -right-32 w-[550px] h-[550px] rounded-full bg-indigo-500/[0.09] blur-[70px] will-change-transform" 
      />
      <div 
        className="animate-blob delay-4000 absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/[0.07] blur-[90px] will-change-transform" 
      />
      <div 
        className="animate-blob absolute -bottom-20 -left-10 w-[400px] h-[400px] rounded-full bg-rose-500/[0.05] blur-[60px] will-change-transform" 
      />
    </div>
  )
}
