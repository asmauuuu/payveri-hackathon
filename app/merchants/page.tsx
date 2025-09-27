"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, Store, ArrowLeft, Search, Star, MapPin, CheckCircle, Filter, User } from "@/components/icons"

export default function MerchantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [referrer, setReferrer] = useState("home")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const from = urlParams.get("from")
    if (from === "dashboard") {
      setReferrer("dashboard")
    } else {
      setReferrer("home")
    }
  }, [])

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Restaurant",
    "Books",
    "Fitness",
    "Groceries",
    "Beauty",
    "Home & Garden",
    "Sports",
    "Automotive",
    "Health",
  ]

  const merchants = [
    {
      id: 1,
      name: "TechHub Electronics",
      category: "Electronics",
      rating: 4.8,
      location: "Victoria Island, Lagos",
      description: "Premium electronics and gadgets",
      acceptsPayVeri: true,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=48&h=48&fit=crop&crop=center",
      discount: "5% off with PayVeri",
      products: [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          originalPrice: 1400000,
          price: 1250000,
          discount: "10% off",
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=192&h=192&fit=crop&crop=center",
          hasDiscount: true,
        },
        {
          id: 2,
          name: "MacBook Air M3",
          originalPrice: 2300000,
          price: 2300000,
          discount: null,
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=192&h=192&fit=crop&crop=center",
          hasDiscount: false,
        },
        {
          id: 3,
          name: "Samsung Galaxy S24",
          originalPrice: 1100000,
          price: 950000,
          discount: "15% off",
          image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=192&h=192&fit=crop&crop=center",
          hasDiscount: true,
        },
      ],
    },
    {
      id: 2,
      name: "Fashion Forward",
      category: "Fashion",
      rating: 4.9,
      location: "Lekki, Lagos",
      description: "Trendy fashion and accessories",
      acceptsPayVeri: true,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=48&h=48&fit=crop&crop=center",
      discount: "10% off first purchase",
      products: [
        {
          id: 4,
          name: "Designer Dress",
          originalPrice: 85000,
          price: 75000,
          discount: "12% off",
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=192&h=192&fit=crop&crop=center",
          hasDiscount: true,
        },
        {
          id: 5,
          name: "Luxury Handbag",
          originalPrice: 120000,
          price: 120000,
          discount: null,
          image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=192&h=192&fit=crop&crop=center",
          hasDiscount: false,
        },
      ],
    },
    {
      id: 3,
      name: "Gourmet Kitchen",
      category: "Restaurant",
      rating: 4.7,
      location: "Ikeja, Lagos",
      description: "Fine dining and continental cuisine",
      acceptsPayVeri: true,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=48&h=48&fit=crop&crop=center",
      discount: "Free delivery",
      products: [
        {
          id: 6,
          name: "Gourmet Meal Set",
          originalPrice: 15000,
          price: 12000,
          discount: "20% off",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=192&h=192&fit=crop&crop=center",
          hasDiscount: true,
        },
      ],
    },
    {
      id: 4,
      name: "BookWorm Paradise",
      category: "Books",
      rating: 4.6,
      location: "Abuja",
      description: "Books, stationery, and educational materials",
      acceptsPayVeri: true,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=48&h=48&fit=crop&crop=center",
      discount: "15% off textbooks",
      products: [
        {
          id: 7,
          name: "Programming Textbook",
          originalPrice: 25000,
          price: 25000,
          discount: null,
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=192&h=192&fit=crop&crop=center",
          hasDiscount: false,
        },
      ],
    },
    {
      id: 5,
      name: "FitLife Gym",
      category: "Fitness",
      rating: 4.8,
      location: "Surulere, Lagos",
      description: "Modern gym with professional trainers",
      acceptsPayVeri: true,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=48&h=48&fit=crop&crop=center",
      discount: "1 month free trial",
      products: [
        {
          id: 8,
          name: "Monthly Membership",
          originalPrice: 35000,
          price: 30000,
          discount: "15% off",
          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=192&h=192&fit=crop&crop=center",
          hasDiscount: true,
        },
      ],
    },
    {
      id: 6,
      name: "Green Grocers",
      category: "Groceries",
      rating: 4.5,
      location: "Ikoyi, Lagos",
      description: "Fresh produce and organic foods",
      acceptsPayVeri: true,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=48&h=48&fit=crop&crop=center",
      discount: "Free home delivery",
      products: [
        {
          id: 9,
          name: "Organic Vegetable Box",
          originalPrice: 18000,
          price: 15000,
          discount: "17% off",
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=192&h=192&fit=crop&crop=center",
          hasDiscount: true,
        },
      ],
    },
  ]

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch =
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.products.some((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || merchant.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // If user is searching for products, redirect to search page
    if (query.trim()) {
      const hasProductMatch = merchants.some((merchant) =>
        merchant.products.some((product) => product.name.toLowerCase().includes(query.toLowerCase())),
      )
      if (
        hasProductMatch &&
        !merchants.some(
          (merchant) =>
            merchant.name.toLowerCase().includes(query.toLowerCase()) ||
            merchant.category.toLowerCase().includes(query.toLowerCase()),
        )
      ) {
        window.location.href = `/search?q=${encodeURIComponent(query)}`
      }
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
                <Link href={referrer === "dashboard" ? "/dashboard" : "/"}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {referrer === "dashboard" ? "Back to Dashboard" : "Back to Home"}
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 payveri-gradient rounded-lg flex items-center justify-center shadow-lg">
                  <Bitcoin className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold payveri-text-gradient">PayVeri</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" className="hover-lift bg-transparent">
                <Link href={`/merchant-onboarding?from=${referrer}`}>
                  <Store className="h-4 w-4 mr-2" />
                  Become a Merchant
                </Link>
              </Button>
              <Button asChild variant="outline" className="hover-lift bg-transparent">
                <Link href="/login?merchant=true">
                  <User className="h-4 w-4 mr-2" />
                  Merchant Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">PayVeri Marketplace</h1>
          <p className="text-xl text-muted-foreground">Discover businesses and products that accept PayVeri payments</p>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-8 premium-card animate-scale-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search merchants, products, or categories..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 text-lg py-3 glass-morphism"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
                    }
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <Button asChild variant="outline" className="hover-lift bg-transparent">
                <Link href="/search">
                  <Search className="h-4 w-4 mr-2" />
                  Advanced Search
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.slice(0, 8).map((category, index) => (
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="premium-card hover-lift animate-grid-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Active Merchants</div>
            </CardContent>
          </Card>
          <Card className="premium-card hover-lift animate-grid-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-2">25K+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </CardContent>
          </Card>
          <Card className="premium-card hover-lift animate-grid-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-2">15K+</div>
              <div className="text-sm text-muted-foreground">Transactions</div>
            </CardContent>
          </Card>
          <Card className="premium-card hover-lift animate-grid-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Merchants Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMerchants.map((merchant, index) => (
            <Card
              key={merchant.id}
              className="premium-card hover-lift animate-grid-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={merchant.image || "/placeholder.svg"}
                      alt={merchant.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{merchant.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {merchant.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{merchant.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{merchant.description}</p>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{merchant.location}</span>
                </div>

                {merchant.discount && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-700 dark:text-green-300 text-sm font-medium">
                        {merchant.discount}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    <Store className="h-3 w-3 mr-1" />
                    PayVeri Accepted
                  </Badge>
                  <Button asChild size="sm" className="btn-primary">
                    <Link href={`/store/${merchant.id}`}>Visit Store</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredMerchants.length === 0 && (
          <Card className="premium-card text-center py-12">
            <CardContent>
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No merchants found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
