
import { useState, useEffect } from "react";
import { Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: string;
  url: string;
  views: number;
}

interface ProjectCardProps {
  project: Project;
  onLikeChange?: () => void;
}

const ProjectCard = ({ project, onLikeChange }: ProjectCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  // Get client IP for like tracking
  const getClientIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error getting IP:", error);
      return null;
    }
  };

  // Load likes count
  useEffect(() => {
    const fetchLikes = async () => {
      const { count, error } = await supabase
        .from('project_likes')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', project.id);
      
      if (error) {
        console.error("Error fetching likes:", error);
        return;
      }
      
      setLikeCount(count || 0);
    };

    // Check if user already liked this project
    const checkIfLiked = async () => {
      const ip = await getClientIp();
      if (!ip) return;

      const { data, error } = await supabase
        .from('project_likes')
        .select('id')
        .eq('project_id', project.id)
        .eq('ip_address', ip)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" which is fine
        console.error("Error checking like status:", error);
        return;
      }
      
      setLiked(!!data);
    };

    fetchLikes();
    checkIfLiked();
  }, [project.id]);

  // Increment views when card is rendered
  useEffect(() => {
    const incrementViews = async () => {
      // A simple debounce by only incrementing once per session for each project
      const viewedKey = `viewed_${project.id}`;
      if (sessionStorage.getItem(viewedKey)) return;
      
      const { error } = await supabase
        .from('projects')
        .update({ views: (project.views || 0) + 1 })
        .eq('id', project.id);
      
      if (error) {
        console.error("Error incrementing views:", error);
        return;
      }
      
      sessionStorage.setItem(viewedKey, 'true');
    };

    incrementViews();
  }, [project.id, project.views]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    
    try {
      const ip = await getClientIp();
      if (!ip) {
        toast.error("Could not determine your IP for like tracking");
        setIsLiking(false);
        return;
      }

      if (liked) {
        // Unlike: remove the like record
        const { error } = await supabase
          .from('project_likes')
          .delete()
          .eq('project_id', project.id)
          .eq('ip_address', ip);
        
        if (error) {
          console.error("Error removing like:", error);
          toast.error("Failed to remove like");
          setIsLiking(false);
          return;
        }
        
        setLikeCount(prev => Math.max(0, prev - 1));
        setLiked(false);
        toast.info("Removed from your likes");
      } else {
        // Like: add a new like record
        const { error } = await supabase
          .from('project_likes')
          .insert({ project_id: project.id, ip_address: ip });
        
        if (error) {
          // If error is unique constraint violation, the user already liked this
          if (error.code === '23505') {
            toast.error("You've already liked this project");
          } else {
            console.error("Error adding like:", error);
            toast.error("Failed to add like");
          }
          setIsLiking(false);
          return;
        }
        
        setLikeCount(prev => prev + 1);
        setLiked(true);
        toast.success("Added to your likes");
      }

      // Notify parent component if needed
      if (onLikeChange) {
        onLikeChange();
      }
    } catch (error) {
      console.error("Error in like handling:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLiking(false);
    }
  };

  const handleVisit = () => {
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden hover-scale">
      <div className="relative aspect-video overflow-hidden">
        {project.image_url ? (
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://via.placeholder.com/800x600/2a2a2a/ffffff?text=${encodeURIComponent(project.title)}`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-xl font-medium">{project.title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-black/60 text-xs py-1 px-2 rounded-full">
          {project.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 line-clamp-1">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike}
            className="group"
            disabled={isLiking}
          >
            <Heart 
              size={18} 
              className={`mr-2 ${liked ? "fill-red-500 text-red-500" : "group-hover:text-red-400"}`} 
            />
            <span>{likeCount}</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleVisit}
            className="flex items-center gap-1"
          >
            Visit <ExternalLink size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
