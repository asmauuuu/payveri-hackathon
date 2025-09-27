"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ArrowLeft, Copy, QrCode, CheckCircle, Clock } from "lucide-react"

export default function DepositPage() {
  const [depositAmount, setDepositAmount] = useState("")
  const [showQR, setShowQR] = useState(false)

  // Mock wallet address (in real app, this would be generated per user)
  const walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
  }

  const handleGenerateQR = () => {
    setShowQR(true)
  }

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
          <h1 className="text-4xl font-bold text-foreground mb-2">Deposit Bitcoin</h1>
          <p className="text-xl text-muted-foreground">Send Bitcoin to your PayVeri wallet</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Deposit Instructions */}
          <Card className="premium-card animate-scale-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bitcoin className="h-6 w-6 text-primary" />
                Your Bitcoin Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Wallet Address</Label>
                <div className="flex items-center space-x-2">
                  <Input value={walletAddress} readOnly className="font-mono text-sm" />
                  <Button size="sm" variant="outline" onClick={copyAddress}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Button onClick={handleGenerateQR} className="w-full btn-secondary bg-transparent" variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  Show QR Code
                </Button>

                {showQR && (
                  <div className="text-center p-6 border border-border rounded-lg">
                    <div className="w-48 h-48 bg-muted mx-auto mb-4 rounded-lg flex items-center justify-center">
                      <QrCode className="h-24 w-24 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Scan this QR code with your Bitcoin wallet</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">📋 Deposit Instructions:</h4>
                <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                  <li>• Send Bitcoin to the address above</li>
                  <li>• Minimum deposit: 0.0001 BTC</li>
                  <li>• Confirmations required: 3</li>
                  <li>• Processing time: 30-60 minutes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Deposit Status */}
          <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Recent Deposits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/10 text-green-600 border border-green-500/20">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">0.001 BTC</p>
                      <p className="text-sm text-muted-foreground">Jan 15, 2025</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completed</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">0.0005 BTC</p>
                      <p className="text-sm text-muted-foreground">Jan 14, 2025</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  Your deposits will appear here automatically once detected on the blockchain
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
