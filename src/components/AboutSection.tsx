import React from "react";
import { motion } from "framer-motion";
import { Code2, Palette } from "lucide-react";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed">
              I discovered my passion for programming in high school, and since
              then, I've built skills across multiple domains, from web
              technologies to 3D modeling.
            </p>
            <p className="text-lg leading-relaxed">
              I am fluent in classics like C++, JavaScript, Python, 3D Modeling
              and React.
            </p>
            <p className="text-lg leading-relaxed">
              My field of interest includes building new Web Technologies and
              Products, and also areas related to UI Design.
            </p>
            <p className="text-lg leading-relaxed">
              Whenever possible, I also apply my passion for developing products
              with modern JavaScript libraries and frameworks like React.js.
            </p>

            <div className="pt-6">
              <h3 className="text-2xl font-semibold mb-6">Skills</h3>

              {/* Technical Skills */}
              <div className="mb-8">
                <h4 className="text-lg font-medium mb-4 text-green-400 flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Technical Skills
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
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

              {/* Creative Skills */}
              <div>
                <h4 className="text-lg font-medium mb-4 text-purple-400 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Creative Skills
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-20 transform -translate-x-4 translate-y-4"></div>
              <div className="relative border-4 border-green-400 rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80">
                <img
                  src="/images/profile.jpeg"
                  alt="Abhay Raj Rathi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-black p-3 rounded-full border-2 border-green-400 transition-colors duration-300">
                <span className="text-green-400 text-xl font-bold">ARR</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
