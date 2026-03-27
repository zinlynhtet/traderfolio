"use client"

import { cn } from "@/lib/utils"

interface SpidermanCharacterProps {
  className?: string
  isFalling?: boolean
  isShootingWeb?: boolean
  webDirection?: "left" | "right"
}

export function SpidermanCharacter({ 
  className, 
  isFalling = true, 
  isShootingWeb = false,
  webDirection = "left"
}: SpidermanCharacterProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <svg
        viewBox="0 0 120 180"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 30px rgba(220, 38, 38, 0.5))" }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="spideyRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="spideyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="webGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* === SPIDER-MAN - DYNAMIC FALLING POSE === */}
        
        {/* Head - Tilted for dynamic pose */}
        <g transform="translate(60, 28) rotate(-10)">
          <ellipse cx="0" cy="0" rx="18" ry="22" fill="url(#spideyRed)"/>
          {/* Web lines on mask */}
          <path d="M0 -22 L0 22 M-18 0 L18 0 M-14 -18 Q0 0 14 18 M14 -18 Q0 0 -14 18" 
                stroke="#1a1a1a" strokeWidth="0.5" fill="none" opacity="0.4"/>
          {/* Eyes - Expressive */}
          <g filter="url(#eyeGlow)">
            <path d="M-12 -3 Q-8 -12 -2 -6 Q-5 4 -12 2 Z" fill="white">
              <animate attributeName="d" 
                       values="M-12 -3 Q-8 -12 -2 -6 Q-5 4 -12 2 Z;M-11 -2 Q-8 -10 -3 -5 Q-5 3 -11 1 Z;M-12 -3 Q-8 -12 -2 -6 Q-5 4 -12 2 Z" 
                       dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M12 -3 Q8 -12 2 -6 Q5 4 12 2 Z" fill="white">
              <animate attributeName="d" 
                       values="M12 -3 Q8 -12 2 -6 Q5 4 12 2 Z;M11 -2 Q8 -10 3 -5 Q5 3 11 1 Z;M12 -3 Q8 -12 2 -6 Q5 4 12 2 Z" 
                       dur="4s" repeatCount="indefinite"/>
            </path>
          </g>
          {/* Eye borders */}
          <path d="M-12 -3 Q-8 -12 -2 -6 Q-5 4 -12 2 Z" stroke="#0a0a0a" strokeWidth="1.5" fill="none"/>
          <path d="M12 -3 Q8 -12 2 -6 Q5 4 12 2 Z" stroke="#0a0a0a" strokeWidth="1.5" fill="none"/>
        </g>

        {/* Torso - Dynamic twist */}
        <g transform="translate(60, 70)">
          <path d="M-18 -15 Q-22 5 -15 30 L0 35 L15 30 Q22 5 18 -15 Q5 -20 -5 -20 Z" 
                fill="url(#spideyRed)"/>
          {/* Blue sides */}
          <path d="M-18 -12 Q-24 5 -18 28 L-12 30 Q-16 5 -14 -10 Z" fill="url(#spideyBlue)"/>
          <path d="M18 -12 Q24 5 18 28 L12 30 Q16 5 14 -10 Z" fill="url(#spideyBlue)"/>
          {/* Spider emblem */}
          <g transform="translate(0, 5)">
            <ellipse cx="0" cy="0" rx="4" ry="6" fill="#0a0a0a"/>
            <path d="M0 -6 L-3 -14 M0 -6 L3 -14 M-4 -2 L-12 -8 M4 -2 L12 -8 M-4 2 L-14 6 M4 2 L14 6 M0 6 L-6 16 M0 6 L6 16" 
                  stroke="#0a0a0a" strokeWidth="1.5" fill="none"/>
          </g>
        </g>

        {/* Left Arm - Extended for web shooting */}
        <g className={cn("origin-top-right", isShootingWeb && webDirection === "left" && "animate-pulse")}>
          <path d={isShootingWeb && webDirection === "left" 
            ? "M42 58 Q20 45 5 25" 
            : "M42 58 Q25 70 15 90"} 
                stroke="url(#spideyRed)" strokeWidth="10" strokeLinecap="round" fill="none"/>
          {/* Hand */}
          <circle cx={isShootingWeb && webDirection === "left" ? "5" : "15"} 
                  cy={isShootingWeb && webDirection === "left" ? "25" : "90"} 
                  r="6" fill="url(#spideyRed)"/>
          
          {/* Web shooting effect */}
          {isShootingWeb && webDirection === "left" && (
            <g>
              <line x1="2" y1="22" x2="-50" y2="-20" 
                    stroke="url(#webGlow)" strokeWidth="2" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.3s" repeatCount="indefinite"/>
              </line>
              <circle cx="-50" cy="-20" r="3" fill="white" opacity="0.8">
                <animate attributeName="r" values="3;5;3" dur="0.2s" repeatCount="indefinite"/>
              </circle>
            </g>
          )}
        </g>

        {/* Right Arm - Trailing back */}
        <g className={cn("origin-top-left", isShootingWeb && webDirection === "right" && "animate-pulse")}>
          <path d={isShootingWeb && webDirection === "right"
            ? "M78 58 Q100 45 115 25"
            : "M78 58 Q95 75 105 100"} 
                stroke="url(#spideyRed)" strokeWidth="10" strokeLinecap="round" fill="none"/>
          <circle cx={isShootingWeb && webDirection === "right" ? "115" : "105"} 
                  cy={isShootingWeb && webDirection === "right" ? "25" : "100"} 
                  r="6" fill="url(#spideyRed)"/>
          
          {/* Web shooting effect */}
          {isShootingWeb && webDirection === "right" && (
            <g>
              <line x1="118" y1="22" x2="170" y2="-20" 
                    stroke="url(#webGlow)" strokeWidth="2" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.3s" repeatCount="indefinite"/>
              </line>
              <circle cx="170" cy="-20" r="3" fill="white" opacity="0.8">
                <animate attributeName="r" values="3;5;3" dur="0.2s" repeatCount="indefinite"/>
              </circle>
            </g>
          )}
        </g>

        {/* Left Leg - Dynamic spread */}
        <path d="M50 100 Q35 130 25 165" 
              stroke="url(#spideyBlue)" strokeWidth="12" strokeLinecap="round" fill="none"/>
        <path d="M50 100 Q35 130 25 165" 
              stroke="url(#spideyRed)" strokeWidth="12" strokeLinecap="round" fill="none"
              strokeDasharray="0 30 50"/>
        <ellipse cx="22" cy="170" rx="8" ry="5" fill="url(#spideyRed)" transform="rotate(-20 22 170)"/>

        {/* Right Leg - Extended back */}
        <path d="M70 100 Q90 125 100 155" 
              stroke="url(#spideyBlue)" strokeWidth="12" strokeLinecap="round" fill="none"/>
        <path d="M70 100 Q90 125 100 155" 
              stroke="url(#spideyRed)" strokeWidth="12" strokeLinecap="round" fill="none"
              strokeDasharray="0 30 50"/>
        <ellipse cx="103" cy="160" rx="8" ry="5" fill="url(#spideyRed)" transform="rotate(25 103 160)"/>

        {/* Motion lines when falling */}
        {isFalling && (
          <g stroke="white" strokeWidth="1.5" opacity="0.6">
            <line x1="60" y1="-15" x2="60" y2="-35">
              <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.3s" repeatCount="indefinite"/>
              <animate attributeName="y2" values="-35;-45;-35" dur="0.3s" repeatCount="indefinite"/>
            </line>
            <line x1="40" y1="-10" x2="30" y2="-30">
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="0.4s" repeatCount="indefinite"/>
            </line>
            <line x1="80" y1="-10" x2="90" y2="-30">
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="0.35s" repeatCount="indefinite"/>
            </line>
            <line x1="25" y1="0" x2="10" y2="-15">
              <animate attributeName="opacity" values="0.3;0.05;0.3" dur="0.5s" repeatCount="indefinite"/>
            </line>
            <line x1="95" y1="0" x2="110" y2="-15">
              <animate attributeName="opacity" values="0.3;0.05;0.3" dur="0.45s" repeatCount="indefinite"/>
            </line>
          </g>
        )}
      </svg>
    </div>
  )
}
