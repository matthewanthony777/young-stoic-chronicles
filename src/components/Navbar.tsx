import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const links = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Philosophy", path: "/philosophy" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 
            onClick={() => navigate("/")} 
            className="font-serif text-xl cursor-pointer hover:opacity-80 transition-opacity"
          >
            The Young Stoic
          </h1>
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="hover-underline text-sm"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="hidden md:inline-flex"
            onClick={() => navigate("/newsletter")}
          >
            Join Newsletter
          </Button>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {links.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className="text-left hover:text-sage-500 transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
                <Button onClick={() => navigate("/newsletter")}>
                  Join Newsletter
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};