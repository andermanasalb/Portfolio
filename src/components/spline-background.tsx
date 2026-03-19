"use client"

import { useEffect, useRef } from "react"

export function SplineBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let app: { dispose?: () => void } | null = null

    import("@splinetool/runtime").then(({ Application }) => {
      const canvas = document.createElement("canvas")
      canvas.style.width = "100%"
      canvas.style.height = "100%"
      containerRef.current!.appendChild(canvas)

      app = new Application(canvas)
      ;(app as { load: (url: string) => Promise<void> })
        .load("https://prod.spline.design/6Uar1o7gv3MVOozu/scene.splinecode")
    })

    return () => {
      app?.dispose?.()
      if (containerRef.current) containerRef.current.innerHTML = ""
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    />
  )
}
