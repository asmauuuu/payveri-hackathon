"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Bitcoin, ArrowLeft, Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, User } from "lucide-react"

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const statusOptions = ["All", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"]

  const orders = [
    {
      id: "ORD-2024-001",
      merchant: "TechHub Electronics",
      merchantImage: `/placeholder.svg?height=48&width=48&query=electronics store logo`,
      items: [
        { name: "iPhone 15 Pro Max", quantity: 1, price: 1250000 },
        { name: "MacBook Air M3", quantity: 1, price: 2100000 },
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
        { status: "Order Placed", date: "2024-01-15 10:30 AM", completed: true },
        { status: "Processing", date: "2024-01-15 2:15 PM", completed: true },
        { status: "Shipped", date: "2024-01-16 9:00 AM", completed: true },
        { status: "Out for Delivery", date: "2024-01-17 8:30 AM", completed: true },
        { status: "Delivered", date: "", completed: false },
      ],
    },
    {
      id: "ORD-2024-002",
      merchant: "Fashion Forward",
      merchantImage: `/placeholder.svg?height=48&width=48&query=fashion boutique logo`,
      items: [
        { name: "Designer Dress", quantity: 1, price: 75000 },
        { name: "Luxury Handbag", quantity: 1, price: 120000 },
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
        { status: "Order Placed", date: "2024-01-10 3:45 PM", completed: true },
        { status: "Processing", date: "2024-01-11 10:00 AM", completed: true },
        { status: "Shipped", date: "2024-01-12 11:30 AM", completed: true },
        { status: "Out for Delivery", date: "2024-01-13 9:15 AM", completed: true },
        { status: "Delivered", date: "2024-01-13 4:20 PM", completed: true },
      ],
    },
    {
      id: "ORD-2024-003",
      merchant: "TechHub Electronics",
      merchantImage: `/placeholder.svg?height=48&width=48&query=electronics store logo`,
      items: [{ name: "Samsung Galaxy S24", quantity: 1, price: 950000 }],
      total: 957500,
      status: "Processing",
      orderDate: "2024-01-18",
      estimatedDelivery: "2024-01-22",
      trackingNumber: "TRK456789123",
      shippingMethod: "Standard Delivery",
      deliveryAddress: {
        name: "Mike Johnson",
        phone: "+234 803 456 7890",
        address: "789 Ikeja GRA, Lagos, Nigeria",
      },
      statusHistory: [
        { status: "Order Placed", date: "2024-01-18 11:20 AM", completed: true },
        { status: "Processing", date: "2024-01-18 2:30 PM", completed: true },
        { status: "Shipped", date: "", completed: false },
        { status: "Out for Delivery", date: "", completed: false },
        { status: "Delivered", date: "", completed: false },
      ],
    },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

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
      case "Cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20"
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

  const handleTrackOrder = (trackingNumber: string) => {
    window.open(`https://track.payveri.ng/${trackingNumber}`, "_blank")
  }

  const handleContactMerchant = (merchant: string) => {
    alert(`Contacting ${merchant}... This would open a chat or contact form.`)
  }

  const handleLeaveReview = (orderId: string, merchant: string) => {
    alert(`Leave review for order ${orderId} from ${merchant}... This would open a review form.`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="hover-lift">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
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
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">My Orders</h1>
          <p className="text-xl text-muted-foreground">Track your orders and delivery status</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8 premium-card animate-scale-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search orders by ID, merchant, or product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-lg py-3 glass-morphism"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 rounded-lg border border-border bg-background text-foreground"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order, index) => (
            <Card
              key={order.id}
              className="premium-card hover-lift animate-grid-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={order.merchantImage || "/placeholder.svg"}
                      alt={order.merchant}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <p className="text-muted-foreground">{order.merchant}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{order.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div>
                  <h4 className="font-semibold mb-3">Items Ordered</h4>
                  <div className="space-y-2">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-center text-sm">
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">₦{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Order Date:</span>
                    <p className="text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium">Estimated Delivery:</span>
                    <p className="text-muted-foreground">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium">Total Amount:</span>
                    <p className="font-bold text-primary">₦{order.total.toLocaleString()}</p>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="bg-muted/20 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Delivery Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{order.deliveryAddress.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{order.deliveryAddress.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{order.deliveryAddress.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span>{order.shippingMethod}</span>
                    <span className="text-muted-foreground">• Tracking: {order.trackingNumber}</span>
                  </div>
                </div>

                {/* Order Status Timeline */}
                <div>
                  <h4 className="font-semibold mb-3">Order Status</h4>
                  <div className="space-y-3">
                    {order.statusHistory.map((status, statusIndex) => (
                      <div key={statusIndex} className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            status.completed ? "bg-green-500 border-green-500" : "border-muted-foreground bg-background"
                          }`}
                        >
                          {status.completed && <CheckCircle className="w-full h-full text-white" />}
                        </div>
                        <div className="flex-1">
                          <div
                            className={`font-medium ${status.completed ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {status.status}
                          </div>
                          {status.date && <div className="text-sm text-muted-foreground">{status.date}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-border/50">
                  <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order.trackingNumber)}>
                    Track Order
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleContactMerchant(order.merchant)}>
                    Contact Merchant
                  </Button>
                  {order.status === "Delivered" && (
                    <Button variant="outline" size="sm" onClick={() => handleLeaveReview(order.id, order.merchant)}>
                      Leave Review
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredOrders.length === 0 && (
          <Card className="premium-card text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet or no orders match your search criteria
              </p>
              <Button asChild className="btn-primary">
                <Link href="/merchants">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
