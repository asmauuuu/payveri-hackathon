"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bitcoin, ArrowLeft, Shield, User, UserPlus, Lock } from "lucide-react"

export default function GatewayPage() {
  const [merchantId, setMerchantId] = useState("")
  const [total, setTotal] = useState("")
  const [btcAmount, setBtcAmount] = useState("")
  const [authMode, setAuthMode] = useState<"select" | "login" | "guest">("select")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [guestEmail, setGuestEmail] = useState("")

  // Mock merchant data
  const merchants = {
    "1": {
      name: "TechHub Electronics",
      category: "Electronics",
      image: "/electronics-store-interior.png",
    },
    "2": {
      name: "Fashion Forward",
      category: "Fashion",
      image: "/fashion-store-boutique.png",
    },
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setMerchantId(urlParams.get("merchant") || "1")
    setTotal(urlParams.get("total") || "0")
    setBtcAmount(urlParams.get("btc") || "0")
  }, [])

  const merchant = merchants[merchantId as keyof typeof merchants] || merchants["1"]

  const handleLogin = () => {
    window.location.href = `/payveri-dashboard?merchant=${merchantId}&total=${total}&btc=${btcAmount}&auth=login`
  }

  const handleGuestPayment = () => {
    window.location.href = `/guest-payment?merchant=${merchantId}&total=${total}&btc=${btcAmount}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href={`/cart?merchant=${merchantId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Cart
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 payveri-gradient rounded-lg flex items-center justify-center shadow-lg">
                  <Bitcoin className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold payveri-text-gradient">PayVeri Gateway</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade text-center">
          <div className="w-20 h-20 payveri-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Secure Payment Gateway</h1>
          <p className="text-xl text-muted-foreground">Choose how you'd like to complete your payment</p>
        </div>

        {/* Payment Summary */}
        <Card className="mb-8 premium-card animate-scale-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <img
                src={merchant.image || "/placeholder.svg"}
                alt={merchant.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <div className="text-xl">{merchant.name}</div>
                <div className="text-sm text-muted-foreground">{merchant.category}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-semibold">₦{Number(total).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Bitcoin Equivalent:</span>
                <span className="font-semibold text-primary">{btcAmount} BTC</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authentication Options */}
        {authMode === "select" && (
          <div className="space-y-6 animate-scale-fade-in">
            <Card className="premium-card hover-lift cursor-pointer" onClick={() => setAuthMode("login")}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">Login to PayVeri</h3>
                    <p className="text-muted-foreground">Access your wallet and payment history</p>
                  </div>
                  <div className="text-primary">→</div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card hover-lift cursor-pointer" onClick={handleGuestPayment}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <UserPlus className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">Pay as Guest</h3>
                    <p className="text-muted-foreground">Quick payment without creating an account</p>
                  </div>
                  <div className="text-secondary">→</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Login Form */}
        {authMode === "login" && (
          <Card className="premium-card animate-scale-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Login to PayVeri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-morphism"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-morphism"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleLogin}
                  className="flex-1 payveri-gradient text-white hover-lift"
                  disabled={!email || !password}
                >
                  Login & Pay
                </Button>
                <Button variant="outline" onClick={() => setAuthMode("select")} className="btn-secondary">
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Features */}
        <Card className="mt-8 premium-card animate-slide-up-fade" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-center">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Your payment is secured with end-to-end encryption and processed instantly
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
