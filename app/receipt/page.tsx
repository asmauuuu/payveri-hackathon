"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, CheckCircle, Download, Mail, ArrowLeft, Calendar, Hash, Wallet } from "lucide-react"

export default function ReceiptPage() {
  const [merchantId, setMerchantId] = useState("")
  const [total, setTotal] = useState("")
  const [btcAmount, setBtcAmount] = useState("")
  const [email, setEmail] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [timestamp, setTimestamp] = useState("")

  // Mock merchant data
  const merchants = {
    "1": {
      name: "TechHub Electronics",
      category: "Electronics",
      image: "/electronics-store-interior.png",
    },
    "2": {
      name: "Fashion Forward",
      category: "Fashion",
      image: "/fashion-store-boutique.png",
    },
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setMerchantId(urlParams.get("merchant") || "1")
    setTotal(urlParams.get("total") || "0")
    setBtcAmount(urlParams.get("btc") || "0")
    setEmail(urlParams.get("email") || "")
    setWalletAddress(urlParams.get("wallet") || "")

    // Generate transaction ID and timestamp
    const generateTxId = () => {
      const chars = "0123456789abcdef"
      let txId = ""
      for (let i = 0; i < 64; i++) {
        txId += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return txId
    }
    setTransactionId(generateTxId())
    setTimestamp(new Date().toLocaleString())
  }, [])

  const merchant = merchants[merchantId as keyof typeof merchants] || merchants["1"]

  const downloadReceipt = () => {
    // Create receipt content
    const receiptContent = `
PAYVERI PAYMENT RECEIPT
========================

Merchant: ${merchant.name}
Category: ${merchant.category}
Date: ${timestamp}

PAYMENT DETAILS
---------------
Amount: ₦${Number(total).toLocaleString()}
Bitcoin Amount: ${btcAmount} BTC
Transaction ID: ${transactionId}
Wallet Address: ${walletAddress}

Customer Email: ${email}
Payment Method: Bitcoin (Guest Payment)
Status: CONFIRMED

Thank you for using PayVeri!
    `

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `payveri-receipt-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 payveri-gradient rounded-lg flex items-center justify-center shadow-lg">
                  <Bitcoin className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold payveri-text-gradient">PayVeri Gateway</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Success Header */}
        <div className="text-center mb-8 animate-scale-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground">Your Bitcoin payment has been confirmed</p>
        </div>

        {/* Receipt Card */}
        <Card className="mb-6 premium-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Payment Receipt</CardTitle>
            <p className="text-muted-foreground">Transaction completed successfully</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Merchant Info */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <img
                src={merchant.image || "/placeholder.svg"}
                alt={merchant.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">{merchant.name}</h3>
                <p className="text-muted-foreground">{merchant.category}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Transaction Date</div>
                  <div className="font-semibold">{timestamp}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <Hash className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Transaction ID</div>
                  <div className="font-mono text-sm break-all">{transactionId}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <Wallet className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Wallet Address</div>
                  <div className="font-mono text-sm break-all">{walletAddress}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Receipt Email</div>
                  <div className="font-semibold">{email}</div>
                </div>
              </div>
            </div>

            {/* Amount Summary */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-700">Amount Paid:</span>
                  <span className="font-bold text-green-700">₦{Number(total).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Bitcoin Amount:</span>
                  <span className="font-bold text-green-700">{btcAmount} BTC</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-green-800">Status:</span>
                  <span className="font-bold text-green-800">CONFIRMED</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <Button onClick={downloadReceipt} className="flex-1 payveri-gradient text-white hover-lift">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" asChild className="flex-1 bg-transparent">
            <Link href={`/merchants?merchant=${merchantId}`}>Continue Shopping</Link>
          </Button>
        </div>

        {/* Footer Info */}
        <Card className="premium-card">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>A copy of this receipt has been sent to {email}</p>
              <p>For support, contact PayVeri customer service</p>
              <p className="font-semibold">Thank you for using PayVeri!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
