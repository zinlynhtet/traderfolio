"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface TransmissionProps {
  text: string
  subtext?: string
  href: string
  position: { x: string; y: string }
  variant?: "primary" | "secondary" | "accent"
  onActivate?: () => void
}

export function Transmission({ 
  text, 
  subtext, 
  href, 
  position, 
  variant = "primary",
  onActivate 
}: TransmissionProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActivating, setIsActivating] = useState(false)
  const router = useRouter()

  const variantStyles = {
    primary: "border-primary/30 hover:border-primary/60",
    secondary: "border-secondary/30 hover:border-secondary/60",
    accent: "border-accent/30 hover:border-accent/60"
  }

  const glowColors = {
    primary: "rgba(120, 220, 232, 0.3)",
    secondary: "rgba(244, 114, 182, 0.3)",
    accent: "rgba(167, 139, 250, 0.3)"
  }

  const handleClick = () => {
    setIsActivating(true)
    onActivate?.()
    setTimeout(() => {
      router.push(href)
    }, 800)
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "absolute transmission-glass rounded-lg px-4 py-2 md:px-5 md:py-3 cursor-pointer",
        "animate-transmission-appear",
        "transition-all duration-500 ease-out",
        "hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        variantStyles[variant],
        isActivating && "animate-dimension-warp"
      )}
      style={{
        left: position.x,
        top: position.y,
        boxShadow: isHovered 
          ? `0 0 30px ${glowColors[variant]}, inset 0 0 20px ${glowColors[variant]}`
          : `0 0 15px ${glowColors[variant]}`
      }}
    >
      {/* Signal indicator */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <div className={cn(
          "w-1.5 h-1.5 rounded-full",
          variant === "primary" && "bg-primary",
          variant === "secondary" && "bg-secondary",
          variant === "accent" && "bg-accent"
        )}>
          <div className={cn(
            "w-full h-full rounded-full animate-ping",
            variant === "primary" && "bg-primary",
            variant === "secondary" && "bg-secondary",
            variant === "accent" && "bg-accent"
          )} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-left">
        <p className={cn(
          "text-xs md:text-sm font-medium text-foreground/90 tracking-wide",
          "transition-all duration-300",
          isHovered && "text-foreground"
        )}>
          {text}
        </p>
        {subtext && (
          <p className={cn(
            "text-[10px] md:text-xs text-muted-foreground mt-0.5 opacity-0 max-h-0 overflow-hidden",
            "transition-all duration-300",
            isHovered && "opacity-100 max-h-10"
          )}>
            {subtext}
          </p>
        )}
      </div>

      {/* Data stream effect on hover */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${glowColors[variant]} 50%, transparent 100%)`,
            backgroundSize: "200% 100%",
            animation: "data-stream 1s linear infinite"
          }}
        />
      )}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-current opacity-50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-current opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-current opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-current opacity-50" />

      <style jsx>{`
        @keyframes data-stream {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </button>
  )
}
