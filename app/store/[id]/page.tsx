"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ArrowLeft, Search, Star, MapPin, ShoppingCart, Plus, Heart, Filter, Package } from "lucide-react"

export default function StorePage() {
  const params = useParams()
  const storeId = params.id as string
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<any[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [showContactModal, setShowContactModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const storeData = {
    "1": {
      name: "TechHub Electronics",
      category: "Electronics",
      rating: 4.8,
      location: "Victoria Island, Lagos",
      description: "Premium electronics and gadgets with latest technology",
      image: `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center`,
      banner: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=256&fit=crop&crop=center`,
      phone: "+234 901 234 5678",
      email: "contact@techhub.ng",
      whatsapp: "+234 901 234 5678",
      products: [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          originalPrice: 1400000,
          price: 1250000,
          discount: "10% off",
          image: `https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=192&h=192&fit=crop&crop=center`,
          category: "Smartphones",
          rating: 4.9,
          inStock: true,
          hasDiscount: true,
          description: "Latest iPhone with titanium design and advanced camera system",
        },
        {
          id: 2,
          name: "MacBook Air M3",
          originalPrice: 2300000,
          price: 2300000,
          discount: null,
          image: `https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=192&h=192&fit=crop&crop=center`,
          category: "Laptops",
          rating: 4.8,
          inStock: true,
          hasDiscount: false,
          description: "Ultra-thin laptop with M3 chip for exceptional performance",
        },
        {
          id: 3,
          name: "Samsung Galaxy S24",
          originalPrice: 1100000,
          price: 950000,
          discount: "15% off",
          image: `https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=192&h=192&fit=crop&crop=center`,
          category: "Smartphones",
          rating: 4.7,
          inStock: true,
          hasDiscount: true,
          description: "Flagship Android phone with AI-powered features",
        },
        {
          id: 10,
          name: "iPad Pro 12.9",
          originalPrice: 1800000,
          price: 1650000,
          discount: "8% off",
          image: `https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=192&h=192&fit=crop&crop=center`,
          category: "Tablets",
          rating: 4.8,
          inStock: true,
          hasDiscount: true,
          description: "Professional tablet with M2 chip and Liquid Retina display",
        },
        {
          id: 11,
          name: "AirPods Pro",
          originalPrice: 350000,
          price: 350000,
          discount: null,
          image: `https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=192&h=192&fit=crop&crop=center`,
          category: "Audio",
          rating: 4.6,
          inStock: false,
          hasDiscount: false,
          description: "Premium wireless earbuds with active noise cancellation",
        },
      ],
      categories: ["All", "Smartphones", "Laptops", "Tablets", "Audio", "Accessories"],
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
      description: "Trendy fashion and accessories for the modern lifestyle",
      image: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop&crop=center`,
      banner: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=256&fit=crop&crop=center`,
      phone: "+234 902 345 6789",
      email: "hello@fashionforward.ng",
      whatsapp: "+234 902 345 6789",
      products: [
        {
          id: 4,
          name: "Designer Dress",
          originalPrice: 85000,
          price: 75000,
          discount: "12% off",
          image: `https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=192&h=192&fit=crop&crop=center`,
          category: "Dresses",
          rating: 4.8,
          inStock: true,
          hasDiscount: true,
          description: "Elegant designer dress perfect for special occasions",
        },
        {
          id: 5,
          name: "Luxury Handbag",
          originalPrice: 120000,
          price: 120000,
          discount: null,
          image: `https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=192&h=192&fit=crop&crop=center`,
          category: "Bags",
          rating: 4.9,
          inStock: true,
          hasDiscount: false,
          description: "Premium leather handbag with sophisticated design",
        },
        {
          id: 6,
          name: "Evening Gown",
          originalPrice: 150000,
          price: 135000,
          discount: "10% off",
          image: `https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=192&h=192&fit=crop&crop=center`,
          category: "Dresses",
          rating: 4.9,
          inStock: true,
          hasDiscount: true,
          description: "Stunning evening gown for formal events",
        },
        {
          id: 7,
          name: "Designer Heels",
          originalPrice: 65000,
          price: 58000,
          discount: "11% off",
          image: `https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=192&h=192&fit=crop&crop=center`,
          category: "Shoes",
          rating: 4.7,
          inStock: true,
          hasDiscount: true,
          description: "Elegant designer heels for sophisticated style",
        },
      ],
      categories: ["All", "Dresses", "Bags", "Shoes", "Accessories"],
      shippingOptions: [
        { id: 1, name: "Standard Delivery", price: 2000, duration: "2-4 business days" },
        { id: 2, name: "Express Delivery", price: 4000, duration: "1-2 business days" },
      ],
    },
  }

  const store = storeData[storeId as keyof typeof storeData] || storeData["1"]

  const filteredProducts = store.products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleContactMerchant = () => {
    setShowContactModal(true)
  }

  const handleLeaveReview = () => {
    setShowReviewModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="hover-lift">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/merchants">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Merchants
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 payveri-gradient rounded-lg flex items-center justify-center shadow-lg">
                  <Bitcoin className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold payveri-text-gradient">PayVeri</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button asChild variant="outline" size="sm" className="hover-lift bg-transparent">
                <Link href="/orders">
                  <Package className="h-4 w-4 mr-2" />
                  My Orders
                </Link>
              </Button>
              <Button onClick={handleContactMerchant} variant="outline" size="sm" className="hover-lift bg-transparent">
                Contact Merchant
              </Button>
              <Button onClick={handleLeaveReview} variant="outline" size="sm" className="hover-lift bg-transparent">
                Leave Review
              </Button>
              <Button asChild className="btn-primary relative">
                <Link href={`/cart?merchant=${storeId}`}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({cartItemsCount})
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Store Header */}
      <div className="relative h-64 bg-gradient-to-r from-primary/20 to-primary/10">
        <img src={store.banner || "/placeholder.svg"} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={store.image || "/placeholder.svg"}
              alt={store.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-white"
            />
            <div>
              <h1 className="text-3xl font-bold">{store.name}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {store.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{store.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{store.location}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-white/90 max-w-2xl">{store.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <Card className="mb-8 premium-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-lg py-3 glass-morphism"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                >
                  {store.categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {store.categories.map((category, index) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`animate-grid-fade-in ${selectedCategory === category ? "btn-primary" : ""}`}
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="premium-card hover-lift animate-grid-fade-in group overflow-hidden"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <CardHeader className="pb-2">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <Badge variant="secondary" className="bg-red-500 text-white">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                  {product.hasDiscount && product.inStock && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">{product.discount}</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{product.rating}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {product.hasDiscount ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground line-through">
                          ₦{product.originalPrice.toLocaleString()}
                        </span>
                        <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600">
                          {product.discount}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
                  )}
                </div>

                <Button onClick={() => addToCart(product)} disabled={!product.inStock} className="w-full btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <Card className="premium-card text-center py-12">
            <CardContent>
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>

      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 premium-card">
            <CardHeader>
              <CardTitle>Contact {store.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Phone:</span>
                  <span className="text-sm">{store.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm">{store.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">WhatsApp:</span>
                  <span className="text-sm">{store.whatsapp}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => window.open(`https://wa.me/${store.whatsapp?.replace(/[^0-9]/g, "")}`)}
                  className="flex-1 btn-primary"
                >
                  WhatsApp
                </Button>
                <Button onClick={() => window.open(`tel:${store.phone}`)} variant="outline" className="flex-1">
                  Call
                </Button>
              </div>
              <Button onClick={() => setShowContactModal(false)} variant="outline" className="w-full">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 premium-card">
            <CardHeader>
              <CardTitle>Leave a Review for {store.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-6 w-6 text-yellow-400 fill-current cursor-pointer hover:scale-110 transition-transform"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Review</label>
                <textarea
                  className="w-full p-3 border border-border rounded-lg bg-background"
                  rows={4}
                  placeholder="Share your experience with this merchant..."
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 btn-primary">Submit Review</Button>
                <Button onClick={() => setShowReviewModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
