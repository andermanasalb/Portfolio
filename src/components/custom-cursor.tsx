"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Outer glow blob — smooth follow
  const glowX = useSpring(mouseX, { stiffness: 180, damping: 28, restDelta: 0.001 })
  const glowY = useSpring(mouseY, { stiffness: 180, damping: 28, restDelta: 0.001 })

  // Inner dot — near-instant, no overshoot
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 50, restDelta: 0.001 })
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 50, restDelta: 0.001 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Outer glow blob */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-10 h-10 rounded-full bg-white/8 blur-md pointer-events-none z-[9997] hidden md:block will-change-transform"
      />
      {/* Inner precise dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] hidden md:block will-change-transform"
      />
    </>
  )
}
