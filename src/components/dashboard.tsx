import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { Project, ChatMessage } from "../types/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  BarChart3,
  Building,
  Presentation,
  DollarSign,
  Palette,
  TrendingUp,
  Scale,
  Plus,
  Settings,
  Zap,
  MessageCircle,
  Send,
  Crown,
  RefreshCw,
  Edit3,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onLogout: () => Promise<void>;
}

export function Dashboard({ onNavigate, theme, onToggleTheme, onLogout }: DashboardProps) {
  console.log("Dashboard component is rendering");

  const [ideaText, setIdeaText] = useState("");
  const [generatedCards, setGeneratedCards] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const aiAgents = [
    { id: "market", icon: BarChart3, title: "Market Analysis", description: "Competitive landscape & opportunities", isPro: false },
    { id: "architecture", icon: Building, title: "Architecture", description: "Technical blueprints & system design", isPro: false },
    { id: "pitch", icon: Presentation, title: "Pitch Deck", description: "Investor-ready presentation slides", isPro: false },
    { id: "financial", icon: DollarSign, title: "Financial Model", description: "Revenue projections & forecasts", isPro: true },
    { id: "branding", icon: Palette, title: "Branding & Naming", description: "Brand identity & messaging", isPro: true },
    { id: "growth", icon: TrendingUp, title: "Growth Strategy", description: "Marketing & user acquisition", isPro: false },
    { id: "legal", icon: Scale, title: "Legal Checklist", description: "Compliance & legal requirements", isPro: false },
  ];

  // ✅ Supabase AI integration (secure, server-side)
  const [isLoading, setIsLoading] = useState(false);

  // Add error handling for Supabase AI
  useEffect(() => {
    console.log('Supabase AI integration is ready');
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    } else {
      setProjects(data || []);
      if (data && data.length > 0 && !currentProjectId) {
        setCurrentProjectId(data[0].id);
        fetchChatMessages(data[0].id);
      }
    }
  };

  const fetchChatMessages = async (projectId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching chat messages:", error);
    } else {
      setChatMessages(data || []);
    }
  };

  const handleGenerateContent = async (agentId: string) => {
    if (!ideaText.trim()) {
      alert("Please describe your idea first!");
      return;
    }

    if (!generatedCards.includes(agentId)) {
      setGeneratedCards((prev) => [...prev, agentId]);
    }

    // Generate content for the selected agent
    await generateAgentContent(agentId);
  };

  const generateAgentContent = async (agentId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.error("No active session");
        return;
      }

      const agent = aiAgents.find(a => a.id === agentId);
      if (!agent) return;

      // Call the Supabase Edge Function to generate content
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: {
          message: `Generate a detailed ${agent.title.toLowerCase()} for: ${ideaText}`,
          conversationHistory: [],
          projectId: currentProjectId,
          agentType: agentId
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error("Error generating content:", error);
      } else {
        // Refresh chat messages to show the generated content
        if (currentProjectId) {
          fetchChatMessages(currentProjectId);
        }
      }
    } catch (error) {
      console.error("Error in generateAgentContent:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !currentProjectId) return;

    console.log("Sending message:", chatInput);
    console.log("Current project ID:", currentProjectId);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: chatInput,
      role: "user",
      project_id: currentProjectId,
      created_at: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get the current session for authentication
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.error("No active session");
        const fallbackMessage: ChatMessage = {
          id: crypto.randomUUID(),
          content: "Please log in to use the AI chat feature.",
          role: "assistant",
          project_id: currentProjectId,
          created_at: new Date().toISOString(),
        };
        setChatMessages((prev) => [...prev, fallbackMessage]);
        setIsLoading(false);
        return;
      }

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: {
          message: chatInput,
          conversationHistory: chatMessages,
          projectId: currentProjectId
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error("Supabase Edge Function error:", error);
        const fallbackMessage: ChatMessage = {
          id: crypto.randomUUID(),
          content: "Sorry, I couldn't generate a response due to a server error.",
          role: "assistant",
          project_id: currentProjectId,
          created_at: new Date().toISOString(),
        };
        setChatMessages((prev) => [...prev, fallbackMessage]);
      } else {
        // The Edge Function already saved the messages to the database
        // We just need to refresh the chat messages to show the AI response
        fetchChatMessages(currentProjectId);
      }
    } catch (error) {
      console.error("Error calling Supabase Edge Function:", error);
      const fallbackMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: "Sorry, I couldn't generate a response due to an error.",
        role: "assistant",
        project_id: currentProjectId,
        created_at: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, fallbackMessage]);
    }

    setIsLoading(false);
    setChatInput("");
  };



  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Skratch</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          <Button className="w-full bg-accent hover:bg-accent/90 mb-4">
            <Plus className="h-4 w-4 mr-2" />
            New Idea
          </Button>
        </div>

        <div className="flex-1 p-6">
          <h3 className="font-semibold mb-4 text-sidebar-foreground">My Ideas</h3>
          <div className="space-y-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                onClick={() => {
                  setCurrentProjectId(project.id);
                  fetchChatMessages(project.id);
                }}
                className="p-3 cursor-pointer hover:bg-sidebar-accent transition-colors"
              >
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{project.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{project.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-sidebar-border space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            className="w-full justify-start"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 mr-2" />
            ) : (
              <Moon className="h-4 w-4 mr-2" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("settings")}
            className="w-full justify-start"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Center Column */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Describe your next big idea...
              </label>
              <Textarea
                placeholder="An AI-powered fitness app that creates personalized workout plans..."
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="grid grid-cols-7 gap-3 py-2 px-1">
              {aiAgents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <Button
                    key={agent.id}
                    variant="outline"
                    className="min-w-[180px] h-32 p-3 flex flex-col items-center justify-center gap-2 hover:border-accent hover:bg-accent/5"
                    onClick={() => handleGenerateContent(agent.id)}
                  >
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Icon className="h-4 w-4" />
                      {agent.isPro && <Crown className="h-3 w-3 text-amber-500" />}
                    </div>
                    <div className="text-center flex-1 flex flex-col justify-center min-w-0">
                      <div className="text-sm font-medium truncate w-full">
                        {agent.title}
                      </div>
                      <div className="text-xs text-muted-foreground leading-tight whitespace-normal">
                        {agent.description}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          {generatedCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Ready to build something amazing?
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Describe your idea above and click on any AI agent to generate
                business assets instantly.
              </p>
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                Start with Market Analysis or Architecture
              </Badge>
            </div>
          ) : (
            <div>
              {generatedCards.map((cardId) => {
                const agent = aiAgents.find((a) => a.id === cardId);
                if (!agent) return null;
                const Icon = agent.icon;
                return (
                  <Card key={cardId} className="mb-6">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-accent" />
                        <CardTitle className="text-lg">{agent.title}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Generated content for <strong>{agent.title}</strong> goes here.
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Right Sidebar - AI Chat */}
      <div className="w-80 bg-sidebar border-l border-sidebar-border flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-accent" />
            <h3 className="font-semibold">AI Co-Pilot</h3>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-3 py-2 text-sm bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Chat input"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              className="bg-accent hover:bg-accent/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
