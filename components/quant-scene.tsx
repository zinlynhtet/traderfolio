"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// Math formulas background animation
function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Math symbols and formulas
    const mathElements = [
      "∫", "∑", "∏", "√", "∞", "∂", "∇", "Δ", "π", "θ", "λ", "μ", "σ", "α", "β", "γ",
      "x²", "eˣ", "ln", "sin", "cos", "tan", "lim", "dx", "dy", "∈", "∀", "∃",
      "E=mc²", "F=ma", "PV=nRT", "∫f(x)dx", "Σxᵢ", "√2", "π/2", "e^iπ", "∂y/∂x",
      "μ+σ", "n!", "C(n,k)", "P(A|B)", "E[X]", "Var(X)", "ρ", "φ", "ψ", "ω"
    ];

    interface MathItem {
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;
      size: number;
      angle: number;
      rotationSpeed: number;
    }

    const items: MathItem[] = [];
    const itemCount = 40;

    for (let i = 0; i < itemCount; i++) {
      items.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: mathElements[Math.floor(Math.random() * mathElements.length)],
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.3,
        size: 12 + Math.random() * 20,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(5, 10, 20, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      items.forEach((item) => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.angle);
        ctx.font = `${item.size}px "Courier New", monospace`;
        ctx.fillStyle = `rgba(74, 222, 128, ${item.opacity})`;
        ctx.fillText(item.text, 0, 0);
        ctx.restore();

        // Update position
        item.y -= item.speed;
        item.angle += item.rotationSpeed;

        // Reset when off screen
        if (item.y < -50) {
          item.y = canvas.height + 50;
          item.x = Math.random() * canvas.width;
          item.text = mathElements[Math.floor(Math.random() * mathElements.length)];
        }
      });
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-60"
    />
  );
}

// Animated grid floor with perspective
function GridFloor() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: "500px" }}>
      <div
        className="absolute w-[200%] h-[200%] left-[-50%]"
        style={{
          transform: "rotateX(60deg) translateY(-20%)",
          background: `
            linear-gradient(90deg, rgba(74, 222, 128, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(74, 222, 128, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: rotateX(60deg) translateY(-20%); }
          100% { transform: rotateX(60deg) translateY(-70%); }
        }
      `}</style>
    </div>
  );
}

// Enhanced 3D Candlestick chart with different sizes
function CandlestickChart({ 
  size = "medium",
  className 
}: { 
  size?: "small" | "medium" | "large";
  className?: string 
}) {
  const [candles, setCandles] = useState<{ height: number; isGreen: boolean; wickTop: number; wickBottom: number }[]>([]);

  const sizeConfig = {
    small: { count: 8, maxHeight: 40, candleWidth: "w-2", gap: "gap-0.5" },
    medium: { count: 12, maxHeight: 60, candleWidth: "w-3", gap: "gap-1" },
    large: { count: 16, maxHeight: 80, candleWidth: "w-4", gap: "gap-1.5" },
  };

  const config = sizeConfig[size];

  useEffect(() => {
    const data = [];
    for (let i = 0; i < config.count; i++) {
      const isGreen = Math.random() > 0.45;
      data.push({
        height: 15 + Math.random() * config.maxHeight,
        isGreen,
        wickTop: Math.random() * 15,
        wickBottom: Math.random() * 15,
      });
    }
    setCandles(data);
  }, [config.count, config.maxHeight]);

  return (
    <div 
      className={`flex items-end ${config.gap} ${className}`} 
      style={{ 
        transform: "perspective(800px) rotateY(-10deg) rotateX(5deg)",
        transformStyle: "preserve-3d"
      }}
    >
      {candles.map((candle, i) => (
        <div key={i} className="flex flex-col items-center" style={{ animationDelay: `${i * 0.1}s` }}>
          <div
            className={`w-px ${candle.isGreen ? "bg-primary" : "bg-red-500"}`}
            style={{ height: `${candle.wickTop}px`, opacity: 0.7 }}
          />
          <div
            className={`${config.candleWidth} rounded-sm ${candle.isGreen ? "bg-primary shadow-[0_0_15px_rgba(74,222,128,0.6)]" : "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"}`}
            style={{ 
              height: `${candle.height}px`,
              animation: "candlePulse 3s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
              transform: "translateZ(5px)"
            }}
          />
          <div
            className={`w-px ${candle.isGreen ? "bg-primary" : "bg-red-500"}`}
            style={{ height: `${candle.wickBottom}px`, opacity: 0.7 }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes candlePulse {
          0%, 100% { opacity: 0.7; transform: translateZ(5px); }
          50% { opacity: 1; transform: translateZ(10px); }
        }
      `}</style>
    </div>
  );
}

// Data panel navigation
function DataPanel({
  title,
  content,
  color,
  delay,
  href,
  position,
}: {
  title: string;
  content: string;
  color: string;
  delay: number;
  href: string;
  position: string;
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`cursor-pointer opacity-0 ${position}`}
      style={{
        animation: `panelAppear 0.8s ease-out ${delay}s forwards`,
      }}
      onClick={() => router.push(href)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative p-4 sm:p-5 md:p-6 rounded-xl backdrop-blur-md transition-all duration-300 h-full"
        style={{
          background: isHovered ? `${color}15` : "rgba(10, 15, 25, 0.85)",
          border: `1px solid ${isHovered ? color : "rgba(255,255,255,0.1)"}`,
          boxShadow: isHovered ? `0 0 40px ${color}50, inset 0 0 30px ${color}15` : "0 4px 20px rgba(0,0,0,0.3)",
          transform: isHovered ? "scale(1.05) translateZ(20px)" : "scale(1)",
        }}
      >
        <div className="text-xs sm:text-sm md:text-base font-mono mb-2" style={{ color }}>
          {title}
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{content}</div>
        <div
          className="text-[9px] sm:text-[10px] font-mono mt-3 transition-opacity duration-300"
          style={{ color, opacity: isHovered ? 1 : 0.5 }}
        >
          {"[ ENTER ]"}
        </div>
      </div>
      <style jsx>{`
        @keyframes panelAppear {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// Story text sequence
function StorySequence({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const lines = [
    "> INITIALIZING...",
    "> WHO AM I?",
    "> A QUANT. A TRADER. A DEV.",
    "> EXPLORE...",
  ];

  useEffect(() => {
    if (currentLine >= lines.length) {
      setTimeout(onComplete, 300);
      return;
    }

    const line = lines[currentLine];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayedText("");

    const typeInterval = setInterval(() => {
      if (charIndex < line.length) {
        setDisplayedText(line.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => setCurrentLine((prev) => prev + 1), 400);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, [currentLine, onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4">
      <div className="text-center">
        {lines.slice(0, currentLine).map((line, i) => (
          <div
            key={i}
            className="font-mono text-sm sm:text-lg md:text-2xl mb-2 transition-opacity duration-500"
            style={{ color: "#4ade8060" }}
          >
            {line}
          </div>
        ))}
        {currentLine < lines.length && (
          <div className="font-mono text-base sm:text-xl md:text-3xl text-primary">
            {displayedText}
            {isTyping && <span className="animate-pulse">_</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// Floating particles
function Particles() {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; speed: number; opacity: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      speed: 0.5 + Math.random() * 1.5,
      opacity: 0.2 + Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `particleFloat ${10 / p.speed}s linear infinite`,
            animationDelay: `${-Math.random() * 10}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30vh) translateX(10px); }
          50% { transform: translateY(-60vh) translateX(-5px); }
          75% { transform: translateY(-90vh) translateX(8px); }
          100% { transform: translateY(-120vh) translateX(0); }
        }
      `}</style>
    </div>
  );
}

// Main scene
export default function QuantScene() {
  const [showPanels, setShowPanels] = useState(false);
  const [storyComplete, setStoryComplete] = useState(false);

  const handleStoryComplete = useCallback(() => {
    setStoryComplete(true);
    setTimeout(() => setShowPanels(true), 200);
  }, []);

  return (
    <div className="w-full h-screen bg-[#050a14] overflow-hidden relative">
      {/* Background layers */}
      <MathBackground />
      <GridFloor />
      <Particles />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Story sequence */}
      {!storyComplete && <StorySequence onComplete={handleStoryComplete} />}

      {/* Candlestick charts - positioned at corners with different sizes */}
      {storyComplete && (
        <>
          {/* Top left - small */}
          <div className="absolute top-16 left-8 opacity-0 hidden sm:block" style={{ animation: "fadeIn 0.8s ease-out 0.2s forwards" }}>
            <CandlestickChart size="small" />
          </div>
          
          {/* Top right - medium */}
          <div className="absolute top-24 right-12 opacity-0 hidden md:block" style={{ animation: "fadeIn 0.8s ease-out 0.4s forwards" }}>
            <CandlestickChart size="medium" />
          </div>
          
          {/* Bottom left - medium */}
          <div className="absolute bottom-24 left-12 opacity-0 hidden md:block" style={{ animation: "fadeIn 0.8s ease-out 0.6s forwards" }}>
            <CandlestickChart size="medium" />
          </div>
          
          {/* Bottom right - large */}
          <div className="absolute bottom-16 right-8 opacity-0 hidden lg:block" style={{ animation: "fadeIn 0.8s ease-out 0.8s forwards" }}>
            <CandlestickChart size="large" />
          </div>
        </>
      )}

      {/* Navigation panels - 4 boxes in 2x2 grid */}
      {showPanels && (
        <div className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-20 flex items-center justify-center z-20">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-3xl">
            <DataPanel
              position=""
              title="// WHO_AM_I"
              content="The origin story & contact info"
              color="#4ade80"
              delay={0}
              href="/about"
            />
            <DataPanel
              position=""
              title="// TECH_STACK"
              content="Python, ML, Algorithms & Systems"
              color="#22d3ee"
              delay={0.15}
              href="/skills"
            />
            <DataPanel
              position=""
              title="// ALPHA_SIGNALS"
              content="Trading strategies & projects"
              color="#a78bfa"
              delay={0.3}
              href="/projects"
            />
            <DataPanel
              position=""
              title="// TRACK_RECORD"
              content="Experience & achievements"
              color="#f472b6"
              delay={0.45}
              href="/experience"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="hidden sm:inline">SYSTEM ONLINE</span>
          <span className="sm:hidden">ONLINE</span>
        </div>
      </div>

      {showPanels && (
        <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
          Click panels to navigate
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
