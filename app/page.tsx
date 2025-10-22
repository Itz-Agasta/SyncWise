"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Zap, Brain, CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">SyncWise</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              Your AI-Powered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Scheduling Assistant
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Stop wasting time organizing your schedule. Describe your tasks in natural language and let AI create the
              perfect timetable for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Start Planning Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 rounded-2xl border border-border/50 bg-card/50 backdrop-blur p-8 sm:p-12">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <Calendar className="w-16 h-16 text-primary/40 mx-auto" />
                <p className="text-muted-foreground">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to master your schedule</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Scheduling",
                description:
                  "Describe your tasks naturally and let AI create an optimized schedule respecting priorities and constraints.",
              },
              {
                icon: Zap,
                title: "Instant Optimization",
                description:
                  "Get intelligent scheduling suggestions in seconds. AI learns your preferences and adapts over time.",
              },
              {
                icon: CheckCircle2,
                title: "Complete Control",
                description:
                  "Manually adjust tasks, mark completions, and override AI suggestions whenever you need full control.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border/50 bg-background hover:border-primary/50 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 border border-primary/20">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Transform Your Schedule?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of users who've reclaimed hours of their week.
            </p>
          </div>
          <Link href="/auth/signup">
            <Button size="lg" className="gap-2">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 SyncWise. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
