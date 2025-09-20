import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { BarChart3, Lightbulb, Zap, Users, CheckCircle, Star, Moon, Sun } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function LandingPage({ onGetStarted, theme, onToggleTheme }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Skratch</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onToggleTheme}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button onClick={onGetStarted} className="bg-accent hover:bg-accent/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 sm:px-8 py-20 max-w-7xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
          🚀 Your AI Co-Founder is here
        </Badge>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Go from Idea to Pitch Deck in 5 Minutes
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Skratch is your dedicated co-founder, helping you build market analysis, 
          technical architecture, financial models, and more. Transform your startup idea 
          into a comprehensive business plan instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" onClick={onGetStarted} className="bg-accent hover:bg-accent/90 text-lg px-8">
            Get Started for Free
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            Watch Demo
          </Button>
        </div>
        
        {/* Hero Visual */}
        <div className="relative mx-auto max-w-4xl">
          <div className="bg-background rounded-2xl shadow-2xl border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground ml-4">skratch.com</span>
            </div>
            <div className="text-left">
              <div className="bg-secondary p-4 rounded-lg mb-4">
                <p className="text-muted-foreground mb-2">Describe your next big idea...</p>
                <p className="font-medium">An AI-powered fitness app that creates personalized workout plans...</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-3 border-accent/20">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-accent" />
                    <span className="text-sm">Market Analysis</span>
                  </div>
                </Card>
                <Card className="p-3 border-accent/20">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    <span className="text-sm">Architecture</span>
                  </div>
                </Card>
                <Card className="p-3 border-accent/20">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" />
                    <span className="text-sm">Pitch Deck</span>
                  </div>
                </Card>
                <Card className="p-3 border-accent/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm">Financial Model</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 sm:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Your Complete AI Co-Founder Toolkit</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every entrepreneur needs these essential business assets. Generate them all with AI in minutes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Market Analysis",
                description: "Deep dive into your market, competitors, and opportunities with comprehensive research and insights."
              },
              {
                icon: Lightbulb,
                title: "Technical Architecture",
                description: "Get detailed system diagrams, tech stack recommendations, and MVP feature roadmaps."
              },
              {
                icon: Users,
                title: "Pitch Deck Generator",
                description: "Professional presentation slides ready for investors, with customizable themes and content."
              },
              {
                icon: CheckCircle,
                title: "Financial Modeling",
                description: "Revenue projections, cost analysis, and funding requirements with downloadable spreadsheets."
              },
              {
                icon: Star,
                title: "Branding & Naming",
                description: "Creative brand names, logo concepts, and messaging frameworks for your startup."
              },
              {
                icon: Zap,
                title: "Growth Strategy",
                description: "Marketing channels, user acquisition tactics, and scaling strategies tailored to your business."
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-border/50">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 sm:px-8 py-20 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Start for free, upgrade when you're ready to scale</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                description: "Perfect for testing ideas",
                features: [
                  "3 AI-generated projects",
                  "Basic market analysis",
                  "Simple pitch deck",
                  "Community support"
                ],
                buttonText: "Get Started",
                popular: false
              },
              {
                name: "Pro",
                price: "$29",
                period: "per month",
                description: "For serious entrepreneurs",
                features: [
                  "Unlimited projects",
                  "Advanced financial modeling",
                  "Custom branding assets",
                  "Priority support",
                  "Export to all formats"
                ],
                buttonText: "Start Free Trial",
                popular: true
              },
              {
                name: "Teams",
                price: "$99",
                period: "per month",
                description: "For growing startups",
                features: [
                  "Everything in Pro",
                  "Team collaboration",
                  "White-label options",
                  "API access",
                  "Dedicated success manager"
                ],
                buttonText: "Contact Sales",
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`p-6 relative ${plan.popular ? 'border-accent shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={onGetStarted}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground px-6 sm:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold">Skratch</span>
              </div>
              <p className="text-primary-foreground/80">
                Your AI co-founder for turning ideas into successful startups.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 Skratch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}