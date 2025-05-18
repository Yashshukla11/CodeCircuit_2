
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Calendar, BarChart2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "./theme-provider";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  const navItems = [
    { path: "/", label: "Log Mood", icon: null },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/stats", label: "Stats", icon: BarChart2 },
    { path: "/timeline", label: "Timeline", icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white w-9 h-9 rounded-lg flex items-center justify-center">
            <span className="text-xl">🌈</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 neon-glow">MoodMuse</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`${
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-600 dark:text-gray-300"
                      } flex items-center gap-2 transition-all`}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch to {theme === "dark" ? "light" : "dark"} mode</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden border-t border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-4 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-1 px-2 ${
                  isActive ? "text-primary" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {item.path === "/" ? (
                  <div className="w-6 h-6 flex items-center justify-center text-lg mb-1">
                    🎭
                  </div>
                ) : (
                  Icon && <Icon className="w-5 h-5 mb-1" />
                )}
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
