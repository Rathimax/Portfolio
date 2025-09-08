import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

interface ThemeToggleButtonProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  isDarkMode,
  onToggle,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the button after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-6 right-6 z-50"
        >
          <Button
            onClick={onToggle}
            variant="outline"
            size="lg"
            className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-blue-600" />
            )}
            <span className="ml-2">{isDarkMode ? "Light" : "Dark"}</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeToggleButton;
