import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Palette, Server } from "lucide-react";

interface Skill {
  name: string;
  logo: string;
}

const AboutSection = () => {


  const technicalSkills: Skill[] = [
    {
      name: "C++",
      logo: "/images/skills/cpp.png",
    },
    {
      name: "Python",
      logo: "/images/skills/python.png",
    },
    {
      name: "JavaScript",
      logo: "/images/skills/javascript.png",
    },
    {
      name: "React",
      logo: "/images/skills/react.png",
    },
    {
      name: "Git",
      logo: "/images/skills/git.png",
    },
    {
      name: "GitHub",
      logo: "/images/skills/github.png",
    },
    {
      name: "Swift",
      logo: "/images/skills/swift.png",
    },
    {
      name: "Next.js",
      logo: "/images/skills/Next.js.png",
    },
    {
      name: "TypeScript",
      logo: "/images/skills/TypeScript.png",
    },
  ];

  const backendSkills: Skill[] = [
    {
      name: "Node.js",
      logo: "/images/skills/Node.js.png",
    },
    {
      name: "Express",
      logo: "/images/skills/Express.js.png",
    },
    {
      name: "Firebase",
      logo: "/images/skills/Firebase.png",
    },
    {
      name: "MongoDB",
      logo: "/images/skills/MongoDB.png",
    },
  ];

  const creativeSkills: Skill[] = [
    {
      name: "3D Modeling",
      logo: "/images/skills/blender.png",
    },
    {
      name: "UI Design",
      logo: "/images/skills/ui-design.png",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-transparent text-black dark:text-white min-h-screen flex flex-col justify-center transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            LET ME INTRODUCE MYSELF
          </h2>
          <div className="w-20 h-1 bg-green-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed">
              I am a passionate software engineer specializing in <span className="font-bold italic">full-stack development</span>, <span className="font-bold italic">AI integrations</span>, and crafting <span className="font-bold italic">highly interactive digital experiences</span>. Over the years, my work has evolved from foundational programming to architecting complex, <span className="font-bold italic">production-ready applications</span>.
            </p>
            <p className="text-lg leading-relaxed">
              My technical expertise spans modern web technologies like <span className="font-bold italic">Next.js</span>, <span className="font-bold italic">React</span>, and <span className="font-bold italic">Node.js</span>, alongside robust backend ecosystems like <span className="font-bold italic">Spring Boot</span> and <span className="font-bold italic">MongoDB</span>. I am also deeply invested in <span className="font-bold italic">native iOS development</span> using <span className="font-bold italic">Swift</span> and <span className="font-bold italic">SwiftUI</span>.
            </p>
            <p className="text-lg leading-relaxed">
              Currently, my main focus lies in integrating <span className="font-bold italic">advanced AI capabilities</span>—such as <span className="font-bold italic">LLMs</span>, <span className="font-bold italic">RAG pipelines</span>, and <span className="font-bold italic">computer vision</span>—into practical, high-performance web and mobile products.
            </p>
            <p className="text-lg leading-relaxed">
              Whether it's engineering a <span className="font-bold italic">complex document processing pipeline</span>, crafting a <span className="font-bold italic">fluid animated UI</span>, or architecting a <span className="font-bold italic">real-time citizen reporting platform</span>, I thrive on bridging the gap between <span className="font-bold italic">cutting-edge technology</span> and <span className="font-bold italic">exceptional user experience</span>.
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end lg:pr-12"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-20 transform -translate-x-4 translate-y-4"></div>
              <div className="relative border-4 border-green-400 rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80">
                  <motion.img
                    src="/images/profile-2.jpeg"
                    alt="Abhay Raj Rathi"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-black p-3 rounded-full border-2 border-green-400 transition-colors duration-300">
                <span className="text-green-400 text-xl font-bold">ARR</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-4xl font-bold mb-16 text-center tracking-tight">Technical Arsenal</h3>

          <div className="space-y-16">
            {/* Technical Skills */}
            <div>
              <h4 className="text-2xl font-medium mb-8 text-green-400 flex items-center justify-center gap-3">
                <Code2 className="w-6 h-6" />
                Technical Skills
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 max-w-5xl mx-auto">
                  {technicalSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      className="flex flex-col items-center space-y-3 cursor-pointer"
                    >
                      <motion.div
                        className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg p-2 transition-colors duration-300"
                        whileHover={{
                          boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                        }}
                      >
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                      <span className="font-medium text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Backend & Cloud Skills */}
            <div>
              <h4 className="text-2xl font-medium mb-8 text-blue-400 flex items-center justify-center gap-3">
                <Server className="w-6 h-6" />
                Backend & Cloud
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
                  {backendSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: index * 0.1 + 0.3, // Offset from technical skills
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      className="flex flex-col items-center space-y-3 cursor-pointer"
                    >
                      <motion.div
                        className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg p-2 transition-colors duration-300"
                        whileHover={{
                          boxShadow: "0 0 20px rgba(96, 165, 250, 0.4)",
                        }}
                      >
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                      <span className="font-medium text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Creative Skills */}
            <div>
              <h4 className="text-2xl font-medium mb-8 text-purple-400 flex items-center justify-center gap-3">
                <Palette className="w-6 h-6" />
                Creative Skills
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {creativeSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: index * 0.1 + 0.6, // Offset from technical skills
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      className="flex flex-col items-center space-y-3 cursor-pointer"
                    >
                      <motion.div
                        className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg p-2 transition-colors duration-300"
                        whileHover={{
                          boxShadow: "0 0 20px rgba(192, 132, 252, 0.4)",
                        }}
                      >
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                      <span className="font-medium text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
