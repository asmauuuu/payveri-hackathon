"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bitcoin, ArrowLeft, ShoppingCart, Minus, Plus, Trash2, MapPin, Truck, Clock } from "lucide-react"

export default function CartPage() {
  const [merchantId, setMerchantId] = useState("")
  const [btcRate, setBtcRate] = useState(68800000) // Current BTC rate in Naira
  const [selectedShipping, setSelectedShipping] = useState(1)
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    notes: "",
  })
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1250000,
      quantity: 1,
      image: "/iphone-15-pro-max.png",
    },
    {
      id: 2,
      name: "MacBook Air M3",
      price: 2100000,
      quantity: 1,
      image: "/macbook-air-m3.png",
    },
  ])

  // Mock merchant data
  const merchants = {
    "1": {
      name: "TechHub Electronics",
      category: "Electronics",
      image: "/electronics-store-logo.png",
      description: "Premium electronics and gadgets",
      shippingOptions: [
        {
          id: 1,
          name: "Standard Delivery",
          price: 2500,
          duration: "3-5 business days",
          description: "Regular delivery to your doorstep",
        },
        {
          id: 2,
          name: "Express Delivery",
          price: 5000,
          duration: "1-2 business days",
          description: "Fast delivery for urgent orders",
        },
        {
          id: 3,
          name: "Same Day Delivery",
          price: 8000,
          duration: "Same day (Lagos only)",
          description: "Get your order today within Lagos",
        },
      ],
    },
    "2": {
      name: "Fashion Forward",
      category: "Fashion",
      image: "/fashion-boutique-logo.png",
      description: "Trendy fashion and accessories",
      shippingOptions: [
        {
          id: 1,
          name: "Standard Delivery",
          price: 2000,
          duration: "2-4 business days",
          description: "Regular delivery to your doorstep",
        },
        {
          id: 2,
          name: "Express Delivery",
          price: 4000,
          duration: "1-2 business days",
          description: "Fast delivery for urgent orders",
        },
      ],
    },
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("merchant")
    if (id) setMerchantId(id)

    // Simulate BTC rate updates
    const interval = setInterval(() => {
      setBtcRate((prev) => prev + (Math.random() - 0.5) * 100000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const merchant = merchants[merchantId as keyof typeof merchants] || merchants["1"]
  const selectedShippingOption =
    merchant.shippingOptions.find((option) => option.id === selectedShipping) || merchant.shippingOptions[0]

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = selectedShippingOption.price
  const totalNaira = subtotal + shippingFee
  const totalBTC = totalNaira / btcRate

  const isAddressComplete =
    deliveryAddress.fullName &&
    deliveryAddress.phone &&
    deliveryAddress.address &&
    deliveryAddress.city &&
    deliveryAddress.state

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

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Shopping Cart</h1>
          <p className="text-xl text-muted-foreground">Review your items, add delivery details, and pay with Bitcoin</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items and Delivery */}
          <div className="lg:col-span-2 space-y-6">
            {/* Merchant Info */}
            <Card className="premium-card animate-scale-fade-in">
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
            </Card>

            {/* Cart Items */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart Items ({cartItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-muted-foreground">₦{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={deliveryAddress.fullName}
                      onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Textarea
                    id="address"
                    value={deliveryAddress.address}
                    onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter your complete address"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={deliveryAddress.state}
                      onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, state: e.target.value }))}
                      placeholder="Enter your state"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    value={deliveryAddress.landmark}
                    onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, landmark: e.target.value }))}
                    placeholder="Nearest landmark or notable location"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={deliveryAddress.notes}
                    onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special instructions for delivery"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {merchant.shippingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedShipping === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedShipping(option.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedShipping === option.id ? "border-primary bg-primary" : "border-muted-foreground"
                          }`}
                        >
                          {selectedShipping === option.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{option.name}</h4>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₦{option.price.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {option.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bitcoin className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping ({selectedShippingOption.name}):</span>
                    <span>₦{shippingFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing Fee:</span>
                    <span className="text-green-600">Free ✨</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total (Naira):</span>
                    <span>₦{totalNaira.toLocaleString()}</span>
                  </div>
                </div>

                {/* Bitcoin Conversion */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Bitcoin className="h-4 w-4" />
                    Bitcoin Equivalent
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>BTC Rate:</span>
                      <span>₦{btcRate.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total (BTC):</span>
                      <span className="text-primary">{totalBTC.toFixed(8)} BTC</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Rate updates every 5 seconds</p>
                </div>

                <Button
                  asChild
                  className="w-full payveri-gradient text-white py-6 text-lg hover-lift shadow-xl"
                  disabled={cartItems.length === 0 || !isAddressComplete}
                >
                  <Link
                    href={`/gateway?merchant=${merchantId}&total=${totalNaira}&btc=${totalBTC.toFixed(8)}&shipping=${selectedShipping}&address=${encodeURIComponent(JSON.stringify(deliveryAddress))}`}
                  >
                    {!isAddressComplete ? "Complete Delivery Address" : "Proceed to Payment"}
                  </Link>
                </Button>

                {!isAddressComplete && (
                  <p className="text-sm text-muted-foreground text-center">
                    Please fill in all required delivery address fields to continue
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="premium-card animate-slide-up-fade" style={{ animationDelay: "0.5s" }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bitcoin className="h-4 w-4 text-primary" />
                  <span>Secure Bitcoin payment powered by PayVeri</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
