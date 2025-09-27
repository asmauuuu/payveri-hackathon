"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, Camera, CheckCircle, ArrowLeft, ArrowRight, Bitcoin, Eye, EyeOff, Copy } from "lucide-react"

type SignupStep = "initial" | "personal" | "id-verification" | "selfie" | "additional" | "complete"

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
]

export function SignupForm() {
  const [currentStep, setCurrentStep] = useState<SignupStep>("initial")
  const [progress, setProgress] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [generatedWallet, setGeneratedWallet] = useState("")

  const [formData, setFormData] = useState({
    // Initial signup
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,

    // Personal information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    homeAddress: "",
    city: "",
    state: "",

    // ID verification
    idType: "",
    idNumber: "",
    idFrontImage: null as File | null,
    idBackImage: null as File | null,

    // Selfie verification
    selfieImage: null as File | null,

    // Additional information
    occupation: "",
    sourceOfIncome: "",
    bvn: "",
  })

  const generateWalletAddress = () => {
    const prefix = "bc1q"
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    let address = prefix
    for (let i = 0; i < 39; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return address
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === "initial") {
      setCurrentStep("personal")
      setProgress(25)
    } else if (currentStep === "personal") {
      setCurrentStep("id-verification")
      setProgress(50)
    } else if (currentStep === "id-verification") {
      setCurrentStep("selfie")
      setProgress(75)
    } else if (currentStep === "selfie") {
      setCurrentStep("additional")
      setProgress(90)
    } else if (currentStep === "additional") {
      const walletAddress = generateWalletAddress()
      setGeneratedWallet(walletAddress)
      setCurrentStep("complete")
      setProgress(100)
    }
  }

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const goBack = () => {
    if (currentStep === "personal") {
      setCurrentStep("initial")
      setProgress(0)
    } else if (currentStep === "id-verification") {
      setCurrentStep("personal")
      setProgress(25)
    } else if (currentStep === "selfie") {
      setCurrentStep("id-verification")
      setProgress(50)
    } else if (currentStep === "additional") {
      setCurrentStep("selfie")
      setProgress(75)
    }
  }

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(generatedWallet)
  }

  if (currentStep === "complete") {
    return (
      <div className="w-full max-w-md space-y-8 animate-scale-fade-in">
        <Card className="premium-card">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to PayVeri!</h2>
              <p className="text-muted-foreground">Your account has been created successfully</p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h3 className="text-primary font-semibold mb-2">🎉 Your Bitcoin Wallet is Ready!</h3>
              <p className="text-sm text-muted-foreground mb-3">Your unique wallet address:</p>
              <div className="bg-background border rounded-lg p-3 flex items-center justify-between">
                <code className="text-sm text-foreground font-mono break-all">{generatedWallet}</code>
                <Button size="sm" variant="ghost" onClick={copyWalletAddress} className="ml-2 flex-shrink-0">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Save this address securely. You'll use it to receive Bitcoin deposits.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
              <p className="text-green-700 dark:text-green-300 text-sm">
                <strong>Almost Done!</strong>
                <br />
                After submitting, our team will review your documents within 2-4 hours. You'll receive an email
                notification once approved.
              </p>
            </div>

            <div className="space-y-3 text-left mb-6">
              <h3 className="text-foreground font-semibold">Next Steps:</h3>
              <ul className="text-muted-foreground text-sm space-y-2">
                <li>• Complete KYC verification (ID, selfie)</li>
                <li>• Add your bank account for payments</li>
                <li>• Start converting within 24 hours</li>
              </ul>
            </div>

            <Button className="w-full btn-primary" onClick={() => (window.location.href = "/dashboard")}>
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-6 animate-scale-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 glass-morphism rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
            <Bitcoin className="text-primary h-6 w-6" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-2">
          {currentStep === "initial" ? "Join PayVeri" : "KYC Verification"}
        </h2>
        <p className="text-muted-foreground">
          {currentStep === "initial" && "Create your Bitcoin-to-Naira account"}
          {currentStep === "personal" && "Step 1 of 4: Personal Information"}
          {currentStep === "id-verification" && "Step 2 of 4: ID Verification"}
          {currentStep === "selfie" && "Step 3 of 4: Selfie Verification"}
          {currentStep === "additional" && "Step 4 of 4: Additional Information"}
        </p>
      </div>

      {/* Progress bar for KYC steps */}
      {currentStep !== "initial" && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} className="bg-muted" />
        </div>
      )}

      <Card className="premium-card">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Initial Signup Step */}
            {currentStep === "initial" && (
              <div className="space-y-4 animate-grid-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="glass-morphism text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="glass-morphism text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="glass-morphism text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="glass-morphism text-foreground placeholder:text-muted-foreground pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="glass-morphism text-foreground placeholder:text-muted-foreground pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">Next Steps After Signup:</h4>
                  <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                    <li>• Complete KYC verification (ID, selfie)</li>
                    <li>• Add your bank account for payments</li>
                    <li>• Start converting within 24 hours</li>
                  </ul>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/terms" className="text-foreground hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-foreground hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
            )}

            {/* Personal Information Step */}
            {currentStep === "personal" && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="text-center mb-4">
                  <h3 className="text-foreground font-semibold">Personal Information</h3>
                  <p className="text-muted-foreground text-sm">Please provide your basic personal information</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-black font-medium">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="glass-morphism text-black placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-black font-medium">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="glass-morphism text-black placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-black font-medium">
                    Date of Birth *
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="glass-morphism text-black"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="homeAddress" className="text-black font-medium">
                    Home Address *
                  </Label>
                  <Input
                    id="homeAddress"
                    placeholder="Enter your full address"
                    value={formData.homeAddress}
                    onChange={(e) => handleInputChange("homeAddress", e.target.value)}
                    className="glass-morphism text-black placeholder:text-gray-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-black font-medium">
                      City *
                    </Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="glass-morphism text-black placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-black font-medium">
                      State *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className="glass-morphism text-black">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((state) => (
                          <SelectItem key={state.toLowerCase()} value={state.toLowerCase()}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* ID Verification Step */}
            {currentStep === "id-verification" && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="text-center mb-4">
                  <h3 className="text-foreground font-semibold">ID Verification</h3>
                  <p className="text-muted-foreground text-sm">Upload clear photos of your government-issued ID</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-black font-medium">ID Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("idType", value)}>
                    <SelectTrigger className="glass-morphism text-black">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nin">National ID (NIN)</SelectItem>
                      <SelectItem value="bvn">Bank Verification Number (BVN)</SelectItem>
                      <SelectItem value="passport">International Passport</SelectItem>
                      <SelectItem value="drivers">Driver's License</SelectItem>
                      <SelectItem value="voters">Voter's Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="text-black font-medium">
                    ID Number *
                  </Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter ID number"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    className="glass-morphism text-black placeholder:text-gray-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">ID Front Image *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center glass-morphism">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">Upload front</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("idFrontImage", e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground mt-2 pointer-events-none"
                      >
                        Choose File
                      </Button>
                      {formData.idFrontImage && (
                        <p className="text-xs text-green-600 mt-1">✓ {formData.idFrontImage.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">ID Back Image *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center glass-morphism">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">Upload back</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("idBackImage", e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground mt-2 pointer-events-none"
                      >
                        Choose File
                      </Button>
                      {formData.idBackImage && (
                        <p className="text-xs text-green-600 mt-1">✓ {formData.idBackImage.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                  <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">📋 Photo Requirements:</h4>
                  <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                    <li>• Clear, well-lit photos</li>
                    <li>• All text must be readable</li>
                    <li>• No glare or shadows</li>
                    <li>• File size under 5MB</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Selfie Verification Step */}
            {currentStep === "selfie" && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="text-center mb-4">
                  <h3 className="text-foreground font-semibold">Selfie Verification</h3>
                  <p className="text-muted-foreground text-sm">Take a selfie with your ID document next to your face</p>
                </div>

                <div className="text-center">
                  <h4 className="text-black font-semibold mb-4">Take a Selfie</h4>
                  <p className="text-gray-600 text-sm mb-6">
                    Take a clear selfie holding your ID document next to your face
                  </p>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center glass-morphism mb-6 relative">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm mb-4">Upload Selfie</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("selfieImage", e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="border-border text-foreground hover:bg-muted pointer-events-none bg-transparent"
                    >
                      Choose File
                    </Button>
                    {formData.selfieImage && (
                      <p className="text-xs text-green-600 mt-2">✓ {formData.selfieImage.name}</p>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4">
                  <h4 className="text-yellow-700 dark:text-yellow-300 font-semibold mb-2">📸 Selfie Guidelines:</h4>
                  <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                    <li>• Hold your ID document next to your face</li>
                    <li>• Ensure both your face and ID are clearly visible</li>
                    <li>• Good lighting, no shadows</li>
                    <li>• Look directly at the camera</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Additional Information Step */}
            {currentStep === "additional" && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="text-center mb-4">
                  <h3 className="text-foreground font-semibold">Additional Information</h3>
                  <p className="text-muted-foreground text-sm">Provide additional verification details</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-black font-medium">
                    Occupation *
                  </Label>
                  <Input
                    id="occupation"
                    placeholder="e.g., Software Engineer, Trader, Student"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    className="glass-morphism text-black placeholder:text-gray-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-black font-medium">Source of Income *</Label>
                  <Select onValueChange={(value) => handleInputChange("sourceOfIncome", value)}>
                    <SelectTrigger className="glass-morphism text-black">
                      <SelectValue placeholder="Select source of income" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employment">Employment</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bvn" className="text-black font-medium">
                    Bank Verification Number (BVN) *
                  </Label>
                  <Input
                    id="bvn"
                    placeholder="Enter your 11-digit BVN"
                    value={formData.bvn}
                    onChange={(e) => handleInputChange("bvn", e.target.value)}
                    className="glass-morphism text-black placeholder:text-gray-500"
                    maxLength={11}
                    required
                  />
                </div>

                <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <h4 className="text-green-700 dark:text-green-300 font-semibold">Almost Done!</h4>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    After submitting, our team will review your documents within 2-4 hours. You'll receive an email
                    notification once approved.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              {currentStep !== "initial" && (
                <Button
                  type="button"
                  onClick={goBack}
                  variant="outline"
                  className="flex-1 btn-secondary bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}

              <Button
                type="submit"
                className="flex-1 btn-primary"
                disabled={currentStep === "initial" && !formData.agreeToTerms}
              >
                {currentStep === "initial" && "Create Account & Complete KYC"}
                {currentStep === "personal" && "Next Step"}
                {currentStep === "id-verification" && "Next Step"}
                {currentStep === "selfie" && "Next Step"}
                {currentStep === "additional" && "Complete KYC"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Login link */}
      {currentStep === "initial" && (
        <div className="text-center animate-grid-fade-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground font-semibold hover:underline">
              Login Here
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
