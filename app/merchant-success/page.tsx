"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, CheckCircle, Clock, Mail, Phone, ArrowRight } from "lucide-react"

export default function MerchantSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Premium Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 payveri-gradient rounded-lg flex items-center justify-center shadow-lg">
                <Bitcoin className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold payveri-text-gradient">PayVeri</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12 animate-slide-up-fade">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Application Submitted Successfully!</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thank you for applying to become a PayVeri merchant. We've received your application and will review it
            shortly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Application Status */}
          <Card className="premium-card animate-scale-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Clock className="h-6 w-6 text-primary" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Application ID:</span>
                <Badge variant="outline" className="font-mono">
                  MER-2025-001234
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Under Review</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Submitted:</span>
                <span className="text-muted-foreground">January 15, 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Expected Response:</span>
                <span className="text-muted-foreground">2-3 business days</span>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-2xl">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-semibold">Document Review</p>
                  <p className="text-sm text-muted-foreground">We'll verify your business documents and information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-semibold">Compliance Check</p>
                  <p className="text-sm text-muted-foreground">Background verification and compliance screening</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-semibold">Account Setup</p>
                  <p className="text-sm text-muted-foreground">Once approved, we'll set up your merchant account</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="text-2xl">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 border border-border/50 rounded-lg">
                <Mail className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">Email Support</p>
                  <p className="text-muted-foreground">merchants@payveri.com</p>
                  <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-border/50 rounded-lg">
                <Phone className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">Phone Support</p>
                  <p className="text-muted-foreground">+234 800 MERCHANT</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-slide-up-fade"
          style={{ animationDelay: "0.3s" }}
        >
          <Button asChild variant="outline" size="lg" className="hover-lift bg-transparent">
            <Link href="/merchants">Explore Merchants</Link>
          </Button>
          <Button asChild size="lg" className="payveri-gradient text-white hover-lift">
            <Link href="/merchant-dashboard">
              Go to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
