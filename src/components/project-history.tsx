import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Search, 
  MoreHorizontal, 
  Calendar, 
  BarChart3, 
  Building, 
  Presentation,
  ArrowLeft,
  Filter,
  Grid3X3,
  List,
  Star
} from "lucide-react";
import { useState } from "react";

interface ProjectHistoryProps {
  onNavigate: (page: string) => void;
  onOpenProject: (projectId: string) => void;
}

export function ProjectHistory({ onNavigate, onOpenProject }: ProjectHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const projects = [
    {
      id: "1",
      title: "AI Fitness App",
      description: "Personalized workout plans using machine learning algorithms to adapt to user progress and preferences",
      date: "Dec 15, 2024",
      status: "Active",
      generatedAssets: ["Market Analysis", "Architecture", "Pitch Deck"],
      category: "Health & Fitness",
      isFavorite: true
    },
    {
      id: "2", 
      title: "EcoCommerce Platform",
      description: "Sustainable e-commerce marketplace connecting eco-conscious consumers with green products",
      date: "Dec 10, 2024",
      status: "Draft",
      generatedAssets: ["Market Analysis", "Financial Model"],
      category: "E-commerce",
      isFavorite: false
    },
    {
      id: "3",
      title: "EdTech SaaS",
      description: "Virtual classroom management system with AI-powered student engagement analytics",
      date: "Dec 8, 2024", 
      status: "Complete",
      generatedAssets: ["Market Analysis", "Architecture", "Pitch Deck", "Financial Model", "Growth Strategy"],
      category: "Education",
      isFavorite: true
    },
    {
      id: "4",
      title: "Smart Home IoT",
      description: "Intelligent home automation platform with predictive energy management",
      date: "Dec 5, 2024",
      status: "Active", 
      generatedAssets: ["Market Analysis", "Architecture"],
      category: "IoT",
      isFavorite: false
    },
    {
      id: "5",
      title: "Digital Health Platform",
      description: "Telemedicine platform with AI symptom checker and remote patient monitoring",
      date: "Dec 1, 2024",
      status: "Draft",
      generatedAssets: ["Market Analysis", "Legal Checklist"],
      category: "Healthcare",
      isFavorite: false
    },
    {
      id: "6",
      title: "FinTech Mobile App",
      description: "Personal finance management with automated budgeting and investment recommendations",
      date: "Nov 28, 2024",
      status: "Complete",
      generatedAssets: ["Market Analysis", "Architecture", "Pitch Deck", "Financial Model"],
      category: "FinTech", 
      isFavorite: true
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Complete": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAssetIcon = (asset: string) => {
    switch (asset) {
      case "Market Analysis": return BarChart3;
      case "Architecture": return Building;
      case "Pitch Deck": return Presentation;
      default: return BarChart3;
    }
  };

  const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg group-hover:text-accent transition-colors truncate">
                {project.title}
              </CardTitle>
              {project.isFavorite && <Star className="h-4 w-4 text-amber-500 fill-current flex-shrink-0" />}
            </div>
            <Badge variant="secondary" className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="flex-shrink-0 ml-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-shrink-0">
          {project.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3 flex-shrink-0">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{project.date}</span>
        </div>
        
        <div className="mb-4 flex-1">
          <div className="text-xs text-muted-foreground mb-2">Generated Assets</div>
          <div className="flex flex-wrap gap-1">
            {project.generatedAssets.slice(0, 3).map((asset, index) => {
              const Icon = getAssetIcon(asset);
              return (
                <div key={index} className="flex items-center gap-1 bg-accent/10 text-accent px-2 py-1 rounded-md text-xs flex-shrink-0">
                  <Icon className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{asset}</span>
                </div>
              );
            })}
            {project.generatedAssets.length > 3 && (
              <div className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs flex-shrink-0">
                +{project.generatedAssets.length - 3} more
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between flex-shrink-0 pt-2">
          <Badge variant="outline" className="text-xs truncate max-w-[120px]">
            {project.category}
          </Badge>
          <Button 
            size="sm" 
            onClick={() => onOpenProject(project.id)}
            className="bg-accent hover:bg-accent/90 flex-shrink-0 ml-2"
          >
            Open
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const ProjectListItem = ({ project }: { project: typeof projects[0] }) => (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="font-semibold group-hover:text-accent transition-colors truncate">
                {project.title}
              </h3>
              {project.isFavorite && <Star className="h-4 w-4 text-amber-500 fill-current flex-shrink-0" />}
              <Badge variant="secondary" className={`${getStatusColor(project.status)} flex-shrink-0`}>
                {project.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1 flex-shrink-0">
                <Calendar className="h-3 w-3" />
                <span>{project.date}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {project.category}
              </Badge>
              <span className="flex-shrink-0">{project.generatedAssets.length} assets</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onOpenProject(project.id)}
            >
              Open
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold truncate">My Ideas</h1>
                <p className="text-muted-foreground text-sm">Manage and explore your project history</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              
              <Button onClick={() => onNavigate('dashboard')} className="bg-accent hover:bg-accent/90">
                New Idea
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
            <div>
              <span className="font-semibold text-foreground">{filteredProjects.length}</span> projects
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {filteredProjects.filter(p => p.status === "Active").length}
              </span> active
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {filteredProjects.filter(p => p.status === "Complete").length}
              </span> completed
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Start creating your first project"}
            </p>
            <Button onClick={() => onNavigate('dashboard')} className="bg-accent hover:bg-accent/90">
              New Idea
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}