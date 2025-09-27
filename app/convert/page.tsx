"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ArrowLeftRight, TrendingUp, ArrowLeft, CheckCircle, Clock } from "lucide-react"

export default function ConvertPage() {
  const [btcAmount, setBtcAmount] = useState("")
  const [nairaAmount, setNairaAmount] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [conversionSuccess, setConversionSuccess] = useState(false)

  const [btcToNaira, setBtcToNaira] = useState(68800000)
  const availableBtc = 0.00234

  useEffect(() => {
    const fetchBitcoinRate = () => {
      // Simulate real-time Bitcoin price in Naira
      const baseRate = 68800000 // Base rate in Naira
      const fluctuation = (Math.random() - 0.5) * 2000000 // ±1M Naira fluctuation
      setBtcToNaira(Math.round(baseRate + fluctuation))
    }

    fetchBitcoinRate()
    // Update rate every 30 seconds
    const interval = setInterval(fetchBitcoinRate, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleBtcChange = (value: string) => {
    setBtcAmount(value)
    const naira = Number.parseFloat(value) * btcToNaira
    setNairaAmount(naira ? naira.toFixed(2) : "")
  }

  const handleConvert = async () => {
    setIsConverting(true)
    // Simulate conversion
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsConverting(false)

    const conversionData = {
      btcAmount: btcAmount,
      nairaAmount: nairaAmount,
      rate: btcToNaira.toString(),
      transactionId: `CNV${Date.now()}`,
      date: new Date().toISOString(),
    }

    const params = new URLSearchParams(conversionData)
    window.location.href = `/convert-success?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 payveri-gradient rounded-lg flex items-center justify-center shadow-lg">
                  <Bitcoin className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold payveri-text-gradient">PayVeri</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Convert Bitcoin</h1>
          <p className="text-xl text-muted-foreground">Convert your Bitcoin to Naira instantly with zero fees</p>
        </div>

        {/* Conversion Card */}
        <Card className="mb-6 premium-card animate-scale-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <TrendingUp className="h-6 w-6 text-primary" />
              Bitcoin to Naira Conversion
            </CardTitle>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                <CheckCircle className="h-3 w-3 mr-1" />
                Rate: ₦{btcToNaira.toLocaleString()}/BTC
              </Badge>
              <Badge variant="outline" className="border-primary/20">
                Available: {availableBtc} BTC
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* From Bitcoin */}
            <div className="space-y-2 animate-grid-fade-in" style={{ animationDelay: "0.1s" }}>
              <Label htmlFor="btc-amount" className="flex items-center gap-2 text-lg font-medium">
                <Bitcoin className="h-5 w-5 text-primary" />
                From Bitcoin
              </Label>
              <Input
                id="btc-amount"
                type="number"
                placeholder="0.00000000"
                value={btcAmount}
                onChange={(e) => handleBtcChange(e.target.value)}
                className="text-xl py-4 glass-morphism"
                step="0.00000001"
                max={availableBtc}
              />
              <p className="text-sm text-muted-foreground">Maximum: {availableBtc} BTC available</p>
            </div>

            {/* Conversion Arrow */}
            <div className="flex justify-center animate-bounce-subtle">
              <div className="w-16 h-16 payveri-gradient rounded-full flex items-center justify-center shadow-xl animate-glow-pulse">
                <ArrowLeftRight className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* To Naira */}
            <div className="space-y-2 animate-grid-fade-in" style={{ animationDelay: "0.2s" }}>
              <Label htmlFor="naira-amount" className="text-lg font-medium">
                To Naira
              </Label>
              <Input
                id="naira-amount"
                type="text"
                value={nairaAmount ? `₦${Number.parseFloat(nairaAmount).toLocaleString()}` : ""}
                readOnly
                className="text-xl py-4 bg-muted/50 font-bold text-primary"
              />
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Instant conversion at current market rate
              </p>
            </div>

            {/* Conversion Details */}
            {btcAmount && (
              <div className="bg-muted/30 rounded-xl p-6 space-y-3 border border-border/50 animate-scale-fade-in">
                <h4 className="font-semibold text-lg mb-3">Conversion Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>Conversion Rate:</span>
                  <span className="font-medium">₦{btcToNaira.toLocaleString()}/BTC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing Fee:</span>
                  <span className="text-green-600 font-medium">Free ✨</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing Time:</span>
                  <span className="font-medium">Instant</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border/50 pt-3">
                  <span>You'll Receive:</span>
                  <span className="text-primary">
                    ₦{nairaAmount ? Number.parseFloat(nairaAmount).toLocaleString() : "0"}
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={handleConvert}
              disabled={
                !btcAmount ||
                Number.parseFloat(btcAmount) <= 0 ||
                Number.parseFloat(btcAmount) > availableBtc ||
                isConverting
              }
              className="w-full payveri-gradient text-white py-6 text-xl hover-lift shadow-xl"
            >
              {isConverting ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Converting Bitcoin...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Convert to Naira Instantly
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card className="premium-card animate-slide-up-fade" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="text-2xl">How Conversion Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4 animate-grid-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Instant Rate Check</h4>
                  <p className="text-muted-foreground">
                    We fetch the latest Bitcoin to Naira rate from multiple exchanges for the best price
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 animate-grid-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Secure Conversion</h4>
                  <p className="text-muted-foreground">
                    Your Bitcoin is converted to Naira using our enterprise-grade security system
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 animate-grid-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Instant Credit</h4>
                  <p className="text-muted-foreground">
                    Naira is instantly credited to your PayVeri balance, ready for spending or withdrawal
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
