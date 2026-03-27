"use client"

import { useEffect, useState, useRef } from "react"

interface Star {
  id: number
  x: number
  y: number
  z: number
  size: number
  speed: number
  color: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
}

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const starsRef = useRef<Star[]>([])
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  // Initialize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Create stars and particles when dimensions change
  useEffect(() => {
    if (dimensions.width === 0) return

    // Create 3D starfield
    const colors = ["#ffffff", "#78dce8", "#f472b6", "#a78bfa", "#fbbf24"]
    starsRef.current = Array.from({ length: 400 }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width - dimensions.width / 2,
      y: Math.random() * dimensions.height - dimensions.height / 2,
      z: Math.random() * 1500 + 100,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))

    // Create floating particles
    particlesRef.current = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
  }, [dimensions])

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2
    const focalLength = 300

    const animate = () => {
      timeRef.current += 0.016 // ~60fps
      const time = timeRef.current

      // Clear with trail effect for motion blur
      ctx.fillStyle = "rgba(3, 3, 8, 0.15)"
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Draw nebula clouds (moving slowly)
      const nebulaGradient1 = ctx.createRadialGradient(
        centerX + Math.sin(time * 0.1) * 100,
        centerY * 0.4 + Math.cos(time * 0.08) * 50,
        0,
        centerX + Math.sin(time * 0.1) * 100,
        centerY * 0.4 + Math.cos(time * 0.08) * 50,
        400
      )
      nebulaGradient1.addColorStop(0, "rgba(120, 220, 232, 0.05)")
      nebulaGradient1.addColorStop(0.5, "rgba(167, 139, 250, 0.03)")
      nebulaGradient1.addColorStop(1, "transparent")
      ctx.fillStyle = nebulaGradient1
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      const nebulaGradient2 = ctx.createRadialGradient(
        centerX * 1.5 + Math.cos(time * 0.07) * 80,
        centerY * 1.2 + Math.sin(time * 0.09) * 60,
        0,
        centerX * 1.5 + Math.cos(time * 0.07) * 80,
        centerY * 1.2 + Math.sin(time * 0.09) * 60,
        350
      )
      nebulaGradient2.addColorStop(0, "rgba(244, 114, 182, 0.04)")
      nebulaGradient2.addColorStop(0.5, "rgba(120, 220, 232, 0.02)")
      nebulaGradient2.addColorStop(1, "transparent")
      ctx.fillStyle = nebulaGradient2
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw stars (flying through effect)
      starsRef.current.forEach(star => {
        // Move star towards camera
        star.z -= star.speed * 3

        // Reset star if it passes the camera
        if (star.z <= 0) {
          star.z = 1500
          star.x = Math.random() * dimensions.width - centerX
          star.y = Math.random() * dimensions.height - centerY
        }

        // Project 3D to 2D
        const scale = focalLength / star.z
        const screenX = centerX + star.x * scale
        const screenY = centerY + star.y * scale
        const size = star.size * scale * 2

        // Only draw if on screen
        if (screenX >= -10 && screenX <= dimensions.width + 10 && 
            screenY >= -10 && screenY <= dimensions.height + 10) {
          
          // Draw star with glow
          const opacity = Math.min(1, (1500 - star.z) / 1000)
          
          // Motion trail
          if (star.z < 800) {
            const trailLength = Math.min(40, (800 - star.z) / 10)
            const gradient = ctx.createLinearGradient(
              screenX, screenY,
              screenX - (star.x * scale * 0.1),
              screenY - (star.y * scale * 0.1)
            )
            gradient.addColorStop(0, star.color)
            gradient.addColorStop(1, "transparent")
            ctx.strokeStyle = gradient
            ctx.lineWidth = size * 0.5
            ctx.beginPath()
            ctx.moveTo(screenX, screenY)
            ctx.lineTo(
              screenX - (star.x / star.z) * trailLength,
              screenY - (star.y / star.z) * trailLength
            )
            ctx.stroke()
          }

          // Star core
          ctx.beginPath()
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
          ctx.fillStyle = star.color
          ctx.globalAlpha = opacity
          ctx.fill()

          // Glow effect
          ctx.beginPath()
          ctx.arc(screenX, screenY, size * 2, 0, Math.PI * 2)
          const glow = ctx.createRadialGradient(
            screenX, screenY, 0,
            screenX, screenY, size * 3
          )
          glow.addColorStop(0, star.color)
          glow.addColorStop(1, "transparent")
          ctx.fillStyle = glow
          ctx.globalAlpha = opacity * 0.5
          ctx.fill()
          
          ctx.globalAlpha = 1
        }
      })

      // Draw floating particles (dust)
      particlesRef.current.forEach(particle => {
        particle.y -= particle.speed
        particle.x += Math.sin(time + particle.id) * 0.3

        if (particle.y < -10) {
          particle.y = dimensions.height + 10
          particle.x = Math.random() * dimensions.width
        }

        const pulseOpacity = particle.opacity * (0.5 + Math.sin(time * 2 + particle.id) * 0.5)
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = pulseOpacity
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Occasional shooting star
      if (Math.random() < 0.002) {
        const shootingStarX = Math.random() * dimensions.width
        const shootingStarY = Math.random() * dimensions.height * 0.5
        
        ctx.beginPath()
        ctx.moveTo(shootingStarX, shootingStarY)
        ctx.lineTo(shootingStarX + 80, shootingStarY + 80)
        const shootGradient = ctx.createLinearGradient(
          shootingStarX, shootingStarY,
          shootingStarX + 80, shootingStarY + 80
        )
        shootGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        shootGradient.addColorStop(1, "transparent")
        ctx.strokeStyle = shootGradient
        ctx.lineWidth = 2
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions])

  return (
    <>
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(120, 220, 232, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(244, 114, 182, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(167, 139, 250, 0.04) 0%, transparent 60%),
            linear-gradient(180deg, #030308 0%, #0a0a18 50%, #050510 100%)
          `
        }}
      />

      {/* Animated canvas */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Distant planet with animation */}
      <div 
        className="absolute w-24 h-24 md:w-40 md:h-40 rounded-full"
        style={{
          right: "8%",
          top: "12%",
          background: `
            radial-gradient(circle at 30% 30%, 
              rgba(167, 139, 250, 0.4) 0%, 
              rgba(120, 220, 232, 0.15) 40%, 
              rgba(10, 10, 30, 0.9) 70%,
              transparent 100%
            )
          `,
          boxShadow: "inset -8px -8px 20px rgba(0,0,0,0.6), 0 0 80px rgba(120, 220, 232, 0.15)",
          animation: "float-gentle 12s ease-in-out infinite"
        }}
      >
        {/* Planet ring */}
        <div 
          className="absolute w-[200%] h-[15%] left-1/2 top-1/2"
          style={{
            transform: "translateX(-50%) translateY(-50%) rotateX(75deg) rotateZ(-15deg)",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent 100%)",
            borderRadius: "50%"
          }}
        />
      </div>

      {/* Second distant planet */}
      <div 
        className="absolute w-12 h-12 md:w-20 md:h-20 rounded-full opacity-60"
        style={{
          left: "5%",
          bottom: "20%",
          background: `
            radial-gradient(circle at 40% 30%, 
              rgba(244, 114, 182, 0.3) 0%, 
              rgba(167, 139, 250, 0.1) 50%, 
              rgba(5, 5, 15, 0.8) 80%,
              transparent 100%
            )
          `,
          boxShadow: "inset -5px -5px 15px rgba(0,0,0,0.5)",
          animation: "float-gentle 15s ease-in-out infinite reverse"
        }}
      />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)"
        }}
      />
    </>
  )
}
