"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface PortalTransitionProps {
  isActive: boolean
  onComplete?: () => void
  variant?: "enter" | "exit"
}

export function PortalTransition({ 
  isActive, 
  onComplete,
  variant = "enter" 
}: PortalTransitionProps) {
  const [phase, setPhase] = useState<"idle" | "expanding" | "complete">("idle")

  useEffect(() => {
    if (isActive) {
      setPhase("expanding")
      const timer = setTimeout(() => {
        setPhase("complete")
        onComplete?.()
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setPhase("idle")
    }
  }, [isActive, onComplete])

  if (phase === "idle") return null

  return (
    <div className={cn(
      "fixed inset-0 z-[100] pointer-events-none",
      "flex items-center justify-center overflow-hidden"
    )}>
      {/* Multiple expanding portal rings */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full",
            "transition-all duration-1000 ease-out"
          )}
          style={{
            width: phase === "expanding" || phase === "complete" ? "300vmax" : "0",
            height: phase === "expanding" || phase === "complete" ? "300vmax" : "0",
            background: `conic-gradient(
              from ${i * 72}deg,
              transparent,
              ${i % 2 === 0 ? "rgba(220, 38, 38, 0.3)" : "rgba(59, 130, 246, 0.3)"},
              transparent
            )`,
            transitionDelay: `${i * 100}ms`,
            animationDelay: `${i * 100}ms`
          }}
        />
      ))}

      {/* Center vortex */}
      <div 
        className={cn(
          "absolute rounded-full bg-background",
          "transition-all duration-700 ease-out"
        )}
        style={{
          width: phase === "complete" ? "300vmax" : "0",
          height: phase === "complete" ? "300vmax" : "0",
          transitionDelay: "300ms"
        }}
      />

      {/* Particle effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-2 h-2 rounded-full",
              i % 2 === 0 ? "bg-primary" : "bg-secondary"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: phase === "expanding" ? 1 : 0,
              transform: phase === "expanding" 
                ? `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(${Math.random() * 2})`
                : "translate(0, 0) scale(0)",
              transition: `all ${0.5 + Math.random() * 0.5}s ease-out`,
              transitionDelay: `${Math.random() * 300}ms`
            }}
          />
        ))}
      </div>

      {/* Dimension text flash */}
      {phase === "expanding" && (
        <div className="absolute text-4xl md:text-6xl font-bold text-foreground animate-pulse z-10">
          <span className="animate-glitch">DIMENSION SHIFT</span>
        </div>
      )}
    </div>
  )
}
