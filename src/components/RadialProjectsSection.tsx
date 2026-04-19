'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RadialScrollGallery, useIsDesktop } from '@/components/ui/portfolio-and-image-gallery';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

const projects: Project[] = [
    {
        id: 11,
        title: "DOCKFLOW AI",
        description: "A powerful AI-driven suite for PDF and document tools with an evolved workspace.",
        detailedDescription: "DocFlow AI is a sophisticated document intelligence platform providing a comprehensive suite of PDF tools. It features AI-powered capabilities for seamless document manipulation, emphasizing absolute privacy and a premium user experience with a sleek, dark-themed design.",
        image: "/images/dockflow-ai.png",
        tags: ["React", "TypeScript", "Tailwind CSS", "PDF manipulation"],
        githubUrl: "https://github.com/Rathimax/Dockflow-AI",
        liveUrl: "https://dockflow-ai.vercel.app",
    },
    {
        id: 1,
        title: "Portfolio Website",
        description: "Personal portfolio website built with React and Tailwind CSS",
        detailedDescription:
            "A modern, responsive portfolio website showcasing my skills and projects. Built with React for dynamic components, styled with Tailwind CSS for rapid development, and enhanced with Framer Motion for smooth animations. Features include a hero section with animated text, project showcase with interactive cards, contact form, and mobile-responsive design.",
        image: "/images/portfolio.png",
        tags: ["React", "Tailwind CSS", "Framer Motion"],
        githubUrl: "https://github.com/Rathimax/Portfolio",
        liveUrl: "https://abhayrajrathiportfolio.netlify.app",
    },
    {
        id: 2,
        title: "ThinkAI Chatbot",
        description: "An intelligent conversational AI assistant with a modern, dark-themed interface.",
        detailedDescription: "ThinkAI is a sophisticated conversational AI platform designed for seamless interactions. It features a clean, intuitive dark-themed interface with quick prompt suggestions, conversation history, and a powerful natural language processing core. Built with modern web technologies, it offers a premium user experience for efficient brainstorming, problem-solving, and AI-driven assistance.",
        image: "/images/thinkai.png",
        tags: ["AI", "Chatbot", "NLP", "React"],
        githubUrl: "https://github.com/Rathimax/Ai-chatbot",
        liveUrl: "https://ai-chatbot-one-teal-95.vercel.app",
    },
    {
        id: 3,
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
        id: 4,
        title: "Weather Forecast App v2",
        description:
            "Enhanced weather forecasting application with improved UI and additional features",
        detailedDescription:
            "An upgraded version of the weather app with enhanced user interface and additional features. Includes hourly forecasts, weather maps, severe weather alerts, improved data visualization with charts, dark/light theme toggle, and better mobile optimization. Enhanced with modern CSS animations and improved API error handling.",
        image:
            "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
        tags: ["JavaScript", "Weather API"],
        githubUrl: "https://github.com/Rathimax/Weather-app-V2",
        liveUrl: "https://weatherappversion2.vercel.app",
    },
    {
        id: 5,
        title: "Weather Forecast App v3",
        description:
            "Latest version with advanced features and modern design",
        detailedDescription:
            "The most advanced version of the weather app featuring a completely redesigned interface with modern UI/UX principles. Includes real-time weather updates, extended 7-day forecasts, interactive weather maps, air quality index, UV index tracking, wind speed and direction visualization, and advanced search with autocomplete. Built with the latest web technologies for optimal performance and user experience.",
        image:
            "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
        tags: ["API Integration", "Modern UI"],
        githubUrl: "https://github.com/Rathimax/weather-app-v3",
        liveUrl: "https://weather-app-v3-five.vercel.app",
    },
    {
        id: 6,
        title: "Space Shooter Game",
        description: "Interactive browser-based space shooter with multiple levels",
        detailedDescription:
            "An engaging space shooter game built with HTML5 Canvas and JavaScript. Features include multiple enemy types, power-ups, progressive difficulty levels, particle effects, sound effects, high score tracking, and smooth 60fps gameplay. Implements collision detection, sprite animations, and responsive controls for an immersive gaming experience.",
        image: "/images/capsule_616x353.jpg",
        tags: ["JavaScript", "HTML", "Game Development"],
        githubUrl: "https://github.com/Rathimax/Spaceshooter-Game",
        liveUrl: "https://spaceshooter-game.vercel.app",
    },
    {
        id: 7,
        title: "Beige & Beans Cafe Store",
        description:
            "Modern responsive website with clean design and interactive elements",
        detailedDescription:
            "A fully responsive website featuring modern design principles and interactive elements. Built with semantic HTML5, styled with CSS3 including flexbox and grid layouts, and enhanced with JavaScript for dynamic interactions. Features include smooth scrolling navigation, animated sections, contact forms with validation, and optimized performance across all devices.",
        image: "/images/beige-and-beans-cafe.png",
        tags: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/Rathimax/Coffee-Shop-Website",
        liveUrl: "https://functional-webpage.vercel.app",
    },
    {
        id: 8,
        title: "Gym Progress Tracker",
        description:
            "Track your fitness journey with detailed workout logs and progress analytics",
        detailedDescription:
            "A comprehensive fitness tracking application designed to help users monitor their workout progress and achieve their fitness goals. Features include workout logging, exercise database, progress charts and analytics, personal records tracking, workout templates, and goal setting. Built with a focus on user experience and data visualization to motivate users in their fitness journey.",
        image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
        tags: ["Fitness", "Tracking", "Analytics"],
        githubUrl: "https://github.com/Rathimax/gym-progress-tracker",
        liveUrl: "https://fittrack-rathiabhay-app.vercel.app",
    },
    {
        id: 9,
        title: "Habit Tracker iOS",
        description:
            "Native iOS habit tracking app built with Swift and SwiftUI",
        detailedDescription:
            "A beautifully designed iOS habit tracking application to help users build and maintain positive habits. Built with Swift and SwiftUI, featuring a clean native interface, daily habit check-ins, streak tracking, progress analytics, reminder notifications, and iCloud sync. Implements Core Data for local persistence and includes widgets for quick habit completion. The app follows iOS design guidelines for an intuitive user experience.",
        image:
            "/images/habit-tracker-ios.png",
        tags: ["Swift", "SwiftUI", "iOS"],
        githubUrl: "https://github.com/Rathimax/Habbit-tracker-IOS",
    },
];

export default function DemoRadialScrollGalleryBento() {
    const isDesktop = useIsDesktop(1024);
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    const handleCardClick = (projectId: number) => {
        if (isDesktop) return; // Only flip on mobile
        setFlippedCards((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(projectId)) {
                newSet.delete(projectId);
            } else {
                newSet.add(projectId);
            }
            return newSet;
        });
    };

    return (
        <section id="projects" className="text-foreground w-full bg-transparent">
            <div className="py-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto px-4"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        PROJECTS
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A showcase of my design and development work
                    </p>
                </motion.div>
            </div>

            <RadialScrollGallery
                className="pt-0 pb-20"
                baseRadius={700}
                mobileRadius={350}
                visiblePercentage={45}
                scrollDuration={4000}
                startTrigger="center center"
            >
                {(hoveredIndex) =>
                    projects.map((project, index) => {
                        const isActive = hoveredIndex === index;
                        const isFlipped = flippedCards.has(project.id);

                        if (!isDesktop) {
                            return (
                                <div
                                    key={project.id}
                                    className="w-full h-full [perspective:1000px] cursor-pointer"
                                    onClick={() => handleCardClick(project.id)}
                                    onMouseLeave={() => {
                                        if (!isDesktop) {
                                            setFlippedCards((prev) => {
                                                const newSet = new Set(prev);
                                                newSet.delete(project.id);
                                                return newSet;
                                            });
                                        }
                                    }}
                                >
                                    <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                                        {/* Front Face */}
                                        <Card className="absolute inset-0 w-full h-full flex flex-col overflow-hidden border border-border bg-background text-left [backface-visibility:hidden]">
                                            <div className="h-48 shrink-0 overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                            </div>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                                                <CardDescription className="line-clamp-2 text-sm text-muted-foreground">{project.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-grow pb-4 overflow-hidden">
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map((tag, idx) => (
                                                        <Badge
                                                            key={idx}
                                                            variant="secondary"
                                                            className="px-2 py-0.5 text-[10px] bg-primary/10 text-primary border-none font-medium"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <p className="mt-4 text-[10px] text-primary/60 font-medium uppercase tracking-wider">Tap to view details</p>
                                            </CardContent>
                                            <CardFooter className="flex justify-between items-center pt-0 pb-6 px-4 mt-auto border-t border-border/10 bg-background/50">
                                                {project.githubUrl && (
                                                    <Button variant="outline" size="sm" className="h-8 text-xs rounded-md transition-all duration-300 hover:bg-primary/5 hover:text-primary px-3 w-fit" asChild onClick={(e) => e.stopPropagation()}>
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Github className="mr-1.5 h-3.5 w-3.5" />
                                                            Code
                                                        </a>
                                                    </Button>
                                                )}
                                                {project.liveUrl && project.title !== "Coming Soon" && (
                                                    <Button variant="default" size="sm" className="h-8 text-xs rounded-md shadow-sm transition-all duration-300 hover:shadow-md active:scale-95 px-3 w-fit" asChild onClick={(e) => e.stopPropagation()}>
                                                        <a
                                                            href={project.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                                                            Live Demo
                                                        </a>
                                                    </Button>
                                                )}
                                            </CardFooter>
                                        </Card>

                                        {/* Back Face */}
                                        <Card className="absolute inset-0 w-full h-full flex flex-col overflow-hidden border border-border bg-gradient-to-br from-background via-primary/[0.02] to-background text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                            <CardHeader className="pb-2 border-b border-border/50">
                                                <CardTitle className="text-xl font-bold text-primary">{project.title}</CardTitle>
                                                <CardDescription className="text-xs font-semibold uppercase tracking-widest text-primary/60">Project Overview</CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-grow py-4 overflow-y-auto custom-scrollbar">
                                                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                                                    {project.detailedDescription}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map((tag, idx) => (
                                                        <Badge
                                                            key={idx}
                                                            variant="secondary"
                                                            className="px-2 py-0.5 text-[10px] bg-primary/20 text-primary border-none font-semibold"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <p className="mt-6 text-[10px] text-primary/60 font-medium uppercase tracking-wider">Tap to go back</p>
                                            </CardContent>
                                            <CardFooter className="flex justify-between items-center pt-0 pb-6 px-4 mt-auto border-t border-border/50 bg-background/50">
                                                {project.githubUrl && (
                                                    <Button variant="outline" size="sm" className="h-8 text-xs rounded-md transition-all duration-300 hover:bg-primary/5 hover:text-primary px-3 w-fit" asChild onClick={(e) => e.stopPropagation()}>
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Github className="mr-1.5 h-3.5 w-3.5" />
                                                            Code
                                                        </a>
                                                    </Button>
                                                )}
                                                {project.liveUrl && project.title !== "Coming Soon" && (
                                                    <Button variant="default" size="sm" className="h-8 text-xs rounded-md shadow-sm transition-all duration-300 hover:shadow-md active:scale-95 px-3 w-fit" asChild onClick={(e) => e.stopPropagation()}>
                                                        <a
                                                            href={project.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                                                            Live Demo
                                                        </a>
                                                    </Button>
                                                )}
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </div>
                            );
                        }

                        const linkHref = project.liveUrl || project.githubUrl || "#";
                        return (
                            <div
                                key={project.id}
                                className="group relative w-[240px] h-[340px] sm:w-[280px] sm:h-[380px] overflow-hidden rounded-xl bg-card border border-border shadow-lg block"
                            >
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`h-full w-full object-cover transition-transform duration-700 ease-out ${isActive ? 'scale-110' : 'scale-100'
                                            }`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-60" />
                                </div>

                                <div className="absolute inset-0 flex flex-col justify-between p-4">
                                    <div className="flex justify-between items-start">
                                        <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-background/80 backdrop-blur">
                                            {project.tags[0]}
                                        </Badge>
                                        <div className="flex flex-col gap-2 items-end">
                                            <a
                                                href={linkHref}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className={`group/link h-6 flex items-center rounded-full bg-primary text-primary-foreground transition-all duration-500 ease-out overflow-hidden ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                                                    } w-6 hover:w-24 px-1.5 hover:px-3 shadow-lg`}
                                            >
                                                <div className="flex items-center gap-1.5">
                                                    <ArrowUpRight
                                                        size={12}
                                                        className={`shrink-0 transition-transform duration-500 ${isActive ? 'rotate-0' : '-rotate-45'
                                                            }`}
                                                    />
                                                    <span className="text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 delay-100 uppercase">
                                                        Live Demo
                                                    </span>
                                                </div>
                                            </a>
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className={`group/github h-6 flex items-center rounded-full bg-[#24292e] text-white transition-all duration-500 ease-out overflow-hidden ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                                                        } w-6 hover:w-28 px-1.5 hover:px-3 shadow-lg delay-75`}
                                                >
                                                    <div className="flex items-center gap-1.5">
                                                        <Github
                                                            size={12}
                                                            className={`shrink-0 transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-0'
                                                                }`}
                                                        />
                                                        <span className="text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/github:opacity-100 transition-opacity duration-300 delay-100 uppercase">
                                                            Github repo.
                                                        </span>
                                                    </div>
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                                        <h3 className="text-xl font-bold leading-tight text-foreground">{project.title}</h3>
                                        <div className={`h-0.5 bg-primary mt-2 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </RadialScrollGallery>
        </section>
    );
}
