"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, CheckCircle, Download, Share2, ArrowLeft, CreditCard, Calendar, Hash, Store } from "lucide-react"

export default function NairaPaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState<any>(null)

  useEffect(() => {
    const data = {
      amount: searchParams.get("amount"),
      merchant: searchParams.get("merchant"),
      transactionId: searchParams.get("transactionId"),
      date: searchParams.get("date"),
    }
    setPaymentData(data)
  }, [searchParams])

  const handleDownloadReceipt = () => {
    const receiptContent = `
PAYVERI NAIRA PAYMENT RECEIPT
=============================

Transaction ID: ${paymentData?.transactionId}
Date: ${new Date(paymentData?.date).toLocaleString()}
Amount: ₦${Number.parseFloat(paymentData?.amount).toLocaleString()}
Merchant: ${paymentData?.merchant}
Payment Method: Naira Balance
Status: Completed

Thank you for using PayVeri!
    `

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `PayVeri-Naira-Receipt-${paymentData?.transactionId}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Success Animation Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-primary/5"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        {/* Success Header */}
        <div className="text-center mb-8 animate-scale-fade-in">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce-subtle">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground">Your Naira payment has been processed successfully</p>
        </div>

        {/* Receipt Card */}
        <Card className="premium-card mb-6 animate-slide-up-fade" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="text-center border-b border-border/50">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 payveri-gradient rounded-xl flex items-center justify-center shadow-lg">
                <Bitcoin className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold payveri-text-gradient">PayVeri</span>
            </div>
            <CardTitle className="text-2xl">Payment Receipt</CardTitle>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mt-2">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* Transaction Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-primary" />
                  <span className="font-medium">Transaction ID</span>
                </div>
                <span className="font-mono text-sm">{paymentData.transactionId}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-medium">Date & Time</span>
                </div>
                <span>{new Date(paymentData.date).toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Amount Paid</span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  ₦{Number.parseFloat(paymentData.amount).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-primary" />
                  <span className="font-medium">Merchant</span>
                </div>
                <span>{paymentData.merchant}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <Button onClick={handleDownloadReceipt} variant="outline" className="hover-lift bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="hover-lift bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4 animate-slide-up-fade" style={{ animationDelay: "0.4s" }}>
          <Button
            asChild
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg hover-lift shadow-xl"
          >
            <Link href="/merchants">
              <Store className="h-5 w-5 mr-2" />
              Shop More Merchants
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full py-4 text-lg hover-lift bg-transparent">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
