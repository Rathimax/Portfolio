import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Typewriter from "./Typewriter";
import { ShaderAnimation } from "./ui/shader-animation";
import { CursorDrivenParticleTypography } from "./ui/CursorDrivenParticleTypography";

const HeroSection = () => {
  const [marqueeText, setMarqueeText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const nameParts = useMemo(() => [
    { text: "I'M ", color: "#FFFFFF" },
    { text: "ABHAY RAJ RATHI", color: "#4ade80" }
  ], []);



  // Animation for the marquee text
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Text animation variants
  const nameVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const nameLetters = "ABHAY RAJ RATHI".split("");

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#f9f6ee] dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300">

      {/* Shader Animation Background */}
      <ShaderAnimation />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl mb-1 text-green-400"
        >
          Hi There!
        </motion.p>

        <div className="flex flex-col items-center justify-center mb-0 h-[140px] md:h-[130px] lg:h-[160px]">
          <CursorDrivenParticleTypography 
            parts={nameParts}
            fontSize={75}
            particleDensity={3}
            className="w-full h-full min-h-0"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-xl md:text-2xl mb-4 text-gray-700 dark:text-gray-300"
        >
          I'm a <Typewriter words={["Developer", "Designer", "Creator", "Problem Solver"]} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <Button
              variant="outline"
              size="lg"
              className={`text-lg border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-400 hover:text-white dark:hover:text-black transition-all duration-300 glass-card ${isAnimating ? "scale-105" : ""}`}
              onClick={() => {
                const aboutSection = document.getElementById("about");
                if (aboutSection) {
                  const targetPosition = aboutSection.offsetTop;
                  const startPosition = window.pageYOffset;
                  const distance = targetPosition - startPosition;
                  const duration = 2500; // 2.5 seconds for slow scroll
                  let start: number | null = null;

                  const easeInOutCubic = (t: number) =>
                    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

                  const animation = (currentTime: number) => {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = easeInOutCubic(progress);
                    window.scrollTo(0, startPosition + distance * ease);
                    if (timeElapsed < duration) {
                      requestAnimationFrame(animation);
                    }
                  };
                  requestAnimationFrame(animation);
                }
              }}
            >
              {marqueeText || "About Me"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-4 w-full text-center text-xs md:text-sm text-green-500"
        ></motion.div>
      </div>
      {/* End Main content */}
    </section>
  );
};

export default HeroSection;
