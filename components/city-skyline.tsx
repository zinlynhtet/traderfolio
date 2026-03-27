"use client"

import { cn } from "@/lib/utils"

interface CitySkylineProps {
  className?: string
}

export function CitySkyline({ className }: CitySkylineProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Starry sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              opacity: 0.3 + Math.random() * 0.7,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div 
        className="absolute top-20 right-[15%] w-24 h-24 md:w-32 md:h-32 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #fef9c3, #fde047, #eab308)",
          boxShadow: "0 0 60px rgba(250, 204, 21, 0.4), 0 0 120px rgba(250, 204, 21, 0.2)"
        }}
      />

      {/* City Skyline SVG */}
      <svg 
        viewBox="0 0 1920 400" 
        className="absolute bottom-0 left-0 w-full h-auto opacity-90"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="building-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0f0f1a" />
          </linearGradient>
          
          <linearGradient id="building-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2a2a4a" />
            <stop offset="50%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#2a2a4a" />
          </linearGradient>
        </defs>

        {/* Far buildings (darker, smaller) */}
        <g fill="url(#building-gradient)" opacity="0.6">
          <rect x="50" y="280" width="60" height="120" />
          <rect x="130" y="250" width="80" height="150" />
          <rect x="230" y="220" width="50" height="180" />
          <rect x="300" y="260" width="70" height="140" />
          <rect x="400" y="200" width="90" height="200" />
          <rect x="520" y="240" width="60" height="160" />
          <rect x="600" y="180" width="100" height="220" />
          <rect x="730" y="230" width="50" height="170" />
          <rect x="800" y="190" width="80" height="210" />
          <rect x="910" y="250" width="60" height="150" />
          <rect x="1000" y="200" width="100" height="200" />
          <rect x="1130" y="240" width="70" height="160" />
          <rect x="1230" y="180" width="90" height="220" />
          <rect x="1350" y="220" width="60" height="180" />
          <rect x="1440" y="260" width="80" height="140" />
          <rect x="1550" y="200" width="70" height="200" />
          <rect x="1650" y="250" width="90" height="150" />
          <rect x="1770" y="230" width="60" height="170" />
          <rect x="1850" y="260" width="70" height="140" />
        </g>

        {/* Mid buildings */}
        <g fill="url(#building-highlight)" opacity="0.8">
          <rect x="80" y="300" width="90" height="100" />
          <rect x="190" y="270" width="70" height="130" />
          <rect x="280" y="290" width="100" height="110" />
          <rect x="410" y="250" width="80" height="150" />
          <rect x="520" y="280" width="120" height="120" />
          <rect x="670" y="260" width="60" height="140" />
          <rect x="760" y="240" width="100" height="160" />
          <rect x="890" y="290" width="70" height="110" />
          <rect x="990" y="260" width="90" height="140" />
          <rect x="1110" y="280" width="80" height="120" />
          <rect x="1220" y="250" width="100" height="150" />
          <rect x="1350" y="290" width="60" height="110" />
          <rect x="1440" y="270" width="90" height="130" />
          <rect x="1560" y="280" width="80" height="120" />
          <rect x="1680" y="260" width="70" height="140" />
          <rect x="1780" y="300" width="100" height="100" />
        </g>

        {/* Close buildings (main skyline) */}
        <g fill="#0a0a14">
          {/* Empire State style */}
          <path d="M200 400 L200 150 L210 150 L210 120 L220 120 L220 100 L230 80 L240 100 L240 120 L250 120 L250 150 L260 150 L260 400 Z" />
          
          {/* Wide office building */}
          <rect x="280" y="320" width="150" height="80" />
          <rect x="300" y="300" width="110" height="100" />
          
          {/* Twin towers style */}
          <rect x="480" y="200" width="60" height="200" />
          <rect x="560" y="200" width="60" height="200" />
          
          {/* Chrysler style */}
          <path d="M700 400 L700 180 L710 180 L720 160 L730 140 L740 120 L750 100 L760 120 L770 140 L780 160 L790 180 L800 180 L800 400 Z" />
          
          {/* Modern skyscraper */}
          <path d="M880 400 L880 160 L890 150 L900 140 L920 140 L930 150 L940 160 L940 400 Z" />
          
          {/* One WTC style */}
          <path d="M1050 400 L1070 100 L1090 80 L1110 100 L1130 400 Z" />
          
          {/* Curved modern building */}
          <path d="M1200 400 Q1220 350 1220 250 Q1220 200 1250 180 Q1280 200 1280 250 Q1280 350 1300 400 Z" />
          
          {/* Block buildings */}
          <rect x="1350" y="280" width="100" height="120" />
          <rect x="1370" y="250" width="60" height="150" />
          
          {/* Needle building */}
          <path d="M1550 400 L1550 180 L1560 180 L1560 160 L1570 140 L1580 160 L1580 180 L1590 180 L1590 400 Z" />
          
          {/* Wide base building */}
          <rect x="1650" y="320" width="120" height="80" />
          <rect x="1680" y="280" width="60" height="120" />
          
          {/* End building */}
          <rect x="1820" y="300" width="100" height="100" />
        </g>

        {/* Window lights */}
        <g fill="#fef08a" opacity="0.8">
          {[...Array(100)].map((_, i) => {
            const x = 100 + (i % 20) * 90
            const y = 320 + Math.floor(i / 20) * 20
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width="3"
                height="4"
                opacity={Math.random() > 0.3 ? 0.8 : 0}
              />
            )
          })}
        </g>
      </svg>

      {/* Ground fog/mist */}
      <div 
        className="absolute bottom-0 left-0 w-full h-32"
        style={{
          background: "linear-gradient(to top, rgba(10, 10, 20, 0.9), transparent)"
        }}
      />

      {/* Web pattern overlay */}
      <div className="absolute inset-0 web-pattern opacity-30" />
    </div>
  )
}
