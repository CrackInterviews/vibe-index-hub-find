
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center py-4 px-4 md:px-8">
      <Link to="/" className="text-xl font-medium flex items-center gap-2">
        <img 
          src="/lovable-uploads/dcfa634e-d811-4b45-b6b9-ca17a626f111.png" 
          alt="The Vibe Index Logo" 
          className="h-8 w-8"
        />
        VI
      </Link>
      <div className="flex gap-3">
        {location.pathname !== '/submit' && (
          <Button variant="outline" size="sm" asChild>
            <Link to="/submit">Submit Project</Link>
          </Button>
        )}
        {location.pathname !== '/about' && (
          <Button variant="secondary" size="sm" asChild>
            <Link to="/about">About Us</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
