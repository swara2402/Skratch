import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { LandingPage } from "./components/landing-page";
import { Dashboard } from "./components/dashboard";
import { ProjectHistory } from "./components/project-history";
import { Settings } from "./components/settings";
import { AuthModal } from "./components/auth-modal";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "dashboard" | "history" | "settings"
  >("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">(
    "signup"
  );
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("skratch-theme");
      if (saved) return saved as "light" | "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  const handleGetStarted = () => {
    setAuthModalMode("signup");
    setShowAuthModal(true);
  };

  const handleLogin = () => {
    setAuthModalMode("login");
    setShowAuthModal(true);
  };

  const handleAuthSuccess = async () => {
    console.log("Auth success: setting isAuthenticated true and navigating to dashboard");
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
    setShowAuthModal(false);
    console.log("Auth success: Current state after auth - isAuthenticated:", true, "currentPage:", "dashboard");
  };

  useEffect(() => {
    console.log("CurrentPage changed:", currentPage);
  }, [currentPage]);

  useEffect(() => {
    console.log("isAuthenticated changed:", isAuthenticated);
  }, [isAuthenticated]);

  const handleNavigate = (page: string) => {
    if (!isAuthenticated && page !== "landing") {
      setShowAuthModal(true);
      return;
    }
    setCurrentPage(page as any);
  };

  const handleOpenProject = (projectId: string) => {
    setCurrentPage("dashboard");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    console.log("Logout initiated from App");
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setCurrentPage("landing");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("skratch-theme", theme);
  }, [theme]);

  useEffect(() => {
    const checkAuthState = async () => {
      console.log("Checking initial auth state...");
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("Initial session check result:", !!session);
      if (session) {
        console.log("User is already authenticated, navigating to dashboard");
        setIsAuthenticated(true);
        setCurrentPage("dashboard");
      } else {
        console.log("No existing session found, staying on landing page");
        setIsAuthenticated(false);
        setCurrentPage("landing"); // Always start with landing page
      }
      setLoading(false);
    };

    checkAuthState();

    // ✅ Fixed subscription handling
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, "Session exists:", !!session);
        if (session) {
          setIsAuthenticated(true);
          setCurrentPage("dashboard");
          console.log("Auth state change: User logged in, navigating to dashboard");
        } else {
          setIsAuthenticated(false);
          setCurrentPage("landing");
          console.log("Auth state change: User logged out, navigating to landing");
        }
        setLoading(false);
      }
    );

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "landing":
        return (
          <LandingPage
            onGetStarted={handleGetStarted}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            onNavigate={handleNavigate}
            theme={theme}
            onToggleTheme={toggleTheme}
            onLogout={handleLogout}
          />
        );
      case "history":
        return (
          <ProjectHistory
            onNavigate={handleNavigate}
            onOpenProject={handleOpenProject}
          />
        );
      case "settings":
        return (
          <Settings
            onNavigate={handleNavigate}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );
      default:
        return (
          <LandingPage
            onGetStarted={handleGetStarted}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {renderCurrentPage()}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />
    </div>
  );
}
