import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Zap,
  Crown,
  Check,
  ExternalLink,
  Settings as SettingsIcon,
  Github,
  Slack,
  Trello,
  Palette,
  Moon,
  Sun,
  Monitor
} from "lucide-react";

interface SettingsProps {
  onNavigate: (page: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Settings({ onNavigate, theme, onToggleTheme }: SettingsProps) {
  const [profileData, setProfileData] = useState({
    firstName: "Alex",
    lastName: "Johnson", 
    email: "alex.johnson@example.com",
    company: "StartupCo"
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    weeklyDigest: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const currentPlan = "Free";
  const usageStats = {
    projectsGenerated: 3,
    projectsLimit: 3,
    apiCalls: 127,
    apiLimit: 1000
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "3 AI-generated projects",
        "Basic market analysis", 
        "Simple pitch deck",
        "Community support"
      ],
      current: true
    },
    {
      name: "Pro", 
      price: "$29",
      period: "per month",
      features: [
        "Unlimited projects",
        "Advanced financial modeling",
        "Custom branding assets", 
        "Priority support",
        "Export to all formats"
      ],
      current: false,
      popular: true
    },
    {
      name: "Teams",
      price: "$99", 
      period: "per month",
      features: [
        "Everything in Pro",
        "Team collaboration", 
        "White-label options",
        "API access",
        "Dedicated success manager"
      ],
      current: false
    }
  ];

  const integrations = [
    {
      name: "GitHub",
      description: "Sync technical architecture with your repositories",
      icon: Github,
      connected: false,
      comingSoon: false
    },
    {
      name: "Slack", 
      description: "Get notifications and updates in your workspace",
      icon: Slack,
      connected: true,
      comingSoon: false
    },
    {
      name: "Trello",
      description: "Export project tasks and roadmaps to boards", 
      icon: Trello,
      connected: false,
      comingSoon: true
    }
  ];

  const handleProfileUpdate = () => {
    alert("Profile updated successfully!");
  };

  const handlePlanUpgrade = (planName: string) => {
    if (planName === "Pro") {
      alert("Redirecting to Pro subscription...");
    } else if (planName === "Teams") {
      alert("Contacting sales team...");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              <h1 className="text-2xl font-bold">Settings</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                
                <Button onClick={handleProfileUpdate} className="bg-accent hover:bg-accent/90">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Choose your interface theme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        theme === "light" ? "border-accent bg-accent/5" : "border-border"
                      }`}
                      onClick={() => theme !== "light" && onToggleTheme()}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-white border rounded-lg flex items-center justify-center">
                          <Sun className="h-6 w-6 text-amber-500" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Light</div>
                          <div className="text-xs text-muted-foreground">Clean and bright</div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        theme === "dark" ? "border-accent bg-accent/5" : "border-border"
                      }`}
                      onClick={() => theme !== "dark" && onToggleTheme()}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-slate-900 border rounded-lg flex items-center justify-center">
                          <Moon className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Dark</div>
                          <div className="text-xs text-muted-foreground">Easy on the eyes</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-border rounded-lg p-4 opacity-50 cursor-not-allowed">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-white to-slate-900 border rounded-lg flex items-center justify-center">
                          <Monitor className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium">System</div>
                          <div className="text-xs text-muted-foreground">Coming soon</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Current Theme</h4>
                    <p className="text-sm text-muted-foreground">
                      You're currently using {theme === "dark" ? "dark" : "light"} mode
                    </p>
                  </div>
                  <Button variant="outline" onClick={onToggleTheme}>
                    {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    Switch to {theme === "dark" ? "Light" : "Dark"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">{currentPlan} Plan</h3>
                    <p className="text-muted-foreground">Perfect for testing ideas</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-2">Projects Generated</h4>
                    <div className="text-2xl font-bold text-accent">
                      {usageStats.projectsGenerated} / {usageStats.projectsLimit}
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div 
                        className="bg-accent h-2 rounded-full" 
                        style={{ width: `${(usageStats.projectsGenerated / usageStats.projectsLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">API Calls</h4>
                    <div className="text-2xl font-bold text-accent">
                      {usageStats.apiCalls} / {usageStats.apiLimit}
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div 
                        className="bg-accent h-2 rounded-full" 
                        style={{ width: `${(usageStats.apiCalls / usageStats.apiLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-accent shadow-lg scale-105' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.current && <Badge variant="secondary">Current</Badge>}
                    </div>
                    <div>
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {!plan.current && (
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90' : ''}`}
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handlePlanUpgrade(plan.name)}
                      >
                        {plan.name === "Pro" ? "Upgrade to Pro" : "Contact Sales"}
                        {plan.name === "Pro" && <Crown className="h-4 w-4 ml-2" />}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Product Updates</h4>
                    <p className="text-sm text-muted-foreground">Get notified about new features and improvements</p>
                  </div>
                  <Switch 
                    checked={notifications.emailUpdates}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailUpdates: checked }))}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Weekly Digest</h4>
                    <p className="text-sm text-muted-foreground">Receive a summary of your activity and insights</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyDigest: checked }))}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Emails</h4>
                    <p className="text-sm text-muted-foreground">Tips, tutorials, and promotional content</p>
                  </div>
                  <Switch 
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketingEmails: checked }))}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Security Alerts</h4>
                    <p className="text-sm text-muted-foreground">Important security and account notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, securityAlerts: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {integrations.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <integration.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {integration.connected && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Connected
                          </Badge>
                        )}
                        {integration.comingSoon && (
                          <Badge variant="secondary">
                            Coming Soon
                          </Badge>
                        )}
                        <Button 
                          variant={integration.connected ? "outline" : "default"}
                          size="sm"
                          disabled={integration.comingSoon}
                          className={!integration.connected && !integration.comingSoon ? "bg-accent hover:bg-accent/90" : ""}
                        >
                          {integration.connected ? "Disconnect" : integration.comingSoon ? "Soon" : "Connect"}
                          {!integration.connected && !integration.comingSoon && (
                            <ExternalLink className="h-4 w-4 ml-2" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}