"use client"

import React from "react"
// Se mantiene la interfaz por compatibilidad con el hero.tsx, 
// aunque no usemos el ratón para mover la imagen.
import { MotionValue } from "framer-motion"

interface Avatar3DProps {
  mouseX?: MotionValue<number>
  mouseY?: MotionValue<number>
}

export function Avatar3D({ mouseX, mouseY }: Avatar3DProps) {
  return (
    <div className="w-full flex-1 flex items-center justify-center min-h-0 py-2">
      {/* Añadimos un pequeño margen o transform en Y para acomodar el 30% extra sin aplastar lo de abajo */}
      <div className="relative flex items-center justify-center">
        
        {/* Halo de luz ajustado al nuevo 30% extra de la imagen */}
        <div className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full bg-violet-500/20 blur-[60px]" />
        
        {/* Tamaño del avatar incrementado un 30% (de w-36 pasó a w-48) */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 z-10 drop-shadow-[0_10px_30px_rgba(139,92,246,0.3)]">
          <img
            src="/me-avatar.png"
            alt="Ander"
            className="w-full h-full object-contain object-center scale-110"
          />
        </div>
      </div>
    </div>
  )
}
