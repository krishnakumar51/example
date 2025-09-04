import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-scraper-bg-primary">
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4 text-scraper-text-primary">404</h1>
        <p className="text-xl text-scraper-text-secondary mb-4">Oops! Page not found</p>
        <a 
          href="/" 
          className="text-scraper-accent-primary hover:text-scraper-accent-secondary underline transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
