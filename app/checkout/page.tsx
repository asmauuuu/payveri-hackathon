"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bitcoin, CreditCard, ArrowLeft, CheckCircle, Clock, Shield } from "lucide-react"

export default function CheckoutPage() {
  const [amount, setAmount] = useState("")
  const [merchantId, setMerchantId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const availableBalance = 125000

  // Mock merchant data
  const merchant = {
    name: "TechHub Electronics",
    category: "Electronics",
    image: "/electronics-store-interior.png",
    description: "Premium electronics and gadgets",
  }

  useEffect(() => {
    // Get merchant ID from URL params
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("merchant")
    if (id) setMerchantId(id)
  }, [])

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setPaymentComplete(true)
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-6 premium-card animate-scale-fade-in">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your payment to {merchant.name} has been processed successfully.
            </p>

            <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span>Amount Paid:</span>
                <span className="font-medium">₦{Number.parseFloat(amount).toLocaleString()}</span>
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
              <Button asChild className="w-full btn-primary">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="w-full btn-secondary bg-transparent">
                <Link href="/merchants">Browse More Merchants</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/merchants">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Merchants
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
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Secure Checkout</h1>
          <p className="text-xl text-muted-foreground">Pay with your PayVeri balance instantly</p>
        </div>

        {/* Merchant Info */}
        <Card className="mb-6 premium-card animate-scale-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <img
                src={merchant.image || "/placeholder.svg"}
                alt={merchant.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <div className="text-xl">{merchant.name}</div>
                <Badge variant="secondary" className="text-xs">
                  {merchant.category}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{merchant.description}</p>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="mb-6 premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CreditCard className="h-6 w-6 text-primary" />
              Payment Details
            </CardTitle>
            <Badge variant="outline" className="w-fit border-primary/20">
              Available Balance: ₦{availableBalance.toLocaleString()}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-lg font-medium">
                Payment Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount to pay"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-2xl py-4 glass-morphism font-bold"
                max={availableBalance}
              />
              <p className="text-sm text-muted-foreground">Maximum: ₦{availableBalance.toLocaleString()} available</p>
            </div>

            {/* Payment Summary */}
            {amount && Number.parseFloat(amount) > 0 && (
              <div className="bg-muted/30 rounded-xl p-6 space-y-3 border border-border/50 animate-scale-fade-in">
                <h4 className="font-semibold text-lg mb-3">Payment Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>Payment Amount:</span>
                  <span className="font-medium">₦{Number.parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing Fee:</span>
                  <span className="text-green-600 font-medium">Free ✨</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing Time:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Instant
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total to Pay:</span>
                  <span className="text-primary">₦{Number.parseFloat(amount).toLocaleString()}</span>
                </div>
              </div>
            )}

            <Button
              onClick={handlePayment}
              disabled={
                !amount ||
                Number.parseFloat(amount) <= 0 ||
                Number.parseFloat(amount) > availableBalance ||
                isProcessing
              }
              className="w-full payveri-gradient text-white py-6 text-xl hover-lift shadow-xl"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Pay with PayVeri
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Security Features */}
        <Card className="premium-card animate-slide-up-fade" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-500" />
              Secure Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">End-to-End Encryption</h4>
                  <p className="text-sm text-muted-foreground">Your payment data is encrypted and secure</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Instant Settlement</h4>
                  <p className="text-sm text-muted-foreground">Merchant receives payment immediately</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Transaction History</h4>
                  <p className="text-sm text-muted-foreground">All payments are recorded in your dashboard</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
