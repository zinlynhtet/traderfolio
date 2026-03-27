"use client"

import { cn } from "@/lib/utils"

interface AstronautCharacterProps {
  className?: string
  isReaching?: boolean
  glowIntensity?: number
}

export function AstronautCharacter({ 
  className, 
  isReaching = false,
  glowIntensity = 1 
}: AstronautCharacterProps) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
      style={{
        filter: `drop-shadow(0 0 ${20 * glowIntensity}px rgba(120, 220, 232, ${0.4 * glowIntensity}))`
      }}
    >
      {/* Helmet glow effect */}
      <defs>
        <radialGradient id="helmetGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#78DCE8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#78DCE8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="visorGradient" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1a3a4a" />
          <stop offset="50%" stopColor="#0d1f2a" />
          <stop offset="100%" stopColor="#050a0d" />
        </radialGradient>
        <linearGradient id="suitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a3a4a" />
          <stop offset="50%" stopColor="#2a2a38" />
          <stop offset="100%" stopColor="#1a1a28" />
        </linearGradient>
        <linearGradient id="accentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#78DCE8" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>

      {/* Backpack / Life support */}
      <rect x="35" y="55" width="50" height="45" rx="8" fill="#1a1a28" stroke="#2a2a38" strokeWidth="1" />
      <rect x="40" y="60" width="15" height="8" rx="2" fill="#0d0d15" />
      <rect x="40" y="72" width="15" height="8" rx="2" fill="#0d0d15" />
      <circle cx="70" cy="70" r="6" fill="#0d0d15" stroke="#78DCE8" strokeWidth="1" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Helmet outer ring */}
      <ellipse cx="60" cy="38" rx="32" ry="34" fill="#2a2a38" />
      <ellipse cx="60" cy="38" rx="30" ry="32" fill="#3a3a4a" />
      
      {/* Helmet visor */}
      <ellipse cx="60" cy="40" rx="24" ry="22" fill="url(#visorGradient)" />
      
      {/* Visor reflection */}
      <ellipse cx="52" cy="32" rx="10" ry="8" fill="rgba(120, 220, 232, 0.15)" />
      <ellipse cx="48" cy="30" rx="4" ry="3" fill="rgba(255, 255, 255, 0.2)" />
      
      {/* Visor glow */}
      <ellipse cx="60" cy="40" rx="24" ry="22" fill="url(#helmetGlow)" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
      </ellipse>
      
      {/* Helmet rim light */}
      <ellipse cx="60" cy="40" rx="24" ry="22" fill="none" stroke="url(#accentGlow)" strokeWidth="1.5" opacity="0.7" />
      
      {/* Body / Suit */}
      <path
        d="M40 68 L35 70 L30 100 L40 105 L60 108 L80 105 L90 100 L85 70 L80 68"
        fill="url(#suitGradient)"
        stroke="#4a4a5a"
        strokeWidth="1"
      />
      
      {/* Suit chest light */}
      <circle cx="60" cy="82" r="4" fill="#78DCE8" opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="r" values="4;5;4" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="82" r="2" fill="white" opacity="0.9" />
      
      {/* Suit stripe accents */}
      <line x1="45" y1="75" x2="45" y2="100" stroke="#78DCE8" strokeWidth="1" opacity="0.4" />
      <line x1="75" y1="75" x2="75" y2="100" stroke="#f472b6" strokeWidth="1" opacity="0.4" />
      
      {/* Left Arm */}
      <g className={cn(
        "origin-[30px_75px] transition-transform duration-1000",
        isReaching && "animate-[reach_2s_ease-in-out_infinite]"
      )}>
        <path
          d={isReaching 
            ? "M30 70 L15 55 L5 40 L10 38 L20 52 L32 65"
            : "M30 70 L20 85 L15 100 L20 102 L28 88 L35 75"
          }
          fill="url(#suitGradient)"
          stroke="#4a4a5a"
          strokeWidth="1"
        />
        {/* Glove */}
        <ellipse 
          cx={isReaching ? "7" : "17"} 
          cy={isReaching ? "39" : "101"} 
          rx="6" 
          ry="5" 
          fill="#2a2a38"
        />
      </g>
      
      {/* Right Arm */}
      <path
        d="M90 70 L100 85 L105 100 L100 102 L92 88 L85 75"
        fill="url(#suitGradient)"
        stroke="#4a4a5a"
        strokeWidth="1"
      />
      {/* Right Glove */}
      <ellipse cx="103" cy="101" rx="6" ry="5" fill="#2a2a38" />
      
      {/* Left Leg */}
      <path
        d="M42 105 L38 130 L35 155 L45 157 L50 132 L52 108"
        fill="url(#suitGradient)"
        stroke="#4a4a5a"
        strokeWidth="1"
      />
      {/* Left Boot */}
      <ellipse cx="40" cy="156" rx="8" ry="4" fill="#1a1a28" />
      
      {/* Right Leg */}
      <path
        d="M78 105 L82 130 L85 155 L75 157 L70 132 L68 108"
        fill="url(#suitGradient)"
        stroke="#4a4a5a"
        strokeWidth="1"
      />
      {/* Right Boot */}
      <ellipse cx="80" cy="156" rx="8" ry="4" fill="#1a1a28" />
      
      {/* Floating particles around character */}
      <circle cx="20" cy="50" r="1" fill="#78DCE8" opacity="0.6">
        <animate attributeName="cy" values="50;40;50" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="60" r="1.5" fill="#f472b6" opacity="0.5">
        <animate attributeName="cy" values="60;45;60" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="15" cy="90" r="1" fill="#a78bfa" opacity="0.4">
        <animate attributeName="cy" values="90;80;90" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
