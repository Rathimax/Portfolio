import { Suspense, useEffect, useRef, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [cursorColor, setCursorColor] = useState("#ffffff");
  const animationFrameRef = useRef<number>();
  const trailAnimationFrameRef = useRef<number>();

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;

    if (!cursor || !trail) return;

    // Function to get background color at cursor position
    const getBackgroundColorAtPosition = (x: number, y: number): string => {
      const element = document.elementFromPoint(x, y);
      if (!element) return "#000000";

      const computedStyle = window.getComputedStyle(element);
      let backgroundColor = computedStyle.backgroundColor;

      // If background is transparent, check parent elements
      let currentElement = element;
      while (
        backgroundColor === "rgba(0, 0, 0, 0)" ||
        backgroundColor === "transparent"
      ) {
        currentElement = currentElement.parentElement;
        if (!currentElement) break;
        backgroundColor =
          window.getComputedStyle(currentElement).backgroundColor;
      }

      return backgroundColor;
    };

    // Function to determine if background is dark or light
    const isBackgroundDark = (backgroundColor: string): boolean => {
      // Handle rgb/rgba format
      const rgbMatch = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
      }

      // Default to dark if we can't determine
      return true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Cancel previous animation frames
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (trailAnimationFrameRef.current) {
        cancelAnimationFrame(trailAnimationFrameRef.current);
      }

      // Get background color at cursor position and set cursor color accordingly
      const backgroundColor = getBackgroundColorAtPosition(
        e.clientX,
        e.clientY,
      );
      const isDark = isBackgroundDark(backgroundColor);
      const newCursorColor = isDark ? "#ffffff" : "#04d17f";

      if (newCursorColor !== cursorColor) {
        setCursorColor(newCursorColor);
      }

      // Update cursor position with requestAnimationFrame for smoothness
      animationFrameRef.current = requestAnimationFrame(() => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      });

      // Update trail position with smooth delay
      trailAnimationFrameRef.current = requestAnimationFrame(() => {
        setTimeout(() => {
          trail.style.left = e.clientX + "px";
          trail.style.top = e.clientY + "px";
        }, 50);
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (trailAnimationFrameRef.current) {
        cancelAnimationFrame(trailAnimationFrameRef.current);
      }
    };
  }, [cursorColor]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {/* Custom Cursor */}
        <div
          ref={cursorRef}
          className="custom-cursor"
          style={{
            background: cursorColor,
            boxShadow: `0 0 10px ${cursorColor}, 0 0 20px ${cursorColor}, 0 0 30px ${cursorColor}40`,
          }}
        />
        <div
          ref={trailRef}
          className="custom-cursor-trail"
          style={{
            background: `radial-gradient(circle, ${cursorColor}66 0%, ${cursorColor}1a 50%, transparent 100%)`,
          }}
        />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
