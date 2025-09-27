"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bitcoin, ArrowLeft, Store, Building2, User, FileText, CheckCircle, ArrowRight, Upload } from "lucide-react"

export default function MerchantOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [referrer, setReferrer] = useState("home")
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const from = urlParams.get("from")
    if (from === "dashboard") {
      setReferrer("dashboard")
    } else {
      setReferrer("home")
    }
  }, [])

  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "",
    businessCategory: "",
    businessDescription: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",

    // Owner Information
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    ownerAddress: "",

    // Documents
    cacDocument: null,
    taxId: "",
    bankStatement: null,

    // Banking
    bankName: "",
    accountNumber: "",
    accountName: "",
  })

  const steps = [
    { id: 1, title: "Business Information", icon: Building2 },
    { id: 2, title: "Owner Details", icon: User },
    { id: 3, title: "Documents", icon: FileText },
    { id: 4, title: "Banking Details", icon: Store },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubmitting(false)
    setApplicationSubmitted(true)
  }

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Premium Navigation */}
        <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild className="hover-lift">
                  <Link href={referrer === "dashboard" ? "/dashboard" : "/"}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {referrer === "dashboard" ? "Back to Dashboard" : "Back to Home"}
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
          <Card className="premium-card animate-scale-fade-in text-center py-12">
            <CardContent>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-green-600 mb-4">Application Submitted Successfully!</h1>
              <p className="text-muted-foreground mb-6 text-lg">
                Thank you for applying to become a PayVeri merchant. We have received your application and will review
                it within 2-3 business days.
              </p>
              <div className="bg-muted/30 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-3">What happens next?</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Application received and under review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    <span>Document verification (1-2 business days)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    <span>Account setup and approval notification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    <span>Access to merchant dashboard</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                We'll send updates to <strong>{formData.ownerEmail}</strong>. Please check your email regularly.
              </p>
              <div className="flex gap-3 justify-center">
                <Button asChild className="btn-primary">
                  <Link href={referrer === "dashboard" ? "/dashboard" : "/"}>
                    {referrer === "dashboard" ? "Back to Dashboard" : "Back to Home"}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/merchants">Browse Merchants</Link>
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
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link href={referrer === "dashboard" ? "/dashboard" : "/"}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {referrer === "dashboard" ? "Back to Dashboard" : "Back to Home"}
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
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Become a PayVeri Merchant</h1>
          <p className="text-xl text-muted-foreground">Join thousands of businesses accepting Bitcoin payments</p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8 premium-card animate-scale-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                      currentStep >= step.id
                        ? "bg-primary border-primary text-white"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
                  </div>
                  <div className="ml-3">
                    <p className={`font-semibold ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"}`}>
                      Step {step.id}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.title}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="text-2xl">{steps.find((s) => s.id === currentStep)?.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Enter your business name"
                      className="glass-morphism"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                      <SelectTrigger className="glass-morphism">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="limited-company">Limited Company</SelectItem>
                        <SelectItem value="ngo">NGO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessCategory">Business Category *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, businessCategory: value })}>
                    <SelectTrigger className="glass-morphism">
                      <SelectValue placeholder="Select your business category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessDescription">Business Description</Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                    placeholder="Describe what your business does"
                    rows={3}
                    className="glass-morphism"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address *</Label>
                  <Textarea
                    id="businessAddress"
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    placeholder="Enter your complete business address"
                    rows={2}
                    className="glass-morphism"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Business Phone *</Label>
                    <Input
                      id="businessPhone"
                      value={formData.businessPhone}
                      onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                      placeholder="+234 xxx xxx xxxx"
                      className="glass-morphism"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Business Email *</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      placeholder="business@example.com"
                      className="glass-morphism"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Owner Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Full Name *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    placeholder="Enter business owner's full name"
                    className="glass-morphism"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerEmail">Email Address *</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                      placeholder="owner@example.com"
                      className="glass-morphism"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Phone Number *</Label>
                    <Input
                      id="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      placeholder="+234 xxx xxx xxxx"
                      className="glass-morphism"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerAddress">Residential Address *</Label>
                  <Textarea
                    id="ownerAddress"
                    value={formData.ownerAddress}
                    onChange={(e) => setFormData({ ...formData, ownerAddress: e.target.value })}
                    placeholder="Enter your complete residential address"
                    rows={2}
                    className="glass-morphism"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cacDocument">CAC Certificate *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">Upload your CAC certificate</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax Identification Number</Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    placeholder="Enter your TIN"
                    className="glass-morphism"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankStatement">Bank Statement (Last 3 months) *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">Upload your bank statement</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Banking Details */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, bankName: value })}>
                    <SelectTrigger className="glass-morphism">
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gtbank">GTBank</SelectItem>
                      <SelectItem value="access">Access Bank</SelectItem>
                      <SelectItem value="zenith">Zenith Bank</SelectItem>
                      <SelectItem value="uba">UBA</SelectItem>
                      <SelectItem value="firstbank">First Bank</SelectItem>
                      <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      placeholder="Enter 10-digit account number"
                      className="glass-morphism"
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name *</Label>
                    <Input
                      id="accountName"
                      value={formData.accountName}
                      onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                      placeholder="Account holder name"
                      className="glass-morphism"
                    />
                  </div>
                </div>

                {/* Benefits Summary */}
                <div className="bg-muted/30 rounded-xl p-6 border border-border/50 mt-6">
                  <h4 className="font-semibold text-lg mb-4">What you'll get as a PayVeri Merchant:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Instant Settlements</p>
                        <p className="text-sm text-muted-foreground">Get paid instantly in Naira</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Zero Chargebacks</p>
                        <p className="text-sm text-muted-foreground">Bitcoin payments are irreversible</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Low Transaction Fees</p>
                        <p className="text-sm text-muted-foreground">Competitive rates for merchants</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">24/7 Support</p>
                        <p className="text-sm text-muted-foreground">Dedicated merchant support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-border/50">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="hover-lift bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button onClick={handleNext} className="payveri-gradient text-white hover-lift">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="payveri-gradient text-white hover-lift"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting Application...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Submit Application
                    </div>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
