import { useState } from "react";
import { supabase } from "../supabaseClient";
import { signInWithGoogle, signInWithGitHub } from "../utils/auth";
import { AuthError } from "../types/supabase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { X, Mail, Github, Zap, Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
  initialMode?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = "signup" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [oauthError, setOauthError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            }
          }
        });

        if (error) {
          alert(error.message);
          return;
        }

        if (data.user && !data.user.email_confirmed_at) {
          alert("Please check your email to confirm your account!");
          return;
        }

        // For signup, we don't call onAuthSuccess immediately
        // The auth state change listener will handle it
        console.log("Signup successful, waiting for email confirmation");
        alert("Account created successfully! Please check your email to confirm your account.");
        onClose();
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        // For login, call onAuthSuccess after successful signin
        console.log("Login successful, calling onAuthSuccess");
        onAuthSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("An error occurred during authentication");
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setOauthLoading(provider);
    setOauthError(null);

    try {
      console.log(`OAuth initiated for provider: ${provider}`);

      let result;
      if (provider === 'google') {
        result = await signInWithGoogle();
      } else {
        result = await signInWithGitHub();
      }

      if (result.success) {
        console.log(`OAuth success for ${provider}, waiting for redirect`);
        // The OAuth flow will redirect, so we don't need to call onAuthSuccess here
        // The auth state change listener in App.tsx will handle the success
      } else {
        console.error(`OAuth error for ${provider}:`, result.error);
        setOauthError(result.error?.message || 'An error occurred during sign-in');
      }
    } catch (error) {
      console.error(`Unexpected error during ${provider} OAuth:`, error);
      setOauthError('An unexpected error occurred during sign-in');
    } finally {
      setOauthLoading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold">Skratch</span>
          </div>
          
          <CardTitle className="text-2xl">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </CardTitle>
          <p className="text-muted-foreground">
            {mode === "login" 
              ? "Sign in to your account to continue" 
              : "Start building your next big idea today"
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Social Login */}
          <div className="space-y-3">
            {oauthError && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {oauthError}
              </div>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialAuth("google")}
              disabled={oauthLoading !== null}
            >
              {oauthLoading === 'google' ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Mail className="h-4 w-4 mr-2" />
              )}
              {oauthLoading === 'google' ? 'Connecting to Google...' : 'Continue with Google'}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialAuth("github")}
              disabled={oauthLoading !== null}
            >
              {oauthLoading === 'github' ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Github className="h-4 w-4 mr-2" />
              )}
              {oauthLoading === 'github' ? 'Connecting to GitHub...' : 'Continue with GitHub'}
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>
          
          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="enter@youremail.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
            )}
            
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>
          
          {mode === "login" && (
            <div className="text-center">
              <Button variant="link" className="text-sm text-accent">
                Forgot your password?
              </Button>
            </div>
          )}
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            </span>
            <Button
              variant="link"
              className="text-accent p-0 h-auto"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </Button>
          </div>
          
          {mode === "signup" && (
            <p className="text-xs text-muted-foreground text-center">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-accent hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-accent hover:underline">Privacy Policy</a>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}