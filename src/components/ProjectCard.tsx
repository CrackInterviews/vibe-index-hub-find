
import { useState } from "react";
import { Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  url: string;
  likes: number;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(project.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
      setLiked(false);
      toast.info("Removed from your likes");
    } else {
      setLikeCount(prev => prev + 1);
      setLiked(true);
      toast.success("Added to your likes");
    }
  };

  const handleVisit = () => {
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden hover-scale">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="object-cover w-full h-full"
        />
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
