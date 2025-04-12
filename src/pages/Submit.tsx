
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Submit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save project to Supabase
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          url: formData.url,
          image_url: formData.imageUrl || null,
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      toast.success("Project submitted successfully!");
      
      // Clear form
      setFormData({
        title: "",
        description: "",
        category: "",
        url: "",
        imageUrl: "",
      });
      
      // Redirect to home after successful submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error("Error submitting project:", error);
      toast.error("Failed to submit project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-8 flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Submit Your Project
        </h1>
        
        <div className="glass-card rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Project Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., WavePulse Animation Library"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Project Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project in a few sentences..."
                rows={4}
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category
              </label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., UI Library, Animation, Design System"
                required
              />
            </div>
            
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-2">
                Project URL
              </label>
              <Input
                id="url"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://github.com/yourusername/your-project"
                required
              />
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
                Project Image URL (optional)
              </label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/your-project-image.jpg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Provide a URL to an image that represents your project. Optimal dimensions are 1200x800px.
              </p>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Project"}
              </Button>
            </div>
          </form>
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

export default Submit;
