
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./theme-provider";
import Navbar from "./Navbar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Layout = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Show welcome toast on first visit
    const hasVisited = localStorage.getItem("moodmuse-visited");
    if (!hasVisited) {
      toast.success("Welcome to MoodMuse!", {
        description: "Track your moods with delightful emoji interactions.",
      });
      localStorage.setItem("moodmuse-visited", "true");
    }
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={cn(
      "min-h-screen flex flex-col bg-gradient-to-br from-violet-50 to-blue-50 transition-colors duration-300",
      theme === "dark" && "from-gray-900 to-gray-800"
    )}>
      <Navbar />
      <main className="flex-1 container mx-auto py-6 px-4 md:py-10">
        <Outlet />
      </main>
      <footer className="text-center p-4 text-sm text-gray-500 dark:text-gray-400">
        <p>MoodMuse — Built for the CodeCircuit Hackathon 🌈</p>
      </footer>
    </div>
  );
};

export default Layout;
