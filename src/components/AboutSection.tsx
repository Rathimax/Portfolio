import React from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

interface Skill {
  name: string;
  level: number;
  color: string;
}

const AboutSection = () => {
  const skills: Skill[] = [
    { name: "C++", level: 90, color: "bg-blue-500" },
    { name: "JavaScript", level: 85, color: "bg-yellow-500" },
    { name: "3D Modeling", level: 75, color: "bg-purple-500" },
    { name: "React", level: 80, color: "bg-cyan-500" },
    { name: "Python", level: 95, color: "bg-green-500" },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-black text-white min-h-screen flex flex-col justify-center"
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
              I fell in love with programming in high school and I have at least
              learnt something, I think…
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
              <h3 className="text-2xl font-semibold mb-4">Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <Badge
                        variant="outline"
                        className="border-green-400 text-green-400"
                      >
                        {skill.level}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${skill.color}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
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
              <div className="absolute -bottom-4 -right-4 bg-black p-3 rounded-full border-2 border-green-400">
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
