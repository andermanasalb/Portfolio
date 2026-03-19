"use client"

import { useEffect, useRef } from "react"
import { useMotionValue, useSpring } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function StoryBackground() {
  // ── Mouse glow (del GlobalBackground original) ──────────────────────────
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
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

  useEffect(() => {
    const u1 = springX.on("change", (v) =>
      document.documentElement.style.setProperty("--glow-x", `${v}%`)
    )
    const u2 = springY.on("change", (v) =>
      document.documentElement.style.setProperty("--glow-y", `${v}%`)
    )
    return () => { u1(); u2() }
  }, [springX, springY])

  // ── Refs para la animación GSAP ─────────────────────────────────────────
  const bgRef         = useRef<HTMLDivElement>(null)
  const techGridRef   = useRef<HTMLDivElement>(null)
  const particlesRef  = useRef<HTMLDivElement>(null)
  const planeWrapRef  = useRef<HTMLDivElement>(null)
  const laptopRef     = useRef<HTMLDivElement>(null)
  const screenTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // ── Partículas binarias ──────────────────────────────────────────────
    const container = particlesRef.current!
    const particles: HTMLSpanElement[] = []
    for (let i = 0; i < 55; i++) {
      const span = document.createElement("span")
      span.textContent = Math.random() > 0.5 ? "1" : "0"
      span.style.cssText = `
        position:absolute;
        left:${25 + Math.random() * 50}%;
        top:${10 + Math.random() * 75}%;
        font-family:monospace;
        font-size:${10 + Math.random() * 6}px;
        color:rgba(139,92,246,${0.2 + Math.random() * 0.4});
        opacity:0;
        pointer-events:none;
        user-select:none;
      `
      container.appendChild(span)
      particles.push(span)
      gsap.to(span, {
        opacity: 0.4 + Math.random() * 0.5,
        y: `${(Math.random() - 0.5) * 50}px`,
        duration: 1.2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 4,
        ease: "sine.inOut",
      })
    }

    // ── Movimiento idle del avión (flotación + deriva lateral) ──────────
    const floatAnim = gsap.to(planeWrapRef.current, {
      y: "+=16",
      repeat: -1,
      yoyo: true,
      duration: 3.2,
      ease: "sine.inOut",
    })
    const driftAnim = gsap.to(planeWrapRef.current, {
      x: "+=22",
      rotate: 4,
      repeat: -1,
      yoyo: true,
      duration: 5.5,
      ease: "sine.inOut",
      delay: 0.8,
    })

    // ── Timeline principal (scroll-driven) ───────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    })

    // Fase 1→2 (0 – 0.4): fondo se profundiza, avión desciende, grid aparece
    tl.to(bgRef.current, {
      background: "radial-gradient(ellipse at 65% 35%, #0d0b2e 0%, #06060f 60%)",
    }, 0)
    tl.to(planeWrapRef.current, { y: "+=18vh", x: "-6vw", scale: 0.78 }, 0)
    tl.to(techGridRef.current,  { opacity: 0.55 }, 0.08)
    tl.to(particlesRef.current, { opacity: 1 },    0.22)

    // Fase 2 (0.4 – 0.65): descenso más pronunciado
    tl.to(planeWrapRef.current, { y: "+=38vh", scale: 0.38 }, 0.45)

    // Fase 3 (0.65 – 1.0): laptop sube, avión se digitaliza, texto aparece
    tl.to(laptopRef.current,    { y: 0, opacity: 1, ease: "power2.out" }, 0.65)
    tl.to(planeWrapRef.current, { y: "+=16vh", opacity: 0, scale: 0.08 }, 0.80)
    tl.to(screenTextRef.current,{ opacity: 1 }, 0.90)

    return () => {
      tl.kill()
      floatAnim.kill()
      driftAnim.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      particles.forEach((p) => p.remove())
    }
  }, [])

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: -10, overflow: "hidden", pointerEvents: "none" }}
    >
      {/* ── Fondo base ──────────────────────────────────────────────────── */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 30%, #0d0b2e 0%, #07070f 55%)",
        }}
      />

      {/* ── Mouse glow ──────────────────────────────────────────────────── */}
      <div className="mouse-glow absolute inset-0" />

      {/* ── Blobs ambientales (del GlobalBackground) ─────────────────── */}
      <div className="animate-blob absolute -top-32 -left-20 w-[650px] h-[650px] rounded-full bg-violet-600/[0.10] blur-[130px]" />
      <div className="animate-blob delay-2000 absolute -top-16 -right-32 w-[550px] h-[550px] rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      <div className="animate-blob delay-4000 absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/[0.06] blur-[140px]" />

      {/* ── Tech dot-grid (fase 2) ───────────────────────────────────── */}
      <div
        ref={techGridRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.18) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* ── Partículas binarias (generadas dinámicamente) ────────────── */}
      <div
        ref={particlesRef}
        style={{ position: "absolute", inset: 0, opacity: 0 }}
      />

      {/* ── Avión visto desde arriba ──────────────────────────────────── */}
      <div
        ref={planeWrapRef}
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          filter: "drop-shadow(0 0 32px rgba(139,92,246,0.5)) drop-shadow(0 0 8px rgba(255,255,255,0.15))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/plane.png"
          alt="airplane"
          width={240}
          style={{ transform: "rotate(180deg)", display: "block", opacity: 0.92, mixBlendMode: "screen" }}
        />
      </div>

      {/* ── MacBook SVG (fase 3) ─────────────────────────────────────── */}
      <div
        ref={laptopRef}
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%) translateY(60px)",
          opacity: 0,
          filter: "drop-shadow(0 0 30px rgba(74,222,128,0.2))",
        }}
      >
        <div style={{ position: "relative", width: 340 }}>
          <svg viewBox="0 0 340 215" width="340" style={{ display: "block" }}>
            {/* Pantalla */}
            <rect x="18" y="6" width="304" height="182" rx="12"
              fill="#0f0f1a" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
            {/* Interior pantalla */}
            <rect x="30" y="18" width="280" height="158" rx="6" fill="#080810" />
            {/* Cámara */}
            <circle cx="170" cy="12" r="2.5" fill="rgba(255,255,255,0.2)" />
            {/* Base */}
            <rect x="0" y="188" width="340" height="20" rx="7"
              fill="#181828" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            {/* Trackpad */}
            <rect x="135" y="192" width="70" height="10" rx="3" fill="#222235" />
          </svg>

          {/* Texto en pantalla */}
          <div
            ref={screenTextRef}
            style={{
              position: "absolute",
              top: 26,
              left: 38,
              width: 264,
              height: 150,
              opacity: 0,
              padding: "10px 12px",
              overflow: "hidden",
              fontFamily: "monospace",
              fontSize: 11,
              lineHeight: 1.7,
              color: "#4ade80",
              whiteSpace: "pre",
            }}
          >
            <span style={{ color: "rgba(139,92,246,0.7)" }}>ander@portfolio</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}> ~ % </span>
            {"node index.js\n"}
            <span style={{ color: "rgba(255,255,255,0.5)" }}>
              {"Loading experience...\n"}
            </span>
            <span style={{ color: "#4ade80" }}>
              {'> console.log("Hello World")\n'}
              {"Hello World\n"}
              {'> "I am an Engineer"\n'}
            </span>
            <span style={{ color: "#facc15" }}>
              {"  ✓ Aerospace: 5 years\n"}
              {"  ✓ Full Stack: building\n"}
            </span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>
              {"█"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
