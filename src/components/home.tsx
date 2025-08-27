import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-light-cream dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>

      {/* About Section */}
      <motion.div
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <AboutSection />
      </motion.div>

      {/* Projects Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ProjectsSection />
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ContactSection />
      </motion.div>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-green-500 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <p>Designed and Developed by ABHAY RAJ RATHI</p>
        <p>Copyright © 2025 ARR</p>
      </footer>
    </div>
  );
};

export default Home;
