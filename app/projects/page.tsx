"use client"

import { useState } from "react"
import { DimensionWrapper } from "@/components/dimension-wrapper"
import { cn } from "@/lib/utils"
import { ExternalLink, Github, TrendingUp, BarChart3, Bot, Database } from "lucide-react"

interface Project {
  title: string
  description: string
  tech: string[]
  gradient: string
  metrics?: string
  icon: React.ElementType
  featured?: boolean
}

const projects: Project[] = [
  {
    title: "Alpha Engine",
    description: "Machine learning pipeline for generating alpha signals from alternative data sources including satellite imagery and sentiment analysis.",
    tech: ["Python", "TensorFlow", "Spark", "Airflow"],
    gradient: "from-primary/30 to-secondary/30",
    metrics: "Sharpe: 2.4",
    icon: TrendingUp,
    featured: true
  },
  {
    title: "Market Microstructure Simulator",
    description: "Agent-based simulation of order book dynamics for backtesting execution algorithms and studying market impact.",
    tech: ["C++", "Python", "Redis", "PostgreSQL"],
    gradient: "from-secondary/30 to-accent/30",
    metrics: "1M+ events/sec",
    icon: BarChart3,
    featured: true
  },
  {
    title: "Execution Bot",
    description: "Smart order routing system with TWAP/VWAP algorithms and adaptive execution based on real-time market conditions.",
    tech: ["Rust", "FIX Protocol", "Kafka", "InfluxDB"],
    gradient: "from-accent/30 to-primary/30",
    metrics: "< 50μs latency",
    icon: Bot
  },
  {
    title: "Risk Dashboard",
    description: "Real-time portfolio risk monitoring with VaR, Greeks, and stress testing visualizations.",
    tech: ["React", "D3.js", "Python", "WebSocket"],
    gradient: "from-primary/20 to-accent/20",
    icon: BarChart3
  },
  {
    title: "Options Pricer",
    description: "GPU-accelerated Monte Carlo engine for exotic options pricing with calibration tools.",
    tech: ["CUDA", "Python", "NumPy", "Cython"],
    gradient: "from-secondary/20 to-primary/20",
    icon: TrendingUp
  },
  {
    title: "Data Lake Pipeline",
    description: "Scalable data ingestion and processing for tick data, fundamentals, and alternative data.",
    tech: ["Spark", "Delta Lake", "Airflow", "AWS"],
    gradient: "from-accent/20 to-secondary/20",
    icon: Database
  }
]

export default function ProjectsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <DimensionWrapper 
      title="// ALPHA_SIGNALS" 
      sectorName="PROJECTS_VAULT"
      accentColor="purple"
    >
      <div className="space-y-10">
        {/* Intro */}
        <section className="text-center mb-8">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            {">"} Trading systems and quantitative tools
          </p>
        </section>

        {/* Featured projects */}
        <section>
          <h3 className="text-sm font-mono text-muted-foreground mb-4 tracking-widest">
            {">"} FEATURED_SYSTEMS
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.filter(p => p.featured).map((project, index) => (
              <div
                key={index}
                className={cn(
                  "group relative rounded-lg overflow-hidden",
                  "border border-accent/20 hover:border-accent/50",
                  "transition-all duration-500",
                  "hover:scale-[1.02]"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  project.gradient,
                  "transition-opacity duration-500",
                  hoveredIndex === index ? "opacity-100" : "opacity-60"
                )} />
                
                <div className="relative z-10 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <project.icon className="w-5 h-5 text-primary" />
                      {project.metrics && (
                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {project.metrics}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                        <Github className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-mono text-foreground mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded bg-background/50 text-foreground/70 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All projects */}
        <section>
          <h3 className="text-sm font-mono text-muted-foreground mb-4 tracking-widest">
            {">"} ALL_SYSTEMS
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.filter(p => !p.featured).map((project, index) => (
              <div
                key={index}
                className={cn(
                  "terminal-glass rounded-lg p-5 border border-muted/20",
                  "hover:border-accent/30 transition-all duration-300",
                  "hover:scale-[1.02] group"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <project.icon className="w-4 h-4 text-primary" />
                  {project.metrics && (
                    <span className="text-xs font-mono text-muted-foreground">
                      {project.metrics}
                    </span>
                  )}
                </div>
                <h4 className="text-base font-mono text-foreground mt-1 mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs text-foreground/50 mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground/70 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="terminal-glass rounded-lg p-6 md:p-8 text-center border border-accent/20">
          <h3 className="text-lg font-mono text-foreground mb-3">
            <span className="text-primary">$</span> Explore Full Repository
          </h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto font-mono">
            View complete code and documentation on GitHub.
          </p>
          <a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2 rounded-lg",
              "bg-accent/20 text-accent border border-accent/30",
              "hover:bg-accent/30 transition-all duration-300 font-mono"
            )}
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">View Archive</span>
          </a>
        </section>
      </div>
    </DimensionWrapper>
  )
}
