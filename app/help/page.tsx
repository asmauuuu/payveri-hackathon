"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Bitcoin,
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const faqs = [
    {
      id: 1,
      question: "How do I convert Bitcoin to Naira?",
      answer:
        "Go to the Convert page from your dashboard, enter the amount of Bitcoin you want to convert, and click 'Convert to Naira Instantly'. The conversion happens in real-time at current market rates.",
    },
    {
      id: 2,
      question: "How long do transfers take?",
      answer:
        "All transfers within Nigeria are processed instantly during banking hours (9 AM - 4 PM, Monday to Friday). Transfers initiated outside banking hours are processed the next business day.",
    },
    {
      id: 3,
      question: "What are the transaction fees?",
      answer:
        "PayVeri offers zero fees for Bitcoin to Naira conversions and bank transfers. We believe in transparent pricing with no hidden charges.",
    },
    {
      id: 4,
      question: "How secure is my Bitcoin wallet?",
      answer:
        "Your Bitcoin is stored in enterprise-grade cold storage with multi-signature security. We use bank-level encryption and security protocols to protect your funds.",
    },
    {
      id: 5,
      question: "Can I use PayVeri for business payments?",
      answer:
        "Yes! PayVeri offers merchant services for businesses. You can accept Bitcoin payments from customers and receive instant Naira settlements.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmitTicket = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 animate-slide-up-fade">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Help & Support</h1>
          <p className="text-xl text-muted-foreground">Get help with your PayVeri account and services</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="premium-card animate-scale-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+234 800 PAYVERI</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@payveri.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Support Hours</p>
                    <p className="text-sm text-muted-foreground">24/7 Available</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Ticket */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="text-xl">Submit a Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Brief description of your issue" className="glass-morphism" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue in detail..."
                    rows={4}
                    className="glass-morphism"
                  />
                </div>
                <Button
                  onClick={handleSubmitTicket}
                  disabled={isSubmitting}
                  className="w-full payveri-gradient text-white hover-lift"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Ticket"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass-morphism"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="border border-border/50 rounded-lg animate-grid-fade-in"
                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <h3 className="font-semibold text-lg">{faq.question}</h3>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-primary" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="premium-card animate-scale-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-2xl">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" asChild className="justify-start h-auto p-4 hover-lift bg-transparent">
                    <Link href="/convert">
                      <div className="text-left">
                        <p className="font-semibold">Convert Bitcoin</p>
                        <p className="text-sm text-muted-foreground">Convert BTC to Naira instantly</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start h-auto p-4 hover-lift bg-transparent">
                    <Link href="/transfer">
                      <div className="text-left">
                        <p className="font-semibold">Transfer Money</p>
                        <p className="text-sm text-muted-foreground">Send money to bank accounts</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start h-auto p-4 hover-lift bg-transparent">
                    <Link href="/merchants">
                      <div className="text-left">
                        <p className="font-semibold">Find Merchants</p>
                        <p className="text-sm text-muted-foreground">Discover PayVeri merchants</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start h-auto p-4 hover-lift bg-transparent">
                    <Link href="/profile">
                      <div className="text-left">
                        <p className="font-semibold">Account Settings</p>
                        <p className="text-sm text-muted-foreground">Manage your profile</p>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
