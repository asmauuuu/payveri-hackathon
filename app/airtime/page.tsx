"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bitcoin, ArrowLeft, Smartphone, Zap, CheckCircle, AlertCircle, Share2, Download, Copy } from "lucide-react"

export default function AirtimePage() {
  const [selectedNetwork, setSelectedNetwork] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [transactionData, setTransactionData] = useState<any>(null)

  const networks = [
    {
      id: "mtn",
      name: "MTN",
      color: "bg-yellow-500",
      logo: `/placeholder.svg?height=40&width=40&query=MTN Nigeria yellow logo with black text circular design telecommunications`,
      prefixes: [
        "0803",
        "0806",
        "0813",
        "0816",
        "0903",
        "0906",
        "0913",
        "0916",
        "0703",
        "0706",
        "0810",
        "0814",
        "0903",
        "0906",
      ],
    },
    {
      id: "glo",
      name: "Glo",
      color: "bg-green-500",
      logo: `/placeholder.svg?height=40&width=40&query=Glo Nigeria green logo with white text circular design telecommunications`,
      prefixes: ["0805", "0807", "0811", "0815", "0905", "0915"],
    },
    {
      id: "airtel",
      name: "Airtel",
      color: "bg-red-500",
      logo: `/placeholder.svg?height=40&width=40&query=Airtel Nigeria red logo with white text circular design telecommunications`,
      prefixes: ["0802", "0808", "0812", "0901", "0902", "0904", "0907", "0912"],
    },
    {
      id: "9mobile",
      name: "9mobile",
      color: "bg-green-600",
      logo: `/placeholder.svg?height=40&width=40&query=9mobile Nigeria green logo with white text circular design telecommunications`,
      prefixes: ["0809", "0817", "0818", "0908", "0909"],
    },
  ]

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000]

  const detectNetwork = (phone: string) => {
    const prefix = phone.substring(0, 4)
    for (const network of networks) {
      if (network.prefixes.includes(prefix)) {
        setSelectedNetwork(network.id)
        return network
      }
    }
    return null
  }

  const handlePhoneChange = (value: string) => {
    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, "")

    // Limit to 11 digits
    if (cleanValue.length <= 11) {
      setPhoneNumber(cleanValue)

      // Auto-detect network if phone number is long enough
      if (cleanValue.length >= 4) {
        detectNetwork(cleanValue)
      }
    }
  }

  const handlePurchase = async () => {
    if (!selectedNetwork || !phoneNumber || !amount) {
      return
    }

    setIsProcessing(true)

    // Simulate Bitcoin payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate transaction data
    const transaction = {
      id: `TXN-${Date.now()}`,
      date: new Date().toISOString(),
      network: networks.find((n) => n.id === selectedNetwork)?.name,
      phone: phoneNumber,
      amount: Number.parseInt(amount),
      btcAmount: (Number.parseInt(amount) / 65000000).toFixed(8), // Simulated BTC rate
      btcRate: 65000000,
      fee: 0,
      status: "Completed",
    }

    setTransactionData(transaction)
    setIsProcessing(false)
    setShowSuccess(true)
  }

  const handleViewReceipt = () => {
    setShowSuccess(false)
    setShowReceipt(true)
  }

  const handleShareReceipt = () => {
    if (navigator.share) {
      navigator.share({
        title: "PayVeri Airtime Receipt",
        text: `Airtime purchase successful! ₦${transactionData?.amount.toLocaleString()} sent to ${transactionData?.phone}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `Airtime purchase successful! ₦${transactionData?.amount.toLocaleString()} sent to ${transactionData?.phone} via PayVeri`,
      )
      alert("Receipt details copied to clipboard!")
    }
  }

  const handleDownloadReceipt = () => {
    // Create a simple text receipt
    const receiptText = `
PayVeri Airtime Receipt
======================
Transaction ID: ${transactionData?.id}
Date: ${new Date(transactionData?.date).toLocaleString()}
Network: ${transactionData?.network}
Phone Number: ${transactionData?.phone}
Amount: ₦${transactionData?.amount.toLocaleString()}
Bitcoin Used: ${transactionData?.btcAmount} BTC
Exchange Rate: ₦${transactionData?.btcRate.toLocaleString()}/BTC
Fee: ₦${transactionData?.fee}
Status: ${transactionData?.status}

Thank you for using PayVeri!
    `

    const blob = new Blob([receiptText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `PayVeri-Receipt-${transactionData?.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const selectedNetworkData = networks.find((n) => n.id === selectedNetwork)
  const isFormValid = selectedNetwork && phoneNumber.length === 11 && amount && Number.parseInt(amount) >= 50

  if (showReceipt && transactionData) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setShowReceipt(false)} className="hover-lift">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Airtime
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 payveri-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Bitcoin className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xl font-bold payveri-text-gradient">PayVeri</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Receipt */}
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Card className="premium-card">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-600">Transaction Successful!</CardTitle>
              <p className="text-muted-foreground">Your airtime purchase has been completed</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Transaction Details */}
              <div className="bg-muted/20 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Transaction Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <p className="font-mono font-medium">{transactionData.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date & Time:</span>
                    <p className="font-medium">{new Date(transactionData.date).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Network:</span>
                    <p className="font-medium">{transactionData.network}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone Number:</span>
                    <p className="font-medium">{transactionData.phone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <p className="font-bold text-primary text-lg">₦{transactionData.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="font-medium text-green-600">{transactionData.status}</p>
                  </div>
                </div>
              </div>

              {/* Bitcoin Payment Details */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Bitcoin className="h-5 w-5 text-orange-600" />
                  Bitcoin Payment Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Bitcoin Used:</span>
                    <p className="font-mono font-medium">{transactionData.btcAmount} BTC</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Exchange Rate:</span>
                    <p className="font-medium">₦{transactionData.btcRate.toLocaleString()}/BTC</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transaction Fee:</span>
                    <p className="font-medium text-green-600">₦{transactionData.fee} (Free!)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payment Method:</span>
                    <p className="font-medium">PayVeri Wallet</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleShareReceipt} variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Receipt
                </Button>
                <Button onClick={handleDownloadReceipt} variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={() => navigator.clipboard.writeText(transactionData.id)}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy ID
                </Button>
              </div>

              <div className="text-center pt-4">
                <Button asChild className="btn-primary">
                  <Link href="/airtime">Buy More Airtime</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
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
        <div className="mb-8 animate-slide-up-fade text-center">
          <div className="w-20 h-20 payveri-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Smartphone className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Buy Airtime with Bitcoin</h1>
          <p className="text-xl text-muted-foreground">Top up your phone instantly using your PayVeri Bitcoin wallet</p>
        </div>

        {showSuccess ? (
          <Card className="premium-card animate-scale-fade-in text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Airtime Purchase Successful!</h3>
              <p className="text-muted-foreground mb-4">
                ₦{Number.parseInt(amount).toLocaleString()} airtime has been sent to {phoneNumber}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Paid with {transactionData?.btcAmount} BTC from your PayVeri wallet
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleViewReceipt} className="btn-primary">
                  View Receipt
                </Button>
                <Button
                  onClick={() => {
                    setShowSuccess(false)
                    setPhoneNumber("")
                    setAmount("")
                    setSelectedNetwork("")
                  }}
                  variant="outline"
                >
                  Buy More Airtime
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Network Selection */}
              <Card className="premium-card animate-scale-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Select Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {networks.map((network, index) => (
                      <button
                        key={network.id}
                        onClick={() => setSelectedNetwork(network.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 hover-lift animate-grid-fade-in ${
                          selectedNetwork === network.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        style={{ animationDelay: `${0.1 * index}s` }}
                      >
                        <img
                          src={network.logo || "/placeholder.svg"}
                          alt={network.name}
                          className="w-10 h-10 mx-auto mb-2"
                        />
                        <div className="text-sm font-medium">{network.name}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Phone Number */}
              <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle>Phone Number</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Enter phone number</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="08012345678"
                        value={phoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className="glass-morphism text-lg py-3"
                        maxLength={11}
                      />
                      {selectedNetworkData && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <img
                            src={selectedNetworkData.logo || "/placeholder.svg"}
                            alt={selectedNetworkData.name}
                            className="w-6 h-6"
                          />
                        </div>
                      )}
                    </div>
                    {phoneNumber.length > 0 && phoneNumber.length !== 11 && (
                      <p className="text-sm text-orange-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Phone number must be 11 digits
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Amount Selection */}
              <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <CardTitle>Select Amount</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {quickAmounts.map((quickAmount, index) => (
                      <Button
                        key={quickAmount}
                        variant={amount === quickAmount.toString() ? "default" : "outline"}
                        onClick={() => setAmount(quickAmount.toString())}
                        className={`animate-grid-fade-in ${amount === quickAmount.toString() ? "btn-primary" : ""}`}
                        style={{ animationDelay: `${0.05 * index}s` }}
                      >
                        ₦{quickAmount}
                      </Button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Or enter custom amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        ₦
                      </span>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="glass-morphism text-lg py-3 pl-8"
                        min="50"
                        max="50000"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Minimum: ₦50 • Maximum: ₦50,000</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              <Card className="premium-card animate-scale-fade-in sticky top-24" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle>Purchase Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network:</span>
                      <span className="font-medium">
                        {selectedNetworkData ? selectedNetworkData.name : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{phoneNumber || "Not entered"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">
                        {amount ? `₦${Number.parseInt(amount).toLocaleString()}` : "₦0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bitcoin Required:</span>
                      <span className="font-medium text-orange-600">
                        {amount ? `${(Number.parseInt(amount) / 65000000).toFixed(8)} BTC` : "0 BTC"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee:</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-primary">
                        {amount ? `₦${Number.parseInt(amount).toLocaleString()}` : "₦0"}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePurchase}
                    disabled={!isFormValid || isProcessing}
                    className="w-full payveri-gradient text-white hover-lift py-3 text-lg"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Bitcoin Payment...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Bitcoin className="h-5 w-5" />
                        Pay with Bitcoin
                      </div>
                    )}
                  </Button>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Bitcoin Payment</h4>
                    <p className="text-xs text-blue-800">
                      Payment will be deducted from your PayVeri Bitcoin wallet. Airtime delivered instantly.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Purchases */}
              <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Purchases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { network: "MTN", phone: "08012345678", amount: 1000, time: "2 hours ago", btc: "0.00001538" },
                      { network: "Glo", phone: "08087654321", amount: 500, time: "1 day ago", btc: "0.00000769" },
                      { network: "Airtel", phone: "08098765432", amount: 2000, time: "3 days ago", btc: "0.00003077" },
                    ].map((purchase, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{purchase.network}</div>
                          <div className="text-xs text-muted-foreground">{purchase.phone}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">₦{purchase.amount.toLocaleString()}</div>
                          <div className="text-xs text-orange-600">{purchase.btc} BTC</div>
                          <div className="text-xs text-muted-foreground">{purchase.time}</div>
                        </div>
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
