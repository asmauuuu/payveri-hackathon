"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Store,
  Plus,
  Package,
  TrendingUp,
  Users,
  ShoppingCart,
  Edit,
  Trash2,
  Eye,
  Settings,
  BarChart3,
  DollarSign,
  User,
  LogOut,
  Bell,
  Upload,
  AlertCircle,
} from "lucide-react"

export default function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      message: "John Doe placed an order for iPhone 15 Pro Max",
      amount: 1250000,
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "order",
      title: "Order Shipped",
      message: "Order #ORD-003 has been shipped to Mike Johnson",
      amount: 950000,
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "stock",
      title: "Low Stock Alert",
      message: "Samsung Galaxy S24 is out of stock",
      time: "3 hours ago",
      read: true,
    },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "Electronics",
      price: 1250000,
      originalPrice: 1400000,
      stock: 15,
      status: "active",
      image: "/iphone-15-pro-max-titanium-blue-smartphone-front-b.jpg",
      description: "Latest iPhone with titanium design and advanced camera system",
      discount: 10,
    },
    {
      id: 2,
      name: "MacBook Air M3",
      category: "Electronics",
      price: 2300000,
      originalPrice: 2300000,
      stock: 8,
      status: "active",
      image: "/macbook-air-m3-silver-laptop-computer-apple.jpg",
      description: "Powerful laptop with M3 chip and all-day battery life",
      discount: 0,
    },
    {
      id: 3,
      name: "Samsung Galaxy S24",
      category: "Electronics",
      price: 950000,
      originalPrice: 1100000,
      stock: 0,
      status: "out_of_stock",
      image: "/samsung-galaxy-s24-ultra-black-smartphone-android.jpg",
      description: "Premium Android smartphone with AI features",
      discount: 15,
    },
  ])

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    stock: "",
    description: "",
    image: "",
  })

  // Mock merchant data
  const merchantData = {
    businessName: "TechHub Electronics",
    category: "Electronics",
    totalSales: 15750000,
    totalOrders: 127,
    totalCustomers: 89,
    conversionRate: 3.2,
    recentOrders: [
      {
        id: "ORD-001",
        customer: "John Doe",
        amount: 1250000,
        status: "completed",
        date: "2025-01-15",
        product: "iPhone 15 Pro Max",
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        amount: 2300000,
        status: "processing",
        date: "2025-01-15",
        product: "MacBook Air M3",
      },
      {
        id: "ORD-003",
        customer: "Mike Johnson",
        amount: 950000,
        status: "shipped",
        date: "2025-01-14",
        product: "Samsung Galaxy S24",
      },
      {
        id: "ORD-004",
        customer: "Sarah Wilson",
        amount: 1250000,
        status: "pending",
        date: "2025-01-14",
        product: "iPhone 15 Pro Max",
      },
      {
        id: "ORD-005",
        customer: "David Brown",
        amount: 2300000,
        status: "completed",
        date: "2025-01-13",
        product: "MacBook Air M3",
      },
    ],
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price) {
      const product = {
        id: products.length + 1,
        name: newProduct.name,
        category: newProduct.category,
        price: Number.parseInt(newProduct.price),
        originalPrice: Number.parseInt(newProduct.originalPrice) || Number.parseInt(newProduct.price),
        stock: Number.parseInt(newProduct.stock) || 0,
        status: "active" as const,
        image:
          newProduct.image ||
          `/placeholder.svg?height=80&width=80&query=${newProduct.name} ${newProduct.category} product`,
        description: newProduct.description,
        discount: newProduct.originalPrice
          ? Math.round(
              ((Number.parseInt(newProduct.originalPrice) - Number.parseInt(newProduct.price)) /
                Number.parseInt(newProduct.originalPrice)) *
                100,
            )
          : 0,
      }
      setProducts([...products, product])
      setNewProduct({ name: "", category: "", price: "", originalPrice: "", stock: "", description: "", image: "" })
      setShowAddProduct(false)
    }
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload to a cloud service
      const imageUrl = URL.createObjectURL(file)
      setNewProduct({ ...newProduct, image: imageUrl })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "out_of_stock":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      case "draft":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
    }
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "processing":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "shipped":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "pending":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4 text-blue-600" />
      case "stock":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 payveri-gradient rounded-xl flex items-center justify-center shadow-lg">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold payveri-text-gradient">PayVeri</span>
                <p className="text-sm text-muted-foreground">Merchant Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover-lift relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-4 w-4" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-card border border-border/50 rounded-xl shadow-lg z-50 animate-scale-fade-in">
                    <div className="p-4 border-b border-border/50">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border/50 hover:bg-muted/50 cursor-pointer ${
                            !notification.read ? "bg-blue-500/5" : ""
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{notification.title}</p>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                              {notification.amount && (
                                <p className="text-sm font-semibold text-green-600">
                                  ₦{notification.amount.toLocaleString()}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button variant="ghost" size="sm" className="hover-lift">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/profile">
                  <User className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/">
                  <LogOut className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
            Welcome back, {merchantData.businessName}!
          </h1>
          <p className="text-xl text-muted-foreground">Manage your products, track sales, and grow your business</p>
        </div>

        {unreadNotifications > 0 && (
          <Alert className="mb-6 border-blue-500/20 bg-blue-500/5">
            <Bell className="h-4 w-4" />
            <AlertDescription>
              You have {unreadNotifications} new notification{unreadNotifications > 1 ? "s" : ""}.
              <Button variant="link" className="p-0 h-auto ml-1" onClick={() => setShowNotifications(true)}>
                View all
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-muted/30 p-1 rounded-xl w-fit">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "products", label: "Products", icon: Package },
            { id: "orders", label: "Orders", icon: ShoppingCart },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 ${activeTab === tab.id ? "payveri-gradient text-white" : ""}`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="premium-card hover-lift animate-scale-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Sales</p>
                      <p className="text-2xl font-bold">₦{merchantData.totalSales.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card hover-lift animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{merchantData.totalOrders}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card hover-lift animate-scale-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Customers</p>
                      <p className="text-2xl font-bold">{merchantData.totalCustomers}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card hover-lift animate-scale-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold">{merchantData.conversionRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="premium-card animate-slide-up-fade">
              <CardHeader>
                <CardTitle className="text-2xl">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {merchantData.recentOrders.slice(0, 5).map((order, index) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/50 transition-all duration-300 hover-lift animate-grid-fade-in"
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.customer} • {order.product}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₦{order.amount.toLocaleString()}</p>
                        <Badge className={getOrderStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Add Product Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Products ({products.length})</h2>
              <Button onClick={() => setShowAddProduct(true)} className="payveri-gradient text-white hover-lift">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Add Product Form */}
            {showAddProduct && (
              <Card className="premium-card animate-scale-fade-in">
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name *</Label>
                      <Input
                        id="productName"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Enter product name"
                        className="glass-morphism"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                        <SelectTrigger className="glass-morphism">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Fashion">Fashion</SelectItem>
                          <SelectItem value="Books">Books</SelectItem>
                          <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Beauty">Beauty</SelectItem>
                          <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                          <SelectItem value="Automotive">Automotive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Selling Price (₦) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="0"
                        className="glass-morphism"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Original Price (₦)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        value={newProduct.originalPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                        placeholder="0"
                        className="glass-morphism"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        placeholder="0"
                        className="glass-morphism"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Describe your product features, specifications, and benefits"
                      rows={3}
                      className="glass-morphism"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Product Image</Label>
                    <div className="flex gap-4">
                      <Input
                        id="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        placeholder="https://example.com/image.jpg or upload file"
                        className="glass-morphism flex-1"
                      />
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Button type="button" variant="outline" className="bg-transparent">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>
                    {newProduct.image && (
                      <div className="mt-2">
                        <img
                          src={newProduct.image || "/placeholder.svg"}
                          alt="Product preview"
                          className="w-20 h-20 rounded-lg object-cover border border-border/50"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleAddProduct} className="payveri-gradient text-white">
                      Add Product
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddProduct(false)} className="bg-transparent">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="premium-card hover-lift animate-grid-fade-in"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover border border-border/50"
                      />
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="hover-lift">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover-lift text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-primary">₦{product.price.toLocaleString()}</p>
                          {product.discount > 0 && (
                            <p className="text-sm text-muted-foreground line-through">
                              ₦{product.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                        {product.discount > 0 && (
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                            {product.discount}% off
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                        </div>
                        <Badge className={getStatusColor(product.status)}>{product.status.replace("_", " ")}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Management ({merchantData.recentOrders.length})</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Export Orders
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Filter
                </Button>
              </div>
            </div>

            <Card className="premium-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {merchantData.recentOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/50 transition-all duration-300 hover-lift animate-grid-fade-in"
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.customer} • {order.product}
                          </p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-lg">₦{order.amount.toLocaleString()}</p>
                          <Badge className={getOrderStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Sales Analytics</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <span className="font-semibold">₦{merchantData.totalSales.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Month</span>
                      <span className="font-semibold">₦{(merchantData.totalSales * 0.8).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span>Growth</span>
                      <span className="font-semibold">+25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <span className="text-sm">{product.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{Math.floor(Math.random() * 50) + 10} sold</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
