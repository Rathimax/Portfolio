import React from "react";
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
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/Rathimax/Portfolio",
    liveUrl: "https://abhayrajrathiportfolio.netlify.app",
  },
  {
    id: 2,
    title: "Weather Forecast App",
    description:
      "Real-time weather forecasting application with location services",
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
    image:
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80",
    tags: ["JavaScript", "HTML", "Game Development"],
    githubUrl: "https://github.com/Rathimax/Spaceshooter-Game",
    liveUrl: "https://space-shooter-game.netlify.app/",
  },
  {
    id: 5,
    title: "Website",
    description:
      "Modern responsive website with clean design and interactive elements",
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
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    tags: ["Fitness", "Tracking", "Analytics"],
    githubUrl: "https://github.com/Rathimax/gym-progress-tracker",
    liveUrl: "https://gym-progress-tracker-six.vercel.app",
  },
  {
    id: 7,
    title: "Coming Soon",
    description: "More projects are in development and will be added soon",
    image:
      "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=800&q=80",
    tags: ["Future", "Development"],
  },
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = defaultProjects,
}) => {
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
            A showcase of my design and development work. Click on any project
            to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full flex flex-col overflow-hidden border border-border hover:border-primary/50 transition-all duration-300">
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
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
