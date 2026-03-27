"use client"

import { cn } from "@/lib/utils"

interface DimensionPortalProps {
  isActive: boolean
  className?: string
}

export function DimensionPortal({ isActive, className }: DimensionPortalProps) {
  if (!isActive) return null

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center pointer-events-none",
      className
    )}>
      {/* Portal rings */}
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
        {/* Outer ring */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-primary/50"
          style={{
            animation: "portal-expand 1.5s ease-out forwards",
            boxShadow: "0 0 40px rgba(120, 220, 232, 0.5), inset 0 0 40px rgba(120, 220, 232, 0.3)"
          }}
        />
        
        {/* Middle ring */}
        <div 
          className="absolute inset-8 rounded-full border-2 border-secondary/50"
          style={{
            animation: "portal-expand 1.5s ease-out 0.1s forwards",
            boxShadow: "0 0 30px rgba(244, 114, 182, 0.5), inset 0 0 30px rgba(244, 114, 182, 0.3)"
          }}
        />
        
        {/* Inner ring */}
        <div 
          className="absolute inset-16 rounded-full border-2 border-accent/50"
          style={{
            animation: "portal-expand 1.5s ease-out 0.2s forwards",
            boxShadow: "0 0 25px rgba(167, 139, 250, 0.5), inset 0 0 25px rgba(167, 139, 250, 0.3)"
          }}
        />

        {/* Center vortex */}
        <div 
          className="absolute inset-24 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"
          style={{
            animation: "portal-expand 1.5s ease-out 0.3s forwards",
            filter: "blur(10px)"
          }}
        />
      </div>

      {/* Flash overlay */}
      <div 
        className="absolute inset-0 bg-white"
        style={{
          animation: "flash 1.5s ease-out forwards"
        }}
      />

      <style jsx>{`
        @keyframes portal-expand {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(5) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes flash {
          0% { opacity: 0; }
          70% { opacity: 0; }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
