"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, Send, ArrowLeft, CheckCircle, Clock, User, Building2 } from "lucide-react"

export default function TransferPage() {
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)

  const availableBalance = 125000

  const handleTransfer = async () => {
    setIsTransferring(true)
    // Simulate transfer
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsTransferring(false)

    const transferData = {
      amount: amount,
      recipient: recipient,
      bankName: bankName,
      accountNumber: accountNumber,
      transactionId: `TXN${Date.now()}`,
      date: new Date().toISOString(),
    }

    const params = new URLSearchParams(transferData)
    window.location.href = `/transfer-success?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
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

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Transfer Money</h1>
          <p className="text-xl text-muted-foreground">Send Naira to any Nigerian bank account instantly</p>
        </div>

        {/* Transfer Card */}
        <Card className="mb-6 premium-card animate-scale-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Send className="h-6 w-6 text-primary" />
              Bank Transfer
            </CardTitle>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                <CheckCircle className="h-3 w-3 mr-1" />
                Instant Transfer
              </Badge>
              <Badge variant="outline" className="border-primary/20">
                Available: ₦{availableBalance.toLocaleString()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recipient Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Recipient Details
              </h3>

              <div className="space-y-2 animate-grid-fade-in" style={{ animationDelay: "0.1s" }}>
                <Label htmlFor="recipient" className="text-base font-medium">
                  Recipient Name
                </Label>
                <Input
                  id="recipient"
                  type="text"
                  placeholder="Enter recipient's full name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="text-lg py-3 glass-morphism"
                />
              </div>

              <div className="space-y-2 animate-grid-fade-in" style={{ animationDelay: "0.2s" }}>
                <Label htmlFor="bank" className="text-base font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Bank Name
                </Label>
                <Select onValueChange={setBankName}>
                  <SelectTrigger className="text-lg py-3 glass-morphism">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gtbank">GTBank</SelectItem>
                    <SelectItem value="access">Access Bank</SelectItem>
                    <SelectItem value="zenith">Zenith Bank</SelectItem>
                    <SelectItem value="uba">UBA</SelectItem>
                    <SelectItem value="firstbank">First Bank</SelectItem>
                    <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                    <SelectItem value="union">Union Bank</SelectItem>
                    <SelectItem value="sterling">Sterling Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 animate-grid-fade-in" style={{ animationDelay: "0.3s" }}>
                <Label htmlFor="account" className="text-base font-medium">
                  Account Number
                </Label>
                <Input
                  id="account"
                  type="text"
                  placeholder="Enter 10-digit account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="text-lg py-3 glass-morphism"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2 animate-grid-fade-in" style={{ animationDelay: "0.4s" }}>
              <Label htmlFor="amount" className="text-lg font-medium">
                Amount to Send
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-2xl py-4 glass-morphism font-bold"
                max={availableBalance}
              />
              <p className="text-sm text-muted-foreground">Maximum: ₦{availableBalance.toLocaleString()} available</p>
            </div>

            {/* Transfer Details */}
            {amount && Number.parseFloat(amount) > 0 && (
              <div className="bg-muted/30 rounded-xl p-6 space-y-3 border border-border/50 animate-scale-fade-in">
                <h4 className="font-semibold text-lg mb-3">Transfer Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>Transfer Amount:</span>
                  <span className="font-medium">₦{Number.parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Transfer Fee:</span>
                  <span className="text-green-600 font-medium">Free ✨</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing Time:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Instant
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border/50 pt-3">
                  <span>Total Debit:</span>
                  <span className="text-primary">₦{Number.parseFloat(amount).toLocaleString()}</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleTransfer}
              disabled={
                !amount ||
                !recipient ||
                !bankName ||
                !accountNumber ||
                Number.parseFloat(amount) <= 0 ||
                Number.parseFloat(amount) > availableBalance ||
                accountNumber.length !== 10 ||
                isTransferring
              }
              className="w-full payveri-gradient text-white py-6 text-xl hover-lift shadow-xl"
            >
              {isTransferring ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Transfer...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-6 w-6" />
                  Send Money Instantly
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="premium-card animate-slide-up-fade" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="text-2xl">Security & Safety</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Bank-Grade Security</h4>
                  <p className="text-sm text-muted-foreground">
                    All transfers are encrypted and processed through secure banking channels
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Instant Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Transfers are processed instantly during banking hours
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Zero Hidden Fees</h4>
                  <p className="text-sm text-muted-foreground">What you see is what you pay - no surprise charges</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
