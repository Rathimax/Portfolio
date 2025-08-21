import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and Tailwind CSS",
    detailedDescription:
      "A modern, responsive portfolio website showcasing my skills and projects. Built with React for dynamic components, styled with Tailwind CSS for rapid development, and enhanced with Framer Motion for smooth animations. Features include a hero section with animated text, project showcase with interactive cards, contact form, and mobile-responsive design.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/Rathimax/Portfolio",
    liveUrl: "https://abhayrajrathiportfolio.netlify.app",
  },
  {
    id: 2,
    title: "Weather Forecast App",
    description:
      "Real-time weather forecasting application with location services",
    detailedDescription:
      "A comprehensive weather application that provides real-time weather data and forecasts. Features include current weather conditions, 5-day forecast, location-based weather detection using geolocation API, search functionality for different cities, and responsive design. Built with vanilla JavaScript and integrated with OpenWeatherMap API for accurate weather data.",
    image:
      "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?w=800&q=80",
    tags: ["JavaScript", "API Integration", "CSS"],
    githubUrl: "https://github.com/Rathimax/Weather-web-app",
    liveUrl: "https://weather-web-app-psi-three.vercel.app",
  },
  {
    id: 3,
    title: "Weather Forecast App v2",
    description:
      "Enhanced weather forecasting application with improved UI and additional features",
    detailedDescription:
      "An upgraded version of the weather app with enhanced user interface and additional features. Includes hourly forecasts, weather maps, severe weather alerts, improved data visualization with charts, dark/light theme toggle, and better mobile optimization. Enhanced with modern CSS animations and improved API error handling.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
    tags: ["JavaScript", "API Integration", "CSS", "Weather API"],
    githubUrl: "https://github.com/Rathimax/Weather-app-V2",
    liveUrl: "https://weatherappversion2.vercel.app",
  },
  {
    id: 4,
    title: "Space Shooter Game",
    description: "Interactive browser-based space shooter with multiple levels",
    detailedDescription:
      "An engaging space shooter game built with HTML5 Canvas and JavaScript. Features include multiple enemy types, power-ups, progressive difficulty levels, particle effects, sound effects, high score tracking, and smooth 60fps gameplay. Implements collision detection, sprite animations, and responsive controls for an immersive gaming experience.",
    image:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    tags: ["JavaScript", "HTML", "Game Development"],
    githubUrl: "https://github.com/Rathimax/Spaceshooter-Game",
    liveUrl: "https://spaceshooter-game.vercel.app",
  },
  {
    id: 5,
    title: "Website",
    description:
      "Modern responsive website with clean design and interactive elements",
    detailedDescription:
      "A fully responsive website featuring modern design principles and interactive elements. Built with semantic HTML5, styled with CSS3 including flexbox and grid layouts, and enhanced with JavaScript for dynamic interactions. Features include smooth scrolling navigation, animated sections, contact forms with validation, and optimized performance across all devices.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    githubUrl: "https://github.com/Rathimax/functional-webpage",
    liveUrl: "https://functional-webpage.vercel.app",
  },
  {
    id: 6,
    title: "Gym Progress Tracker",
    description:
      "Track your fitness journey with detailed workout logs and progress analytics",
    detailedDescription:
      "A comprehensive fitness tracking application designed to help users monitor their workout progress and achieve their fitness goals. Features include workout logging, exercise database, progress charts and analytics, personal records tracking, workout templates, and goal setting. Built with a focus on user experience and data visualization to motivate users in their fitness journey.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    tags: ["Fitness", "Tracking", "Analytics"],
    githubUrl: "https://github.com/Rathimax/gym-progress-tracker",
    liveUrl: "https://gym-progress-tracker-six.vercel.app",
  },
  {
    id: 7,
    title: "Coming Soon",
    description: "More projects are in development and will be added soon",
    detailedDescription:
      "Exciting new projects are currently in development! Stay tuned for innovative web applications, mobile apps, and creative coding experiments. These upcoming projects will showcase the latest technologies and design trends, including AI integration, advanced animations, and cutting-edge user experiences.",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
    tags: ["Future", "Development"],
  },
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = defaultProjects,
}) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardHover = (projectId: number) => {
    setHoveredCard(projectId);
    // Add a delay before flipping to allow pop-up animation to complete
    setTimeout(() => {
      setFlippedCards((prev) => {
        const newSet = new Set(prev);
        newSet.add(projectId);
        return newSet;
      });
    }, 200);
  };

  const handleCardLeave = (projectId: number) => {
    setHoveredCard(null);
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      newSet.delete(projectId);
      return newSet;
    });
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    // Prevent event bubbling to card hover handlers
    event.stopPropagation();
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-black text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            PROJECTS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my design and development work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const isFlipped = flippedCards.has(project.id);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                animate={{
                  scale: hoveredCard === project.id ? 1.05 : 1,
                  y: hoveredCard === project.id ? -10 : 0,
                }}
                className="h-[400px] perspective-1000"
                onMouseEnter={() => handleCardHover(project.id)}
                onMouseLeave={() => handleCardLeave(project.id)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front of card */}
                  <Card className="absolute inset-0 w-full h-full flex flex-col overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 backface-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleButtonClick}
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && project.title !== "Coming Soon" && (
                        <Button variant="default" size="sm" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleButtonClick}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>

                  {/* Back of card */}
                  <Card className="absolute inset-0 w-full h-full flex flex-col overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 backface-hidden rotate-y-180 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-primary">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        Detailed Overview
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-y-auto">
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {project.detailedDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-4">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleButtonClick}
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && project.title !== "Coming Soon" && (
                        <Button variant="default" size="sm" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleButtonClick}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
