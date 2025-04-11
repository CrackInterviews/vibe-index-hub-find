
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FilterSort from "@/components/FilterSort";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/components/ProjectCard";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("most-liked");
  const [timeFrame, setTimeFrame] = useState<string>("all-time");

  // Fetch projects from Supabase
  const { data: projects = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['projects', sortBy, timeFrame],
    queryFn: async () => {
      // Base query
      let query = supabase
        .from('projects')
        .select('*');
      
      // Apply time filter if needed
      if (timeFrame !== 'all-time') {
        let date = new Date();
        if (timeFrame === 'today') {
          date.setHours(0, 0, 0, 0);
        } else if (timeFrame === 'this-week') {
          date.setDate(date.getDate() - 7);
        } else if (timeFrame === 'this-month') {
          date.setMonth(date.getMonth() - 1);
        }
        query = query.gte('created_at', date.toISOString());
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(`Error fetching projects: ${error.message}`);
      }
      
      return data as Project[];
    }
  });

  // Get likes for sorting
  const { data: projectLikes = new Map<string, number>() } = useQuery({
    queryKey: ['project-likes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_likes')
        .select('project_id');
        
      if (error) {
        throw new Error(`Error fetching likes: ${error.message}`);
      }
      
      // Count likes per project
      const likesMap = new Map<string, number>();
      data.forEach(like => {
        const count = likesMap.get(like.project_id) || 0;
        likesMap.set(like.project_id, count + 1);
      });
      
      return likesMap;
    }
  });

  // Filtered and sorted projects
  const filteredProjects = projects
    .filter(project => {
      if (!searchQuery) return true;
      return (
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      // Sort based on selected criteria
      if (sortBy === 'most-liked') {
        const likesA = projectLikes.get(a.id) || 0;
        const likesB = projectLikes.get(b.id) || 0;
        return likesB - likesA;
      } 
      if (sortBy === 'most-viewed') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === 'newest') {
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
      }
      return 0;
    });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleTimeChange = (time: string) => {
    setTimeFrame(time);
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
        
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Loading awesome vibe projects...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-red-500">Failed to load projects. Please try again later.</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} onLikeChange={refetch} />
            ))}
          </div>
        )}
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
