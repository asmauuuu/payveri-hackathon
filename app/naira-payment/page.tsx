"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ArrowLeft, Banknote, CreditCard, CheckCircle, Star, MapPin, Truck } from "lucide-react"

export default function NairaPaymentPage() {
  const searchParams = useSearchParams()
  const [merchantId, setMerchantId] = useState("")
  const [cartTotal, setCartTotal] = useState(0)
  const [shippingId, setShippingId] = useState(1)
  const [deliveryAddress, setDeliveryAddress] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const merchants = {
    "1": {
      name: "TechHub Electronics",
      category: "Electronics",
      rating: 4.8,
      location: "Victoria Island, Lagos",
      description: "Premium electronics and gadgets",
      image: "/electronics-store-logo.png",
      shippingOptions: [
        { id: 1, name: "Standard Delivery", price: 2500, duration: "3-5 business days" },
        { id: 2, name: "Express Delivery", price: 5000, duration: "1-2 business days" },
        { id: 3, name: "Same Day Delivery", price: 8000, duration: "Same day (Lagos only)" },
      ],
    },
    "2": {
      name: "Fashion Forward",
      category: "Fashion",
      rating: 4.9,
      location: "Lekki, Lagos",
      description: "Trendy fashion and accessories",
      image: "/fashion-boutique-logo.png",
      shippingOptions: [
        { id: 1, name: "Standard Delivery", price: 2000, duration: "2-4 business days" },
        { id: 2, name: "Express Delivery", price: 4000, duration: "1-2 business days" },
      ],
    },
  }

  useEffect(() => {
    const id = searchParams.get("merchant")
    const total = searchParams.get("total")
    const shipping = searchParams.get("shipping")
    const address = searchParams.get("address")

    if (id) setMerchantId(id)
    if (total) setCartTotal(Number.parseFloat(total))
    if (shipping) setShippingId(Number.parseInt(shipping))
    if (address) {
      try {
        setDeliveryAddress(JSON.parse(decodeURIComponent(address)))
      } catch (e) {
        console.error("Failed to parse delivery address")
      }
    }
  }, [searchParams])

  const merchant = merchants[merchantId as keyof typeof merchants] || merchants["1"]
  const selectedShipping =
    merchant.shippingOptions.find((option) => option.id === shippingId) || merchant.shippingOptions[0]

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)

    const paymentData = {
      amount: cartTotal.toString(),
      merchant: merchant.name,
      transactionId: `NAI${Date.now()}`,
      date: new Date().toISOString(),
      shipping: selectedShipping.name,
      address: deliveryAddress ? `${deliveryAddress.address}, ${deliveryAddress.city}, ${deliveryAddress.state}` : "",
    }

    const params = new URLSearchParams(paymentData)
    window.location.href = `/naira-payment-success?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href={`/payment-method?merchant=${merchantId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Payment Methods
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
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Pay with Naira</h1>
          <p className="text-xl text-muted-foreground">Complete your payment using your Naira balance</p>
        </div>

        {/* Merchant Info */}
        <Card className="mb-6 premium-card animate-scale-fade-in">
          <CardHeader>
            <div className="flex items-center gap-4">
              <img
                src={merchant.image || "/placeholder.svg"}
                alt={merchant.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <CardTitle className="text-xl">{merchant.name}</CardTitle>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Badge variant="secondary">{merchant.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{merchant.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {deliveryAddress && (
          <Card className="mb-6 premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {deliveryAddress.fullName}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {deliveryAddress.phone}
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium">Address:</span> {deliveryAddress.address}, {deliveryAddress.city},{" "}
                {deliveryAddress.state}
              </div>
              {deliveryAddress.landmark && (
                <div className="text-sm">
                  <span className="font-medium">Landmark:</span> {deliveryAddress.landmark}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <Truck className="h-4 w-4 text-blue-600" />
                <span className="font-medium">{selectedShipping.name}</span>
                <span className="text-muted-foreground">- {selectedShipping.duration}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Form */}
        <Card className="mb-6 premium-card animate-scale-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Banknote className="h-6 w-6 text-green-600" />
              Naira Payment
            </CardTitle>
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20 w-fit">
              <CheckCircle className="h-3 w-3 mr-1" />
              Available Balance: ₦125,000
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/30 rounded-xl p-6 space-y-3 border border-border/50">
              <h4 className="font-semibold text-lg mb-3">Payment Summary</h4>
              <div className="flex justify-between text-sm">
                <span>Cart Total:</span>
                <span className="font-medium">₦{(cartTotal - selectedShipping.price).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping ({selectedShipping.name}):</span>
                <span className="font-medium">₦{selectedShipping.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing Fee:</span>
                <span className="text-green-600 font-medium">Free ✨</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Merchant:</span>
                <span className="font-medium">{merchant.name}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border/50 pt-3">
                <span>Total Amount Due:</span>
                <span className="text-primary">₦{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={cartTotal <= 0 || cartTotal > 125000 || isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-xl hover-lift shadow-xl"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Pay ₦{cartTotal.toLocaleString()}
                </div>
              )}
            </Button>

            {cartTotal > 125000 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-600 text-sm">
                  Insufficient balance. Your available balance is ₦125,000 but the total amount is ₦
                  {cartTotal.toLocaleString()}.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="premium-card animate-slide-up-fade" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="text-2xl">Secure Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Instant Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Your payment will be processed instantly and confirmed within seconds
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Secure Transaction</h4>
                  <p className="text-sm text-muted-foreground">
                    All payments are encrypted and processed through our secure payment gateway
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Merchant Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    All merchants are verified and trusted PayVeri partners
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
