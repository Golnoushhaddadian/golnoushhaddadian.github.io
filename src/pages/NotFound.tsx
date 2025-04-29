
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-15rem)] flex flex-col items-center justify-center py-16">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
      <Button asChild>
        <Link to="/" className="flex items-center">
          <Home className="h-4 w-4 mr-2" />
          <span>Return to Home</span>
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
