
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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
          About The Vibe Index
        </h1>
        
        <div className="glass-card rounded-lg p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            The Vibe Index was created to showcase and celebrate the most creative, innovative, and visually stunning coding projects from developers around the world. We believe that code can be both functional and beautiful, and we're on a mission to collect and curate projects that push the boundaries of digital aesthetics.
          </p>
          <p className="text-muted-foreground">
            Whether you're looking for inspiration, resources for your next project, or just want to explore what's possible with modern web technologies, The Vibe Index is your destination for discovering coding projects with exceptional vibes.
          </p>
        </div>
        
        <div className="glass-card rounded-lg p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-6">
            Developers from around the world submit their projects to The Vibe Index. Our team reviews each submission to ensure it meets our quality standards and has that special "vibe" we're looking for. Once approved, projects are featured on our platform where they can be discovered, shared, and appreciated by our community.
          </p>
          <p className="text-muted-foreground">
            Users can search, filter, and sort projects based on various criteria to find exactly what they're looking for. Each project includes links to live demos, source code, and other resources to help you explore and learn from these creative works.
          </p>
        </div>
        
        <div className="glass-card rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Join The Community</h2>
          <p className="text-muted-foreground mb-6">
            The Vibe Index is more than just a showcase—it's a community of developers, designers, and creative coders who are passionate about pushing the boundaries of what's possible on the web. We invite you to join us by submitting your own projects, engaging with other creators, and sharing your feedback and ideas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button>Submit Your Project</Button>
            <Button variant="outline">Join Discord</Button>
            <Button variant="secondary">Follow on Twitter</Button>
          </div>
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

export default About;
