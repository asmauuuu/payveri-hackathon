"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Bitcoin,
  ArrowLeft,
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  User,
  Calendar,
  AlertCircle,
} from "lucide-react"

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Mock order data for demonstration
  const mockOrders = {
    TRK123456789: {
      id: "ORD-2024-001",
      merchant: "TechHub Electronics",
      merchantImage: "/electronics-store-logo.png",
      items: [
        { name: "iPhone 15 Pro Max", quantity: 1, price: 1250000, image: "/iphone-15-pro-max.png" },
        { name: "MacBook Air M3", quantity: 1, price: 2100000, image: "/macbook-air-m3.png" },
      ],
      total: 3358000,
      status: "Out for Delivery",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-17",
      trackingNumber: "TRK123456789",
      shippingMethod: "Express Delivery",
      deliveryAddress: {
        name: "John Doe",
        phone: "+234 801 234 5678",
        address: "123 Victoria Island, Lagos, Nigeria",
      },
      statusHistory: [
        {
          status: "Order Placed",
          date: "2024-01-15 10:30 AM",
          completed: true,
          description: "Your order has been successfully placed and payment confirmed.",
          location: "PayVeri System",
        },
        {
          status: "Processing",
          date: "2024-01-15 2:15 PM",
          completed: true,
          description: "Merchant is preparing your items for shipment.",
          location: "TechHub Electronics - Victoria Island",
        },
        {
          status: "Shipped",
          date: "2024-01-16 9:00 AM",
          completed: true,
          description: "Your package has been picked up by our delivery partner.",
          location: "Lagos Sorting Facility",
        },
        {
          status: "Out for Delivery",
          date: "2024-01-17 8:30 AM",
          completed: true,
          description: "Your package is on the delivery vehicle and will arrive today.",
          location: "Victoria Island Delivery Hub",
        },
        {
          status: "Delivered",
          date: "",
          completed: false,
          description: "Package will be delivered to your address.",
          location: "123 Victoria Island, Lagos",
        },
      ],
      deliveryAgent: {
        name: "Samuel Adebayo",
        phone: "+234 809 123 4567",
        vehicle: "Motorcycle - ABC 123 XY",
      },
    },
    TRK987654321: {
      id: "ORD-2024-002",
      merchant: "Fashion Forward",
      merchantImage: "/fashion-boutique-logo.png",
      items: [
        { name: "Designer Dress", quantity: 1, price: 75000, image: "/elegant-designer-dress.jpg" },
        { name: "Luxury Handbag", quantity: 1, price: 120000, image: "/luxury-leather-handbag.jpg" },
      ],
      total: 197000,
      status: "Delivered",
      orderDate: "2024-01-10",
      estimatedDelivery: "2024-01-13",
      trackingNumber: "TRK987654321",
      shippingMethod: "Standard Delivery",
      deliveryAddress: {
        name: "Jane Smith",
        phone: "+234 802 345 6789",
        address: "456 Lekki Phase 1, Lagos, Nigeria",
      },
      statusHistory: [
        {
          status: "Order Placed",
          date: "2024-01-10 3:45 PM",
          completed: true,
          description: "Your order has been successfully placed and payment confirmed.",
          location: "PayVeri System",
        },
        {
          status: "Processing",
          date: "2024-01-11 10:00 AM",
          completed: true,
          description: "Merchant is preparing your items for shipment.",
          location: "Fashion Forward - Lekki",
        },
        {
          status: "Shipped",
          date: "2024-01-12 11:30 AM",
          completed: true,
          description: "Your package has been picked up by our delivery partner.",
          location: "Lagos Sorting Facility",
        },
        {
          status: "Out for Delivery",
          date: "2024-01-13 9:15 AM",
          completed: true,
          description: "Your package was on the delivery vehicle.",
          location: "Lekki Delivery Hub",
        },
        {
          status: "Delivered",
          date: "2024-01-13 4:20 PM",
          completed: true,
          description: "Package successfully delivered and received by Jane Smith.",
          location: "456 Lekki Phase 1, Lagos",
        },
      ],
      deliveryAgent: {
        name: "Ibrahim Mohammed",
        phone: "+234 808 987 6543",
        vehicle: "Van - DEF 456 ZW",
      },
    },
  }

  const handleTrackOrder = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const order = mockOrders[trackingNumber as keyof typeof mockOrders]
    if (order) {
      setOrderData(order)
      setError("")
    } else {
      setOrderData(null)
      setError("Order not found. Please check your tracking number and try again.")
    }

    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Shipped":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "Out for Delivery":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      case "Delivered":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="h-4 w-4" />
      case "Shipped":
        return <Package className="h-4 w-4" />
      case "Out for Delivery":
        return <Truck className="h-4 w-4" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Track Your Order</h1>
          <p className="text-xl text-muted-foreground">Enter your tracking number to get real-time delivery updates</p>
        </div>

        {/* Tracking Input */}
        <Card className="mb-8 premium-card animate-scale-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Enter tracking number (e.g., TRK123456789)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="pl-10 text-lg py-3 glass-morphism"
                  onKeyPress={(e) => e.key === "Enter" && handleTrackOrder()}
                />
              </div>
              <Button onClick={handleTrackOrder} disabled={isLoading} className="btn-primary px-8 py-3">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Tracking...
                  </div>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Track Order
                  </>
                )}
              </Button>
            </div>

            {error && (
              <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Track Examples */}
        {!orderData && (
          <Card className="mb-8 premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Try These Sample Tracking Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setTrackingNumber("TRK123456789")}>
                  TRK123456789
                </Button>
                <Button variant="outline" size="sm" onClick={() => setTrackingNumber("TRK987654321")}>
                  TRK987654321
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            {/* Order Header */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={orderData.merchantImage || "/placeholder.svg"}
                      alt={orderData.merchant}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <CardTitle className="text-xl">{orderData.id}</CardTitle>
                      <p className="text-muted-foreground">{orderData.merchant}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(orderData.status)}>
                    {getStatusIcon(orderData.status)}
                    <span className="ml-1">{orderData.status}</span>
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Current Status */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Current Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {getStatusIcon(orderData.status)}
                    <h3 className="text-xl font-semibold">{orderData.status}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {orderData.statusHistory.find((s: any) => s.status === orderData.status)?.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Estimated Delivery: {new Date(orderData.estimatedDelivery).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>Tracking: {orderData.trackingNumber}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Agent Info */}
            {orderData.status === "Out for Delivery" && (
              <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Delivery Agent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold">{orderData.deliveryAgent.name}</p>
                        <p className="text-sm text-muted-foreground">{orderData.deliveryAgent.vehicle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-600 font-medium">{orderData.deliveryAgent.phone}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Items */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₦{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-border/50 pt-4">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total Amount:</span>
                      <span className="text-primary">₦{orderData.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{orderData.deliveryAddress.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{orderData.deliveryAddress.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{orderData.deliveryAddress.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.7s" }}>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderData.statusHistory.map((status: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                            status.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-muted-foreground bg-background"
                          }`}
                        >
                          {status.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                          )}
                        </div>
                        {index < orderData.statusHistory.length - 1 && (
                          <div
                            className={`w-0.5 h-12 ${status.completed ? "bg-green-500" : "bg-muted-foreground/30"}`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className={`font-semibold ${status.completed ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {status.status}
                          </h4>
                          {status.date && (
                            <Badge variant="outline" className="text-xs">
                              {status.date}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{status.description}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{status.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
