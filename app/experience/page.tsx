"use client"

import { DimensionWrapper } from "@/components/dimension-wrapper"
import { cn } from "@/lib/utils"

interface Experience {
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
  pnl?: string
}

const experiences: Experience[] = [
  {
    title: "Senior Quantitative Developer",
    company: "Apex Capital",
    period: "2023 - Present",
    description: "Leading development of systematic trading strategies across equity and crypto markets.",
    achievements: [
      "Developed ML-based alpha signals generating 35% annual returns",
      "Built low-latency execution system reducing slippage by 40%",
      "Managed portfolio with $50M+ AUM"
    ],
    pnl: "+$12M PnL"
  },
  {
    title: "Quantitative Researcher",
    company: "Citadel Securities",
    period: "2021 - 2023",
    description: "Research and development of market-making algorithms in options markets.",
    achievements: [
      "Created volatility surface models improving pricing by 15%",
      "Implemented real-time Greeks calculation engine",
      "Collaborated with execution team on smart order routing"
    ],
    pnl: "Top Decile"
  },
  {
    title: "Junior Quant Developer",
    company: "Two Sigma",
    period: "2019 - 2021",
    description: "Built data pipelines and backtesting infrastructure for systematic strategies.",
    achievements: [
      "Processed 10TB+ of alternative data daily",
      "Reduced backtest runtime by 80% with parallel computing",
      "Developed feature engineering framework used by 20+ researchers"
    ]
  },
  {
    title: "Software Engineer Intern",
    company: "Jane Street",
    period: "Summer 2018",
    description: "Summer internship focused on trading systems infrastructure.",
    achievements: [
      "Built real-time monitoring dashboard for trading desk",
      "Optimized order matching algorithm reducing latency by 30%",
      "Received return offer"
    ]
  }
]

export default function ExperiencePage() {
  return (
    <DimensionWrapper 
      title="// TRACK_RECORD" 
      sectorName="EXPERIENCE_LOG"
      accentColor="pink"
    >
      <div className="space-y-10">
        {/* Intro */}
        <section className="text-center mb-8">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            {">"} Professional journey through the markets
          </p>
        </section>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {/* Experience cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className={cn(
                  "absolute left-2.5 md:left-6 w-3 h-3 rounded-full border-2 border-background",
                  index === 0 ? "bg-primary shadow-[0_0_10px_rgba(74,222,128,0.5)]" : 
                  index === 1 ? "bg-secondary shadow-[0_0_10px_rgba(34,211,238,0.5)]" :
                  index === 2 ? "bg-accent shadow-[0_0_10px_rgba(167,139,250,0.5)]" : 
                  "bg-pink-500/60"
                )} />

                {/* Card */}
                <div className={cn(
                  "terminal-glass rounded-lg p-5 md:p-6",
                  "border border-muted/20 hover:border-primary/30",
                  "transition-all duration-300 hover:scale-[1.01]"
                )}>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-muted-foreground">
                      {exp.period}
                    </span>
                    {exp.pnl && (
                      <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {exp.pnl}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-mono text-foreground mb-0.5">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-secondary mb-3 font-mono">
                    @ {exp.company}
                  </p>

                  <p className="text-sm text-foreground/60 mb-4 font-mono">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5">
                    {exp.achievements.map((achievement, i) => (
                      <li 
                        key={i}
                        className="flex items-start gap-2 text-xs text-foreground/70 font-mono"
                      >
                        <span className="mt-1.5 text-primary">{">"}</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <section className="terminal-glass rounded-lg p-6 border border-primary/20 max-w-3xl mx-auto">
          <h3 className="text-sm font-mono text-center text-muted-foreground mb-5 tracking-widest">
            {">"} PERFORMANCE_SUMMARY
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: "6+", label: "Years Experience", color: "text-primary" },
              { value: "$50M+", label: "AUM Managed", color: "text-secondary" },
              { value: ">2.0", label: "Sharpe Ratio", color: "text-accent" },
              { value: "4", label: "Top Firms", color: "text-pink-400" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={cn("text-2xl md:text-3xl font-mono mb-1", stat.color)}>
                  {stat.value}
                </div>
                <p className="text-muted-foreground/60 text-xs font-mono">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DimensionWrapper>
  )
}
