"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"

export default function PaymentProcessingPage() {
  const [isProcessing, setIsProcessing] = useState(true)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [merchantId, setMerchantId] = useState("")
  const [total, setTotal] = useState("")
  const [btcAmount, setBtcAmount] = useState("")
  const [authType, setAuthType] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setMerchantId(urlParams.get("merchant") || "1")
    setTotal(urlParams.get("total") || "0")
    setBtcAmount(urlParams.get("btc") || "0")
    setAuthType(urlParams.get("auth") || "guest")

    // Simulate payment processing
    const timer = setTimeout(() => {
      setIsProcessing(false)
      setPaymentComplete(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const merchants = {
    "1": { name: "TechHub Electronics" },
    "2": { name: "Fashion Forward" },
  }

  const merchant = merchants[merchantId as keyof typeof merchants] || merchants["1"]

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-6 premium-card animate-scale-fade-in">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 payveri-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="h-10 w-10 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Processing Payment</h2>
            <p className="text-muted-foreground mb-6">
              Please wait while we process your Bitcoin payment to {merchant.name}
            </p>
            <div className="bg-muted/30 rounded-lg p-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span>₦{Number(total).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bitcoin:</span>
                <span>{btcAmount} BTC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="text-yellow-600">Processing...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-md w-full mx-6 premium-card animate-scale-fade-in">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-6">
            Your Bitcoin payment to {merchant.name} has been processed successfully.
          </p>

          <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between text-sm mb-2">
              <span>Amount Paid:</span>
              <span className="font-medium">₦{Number(total).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Bitcoin Amount:</span>
              <span className="font-medium">{btcAmount} BTC</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Transaction ID:</span>
              <span className="font-medium">PV{Date.now()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-3">
            {authType === "login" ? (
              <Button asChild className="w-full btn-primary">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild className="w-full btn-primary">
                <Link href="/signup">Create PayVeri Account</Link>
              </Button>
            )}
            <Button asChild variant="outline" className="w-full btn-secondary bg-transparent">
              <Link href="/merchants">Browse More Merchants</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
