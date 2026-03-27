"use client"

import { DimensionWrapper } from "@/components/dimension-wrapper"
import { cn } from "@/lib/utils"
import { TrendingUp, Code2, Zap, Mail, Github, Linkedin } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <DimensionWrapper
      title="// WHO_AM_I"
      sectorName="ORIGIN_SECTOR"
      accentColor="green"
    >
      <div className="space-y-12">
        {/* Hero section with static profile image */}
        <section className="text-center mb-16">
          <div className="inline-block mb-6">
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-lg mx-auto flex items-center justify-center relative terminal-glass overflow-hidden"
            >
              <Image
                src="/profile.jpg"
                alt="Zin Linn Htet - Flickk"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-lg ring-2 ring-primary/30" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-mono text-foreground mb-2 tracking-wide">
            <span className="text-primary">Zin Linn Htet</span>
          </h2>
          <p className="text-lg text-secondary font-mono mb-4">aka Flickk</p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-mono">
            Financial Engineering Student | Day Trader | Software Developer
          </p>
        </section>

        {/* Story cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className={cn(
            "terminal-glass rounded-lg p-6 md:p-8 border border-primary/20",
            "hover:border-primary/40 transition-all duration-300 hover:scale-[1.02]"
          )}>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-mono text-primary tracking-wide">The Trader</h3>
            </div>
            <p className="text-foreground/70 leading-relaxed font-mono text-sm">
              Currently an active day trader, trained at the 1BullBear community.
              I analyze markets with a systematic approach, combining technical analysis
              with quantitative methods to find high-probability setups and manage risk effectively.
            </p>
          </div>

          <div className={cn(
            "terminal-glass rounded-lg p-6 md:p-8 border border-secondary/20",
            "hover:border-secondary/40 transition-all duration-300 hover:scale-[1.02]"
          )}>
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6 text-secondary" />
              <h3 className="text-xl font-mono text-secondary tracking-wide">The Developer</h3>
            </div>
            <p className="text-foreground/70 leading-relaxed font-mono text-sm">
              Former software engineer with deep expertise in .NET, Blazor, and C#.
              I build robust, scalable applications and now apply my engineering
              mindset to developing trading systems and financial tools.
            </p>
          </div>
        </div>

        {/* Bio section */}
        <section className={cn(
          "terminal-glass rounded-lg p-6 md:p-10 border border-muted/30",
          "relative overflow-hidden"
        )}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-2xl font-mono text-foreground mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              System.log()
            </h3>
            <div className="space-y-4 text-foreground/70 leading-relaxed font-mono text-sm">
              <p>
                {">"} Born in 2001, I am currently pursuing Financial Engineering at
                King Mongkut&apos;s Institute of Technology Ladkrabang (KMITL), Bangkok.
                My journey bridges the worlds of finance and technology.
              </p>
              <p>
                {">"} My path started in software engineering, building enterprise applications
                with the Microsoft stack (.NET, Blazor, C#). This foundation taught me to
                think systematically and write clean, maintainable code.
              </p>
              <p>
                {">"} Now, I combine my technical skills with financial knowledge to pursue
                quantitative trading. The markets are my new codebase - patterns to recognize,
                systems to build, and edge to find.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section>
          <h3 className="text-xl font-mono text-foreground mb-6 text-center">
            <span className="text-primary">$</span> Quick Facts
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Born", value: "2001", color: "text-primary" },
              { label: "University", value: "KMITL", color: "text-secondary" },
              { label: "Major", value: "FinEng", color: "text-accent" },
              { label: "Community", value: "1BullBear", color: "text-yellow-400" }
            ].map((fact, i) => (
              <div
                key={i}
                className={cn(
                  "terminal-glass rounded-lg p-4 md:p-6 text-center",
                  "border border-muted/20 hover:border-primary/30",
                  "transition-all duration-300 hover:scale-105"
                )}
              >
                <div className={cn("text-xl md:text-2xl font-mono mb-1", fact.color)}>
                  {fact.value}
                </div>
                <div className="text-muted-foreground text-xs font-mono">{fact.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className="text-center py-6">
          <blockquote className="text-xl md:text-2xl font-mono text-foreground/60 max-w-2xl mx-auto">
            &quot;Trade what you see, not what you think.&quot;
          </blockquote>
          <p className="text-muted-foreground/60 mt-3 text-xs font-mono">- Trading Philosophy</p>
        </section>

        {/* Contact Section - ESTABLISH_LINK moved here */}
        <section className={cn(
          "terminal-glass rounded-lg p-6 md:p-10 border border-yellow-500/30",
          "relative overflow-hidden"
        )}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-2xl font-mono text-yellow-400 mb-6 flex items-center gap-2">
              // ESTABLISH_LINK
            </h3>
            <p className="text-foreground/70 font-mono text-sm mb-8">
              Ready to connect? Reach out through any of these channels.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <a
                href="mailto:zinlinnhtet.dev@gmail.com"
                className={cn(
                  "terminal-glass rounded-lg p-4 md:p-6 text-center",
                  "border border-yellow-500/20 hover:border-yellow-500/50",
                  "transition-all duration-300 hover:scale-105 group"
                )}
              >
                <Mail className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-mono text-foreground/70">Email</div>
                <div className="text-xs font-mono text-yellow-400/60 mt-1">[ SEND ]</div>
              </a>

              <a
                href="https://github.com/zinlynhtet"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "terminal-glass rounded-lg p-4 md:p-6 text-center",
                  "border border-yellow-500/20 hover:border-yellow-500/50",
                  "transition-all duration-300 hover:scale-105 group"
                )}
              >
                <Github className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-mono text-foreground/70">GitHub</div>
                <div className="text-xs font-mono text-yellow-400/60 mt-1">[ VIEW ]</div>
              </a>

              <a
                href="https://linkedin.com/in/zinlinnhtet"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "terminal-glass rounded-lg p-4 md:p-6 text-center",
                  "border border-yellow-500/20 hover:border-yellow-500/50",
                  "transition-all duration-300 hover:scale-105 group"
                )}
              >
                <Linkedin className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-mono text-foreground/70">LinkedIn</div>
                <div className="text-xs font-mono text-yellow-400/60 mt-1">[ CONNECT ]</div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </DimensionWrapper>
  )
}
