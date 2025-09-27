"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bitcoin,
  ArrowDownLeft,
  TrendingUp,
  Eye,
  EyeOff,
  Plus,
  Send,
  Download,
  Bell,
  User,
  LogOut,
  Store,
  HelpCircle,
} from "lucide-react"

export default function DashboardPage() {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [btcRate, setBtcRate] = useState(53000000)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Bitcoin conversion completed", time: "2 min ago", read: false },
    { id: 2, message: "Transfer to GTBank successful", time: "1 hour ago", read: false },
    { id: 3, message: "New merchant payment received", time: "3 hours ago", read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)

    const fetchBitcoinRate = () => {
      // Simulate real-time Bitcoin price in Naira (around $43,000 * 1,600 NGN/USD)
      const baseRate = 68800000 // Base rate in Naira
      const fluctuation = (Math.random() - 0.5) * 2000000 // ±1M Naira fluctuation
      setBtcRate(Math.round(baseRate + fluctuation))
    }

    fetchBitcoinRate()
    // Update rate every 30 seconds
    const interval = setInterval(fetchBitcoinRate, 30000)
    return () => clearInterval(interval)
  }, [])

  const mockData = {
    nairaBalance: 125000,
    bitcoinBalance: 0.00234,
    btcToNaira: btcRate,
    recentTransactions: [
      {
        id: 1,
        type: "deposit",
        amount: 0.001,
        naira: Math.round(btcRate * 0.001),
        status: "completed",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 2,
        type: "transfer",
        amount: -25000,
        status: "completed",
        date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
      },
      {
        id: 3,
        type: "convert",
        amount: 0.0005,
        naira: Math.round(btcRate * 0.0005),
        status: "pending",
        date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
      },
    ],
  }

  const handleDeposit = () => {
    // Generate a unique Bitcoin address for deposit
    const depositAddress = `bc1q${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    alert(
      `To deposit Bitcoin:\n\nSend Bitcoin to this address:\n${depositAddress}\n\nMinimum deposit: 0.0001 BTC\nConfirmations required: 3\n\nYour deposit will be credited within 30 minutes after confirmation.`,
    )
  }

  const handleWithdraw = () => {
    window.location.href = "/withdraw"
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-scale-fade-in">
          <div className="w-16 h-16 payveri-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
            <Bitcoin className="h-8 w-8 text-white" />
          </div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 payveri-gradient rounded-xl flex items-center justify-center shadow-lg animate-glow-pulse">
                <Bitcoin className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold payveri-text-gradient">PayVeri</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="sm" className="hover-lift relative" onClick={handleNotificationClick}>
                  <Bell className="h-4 w-4" />
                  {notifications.some((n) => !n.read) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </Button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-card border border-border/50 rounded-xl shadow-xl z-50 animate-scale-fade-in">
                    <div className="p-4 border-b border-border/50">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border/50 hover:bg-muted/50 ${!notification.read ? "bg-primary/5" : ""}`}
                        >
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Mark All as Read
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/help">
                  <HelpCircle className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/profile">
                  <User className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href="/">
                  <LogOut className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Welcome back!</h1>
          <p className="text-xl text-muted-foreground">Manage your Bitcoin and Naira seamlessly</p>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card
            className="payveri-gradient text-white hover-lift premium-card animate-scale-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white/90 text-xl">Naira Balance</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                {balanceVisible ? `₦${mockData.nairaBalance.toLocaleString()}` : "₦••••••"}
              </div>
              <p className="text-white/80">Available for spending</p>
            </CardContent>
          </Card>

          <Card
            className="border-2 border-primary/20 hover-lift premium-card animate-scale-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Bitcoin className="h-6 w-6 text-primary" />
                Bitcoin Balance
              </CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                ₦{mockData.btcToNaira.toLocaleString()}/BTC
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2 text-primary">
                {balanceVisible ? `${mockData.bitcoinBalance} BTC` : "••••••• BTC"}
              </div>
              <p className="text-muted-foreground">
                ≈ ₦{balanceVisible ? (mockData.bitcoinBalance * mockData.btcToNaira).toLocaleString() : "••••••"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Enhanced Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Button
            onClick={handleDeposit}
            className="h-24 flex-col space-y-2 payveri-gradient text-white hover-lift animate-grid-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Plus className="h-6 w-6" />
            <span className="font-medium">Deposit BTC</span>
          </Button>
          <Button
            asChild
            className="h-24 flex-col space-y-2 btn-secondary hover-lift animate-grid-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Link href="/convert">
              <TrendingUp className="h-6 w-6" />
              <span className="font-medium">Convert</span>
            </Link>
          </Button>
          <Button
            asChild
            className="h-24 flex-col space-y-2 btn-secondary hover-lift animate-grid-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/transfer">
              <Send className="h-6 w-6" />
              <span className="font-medium">Transfer</span>
            </Link>
          </Button>
          <Button
            asChild
            className="h-24 flex-col space-y-2 btn-secondary hover-lift animate-grid-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/airtime">
              <span className="text-2xl">📱</span>
              <span className="font-medium">Buy Airtime</span>
            </Link>
          </Button>
          <Button
            onClick={handleWithdraw}
            className="h-24 flex-col space-y-2 btn-secondary hover-lift animate-grid-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <Download className="h-6 w-6" />
            <span className="font-medium">Withdraw</span>
          </Button>
          <Button
            asChild
            className="h-24 flex-col space-y-2 btn-secondary hover-lift animate-grid-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Link href="/merchants?from=dashboard">
              <Store className="h-6 w-6" />
              <span className="font-medium">Merchants</span>
            </Link>
          </Button>
        </div>

        {/* Recent Transactions */}
        <Card className="premium-card animate-slide-up-fade" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="text-2xl">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentTransactions.map((tx, index) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/50 transition-all duration-300 hover-lift animate-grid-fade-in"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                        tx.type === "deposit"
                          ? "bg-green-500/10 text-green-600 border border-green-500/20"
                          : tx.type === "transfer"
                            ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                            : "bg-primary/10 text-primary border border-primary/20"
                      }`}
                    >
                      {tx.type === "deposit" ? (
                        <ArrowDownLeft className="h-6 w-6" />
                      ) : tx.type === "transfer" ? (
                        <Send className="h-6 w-6" />
                      ) : (
                        <TrendingUp className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold capitalize text-lg">{tx.type}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {tx.type === "transfer"
                        ? `₦${Math.abs(tx.amount).toLocaleString()}`
                        : tx.naira
                          ? `₦${tx.naira.toLocaleString()}`
                          : `${tx.amount} BTC`}
                    </p>
                    <Badge
                      variant={tx.status === "completed" ? "default" : "secondary"}
                      className={tx.status === "completed" ? "bg-green-500/10 text-green-600 border-green-500/20" : ""}
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
