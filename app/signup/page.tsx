"use client"

import { SignupForm } from "@/components/signup-form"
import Link from "next/link"
import { Bitcoin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding (Identical to Login) */}
      <div className="hidden lg:flex lg:w-1/2 bg-card relative overflow-hidden">
        <div className="absolute inset-0 payveri-gradient-subtle"></div>
        <div className="absolute inset-0 grid-pattern opacity-30"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-40 h-40 payveri-gradient rounded-full opacity-10 animate-float-gentle blur-xl"></div>
        <div
          className="absolute top-40 right-32 w-32 h-32 payveri-gradient rounded-full opacity-15 animate-float-gentle blur-xl"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-16 w-24 h-24 payveri-gradient rounded-full opacity-20 animate-float-gentle blur-xl"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          {/* Logo */}
          <div className="mb-12 animate-scale-fade-in">
            <div className="relative">
              <div className="w-32 h-32 payveri-gradient rounded-3xl flex items-center justify-center shadow-2xl animate-glow-pulse">
                <Bitcoin className="h-16 w-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
          </div>

          {/* Feature showcase */}
          <div className="flex space-x-8 mb-12 animate-scale-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="w-20 h-20 payveri-gradient rounded-2xl flex items-center justify-center shadow-xl hover-lift animate-float-gentle">
              <span className="text-white text-2xl font-bold">₿</span>
            </div>
            <div
              className="w-24 h-24 payveri-gradient rounded-2xl flex items-center justify-center shadow-2xl hover-lift animate-float-gentle"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="text-white text-3xl font-bold">₦</span>
            </div>
            <div
              className="w-20 h-20 payveri-gradient rounded-2xl flex items-center justify-center shadow-xl hover-lift animate-float-gentle"
              style={{ animationDelay: "1s" }}
            >
              <span className="text-white text-2xl font-bold">⚡</span>
            </div>
          </div>

          <div className="text-center animate-scale-fade-in" style={{ animationDelay: "0.6s" }}>
            <h1 className="text-5xl font-bold payveri-text-gradient mb-4">PayVeri</h1>
            <p className="text-muted-foreground text-xl font-medium mb-2">Join the Bitcoin Revolution</p>
            <p className="text-muted-foreground/80 text-sm">Start converting Bitcoin to Naira today</p>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center space-x-8 mt-12 animate-scale-fade-in" style={{ animationDelay: "0.9s" }}>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce-subtle"></div>
              <span className="text-sm text-muted-foreground font-medium">Instant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 bg-blue-500 rounded-full animate-bounce-subtle"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span className="text-sm text-muted-foreground font-medium">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 bg-primary rounded-full animate-bounce-subtle"
                style={{ animationDelay: "1s" }}
              ></div>
              <span className="text-sm text-muted-foreground font-medium">Trusted</span>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-6 text-sm text-muted-foreground animate-scale-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          © 2025 PayVeri • Powered by Lightning Network
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 payveri-gradient-subtle"></div>
        <div className="absolute inset-0 grid-pattern opacity-20"></div>

        {/* Back button */}
        <Button asChild variant="ghost" className="absolute top-6 left-6 hover-lift">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="relative z-10 w-full max-w-md">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
