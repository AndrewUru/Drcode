"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import {
  ArrowDown,
  Sun,
  Moon,
  Github,
  Twitter,
  Linkedin,
  Bot,
  BarChart3,
  Mail,
  MessageSquare,
  LineChart,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

const RotatingBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-blue-500 opacity-10 blur-[100px]"></div>
    </div>
  )
}

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: { duration: 10 + Math.random() * 20, repeat: Number.POSITIVE_INFINITY },
          }}
        />
      ))}
    </div>
  )
}

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -100])

  return (
    <motion.section className="min-h-screen flex flex-col items-center justify-center text-center p-4" style={{ y }}>
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Supercharge Your Sales Funnel with Smart AI
      </motion.h1>
      <motion.p
        className="text-xl mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        AI-Powered Lead Management System that scores, nurtures, and converts leads for you—automatically.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link href={'/test'}>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            Get Started Free
          </Button>
        </Link>
        <Link href={'/test'}>
          <Button size="lg" variant="outline">
            Book a Demo
          </Button>
        </Link>
      </motion.div>
      <motion.div
        className="absolute bottom-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <ArrowDown className="h-8 w-8" />
      </motion.div>
    </motion.section>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300 dark:bg-blue-900 dark:group-hover:bg-blue-800">
          <Icon className="h-6 w-6 text-blue-500 dark:text-blue-300" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

const FeaturesSection = () => {
  const features = [
    {
      title: "AI Lead Scoring",
      description: "Automatically rate leads based on behavior, engagement, and potential to convert.",
      icon: Bot,
    },
    {
      title: "Smart Email Follow-ups",
      description: "AI-crafted personalized follow-ups that increase engagement and conversion rates.",
      icon: Mail,
    },
    {
      title: "Predictive Analytics",
      description: "Know which leads are most likely to convert with advanced AI prediction models.",
      icon: LineChart,
    },
    {
      title: "Chatbot Integration",
      description: "24/7 AI-based lead interaction that captures information and qualifies prospects.",
      icon: MessageSquare,
    },
    {
      title: "Insightful Dashboard",
      description: "Visualize lead health, team performance, and conversion metrics in real-time.",
      icon: BarChart3,
    },
    {
      title: "Automated Workflows",
      description: "Create custom lead nurturing sequences that run on autopilot.",
      icon: CheckCircle2,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-blue-50 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Powerful Features</h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
          Everything you need to capture, nurture, and convert more leads with less effort
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Capture Leads",
      description: "Collect leads from forms, chatbots, and CRM integrations automatically.",
      icon: CheckCircle2,
    },
    {
      title: "AI Scores & Segments",
      description: "Our AI analyzes and scores leads based on behavior and likelihood to convert.",
      icon: Bot,
    },
    {
      title: "Personalized Follow-ups",
      description: "Automated, personalized communication via email and chat.",
      icon: Mail,
    },
    {
      title: "Track Insights & Conversion",
      description: "Monitor performance and optimize your sales funnel with real-time analytics.",
      icon: LineChart,
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">How It Works</h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
          A simple 4-step process to transform your lead management
        </p>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 dark:bg-blue-800 hidden md:block -translate-x-1/2 z-0"></div>

          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:order-1" : "md:order-3"}`}>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                <div className="md:order-2 bg-blue-100 dark:bg-blue-800 rounded-full p-4 z-10">
                  <step.icon className="h-8 w-8 text-blue-500 dark:text-blue-300" />
                </div>

                <div className={`flex-1 ${index % 2 === 0 ? "md:order-3" : "md:order-1 md:text-right"}`}>
                  {/* Empty div for layout */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const DemoSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">See It In Action</h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
          Experience how our AI-powered system transforms your lead management
        </p>

        <Tabs defaultValue="dashboard" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Lead Dashboard</TabsTrigger>
            <TabsTrigger value="automation">Email Automation</TabsTrigger>
            <TabsTrigger value="scoring">Lead Scoring</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-lg shadow-xl"
            >
              <Image
                src="/s1.jpg?height=600&width=1000"
                alt="Lead Dashboard"
                className="w-full h-auto border border-border rounded-lg"
              />
            </motion.div>
          </TabsContent>
          <TabsContent value="automation">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-lg shadow-xl"
            >
              <Image
                src="/s2.jpg?height=600&width=1000"
                alt="Email Automation"
                className="w-full h-auto border border-border rounded-lg"
              />
            </motion.div>
          </TabsContent>
          <TabsContent value="scoring">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-lg shadow-xl"
            >
              <Image
                src="/s3.jpg?height=600&width=1000"
                alt="Lead Scoring"
                className="w-full h-auto border border-border rounded-lg"
              />
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-8">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            View Live Demo
          </Button>
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

const TestimonialCard = ({ name, role, company, content, avatar }: TestimonialCardProps) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>
              {role}, {company}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="italic">&ldquo;{content}&rdquo;</p>
      </CardContent>
    </Card>
  )
}

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Jane Doe",
      role: "Sales Manager",
      company: "SaaS Solutions Inc.",
      content: "Using LeadFlow AI helped us increase our lead conversion by 38% in just 2 months!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mark Johnson",
      role: "Marketing Director",
      company: "Tech Innovations",
      content: "The AI-powered lead scoring has completely transformed how we prioritize our sales efforts.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Sarah Williams",
      role: "Business Development",
      company: "Growth Partners",
      content: "The automated follow-ups feel so personal that our customers think they're talking to a real person.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">What Our Customers Say</h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
          Join hundreds of businesses already growing with our AI-powered solution
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to turn leads into revenue?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already growing with our AI-powered lead management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-blue-600">
              Try for Free
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Request a Demo
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Talk to Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started",
      price: "Free",
      features: [
        "Basic lead scoring",
        "Up to 100 leads/month",
        "Email templates",
        "Basic analytics",
        "Standard support",
      ],
    },
    {
      name: "Pro",
      description: "For growing teams with advanced needs",
      price: "$29",
      period: "per month",
      features: [
        "Advanced AI lead scoring",
        "Unlimited leads",
        "Email automation",
        "Custom workflows",
        "Advanced analytics",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex requirements",
      price: "Custom",
      features: [
        "Enterprise-grade AI scoring",
        "Unlimited everything",
        "Advanced automation",
        "CRM integration",
        "Custom reporting",
        "Dedicated account manager",
        "24/7 premium support",
      ],
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Simple, Transparent Pricing</h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
          Choose the plan that&apos;s right for your business
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full flex flex-col ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">Most Popular</div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-blue-50 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest updates, tips, and special offers.
          </p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Your email address" className="flex-grow" />
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">LeadFlow AI</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered lead management system that helps businesses convert more leads with less effort.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Demo
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">© 2024 LeadFlow AI. All rights reserved.</p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative">
      <RotatingBackground />
      <FloatingParticles />
      <ScrollProgress />

      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DemoSection />
        <TestimonialsSection />
        <CTASection />
        <PricingSection />
        <ContactSection />
      </main>

      <Footer />

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 rounded-full"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent side="left">Toggle {theme === "light" ? "Dark" : "Light"} Mode</HoverCardContent>
      </HoverCard>
    </div>
  )
}

