
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useDocumentHead } from "@/hooks/useDocumentHead";

const NotFound = () => {
  const location = useLocation();

  useDocumentHead({
    title: '404 — Page Not Found | Golnoush Haddadian',
    description: 'The page you are looking for does not exist on this website.',
    noindex: true,
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-15rem)] flex flex-col items-center justify-center py-16">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-md text-center">
        Sorry, the page you're looking for doesn't exist or has been moved. Please navigate back to the homepage.
      </p>
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
