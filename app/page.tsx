"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Shield,
  Zap,
  Bitcoin,
  Wallet,
  CreditCard,
  TrendingUp,
  CheckCircle,
  Star,
  Globe,
} from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 payveri-gradient rounded-xl flex items-center justify-center shadow-lg animate-glow-pulse">
                  <Bitcoin className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-bounce-subtle"></div>
              </div>
              <span className="text-2xl font-bold payveri-text-gradient">PayVeri</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                How it Works
              </a>
              <Link
                href="/merchants"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Merchants
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="btn-primary hover-lift">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium Design */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="absolute inset-0 payveri-gradient-subtle"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 payveri-gradient rounded-full opacity-10 animate-float-gentle blur-xl"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 payveri-gradient rounded-full opacity-15 animate-float-gentle blur-xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-20 h-20 payveri-gradient rounded-full opacity-20 animate-float-gentle blur-xl"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up-fade" : "opacity-0"}`}>
            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 text-balance leading-tight">
              Bitcoin to Naira
              <br />
              <span className="payveri-text-gradient">Made Simple.</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto text-pretty leading-relaxed">
              Your team's toolkit to stop configuring and start innovating. Convert Bitcoin to Naira instantly, pay
              merchants directly, and scale the best payment experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-4 hover-lift">
                <Link href="/signup" className="flex items-center">
                  Start Converting <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-12 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Instant Conversion</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span>Bank-Grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Trusted by 15K+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Grid Layout */}
      <section className="py-20 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "₦5.2B+", label: "Volume Processed", delay: "0s" },
              { value: "25K+", label: "Happy Users", delay: "0.1s" },
              { value: "99.9%", label: "Uptime", delay: "0.2s" },
              { value: "<15s", label: "Average Conversion", delay: "0.3s" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center animate-grid-fade-in hover-lift premium-card p-6"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-4xl font-bold text-foreground mb-3 payveri-text-gradient">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Premium Grid */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6 text-balance">How PayVeri Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Three simple steps to convert your Bitcoin to Naira and spend it anywhere in Nigeria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up & Verify",
                description:
                  "Complete KYC verification once and get your Lightning wallet generated automatically with enterprise-grade security.",
                icon: <Wallet className="h-10 w-10" />,
                delay: "0s",
              },
              {
                step: "02",
                title: "Deposit Bitcoin",
                description:
                  "Send Bitcoin to your wallet. We auto-detect deposits and convert to Naira instantly using real-time market rates.",
                icon: <Bitcoin className="h-10 w-10" />,
                delay: "0.2s",
              },
              {
                step: "03",
                title: "Pay & Transfer",
                description:
                  "Pay merchants, transfer to banks, or withdraw cash. All in Naira, all instantly, with zero complications.",
                icon: <CreditCard className="h-10 w-10" />,
                delay: "0.4s",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="premium-card hover-lift animate-grid-fade-in p-8"
                style={{ animationDelay: item.delay }}
              >
                <CardContent className="p-0 text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 payveri-gradient rounded-2xl flex items-center justify-center mx-auto text-white shadow-xl animate-glow-pulse">
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Interactive */}
      <section id="features" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6 text-balance">Why Choose PayVeri?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Built for Nigerians who want seamless Bitcoin-to-Naira conversion without the P2P hassle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Lightning Fast",
                description:
                  "Convert Bitcoin to Naira in under 15 seconds with our optimized Lightning Network integration.",
                icon: <Zap className="h-8 w-8" />,
                color: "from-yellow-400 to-orange-500",
              },
              {
                title: "Bank-Grade Security",
                description:
                  "Multi-signature wallets, cold storage, and real-time fraud detection keep your funds safe.",
                icon: <Shield className="h-8 w-8" />,
                color: "from-blue-400 to-blue-600",
              },
              {
                title: "Instant Settlements",
                description: "Merchants receive Naira payments instantly. No waiting, no delays, no complications.",
                icon: <TrendingUp className="h-8 w-8" />,
                color: "from-green-400 to-green-600",
              },
              {
                title: "Global Access",
                description: "Access your funds anywhere in Nigeria with our extensive banking network integration.",
                icon: <Globe className="h-8 w-8" />,
                color: "from-purple-400 to-purple-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`premium-card hover-lift cursor-pointer transition-all duration-300 p-6 ${
                  activeFeature === index ? "ring-2 ring-primary shadow-2xl scale-105" : ""
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="p-0 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg animate-glow-pulse`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-24 payveri-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 grid-pattern opacity-20"></div>

        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-8 text-balance">Ready to Skip the P2P Stress?</h2>
          <p className="text-xl text-white/90 mb-12 text-pretty max-w-3xl mx-auto">
            Join thousands of Nigerians who've made the switch to instant Bitcoin-to-Naira conversion. Start building
            the future of payments today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="px-8 py-4 text-lg bg-white text-foreground hover:bg-white/90 hover-lift shadow-xl"
            >
              <Link href="/signup" className="flex items-center">
                Create Account <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Clean */}
      <footer className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-12 h-12 payveri-gradient rounded-xl flex items-center justify-center shadow-lg">
                <Bitcoin className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold payveri-text-gradient">PayVeri</span>
            </div>

            <div className="flex items-center space-x-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                API
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 PayVeri. All rights reserved. Convert Bitcoin responsibly.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
