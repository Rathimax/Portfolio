import { Suspense, useEffect, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ThemeToggleButton from "./components/ThemeToggleButton";
import routes from "tempo-routes";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save theme preference to localStorage
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    // Check for saved theme preference first
    const savedTheme = localStorage.getItem("theme");
    let initialTheme = true; // default to dark

    if (savedTheme) {
      initialTheme = savedTheme === "dark";
    } else {
      // Check system preference if no saved preference
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      initialTheme = mediaQuery.matches;
    }

    // Set initial theme
    setIsDarkMode(initialTheme);

    // Apply theme to document
    if (initialTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Only listen to system changes if no saved preference
    if (!savedTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Listen for changes in system preference only if no saved preference
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };

      // Check if addEventListener is available
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
      } else if (mediaQuery.addListener) {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }

      // Cleanup
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", handleChange);
        } else if (mediaQuery.removeListener) {
          // Fallback for older browsers
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <ThemeToggleButton isDarkMode={isDarkMode} onToggle={toggleTheme} />
    </Suspense>
  );
}

export default App;
