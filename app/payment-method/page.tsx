"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ArrowLeft, CreditCard, Banknote, CheckCircle, Star, MapPin } from "lucide-react"

export default function PaymentMethodPage() {
  const searchParams = useSearchParams()
  const [merchantId, setMerchantId] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("")

  const merchants = {
    "1": {
      name: "TechHub Electronics",
      category: "Electronics",
      rating: 4.8,
      location: "Victoria Island, Lagos",
      description: "Premium electronics and gadgets",
      image: "/electronics-store-interior.png",
      discount: "5% off with PayVeri",
    },
    "2": {
      name: "Fashion Forward",
      category: "Fashion",
      rating: 4.9,
      location: "Lekki, Lagos",
      description: "Trendy fashion and accessories",
      image: "/fashion-store-boutique.png",
      discount: "10% off first purchase",
    },
    "3": {
      name: "Gourmet Kitchen",
      category: "Restaurant",
      rating: 4.7,
      location: "Ikeja, Lagos",
      description: "Fine dining and continental cuisine",
      image: "/cozy-italian-restaurant.png",
      discount: "Free delivery",
    },
  }

  useEffect(() => {
    const id = searchParams.get("merchant")
    if (id) setMerchantId(id)
  }, [searchParams])

  const merchant = merchants[merchantId as keyof typeof merchants] || merchants["1"]

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
  }

  const handleContinue = () => {
    if (selectedMethod === "bitcoin") {
      window.location.href = `/cart?merchant=${merchantId}`
    } else if (selectedMethod === "naira") {
      window.location.href = `/naira-payment?merchant=${merchantId}`
    }
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

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Choose Payment Method</h1>
          <p className="text-xl text-muted-foreground">Select how you'd like to pay at this merchant</p>
        </div>

        {/* Merchant Info */}
        <Card className="mb-8 premium-card animate-scale-fade-in">
          <CardHeader>
            <div className="flex items-center gap-4">
              <img
                src={merchant.image || "/placeholder.svg"}
                alt={merchant.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{merchant.name}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="secondary">{merchant.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{merchant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{merchant.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Bitcoin Payment */}
          <Card
            className={`premium-card hover-lift cursor-pointer transition-all duration-300 animate-scale-fade-in ${
              selectedMethod === "bitcoin" ? "ring-2 ring-primary border-primary/50" : ""
            }`}
            onClick={() => handleMethodSelect("bitcoin")}
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 payveri-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Bitcoin className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Pay with Bitcoin</CardTitle>
              <p className="text-muted-foreground">Use your Bitcoin balance for instant payments</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Instant transactions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Zero processing fees</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Enhanced privacy</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Global acceptance</span>
                </div>
              </div>

              {merchant.discount && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 dark:text-green-300 text-sm font-medium">{merchant.discount}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Naira Payment */}
          <Card
            className={`premium-card hover-lift cursor-pointer transition-all duration-300 animate-scale-fade-in ${
              selectedMethod === "naira" ? "ring-2 ring-primary border-primary/50" : ""
            }`}
            onClick={() => handleMethodSelect("naira")}
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Banknote className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Pay with Naira</CardTitle>
              <p className="text-muted-foreground">Use your Naira balance for local payments</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Local currency</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Familiar pricing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Bank integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Instant settlement</span>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                    Standard merchant rates apply
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="animate-slide-up-fade" style={{ animationDelay: "0.3s" }}>
          <Button
            onClick={handleContinue}
            disabled={!selectedMethod}
            className="w-full payveri-gradient text-white py-6 text-xl hover-lift shadow-xl"
          >
            {selectedMethod === "bitcoin" ? (
              <div className="flex items-center gap-2">
                <Bitcoin className="h-6 w-6" />
                Continue with Bitcoin
              </div>
            ) : selectedMethod === "naira" ? (
              <div className="flex items-center gap-2">
                <Banknote className="h-6 w-6" />
                Continue with Naira
              </div>
            ) : (
              "Select a Payment Method"
            )}
          </Button>
        </div>

        {/* Payment Info */}
        <Card className="mt-8 premium-card animate-slide-up-fade" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Why Choose PayVeri?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Bank-grade security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>24/7 customer support</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Instant transaction processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Competitive exchange rates</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
