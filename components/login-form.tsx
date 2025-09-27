"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Bitcoin } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMerchantLogin, setIsMerchantLogin] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const merchant = urlParams.get("merchant")
    if (merchant === "true") {
      setIsMerchantLogin(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (isMerchantLogin) {
      window.location.href = "/merchant-dashboard"
    } else {
      window.location.href = "/dashboard"
    }
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-md space-y-8 animate-scale-fade-in">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-20 h-20 glass-morphism rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
            <Bitcoin className="text-primary h-8 w-8" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-2">
          {isMerchantLogin ? "Merchant Login" : "Welcome Back"}
        </h2>
        <p className="text-muted-foreground">
          {isMerchantLogin ? "Sign in to your merchant account" : "Sign in to your PayVeri account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2 animate-scale-fade-in" style={{ animationDelay: "0.2s" }}>
          <Label htmlFor="email" className="text-foreground font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-morphism text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:ring-primary/20 pl-4 pr-4 py-3 text-lg transition-all duration-300 hover:bg-muted/50"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2 animate-scale-fade-in" style={{ animationDelay: "0.4s" }}>
          <Label htmlFor="password" className="text-foreground font-medium flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-morphism text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:ring-primary/20 pl-4 pr-12 py-3 text-lg transition-all duration-300 hover:bg-muted/50"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end animate-scale-fade-in" style={{ animationDelay: "0.6s" }}>
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-4 text-lg transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed animate-scale-fade-in group"
          style={{ animationDelay: "0.8s" }}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              Signing In...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Sign In to {isMerchantLogin ? "Merchant" : "PayVeri"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </Button>

        {/* Register Link */}
        <div className="text-center animate-scale-fade-in" style={{ animationDelay: "1s" }}>
          <p className="text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/signup" className="text-foreground font-semibold hover:underline transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </form>

      {/* Footer Links */}
      <div className="text-center pt-8 space-y-2 animate-scale-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="flex justify-center space-x-6 text-sm">
          <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">Secured by industry-standard encryption</p>
      </div>
    </div>
  )
}
