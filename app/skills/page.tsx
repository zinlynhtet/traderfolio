"use client"

import { useState } from "react"
import { DimensionWrapper } from "@/components/dimension-wrapper"
import { cn } from "@/lib/utils"

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  { name: "Python", level: 95, category: "Languages" },
  { name: "C++", level: 85, category: "Languages" },
  { name: "SQL", level: 92, category: "Languages" },
  { name: "TypeScript", level: 88, category: "Languages" },
  { name: "Rust", level: 70, category: "Languages" },
  { name: "Machine Learning", level: 90, category: "Quant" },
  { name: "Statistical Modeling", level: 92, category: "Quant" },
  { name: "Time Series Analysis", level: 88, category: "Quant" },
  { name: "Risk Management", level: 85, category: "Quant" },
  { name: "Portfolio Optimization", level: 87, category: "Quant" },
  { name: "Pandas/NumPy", level: 95, category: "Tools" },
  { name: "TensorFlow/PyTorch", level: 85, category: "Tools" },
  { name: "Bloomberg Terminal", level: 80, category: "Tools" },
  { name: "AWS/GCP", level: 82, category: "Tools" },
  { name: "Docker/K8s", level: 78, category: "Tools" },
]

const categories = ["All", "Languages", "Quant", "Tools"]

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(s => s.category === activeCategory)

  return (
    <DimensionWrapper 
      title="// TECH_STACK" 
      sectorName="SKILLS_MATRIX"
      accentColor="cyan"
    >
      <div className="space-y-10">
        {/* Intro */}
        <section className="text-center mb-8">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            {">"} Core competencies and technical arsenal
          </p>
        </section>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-mono tracking-wide transition-all duration-300",
                activeCategory === category
                  ? "bg-secondary/20 text-secondary border border-secondary/40"
                  : "terminal-glass text-muted-foreground hover:text-foreground border border-transparent"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={cn(
                "terminal-glass rounded-lg p-5 border border-muted/20",
                "hover:border-secondary/40 transition-all duration-300",
                "hover:scale-[1.02]"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-mono text-foreground/90">
                  {skill.name}
                </h3>
                <span className="text-xs text-secondary font-mono">
                  {skill.level}%
                </span>
              </div>
              
              <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-primary transition-all duration-1000"
                  style={{ 
                    width: `${skill.level}%`,
                    boxShadow: "0 0 8px rgba(34, 211, 238, 0.4)"
                  }}
                />
              </div>

              <p className="text-xs text-muted-foreground/60 mt-2 font-mono">
                {skill.category}
              </p>
            </div>
          ))}
        </div>

        {/* System Analysis */}
        <section className="terminal-glass rounded-lg p-6 md:p-8 border border-secondary/20">
          <h3 className="text-lg font-mono text-foreground mb-6 text-center">
            <span className="text-primary">$</span> System Analysis
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Quantitative", value: 92 },
              { label: "Development", value: 90 },
              { label: "ML/AI", value: 85 },
              { label: "Infrastructure", value: 80 }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-muted/30"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${stat.value * 1.76} 176`}
                      className="text-primary"
                      style={{ filter: "drop-shadow(0 0 4px rgba(74, 222, 128, 0.5))" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-mono text-foreground">{stat.value}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-mono">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Currently exploring */}
        <section className="text-center">
          <h3 className="text-sm font-mono text-muted-foreground mb-4 tracking-widest">
            {">"} CURRENTLY_RESEARCHING
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {["Reinforcement Learning", "High-Frequency Trading", "Options Pricing", "DeFi/Crypto"].map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 rounded-lg text-xs terminal-glass border border-accent/20 text-accent/80 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </DimensionWrapper>
  )
}
