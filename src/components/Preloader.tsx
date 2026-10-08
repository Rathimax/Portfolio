import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppleHelloEnglishEffect } from "./ui/apple-hello-effect";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  // Detect theme — same logic as App.tsx
  const getIsDark = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
  };
  const [isDark] = useState<boolean>(getIsDark);

  // Step 1: drawing finishes → brief pause → slide up
  const handleDrawComplete = () => {
    setTimeout(() => setIsSliding(true), 350);
  };

  // Step 2: slide-up animation done → fade out overlay → call onComplete
  const handleSlideComplete = () => {
    if (!isSliding) return;
    setIsVisible(false);
    setTimeout(onComplete, 650);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] flex items-center justify-center ${
            isDark ? "bg-[#0a0a0a]" : "bg-[#f5f0e8]"
          }`}
        >
          {/* Radial ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`w-[500px] h-[200px] rounded-full blur-3xl ${
                isDark ? "bg-white/5" : "bg-black/5"
              }`}
            />
          </div>

          {/* Hello text — slides up on exit */}
          <motion.div
            animate={
              isSliding
                ? { y: -110, opacity: 0 }
                : { y: 0, opacity: 1 }
            }
            transition={
              isSliding
                ? { duration: 0.65, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0 }
            }
            onAnimationComplete={handleSlideComplete}
          >
            <AppleHelloEnglishEffect
              speed={0.9}
              className={`h-24 md:h-32 ${isDark ? "text-white" : "text-gray-900"}`}
              onAnimationComplete={handleDrawComplete}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
