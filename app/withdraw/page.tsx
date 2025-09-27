"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ArrowLeft, Send, AlertCircle, CheckCircle } from "lucide-react"

export default function WithdrawPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleWithdraw = () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      alert("Withdrawal request submitted successfully!")
    }, 2000)
  }

  const mockBankAccounts = [
    { id: "1", name: "GTBank - 0123456789", bank: "GTBank" },
    { id: "2", name: "Access Bank - 9876543210", bank: "Access Bank" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 payveri-gradient rounded-xl flex items-center justify-center shadow-lg animate-glow-pulse">
                <Bitcoin className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold payveri-text-gradient">PayVeri</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2">Withdraw to Bank</h1>
          <p className="text-xl text-muted-foreground">Transfer your Naira balance to your bank account</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Withdrawal Form */}
          <Card className="premium-card animate-scale-fade-in">
            <CardHeader>
              <CardTitle>Withdrawal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₦)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount to withdraw"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-muted-foreground">Available balance: ₦125,000</p>
              </div>

              <div className="space-y-2">
                <Label>Select Bank Account</Label>
                <Select onValueChange={setBankAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBankAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-700 dark:text-yellow-300 font-semibold mb-1">Withdrawal Info:</h4>
                    <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                      <li>• Minimum withdrawal: ₦1,000</li>
                      <li>• Processing time: 5-15 minutes</li>
                      <li>• Fee: ₦50 per transaction</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleWithdraw}
                disabled={!withdrawAmount || !bankAccount || isProcessing}
                className="w-full btn-primary"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Withdraw ₦{withdrawAmount || "0"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Recent Withdrawals */}
          <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Recent Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/10 text-green-600 border border-green-500/20">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">₦25,000</p>
                      <p className="text-sm text-muted-foreground">GTBank - Jan 14</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completed</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-600 border border-blue-500/20">
                      <Send className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">₦50,000</p>
                      <p className="text-sm text-muted-foreground">Access Bank - Jan 13</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completed</Badge>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  All withdrawals are processed instantly to your registered bank accounts
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
