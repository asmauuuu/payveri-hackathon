"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, ArrowLeft, Clock, Copy, CheckCircle, Wallet, Timer } from "lucide-react"

export default function GuestPaymentPage() {
  const [merchantId, setMerchantId] = useState("")
  const [total, setTotal] = useState("")
  const [btcAmount, setBtcAmount] = useState("")
  const [email, setEmail] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [copied, setCopied] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "confirmed" | "expired">("pending")

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
    setEmail(urlParams.get("email") || "")

    // Generate one-time wallet address
    const generateWalletAddress = () => {
      const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
      let address = "bc1q"
      for (let i = 0; i < 39; i++) {
        address += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return address
    }
    setWalletAddress(generateWalletAddress())
  }, [])

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && paymentStatus === "pending") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setPaymentStatus("expired")
    }
  }, [timeLeft, paymentStatus])

  // Simulate payment confirmation after 30 seconds
  useEffect(() => {
    if (paymentStatus === "pending") {
      const confirmationTimer = setTimeout(() => {
        setPaymentStatus("confirmed")
        // Redirect to receipt page after confirmation
        setTimeout(() => {
          window.location.href = `/receipt?merchant=${merchantId}&total=${total}&btc=${btcAmount}&email=${email}&wallet=${walletAddress}`
        }, 2000)
      }, 30000) // 30 seconds for demo
      return () => clearTimeout(confirmationTimer)
    }
  }, [paymentStatus, merchantId, total, btcAmount, email, walletAddress])

  const merchant = merchants[merchantId as keyof typeof merchants] || merchants["1"]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
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

  if (paymentStatus === "expired") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto premium-card">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Timer className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Expired</h2>
            <p className="text-muted-foreground mb-6">The wallet address has expired. Please start a new payment.</p>
            <Button asChild className="payveri-gradient text-white">
              <Link href={`/gateway?merchant=${merchantId}&total=${total}&btc=${btcAmount}`}>Start New Payment</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
                <span className="text-xl font-bold payveri-text-gradient">PayVeri Gateway</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Payment Status */}
        {paymentStatus === "confirmed" && (
          <Card className="mb-6 premium-card border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Payment Confirmed!</h3>
                  <p className="text-sm">Redirecting to receipt...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timer */}
        <Card className="mb-6 premium-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-6 w-6 text-orange-500" />
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{formatTime(timeLeft)}</div>
                <div className="text-sm text-muted-foreground">Wallet address expires in</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card className="mb-6 premium-card">
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
                <span>Bitcoin Amount:</span>
                <span className="font-semibold text-primary">{btcAmount} BTC</span>
              </div>
              <div className="flex justify-between">
                <span>Receipt Email:</span>
                <span className="font-semibold">{email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Address */}
        <Card className="mb-6 premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              One-Time Bitcoin Wallet Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-2">Send exactly {btcAmount} BTC to:</div>
                <div className="font-mono text-sm break-all bg-background p-3 rounded border">{walletAddress}</div>
                <Button onClick={copyToClipboard} variant="outline" size="sm" className="mt-3 w-full bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy Address"}
                </Button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-sm text-yellow-800">
                  <strong>Important:</strong>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Send exactly {btcAmount} BTC to this address</li>
                    <li>This address expires in {formatTime(timeLeft)}</li>
                    <li>Payment confirmation typically takes 2-10 minutes</li>
                    <li>Do not send any other cryptocurrency to this address</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card className="premium-card">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bitcoin className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Waiting for Payment</h3>
            <p className="text-muted-foreground">
              We're monitoring the blockchain for your payment. You'll be automatically redirected once confirmed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
