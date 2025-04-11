
import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FilterSort from "@/components/FilterSort";
import ProjectCard from "@/components/ProjectCard";
import { mockProjects } from "@/data/projects";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter(project => 
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredProjects(filtered);
  };

  const handleSortChange = (sort: string) => {
    let sorted = [...filteredProjects];
    
    switch (sort) {
      case "most-liked":
        sorted = sorted.sort((a, b) => b.likes - a.likes);
        break;
      case "most-viewed":
        // In a real app, you'd sort by views, but we don't have that data
        sorted = sorted.sort((a, b) => b.likes - a.likes);
        break;
      case "newest":
        // In a real app, you'd sort by date created, but we don't have that data
        sorted = sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        break;
    }
    
    setFilteredProjects(sorted);
  };

  const handleTimeChange = (time: string) => {
    // In a real app, you would filter by creation date
    // For now, we'll just use the existing data
    console.log("Time filter changed to:", time);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            The Vibe Index
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Discover and explore the coolest vibe coding projects from developers around the world.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <FilterSort onSortChange={handleSortChange} onTimeChange={handleTimeChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
      
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Vibe Index. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
