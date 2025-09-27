"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, CheckCircle, Download, Share2, ArrowLeft, Send, Calendar, User, Building2, Hash } from "lucide-react"

export default function TransferSuccessPage() {
  const searchParams = useSearchParams()
  const [transferData, setTransferData] = useState<any>(null)

  useEffect(() => {
    const data = {
      amount: searchParams.get("amount"),
      recipient: searchParams.get("recipient"),
      bankName: searchParams.get("bankName"),
      accountNumber: searchParams.get("accountNumber"),
      transactionId: searchParams.get("transactionId"),
      date: searchParams.get("date"),
    }
    setTransferData(data)
  }, [searchParams])

  const handleDownloadReceipt = () => {
    // Create receipt content
    const receiptContent = `
PAYVERI TRANSFER RECEIPT
========================

Transaction ID: ${transferData?.transactionId}
Date: ${new Date(transferData?.date).toLocaleString()}
Amount: ₦${Number.parseFloat(transferData?.amount).toLocaleString()}
Recipient: ${transferData?.recipient}
Bank: ${transferData?.bankName}
Account: ${transferData?.accountNumber}
Status: Completed

Thank you for using PayVeri!
    `

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `PayVeri-Receipt-${transferData?.transactionId}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "PayVeri Transfer Receipt",
        text: `Transfer of ₦${Number.parseFloat(transferData?.amount).toLocaleString()} completed successfully. Transaction ID: ${transferData?.transactionId}`,
      })
    }
  }

  if (!transferData) {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Transfer Successful!</h1>
          <p className="text-xl text-muted-foreground">Your money has been sent successfully</p>
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
            <CardTitle className="text-2xl">Transfer Receipt</CardTitle>
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
                <span className="font-mono text-sm">{transferData.transactionId}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-medium">Date & Time</span>
                </div>
                <span>{new Date(transferData.date).toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5 text-primary" />
                  <span className="font-medium">Amount Sent</span>
                </div>
                <span className="text-2xl font-bold text-primary">
                  ₦{Number.parseFloat(transferData.amount).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <span className="font-medium">Recipient</span>
                </div>
                <span>{transferData.recipient}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">Bank Details</span>
                </div>
                <div className="text-right">
                  <div>{transferData.bankName}</div>
                  <div className="text-sm text-muted-foreground font-mono">{transferData.accountNumber}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <Button onClick={handleDownloadReceipt} variant="outline" className="hover-lift bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button onClick={handleShare} variant="outline" className="hover-lift bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4 animate-slide-up-fade" style={{ animationDelay: "0.4s" }}>
          <Button asChild className="w-full payveri-gradient text-white py-4 text-lg hover-lift shadow-xl">
            <Link href="/transfer">
              <Send className="h-5 w-5 mr-2" />
              Send Another Transfer
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
