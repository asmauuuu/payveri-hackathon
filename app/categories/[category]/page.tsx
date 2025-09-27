"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ArrowLeft, Search, Star, Grid, List } from "lucide-react"

export default function CategoryPage() {
  const params = useParams()
  const category = decodeURIComponent(params.category as string)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
  ]

  // Mock category data - in real app this would come from API
  const categoryData = {
    Electronics: {
      description: "Latest gadgets, smartphones, laptops, and electronic devices",
      products: [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          price: 1250000,
          originalPrice: 1400000,
          discount: "10% off",
          image: "/iphone-15-pro-max.png",
          merchant: "TechHub Electronics",
          merchantId: 1,
          rating: 4.9,
          hasDiscount: true,
        },
        {
          id: 2,
          name: "MacBook Air M3",
          price: 2300000,
          originalPrice: 2300000,
          discount: null,
          image: "/macbook-air-m3.png",
          merchant: "TechHub Electronics",
          merchantId: 1,
          rating: 4.8,
          hasDiscount: false,
        },
        {
          id: 3,
          name: "Samsung Galaxy S24",
          price: 950000,
          originalPrice: 1100000,
          discount: "15% off",
          image: "/samsung-galaxy-s24.jpg",
          merchant: "TechHub Electronics",
          merchantId: 1,
          rating: 4.7,
          hasDiscount: true,
        },
      ],
    },
    Fashion: {
      description: "Trendy clothing, accessories, and fashion items",
      products: [
        {
          id: 4,
          name: "Designer Dress",
          price: 75000,
          originalPrice: 85000,
          discount: "12% off",
          image: "/elegant-designer-dress.jpg",
          merchant: "Fashion Forward",
          merchantId: 2,
          rating: 4.8,
          hasDiscount: true,
        },
        {
          id: 5,
          name: "Luxury Handbag",
          price: 120000,
          originalPrice: 120000,
          discount: null,
          image: "/luxury-leather-handbag.jpg",
          merchant: "Fashion Forward",
          merchantId: 2,
          rating: 4.9,
          hasDiscount: false,
        },
      ],
    },
  }

  const currentCategory = categoryData[category as keyof typeof categoryData]

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="premium-card text-center p-8">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">The category "{category}" doesn't exist.</p>
            <Button asChild className="btn-primary">
              <Link href="/merchants">Browse All Merchants</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
    currentCategory.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.merchant.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
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
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">{category}</h1>
          <p className="text-xl text-muted-foreground">{currentCategory.description}</p>
          <p className="text-muted-foreground mt-2">{filteredProducts.length} products available</p>
        </div>

        {/* Search and Controls */}
        <Card className="mb-8 premium-card animate-scale-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={`Search ${category.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-lg py-3 glass-morphism"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded border border-border bg-background text-foreground"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div
            className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}
          >
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
                          <Badge className="absolute top-2 left-2 bg-green-500 text-white">{product.discount}</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.merchant}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{product.rating}</span>
                      </div>

                      <div className="space-y-1">
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
                          <p className="text-sm text-muted-foreground">{product.merchant}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{product.rating}</span>
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
                                <div className="text-xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
                              </div>
                            ) : (
                              <div className="text-xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
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
                Try adjusting your search terms to find what you're looking for
              </p>
              <Button onClick={() => setSearchQuery("")} className="btn-primary">
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
