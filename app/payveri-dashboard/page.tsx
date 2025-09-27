"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, ArrowLeft, Shield, Copy, Clock, CheckCircle, Wallet, Send } from "lucide-react"

export default function PayVeriDashboard() {
  const [merchantId, setMerchantId] = useState("")
  const [total, setTotal] = useState("")
  const [btcAmount, setBtcAmount] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [copied, setCopied] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [walletBalance] = useState("0.15432") // Mock wallet balance

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

    // Generate unique wallet address
    const generateWalletAddress = () => {
      const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
      let result = "bc1q"
      for (let i = 0; i < 39; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return result
    }

    setWalletAddress(generateWalletAddress())
  }, [])

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const merchant = merchants[merchantId as keyof typeof merchants] || merchants["1"]

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href={`/gateway?merchant=${merchantId}&total=${total}&btc=${btcAmount}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Gateway
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 payveri-gradient rounded-lg flex items-center justify-center shadow-lg">
                  <Bitcoin className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold payveri-text-gradient">PayVeri Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure Session</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade text-center">
          <div className="w-20 h-20 payveri-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Wallet className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Welcome to PayVeri</h1>
          <p className="text-xl text-muted-foreground">Your secure Bitcoin payment dashboard</p>
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

        {/* Dashboard Actions */}
        {!showTransfer && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="premium-card hover-lift cursor-pointer" onClick={() => setShowTransfer(true)}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Send className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">Transfer Money</h3>
                    <p className="text-muted-foreground">Send Bitcoin to complete your payment</p>
                  </div>
                  <div className="text-primary">→</div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">Wallet Balance</h3>
                    <p className="text-muted-foreground">{walletBalance} BTC Available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Transfer Money Section */}
        {showTransfer && (
          <Card className="premium-card animate-scale-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Transfer Money
                </div>
                <div className="flex items-center gap-2 text-orange-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {timeLeft > 0 ? (
                <>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-orange-700 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-semibold">Wallet Address Expires in {formatTime(timeLeft)}</span>
                    </div>
                    <p className="text-sm text-orange-600">
                      This wallet address will expire in {formatTime(timeLeft)}. Please complete your transfer before it
                      expires.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Transaction Wallet ID</label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 p-3 bg-muted/50 rounded-lg border font-mono text-sm break-all">
                          {walletAddress}
                        </div>
                        <Button
                          onClick={copyToClipboard}
                          variant="outline"
                          size="sm"
                          className="shrink-0 bg-transparent"
                        >
                          {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Available Wallet Balance</label>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-green-600" />
                            <span className="font-semibold text-green-800">{walletBalance} BTC</span>
                          </div>
                          <span className="text-sm text-green-600">Available</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Payment Instructions:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>
                          • Send exactly <strong>{btcAmount} BTC</strong> to the wallet address above
                        </li>
                        <li>• Do not send any other amount or the payment will fail</li>
                        <li>• Payment will be confirmed automatically once received</li>
                        <li>• This address expires in {formatTime(timeLeft)}</li>
                      </ul>
                    </div>

                    <div className="text-center">
                      <Button asChild className="payveri-gradient text-white hover-lift px-8 py-3 text-lg">
                        <Link
                          href={`/receipt?merchant=${merchantId}&total=${total}&btc=${btcAmount}&wallet=${walletAddress}`}
                        >
                          <Send className="h-5 w-5 mr-2" />
                          Transfer Now
                        </Link>
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">Click to complete your Bitcoin transfer</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-600 mb-2">Wallet Address Expired</h3>
                  <p className="text-muted-foreground mb-4">
                    The wallet address has expired. Please start a new payment process.
                  </p>
                  <Button asChild className="payveri-gradient text-white">
                    <Link href={`/gateway?merchant=${merchantId}&total=${total}&btc=${btcAmount}`}>
                      Start New Payment
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <Card className="mt-8 premium-card animate-slide-up-fade" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-center">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm text-muted-foreground">
                All transactions are secured with military-grade encryption and monitored 24/7
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
