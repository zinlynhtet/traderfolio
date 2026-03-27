"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ArrowLeft, Terminal } from "lucide-react"

interface DimensionWrapperProps {
  children: React.ReactNode
  title: string
  sectorName: string
  accentColor: "green" | "cyan" | "purple" | "pink" | "yellow"
}

// Generate deterministic binary pattern to avoid hydration mismatch
function generateBinaryPattern(streamIndex: number, itemIndex: number): string {
  // Use a simple deterministic pattern based on indices
  return ((streamIndex * 7 + itemIndex * 3) % 2 === 0) ? "1" : "0"
}

export function DimensionWrapper({
  children,
  title,
  sectorName,
  accentColor
}: DimensionWrapperProps) {
  const router = useRouter()
  const [isEntering, setIsEntering] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsEntering(false), 1200)
    return () => clearTimeout(timer)
  }, [])
  
  // Pre-compute deterministic durations to avoid hydration issues
  const streamDurations = useMemo(() => [6.5, 7.2, 8.1, 6.8, 7.5, 8.3, 6.9, 7.8], [])

  const handleBack = () => {
    setIsExiting(true)
    setTimeout(() => router.push("/"), 800)
  }

  const accentStyles = {
    green: {
      border: "border-primary/30",
      text: "text-primary",
      glow: "shadow-[0_0_30px_rgba(74,222,128,0.3)]",
      bg: "bg-primary/10"
    },
    cyan: {
      border: "border-secondary/30",
      text: "text-secondary",
      glow: "shadow-[0_0_30px_rgba(34,211,238,0.3)]",
      bg: "bg-secondary/10"
    },
    purple: {
      border: "border-accent/30",
      text: "text-accent",
      glow: "shadow-[0_0_30px_rgba(167,139,250,0.3)]",
      bg: "bg-accent/10"
    },
    pink: {
      border: "border-pink-500/30",
      text: "text-pink-400",
      glow: "shadow-[0_0_30px_rgba(244,114,182,0.3)]",
      bg: "bg-pink-500/10"
    },
    yellow: {
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      glow: "shadow-[0_0_30px_rgba(251,191,36,0.3)]",
      bg: "bg-yellow-500/10"
    }
  }

  const accent = accentStyles[accentColor]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-50" />
      
      {/* Floating data streams */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-primary/20 font-mono text-xs animate-data-flow"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${streamDurations[i]}s`
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j}>{generateBinaryPattern(i, j)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Entry warp effect */}
      {isEntering && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            {/* Loading rings */}
            <div 
              className="absolute inset-0 rounded-lg border-2 border-primary/50"
              style={{ animation: "warp-ring 1.2s ease-out forwards" }}
            />
            <div 
              className="absolute inset-4 rounded-lg border-2 border-secondary/50"
              style={{ animation: "warp-ring 1.2s ease-out 0.1s forwards" }}
            />
            <div 
              className="absolute inset-8 rounded-lg border-2 border-accent/50"
              style={{ animation: "warp-ring 1.2s ease-out 0.2s forwards" }}
            />
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center font-mono">
                <Terminal className="w-8 h-8 mx-auto mb-2 text-primary animate-pulse" />
                <p className="text-foreground/80 text-xs tracking-widest mb-1">{"> LOADING"}</p>
                <p className={cn("font-bold text-sm", accent.text)}>{sectorName}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exit effect */}
      {isExiting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
          <div className="text-center font-mono">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg border-2 border-primary/50 animate-ping" />
            <p className="text-foreground/80 text-xs tracking-widest">{"> RETURNING TO HQ..."}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-40 p-4",
        "bg-background/80 backdrop-blur-md border-b border-primary/10"
      )}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              "terminal-glass transition-all duration-300",
              "hover:scale-105",
              accent.border,
              accent.text
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono">{"<"} BACK</span>
          </button>

          <div className="text-center">
            <h1 className={cn("text-lg md:text-xl font-mono tracking-wider", accent.text)}>
              {title}
            </h1>
          </div>

          <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {sectorName}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className={cn(
        "relative z-10 pt-24 pb-16 px-4",
        "transition-all duration-700",
        isEntering && "opacity-0 translate-y-8",
        !isEntering && "opacity-100 translate-y-0"
      )}>
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* Corner decorations */}
      <div className="fixed top-16 right-4 w-8 h-8 border-r border-t border-primary/20 pointer-events-none z-30" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-l border-b border-primary/20 pointer-events-none z-30" />

      {/* Scan line */}
      <div className="fixed inset-0 pointer-events-none scan-line opacity-30 z-20" />

      <style jsx>{`
        @keyframes warp-ring {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
