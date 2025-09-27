"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Bitcoin,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  CreditCard,
  Shield,
  CheckCircle,
  Plus,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    address: "123 Victoria Island, Lagos",
    accountNumber: "PV-2025-001234",
    bvn: "22234567890",
    bankAccounts: [
      { id: 1, bankName: "GTBank", accountNumber: "0123456789", accountName: "John Doe" },
      { id: 2, bankName: "Access Bank", accountNumber: "0987654321", accountName: "John Doe" },
    ],
  })

  const [showAddBank, setShowAddBank] = useState(false)
  const [newBankAccount, setNewBankAccount] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSaving(false)
    setIsEditing(false)
  }

  const handleAddBankAccount = () => {
    if (newBankAccount.bankName && newBankAccount.accountNumber && newBankAccount.accountName) {
      const newAccount = {
        id: Date.now(),
        ...newBankAccount,
      }
      setProfile({
        ...profile,
        bankAccounts: [...profile.bankAccounts, newAccount],
      })
      setNewBankAccount({ bankName: "", accountNumber: "", accountName: "" })
      setShowAddBank(false)
    }
  }

  const handleRemoveBankAccount = (id: number) => {
    setProfile({
      ...profile,
      bankAccounts: profile.bankAccounts.filter((account) => account.id !== id),
    })
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">My Profile</h1>
          <p className="text-xl text-muted-foreground">Manage your account information and settings</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="premium-card animate-scale-fade-in">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 payveri-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-muted-foreground mb-4">{profile.email}</p>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mb-4">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Account
                </Badge>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span className="font-mono">{profile.accountNumber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <User className="h-6 w-6 text-primary" />
                  Personal Information
                </CardTitle>
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="hover-lift">
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="glass-morphism"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="glass-morphism"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className="glass-morphism"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="glass-morphism"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditing}
                    className="glass-morphism"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Building2 className="h-6 w-6 text-primary" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">PayVeri Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={profile.accountNumber}
                    disabled
                    className="glass-morphism font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bvn">BVN</Label>
                  <Input
                    id="bvn"
                    value={profile.bvn}
                    onChange={(e) => setProfile({ ...profile, bvn: e.target.value })}
                    disabled={!isEditing}
                    className="glass-morphism font-mono"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold">Bank Accounts</Label>
                    <Button variant="outline" size="sm" onClick={() => setShowAddBank(true)} className="hover-lift">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Bank
                    </Button>
                  </div>

                  {profile.bankAccounts.map((account, index) => (
                    <div key={account.id} className="p-4 border border-border/50 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{account.bankName}</h4>
                        {profile.bankAccounts.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveBankAccount(account.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Account Number:</span>
                          <div className="font-mono">{account.accountNumber}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Account Name:</span>
                          <div>{account.accountName}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Bank Account Form */}
                  {showAddBank && (
                    <div className="p-4 border border-primary/20 rounded-xl space-y-4 bg-primary/5">
                      <h4 className="font-semibold">Add New Bank Account</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <Input
                          placeholder="Bank Name"
                          value={newBankAccount.bankName}
                          onChange={(e) => setNewBankAccount({ ...newBankAccount, bankName: e.target.value })}
                          className="glass-morphism"
                        />
                        <Input
                          placeholder="Account Number"
                          value={newBankAccount.accountNumber}
                          onChange={(e) => setNewBankAccount({ ...newBankAccount, accountNumber: e.target.value })}
                          className="glass-morphism"
                        />
                        <Input
                          placeholder="Account Name"
                          value={newBankAccount.accountName}
                          onChange={(e) => setNewBankAccount({ ...newBankAccount, accountName: e.target.value })}
                          className="glass-morphism"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddBankAccount} className="hover-lift">
                          Add Account
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddBank(false)} className="hover-lift">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Shield className="h-6 w-6 text-primary" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified of account activity</p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Enabled</Badge>
                </div>
              </CardContent>
            </Card>

            {isEditing && (
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full payveri-gradient text-white py-4 text-lg hover-lift shadow-xl"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving Changes...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Save Changes
                  </div>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
