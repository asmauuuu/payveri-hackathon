"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ArrowLeft, Search, Star, Grid, List, SlidersHorizontal } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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

  const priceRanges = [
    "All",
    "Under ₦50,000",
    "₦50,000 - ₦200,000",
    "₦200,000 - ₦500,000",
    "₦500,000 - ₦1,000,000",
    "Above ₦1,000,000",
  ]

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
  ]

  // Combined products from all merchants
  const allProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      originalPrice: 1400000,
      price: 1250000,
      discount: "10% off",
      image: "/iphone-15-pro-max.png",
      category: "Electronics",
      merchant: "TechHub Electronics",
      merchantId: 1,
      rating: 4.9,
      hasDiscount: true,
      description: "Latest iPhone with titanium design and advanced camera system",
    },
    {
      id: 2,
      name: "MacBook Air M3",
      originalPrice: 2300000,
      price: 2300000,
      discount: null,
      image: "/macbook-air-m3.png",
      category: "Electronics",
      merchant: "TechHub Electronics",
      merchantId: 1,
      rating: 4.8,
      hasDiscount: false,
      description: "Ultra-thin laptop with M3 chip for exceptional performance",
    },
    {
      id: 3,
      name: "Samsung Galaxy S24",
      originalPrice: 1100000,
      price: 950000,
      discount: "15% off",
      image: "/samsung-galaxy-s24.jpg",
      category: "Electronics",
      merchant: "TechHub Electronics",
      merchantId: 1,
      rating: 4.7,
      hasDiscount: true,
      description: "Flagship Android phone with AI-powered features",
    },
    {
      id: 4,
      name: "Designer Dress",
      originalPrice: 85000,
      price: 75000,
      discount: "12% off",
      image: "/elegant-designer-dress.jpg",
      category: "Fashion",
      merchant: "Fashion Forward",
      merchantId: 2,
      rating: 4.8,
      hasDiscount: true,
      description: "Elegant designer dress perfect for special occasions",
    },
    {
      id: 5,
      name: "Luxury Handbag",
      originalPrice: 120000,
      price: 120000,
      discount: null,
      image: "/luxury-leather-handbag.jpg",
      category: "Fashion",
      merchant: "Fashion Forward",
      merchantId: 2,
      rating: 4.9,
      hasDiscount: false,
      description: "Premium leather handbag with sophisticated design",
    },
    {
      id: 6,
      name: "Gourmet Meal Set",
      originalPrice: 15000,
      price: 12000,
      discount: "20% off",
      image: "/gourmet-meal-platter.jpg",
      category: "Restaurant",
      merchant: "Gourmet Kitchen",
      merchantId: 3,
      rating: 4.6,
      hasDiscount: true,
      description: "Delicious gourmet meal set for fine dining experience",
    },
    {
      id: 7,
      name: "Programming Textbook",
      originalPrice: 25000,
      price: 25000,
      discount: null,
      image: "/programming-textbook-cover.jpg",
      category: "Books",
      merchant: "BookWorm Paradise",
      merchantId: 4,
      rating: 4.5,
      hasDiscount: false,
      description: "Comprehensive programming guide for developers",
    },
    {
      id: 8,
      name: "Monthly Gym Membership",
      originalPrice: 35000,
      price: 30000,
      discount: "15% off",
      image: "/gym-membership-card.jpg",
      category: "Fitness",
      merchant: "FitLife Gym",
      merchantId: 5,
      rating: 4.8,
      hasDiscount: true,
      description: "Full access to modern gym facilities and equipment",
    },
    {
      id: 9,
      name: "Organic Vegetable Box",
      originalPrice: 18000,
      price: 15000,
      discount: "17% off",
      image: "/organic-vegetable-box.png",
      category: "Groceries",
      merchant: "Green Grocers",
      merchantId: 6,
      rating: 4.4,
      hasDiscount: true,
      description: "Fresh organic vegetables delivered to your door",
    },
  ]

  useEffect(() => {
    const query = searchParams.get("q")
    const category = searchParams.get("category")
    if (query) setSearchQuery(query)
    if (category) setSelectedCategory(category)
  }, [searchParams])

  const filterByPrice = (product: any) => {
    if (priceRange === "All") return true
    const price = product.price
    switch (priceRange) {
      case "Under ₦50,000":
        return price < 50000
      case "₦50,000 - ₦200,000":
        return price >= 50000 && price <= 200000
      case "₦200,000 - ₦500,000":
        return price >= 200000 && price <= 500000
      case "₦500,000 - ₦1,000,000":
        return price >= 500000 && price <= 1000000
      case "Above ₦1,000,000":
        return price > 1000000
      default:
        return true
    }
  }

  const sortProducts = (products: any[]) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price)
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating)
      case "newest":
        return [...products].sort((a, b) => b.id - a.id)
      default:
        return products
    }
  }

  const filteredProducts = sortProducts(
    allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesPrice = filterByPrice(product)
      return matchesSearch && matchesCategory && matchesPrice
    }),
  )

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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Browse All Products"}
          </h1>
          <p className="text-xl text-muted-foreground">{filteredProducts.length} products found across all merchants</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="premium-card animate-scale-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                    setPriceRange("All")
                    setSortBy("relevance")
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.slice(1, 6).map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort and View Controls */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Sort by:</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-1 rounded border border-border bg-background text-foreground"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                {filteredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className={`premium-card hover-lift animate-grid-fade-in group ${
                      viewMode === "list" ? "flex-row" : ""
                    }`}
                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                  >
                    {viewMode === "grid" ? (
                      <>
                        <CardHeader className="pb-2">
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {product.hasDiscount && (
                              <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                                {product.discount}
                              </Badge>
                            )}
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

                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">{product.merchant}</p>
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
                                <div className="text-xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
                              </>
                            ) : (
                              <div className="text-xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
                            )}
                          </div>

                          <Button asChild className="w-full btn-primary">
                            <Link href={`/store/${product.merchantId}`}>View in Store</Link>
                          </Button>
                        </CardContent>
                      </>
                    ) : (
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            {product.hasDiscount && (
                              <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs">
                                {product.discount}
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge variant="secondary" className="text-xs">
                                {product.category}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs">{product.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{product.merchant}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                {product.hasDiscount ? (
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-muted-foreground line-through">
                                        ₦{product.originalPrice.toLocaleString()}
                                      </span>
                                      <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600">
                                        {product.discount}
                                      </Badge>
                                    </div>
                                    <div className="text-xl font-bold text-primary">
                                      ₦{product.price.toLocaleString()}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-xl font-bold text-primary">
                                    ₦{product.price.toLocaleString()}
                                  </div>
                                )}
                              </div>
                              <Button asChild size="sm" className="btn-primary">
                                <Link href={`/store/${product.merchantId}`}>View in Store</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="premium-card text-center py-12">
                <CardContent>
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or filters to find what you're looking for
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("All")
                      setPriceRange("All")
                    }}
                    className="btn-primary"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
