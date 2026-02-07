import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Typewriter from "./Typewriter";

const HeroSection = () => {
  const [marqueeText, setMarqueeText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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
    <section ref={sectionRef} className="relative min-h-screen w-full flex flex-col items-center justify-center bg-light-cream dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300">
      {/* Gradient background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-light-cream via-gray-200 to-light-cream dark:from-black dark:via-gray-900 dark:to-black opacity-80 z-0 transition-colors duration-300"
        style={{ y: backgroundY }}
      />
      {/* Animated background text */}
      <div className="absolute inset-0 flex flex-wrap justify-center items-center opacity-5 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.span
            key={index}
            className="text-6xl md:text-8xl font-bold tracking-wider px-4"
            initial={{
              rotate: Math.random() * 360,
              x: Math.random() * 100 - 50,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              rotate: [null, Math.random() * 360],
              x: [null, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            ABHAY RAJ RATHI
          </motion.span>
        ))}
      </div>
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl mb-4 text-green-400"
        >
          Hi There!
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight"
          variants={nameVariants}
          initial="hidden"
          animate="visible"
        >
          I'M{" "}
          <span className="inline-block">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block ${letter !== " " ? "text-green-500" : "text-black dark:text-white"}`}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400"
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
              className={`text-lg border-green-500 text-green-500 hover:bg-green-500 hover:text-white dark:hover:text-black transition-all duration-300 glass-card ${isAnimating ? "scale-105" : ""}`}
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
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
      {/* Animated marquee at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-0 w-full overflow-hidden z-0"
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="text-4xl font-bold mx-4 text-green-500 opacity-20"
            >
              ABHAY RAJ RATHI
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
