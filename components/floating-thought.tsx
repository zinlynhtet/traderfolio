"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface FloatingThoughtProps {
  text: string
  subtext?: string
  href: string
  position: { x: string; y: string }
  delay?: number
  variant?: "primary" | "secondary" | "accent"
}

export function FloatingThought({
  text,
  subtext,
  href,
  position,
  delay = 0,
  variant = "primary"
}: FloatingThoughtProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleClick = () => {
    setIsTransitioning(true)
    // Trigger portal animation before navigation
    setTimeout(() => {
      router.push(href)
    }, 800)
  }

  const variantStyles = {
    primary: "border-primary/30 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]",
    secondary: "border-secondary/30 hover:border-secondary/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
    accent: "border-accent/30 hover:border-accent/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)]"
  }

  return (
    <>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "absolute thought-glass rounded-xl px-3 py-2 md:px-4 md:py-3 cursor-pointer",
          "animate-thought-appear",
          "transition-all duration-500 ease-out",
          "hover:scale-110 hover:bg-white/10",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "group",
          variantStyles[variant],
          isHovered && "animate-float"
        )}
        style={{
          left: position.x,
          top: position.y,
          animationFillMode: "forwards"
        }}
      >
        {/* Glowing border effect */}
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20",
          isHovered && "opacity-100"
        )} />
        
        {/* Content */}
        <div className="relative z-10">
          <p className={cn(
            "text-xs md:text-base font-medium text-foreground/90 italic whitespace-nowrap",
            "transition-all duration-300",
            isHovered && "text-foreground"
          )}>
            {'"'}{text}{'"'}
          </p>
          {subtext && (
            <p className={cn(
              "text-xs text-muted-foreground mt-1 opacity-0 max-h-0 overflow-hidden whitespace-nowrap",
              "transition-all duration-300",
              isHovered && "opacity-100 max-h-20"
            )}>
              {subtext}
            </p>
          )}
        </div>

        {/* Click indicator */}
        <div className={cn(
          "absolute -bottom-2 left-1/2 -translate-x-1/2",
          "flex items-center gap-1 text-xs text-muted-foreground",
          "opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}>
          <span>Click to explore</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>

        {/* Comic book style tail */}
        <svg 
          className="absolute -bottom-4 left-8 w-8 h-6 text-white/5"
          viewBox="0 0 32 24"
        >
          <path d="M0 0 L16 24 L8 0 Z" fill="currentColor"/>
        </svg>
      </button>

      {/* Portal transition overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
          <div className="relative w-64 h-64">
            {/* Spinning portal rings */}
            <div className="absolute inset-0 rounded-full portal-gradient opacity-80 animate-portal-spin" />
            <div className="absolute inset-4 rounded-full portal-gradient opacity-60 animate-portal-spin" 
                 style={{ animationDirection: "reverse", animationDuration: "2s" }} />
            <div className="absolute inset-8 rounded-full portal-gradient opacity-40 animate-portal-spin"
                 style={{ animationDuration: "1.5s" }} />
            <div className="absolute inset-12 rounded-full bg-background" />
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-foreground font-bold text-lg animate-pulse">
                Entering Multiverse...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
