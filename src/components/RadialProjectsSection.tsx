'use client';

import React, { useState, useRef, useCallback } from 'react';
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
import ProjectExpandModal, { ProjectModalData } from "@/components/ProjectExpandModal";

interface Project {
    id: number;
    title: string;
    description: string;
    detailedDescription: string;
    features?: string[];
    image: string;
    images: string[]; // full gallery: first = hero
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const projects: Project[] = [
    {
        id: 11,
        title: "DOCKFLOW AI",
        description: "A powerful AI-driven suite for PDF and document tools with an evolved workspace.",
        detailedDescription: "",
        features: [
            "Architected and deployed a privacy-first document intelligence platform using Next.js 15 (App Router) and Node.js 22 (Express), implementing a zero-retention security model that permanently purges all processed files within 60 seconds, ensuring complete user data privacy without authentication overhead or tracking.",
            "Engineered a high-performance document processing pipeline capable of complex file conversions (PDF ↔ Word, PPTX ↔ PDF, Image ↔ PDF) by bridging Node.js with native system tools (LibreOffice, pdf2docx, Sharp), handling concurrent multi-format transformations at scale.",
            "Integrated Google Gemini 2.5 Flash API to deliver advanced AI-driven features including contextual document summarization, multi-language translation, and RAG-based \"Chat with PDF\" functionality, demonstrating applied AI implementation in production web applications.",
            "Developed browser-native PDF manipulation tools using pdf-lib and TypeScript, enabling users to merge, split, compress, watermark, and annotate PDFs client-side with interactive visual feedback, eliminating backend dependencies for lightweight operations.",
            "Containerized the multi-environment backend (Node.js + Python dependencies) using Docker, establishing a scalable, reproducible deployment architecture; designed a highly responsive, accessible frontend with Tailwind CSS 4, Framer Motion, and Radix UI primitives."
        ],
        image: "/images/dockflow-ai.png",
        images: [
            "/images/dockflow-ai.png",
            "/images/dockflow-ai-2.png",
            "/images/dockflow-ai-3.png",
            "/images/dockflow-ai-4.png",
            "/images/dockflow-ai-5.png",
            "/images/dockflow-ai-6.png"
        ],
        tags: ["React", "TypeScript", "Tailwind CSS", "PDF manipulation"],
        githubUrl: "https://github.com/Rathimax/Dockflow-AI",
        liveUrl: "https://dockflow-ai.vercel.app",
    },
    {
        id: 1,
        title: "Portfolio Website",
        description: "Personal portfolio website built with React and Tailwind CSS",
        detailedDescription: "",
        features: [
            "Developed a high-performance portfolio website using React 18, TypeScript, and Vite, focusing on responsive design, accessibility, and optimized user experience.",
            "Engineered an interactive particle typography system using HTML5 Canvas, pixel data extraction, and custom physics algorithms to create cursor-responsive text animations.",
            "Architected a multi-layered parallax scrolling experience by combining native scroll events, Framer Motion, and GSAP animations to deliver smooth 60-FPS interactions.",
            "Built advanced UI components including a radial gallery, 3D card transformations, interactive modals, and glassmorphic layouts using Radix UI and Tailwind CSS.",
            "Implemented a dynamic theming engine with OS preference detection, persistent user settings, and seamless dark/light mode transitions using localStorage and CSS variables.",
            "Optimized application performance through TypeScript type safety, React Suspense, lazy loading, memoization techniques, and efficient component architecture."
        ],
        image: "/images/portfolio.png",
        images: [
            "/images/portfolio.png",
            "/images/portfolio-2.png",
            "/images/portfolio-3.png",
            "/images/portfolio-4.png"
        ],
        tags: ["React", "Tailwind CSS", "Framer Motion"],
        githubUrl: "https://github.com/Rathimax/Portfolio",
        liveUrl: "https://abhayportfolio-mauve.vercel.app",
    },
    {
        id: 2,
        title: "ThinkAI Chatbot",
        description: "An intelligent conversational AI assistant with a modern, dark-themed interface.",
        detailedDescription: "",
        features: [
            "Architected a dual-model LLM platform supporting both Google Gemini (2.5 Flash/Pro) and OpenAI (GPT-4/3.5) APIs with seamless provider switching, enabling users to dynamically select optimal models for specific use cases and reducing vendor lock-in.",
            "Engineered real-time response streaming using ReadableStream and TextDecoder to process chunked JSON payloads from LLM APIs, implementing a high-performance \"typewriter\" effect with AbortController for graceful mid-stream cancellation and perceived latency reduction.",
            "Developed multimodal input pipeline supporting file and image attachments, converting media to Base64 inline data for Gemini's multimodal processing, and implemented robust error handling with mock-response fallbacks for offline development and testing.",
            "Built a ChatGPT-style multi-session chat management system with intelligent state serialization to localStorage, enabling persistent chat history across browser sessions without backend database dependencies, including auto-generated context-aware session titles.",
            "Implemented a dynamic theming engine with runtime CSS variable injection (custom accent colors, radial gradient glows), responsive adaptive UI with collapsible sidebars for mobile optimization, and secure markdown rendering (react-markdown + remark-gfm) for complex LLM outputs including code blocks and tables."
        ],
        image: "/images/thinkai.png",
        images: [
            "/images/thinkai.png",
            "/images/thinkai-2.png",
            "/images/thinkai-3.png",
            "/images/thinkai-4.png"
        ],
        tags: ["AI", "Chatbot", "NLP", "React"],
        githubUrl: "https://github.com/Rathimax/Ai-chatbot",
        liveUrl: "https://ai-chatbot-one-teal-95.vercel.app",
    },
    {
        id: 3,
        title: "City Guard",
        description:
            "Revolutionizing local governance through citizen issue reporting and streamlined municipal response.",
        detailedDescription: "",
        features: [
            "Architected and deployed a full-stack MERN application (React 19, Node.js, Express.js, MongoDB Atlas) with Vite-optimized bundling, implementing role-based authentication via Firebase (Email/Google OAuth) to segregate citizen reporting portal from executive dashboard with zero unauthorized access incidents.",
            "Engineered real-time geolocation and media pipeline using Google Maps API and Cloudinary integration, processing concurrent image uploads via Multer with secure server-side validation, enabling citizens to submit geotagged infrastructure reports at scale.",
            "Designed and implemented responsive UI with Glassmorphism design patterns, dark/light mode toggling, and Framer Motion animations using Tailwind CSS v4, achieving 98%+ mobile optimization score across iOS and Android devices.",
            "Built real-time analytics dashboard with data visualization (bar charts, donut charts, animated metric cards) displaying issue resolution rates and department efficiency metrics, enabling data-driven municipal decision-making and process optimization.",
            "Developed crowdsourced prioritization system with Reddit-style upvoting mechanism and real-time status tracking (Pending → In Progress → Resolved), increasing citizen engagement and municipal accountability across urban infrastructure management."
        ],
        image:
            "/images/City_Guard.png",
        images: [
            "/images/City_Guard.png",
            "/images/city-guard-2.png",
            "/images/city-guard-3.png",
            "/images/city-guard-4.png"
        ],
        tags: ["Java Script", "Cloudinary API"],
        githubUrl: "https://github.com/Rathimax/City-Guard-",
        liveUrl: "https://city-guard-chi.vercel.app",
    },
    {
        id: 4,
        title: "Weather Forecast App v3",
        description:
            "Latest version with advanced features and modern design",
        detailedDescription: "",
        features: [
            "Engineered a scalable weather intelligence platform using Vanilla JavaScript, HTML5, and CSS3, integrating multiple RESTful APIs (OpenWeatherMap, GeoDB Cities via RapidAPI) to deliver real-time meteorological data, 5-day forecasts, and Air Quality Index (AQI) metrics without frontend framework overhead.",
            "Optimized concurrent asynchronous data fetching using Promise.all() to retrieve current weather, forecasts, and AQI data simultaneously, significantly reducing initial load times while maintaining strict separation of concerns between API handling and UI rendering layers.",
            "Implemented a debounced auto-complete search engine leveraging the GeoDB Cities API with custom debouncing utilities, preventing API rate limiting while delivering instant city suggestions and optimizing network efficiency during high-velocity user interactions.",
            "Developed a hyper-local experience by integrating the HTML5 Geolocation API for automatic user coordinate detection on load, coupled with a persistent Favorites Management system using localStorage, enabling seamless cross-session access to frequently searched locations.",
            "Designed a context-aware dynamic UI that automatically updates backgrounds based on real-time weather conditions (clear skies, rain, snow), complemented by toggleable Dark Mode, fluid CSS animations, and graceful error handling (loading spinners, toast notifications) for optimal perceived performance."
        ],
        image:
            "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
            "/images/weather-app-v3-2.png",
            "/images/weather-app-v3-3.png",
            "/images/weather-app-v3-4.png"
        ],
        tags: ["API Integration", "Modern UI"],
        githubUrl: "https://github.com/Rathimax/weather-app-v3",
        liveUrl: "https://weather-app-v3-five.vercel.app",
    },
    {
        id: 5,
        title: "Space Shooter Game",
        description: "Interactive browser-based space shooter with multiple levels",
        detailedDescription: "",
        features: [
            "Developed a high-performance 2D space shooter game using HTML5 Canvas, CSS3, and Vanilla JavaScript, implementing a custom game loop with requestAnimationFrame for smooth real-time gameplay.",
            "Designed a complete game state management system supporting endless wave progression, dynamic difficulty scaling, player upgrades, and in-game currency mechanics.",
            "Built cross-platform controls with keyboard input for desktop users and a custom multi-touch virtual joystick for mobile devices.",
            "Implemented advanced gameplay mechanics including boss battle phases, homing missiles, collision detection algorithms, and dynamic enemy spawning systems.",
            "Engineered persistent game progression using Local Storage to save high scores, settings, currency, and player upgrades across sessions.",
            "Enhanced user experience with audio management, dynamic background music transitions, particle explosion effects, screen shake feedback, and responsive HUD elements."
        ],
        image: "/images/Spaceshooting1.png",
        images: [
            "/images/Spaceshooting1.png",
            "/images/Spaceshooting2.png",
            "/images/Spaceshooting3.png",
            "/images/Spaceshooting4.png",
            "/images/Spaceshooting5.png"
        ],
        tags: ["JavaScript", "HTML", "Game Development"],
        githubUrl: "https://github.com/Rathimax/Spaceshooter-Game",
        liveUrl: "https://spaceshooter-game.vercel.app",
    },
    {
        id: 6,
        title: "Beige & Beans Cafe Store",
        description:
            "Modern responsive website with clean design and interactive elements",
        detailedDescription: "",
        features: [
            "Architected and developed a full-stack e-commerce platform using React 19, Vite, Java 21, Spring Boot, and MongoDB.",
            "Designed RESTful APIs and a scalable MongoDB schema for menu management, cart persistence, user accounts, and order processing.",
            "Built a feature-rich Admin Dashboard with inventory management, content management, order tracking, and business analytics capabilities.",
            "Implemented real-time order monitoring and status updates through automated frontend polling mechanisms.",
            "Developed analytics modules for visitor tracking, revenue analysis, sales reporting, and top-selling product insights.",
            "Integrated Firebase Authentication to provide secure user login, account management, and authenticated analytics tracking.",
            "Automated PDF and Word report generation for inventory and sales data using jsPDF, jsPDF-AutoTable, and DOCX libraries.",
            "Created a responsive glassmorphic UI using Tailwind CSS and enhanced user experience with GSAP-powered animations and micro-interactions.",
            "Engineered custom reusable UI components including advanced dropdowns, combo boxes, filters, and cart/account side drawers.",
            "Optimized frontend performance through React component architecture and Vite build optimizations."
        ],
        image: "/images/beige-and-beans-cafe2.png",
        images: [
            "/images/beige-and-beans-cafe2.png",
            "/images/beige-and-beans-cafe3.png",
            "/images/beige-and-beans-cafe4.png",
            "/images/beige-and-beans-cafe5.png",
            "/images/beige-and-beans-cafe6.png"
        ],
        tags: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/Rathimax/Coffee-Shop-Website",
        liveUrl: "https://functional-webpage.vercel.app",
    },
    {
        id: 7,
        title: "FitTrack",
        description:
            "Track your fitness journey with detailed workout logs and progress analytics",
        detailedDescription: "",
        features: [
            "Architected a context-aware AI coaching backend using Node.js/Express and Google Gemini 2.5 Flash, dynamically injecting real-time user workout history and nutritional data into multi-turn conversational prompts to deliver personalized fitness and diet guidance with high contextual relevance.",
            "Engineered an AI-powered computer vision system utilizing Gemini Vision API to instantly extract macro-nutritional data (calories, protein, carbs, fats) from food images, implementing a custom JSON-enforced prompting strategy for strict data schema adherence and enabling interactive refinement via natural language feedback loops.",
            "Built and deployed a Progressive Web App (PWA) using Vanilla JavaScript (ES Modules) and Tailwind CSS, delivering a native-like, installable mobile experience on iOS and Android with offline data accessibility, coupled with Firebase Firestore for real-time dual-mode (Exercise & Diet) data synchronization across devices.",
            "Developed a proprietary \"Muscle Heatmap\" algorithm that aggregates 7-day training intensity data to visualize muscle group recovery and focus, integrated with interactive PR (Personal Record) tracking and strength progression analytics for data-driven training optimization.",
            "Implemented a gamification engine featuring a milestone-based Trophy Case system and a custom \"Protein Consistency Score\" metric, driving long-term user retention and behavioral consistency, complemented by Firebase Google Sign-In for secure health data protection and cross-platform session management."
        ],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
            "/images/Fittrack-2.png",
            "/images/Fittrack-3.png",
            "/images/Fittrack-4.png",
            "/images/Fittrack-5.png",
            "/images/Fittrack-6.png",
            "/images/Fittrack-7.png"
        ],
        tags: ["Fitness", "Tracking", "Analytics"],
        githubUrl: "https://github.com/Rathimax/gym-progress-tracker",
        liveUrl: "https://fittrack-rathiabhay-app.vercel.app",
    },
    {
        id: 8,
        title: "Habit Tracker iOS",
        description:
            "Native iOS habit tracking app built with Swift and SwiftUI",
        detailedDescription: "",
        features: [
            "Developed a native iOS habit-tracking application using SwiftUI and SwiftData, enabling efficient management of habits, schedules, progress tracking, and analytics.",
            "Engineered a gamification system featuring XP progression, streak tracking, achievement badges, and dynamic leveling to improve user engagement and retention.",
            "Implemented interval-based and scheduled push notifications using UserNotifications, including actionable reminders that allow habit completion directly from the lock screen.",
            "Built reactive countdown timers using the Combine framework to support duration-based activities such as focus sessions and productivity tracking.",
            "Designed an analytics dashboard with custom heatmaps, streak visualization, and historical progress insights to help users monitor long-term consistency.",
            "Enhanced user experience through responsive SwiftUI interfaces, dynamic animations, haptic feedback, and custom sound effects."
        ],
        image: "/images/Habbit tracker-1.png",
        images: [
            "/images/Habbit tracker-1.png",
            "/images/Habbit tracker-2.png",
            "/images/Habbit tracker-3.png",
            "/images/Habbit tracker-4.png",
            "/images/Habbit tracker-5.png",
            "/images/Habbit tracker-6.png"
        ],
        tags: ["Swift", "SwiftUI", "iOS"],
        githubUrl: "https://github.com/Rathimax/Habbit-tracker-IOS",
    },
];

export default function DemoRadialScrollGalleryBento() {
    const isDesktop = useIsDesktop(1024);
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    // Modal state
    const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null);
    const [originRect, setOriginRect] = useState<DOMRect | null>(null);

    const handleCardClick = (projectId: number) => {
        if (isDesktop) return; // Desktop uses expand modal, not flip
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

    const handleDesktopCardClick = useCallback(
        (project: Project, e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setOriginRect(rect);
            setSelectedProject({
                id: project.id,
                title: project.title,
                description: project.description,
                detailedDescription: project.detailedDescription,
                features: project.features,
                images: project.images,
                tags: project.tags,
                githubUrl: project.githubUrl,
                liveUrl: project.liveUrl,
            });
        },
        []
    );

    const handleCloseModal = useCallback(() => {
        setSelectedProject(null);
        // Keep originRect until exit animation finishes
        setTimeout(() => setOriginRect(null), 700);
    }, []);

    return (
        <>
            <section id="projects" className="text-foreground w-full bg-transparent">
                <div className="pt-12 pb-2 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-7xl mx-auto px-4"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                            PROJECTS
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                            A showcase of my design and development work
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground/70 max-w-2xl mx-auto mt-1 italic">
                            (Tap on any card to explore project details)
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
                                                <div className="h-40 shrink-0 overflow-hidden">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                    />
                                                </div>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
                                                    <CardDescription className="line-clamp-2 text-xs text-muted-foreground">{project.description}</CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex-grow pb-4 overflow-hidden">
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tags.map((tag, idx) => (
                                                            <Badge
                                                                key={idx}
                                                                variant="secondary"
                                                                className="px-2 py-0.5 text-[9px] bg-primary/10 text-primary border-none font-medium"
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <p className="mt-4 text-[9px] text-primary/60 font-medium uppercase tracking-wider">Tap to view details</p>
                                                </CardContent>
                                                <CardFooter className="flex justify-between items-center pt-0 pb-6 px-4 mt-auto border-t border-border/10 bg-background/50">
                                                    {project.githubUrl && (
                                                        <Button variant="outline" size="sm" className="h-8 text-xs rounded-md transition-all duration-300 hover:bg-primary/5 hover:text-primary px-3 w-fit" asChild onClick={(e) => e.stopPropagation()}>
                                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                                <Github className="mr-1.5 h-3.5 w-3.5" />
                                                                Code
                                                            </a>
                                                        </Button>
                                                    )}
                                                    {project.liveUrl && project.title !== "Coming Soon" && (
                                                        <Button variant="default" size="sm" className="h-8 text-xs rounded-md shadow-sm transition-all duration-300 hover:shadow-md active:scale-95 px-3 w-fit" asChild onClick={(e) => e.stopPropagation()}>
                                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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
                                                    <CardTitle className="text-lg font-bold text-primary">{project.title}</CardTitle>
                                                    <CardDescription className="text-xs font-semibold uppercase tracking-widest text-primary/60">Project Overview</CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex-grow py-4 overflow-y-auto custom-scrollbar">
                                                    <div className="text-xs leading-relaxed text-muted-foreground mb-4 space-y-2">
                                                        {project.detailedDescription ? (
                                                            <p>{project.detailedDescription}</p>
                                                        ) : (
                                                            <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground/90">
                                                                {project.features?.map((feature, fIdx) => (
                                                                    <li key={fIdx}>{feature}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tags.map((tag, idx) => (
                                                            <Badge
                                                                key={idx}
                                                                variant="secondary"
                                                                className="px-2 py-0.5 text-[9px] bg-primary/20 text-primary border-none font-semibold"
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <p className="mt-6 text-[9px] text-primary/60 font-medium uppercase tracking-wider">Tap to go back</p>
                                                </CardContent>
                                                <CardFooter className="flex justify-between items-center pt-0 pb-6 px-4 mt-auto border-t border-border/50 bg-background/50">
                                                    {project.githubUrl && (
                                                        <Button variant="outline" size="sm" className="h-8 text-xs rounded-md transition-all duration-300 hover:bg-primary/5 hover:text-primary px-3 w-fit" asChild onClick={(e) => e.stopPropagation()}>
                                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                                <Github className="mr-1.5 h-3.5 w-3.5" />
                                                                Code
                                                            </a>
                                                        </Button>
                                                    )}
                                                    {project.liveUrl && project.title !== "Coming Soon" && (
                                                        <Button variant="default" size="sm" className="h-8 text-xs rounded-md shadow-sm transition-all duration-300 hover:shadow-md active:scale-95 px-3 w-fit" asChild onClick={(e) => e.stopPropagation()}>
                                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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

                            // ── Desktop Card ──
                            return (
                                <div
                                    key={project.id}
                                    className="group relative w-[240px] h-[340px] sm:w-[280px] sm:h-[380px] overflow-hidden rounded-xl bg-card border border-border shadow-lg block cursor-pointer"
                                    onClick={(e) => handleDesktopCardClick(project, e)}
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
                                                <div
                                                    className={`group/link h-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-500 ease-out overflow-hidden ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                                                        } w-6 hover:w-24 shadow-lg`}
                                                >
                                                    <div className="flex items-center justify-center">
                                                        <ArrowUpRight
                                                            size={12}
                                                            className={`shrink-0 transition-transform duration-500 ${isActive ? 'rotate-0' : '-rotate-45'
                                                                }`}
                                                        />
                                                        <span className="text-[10px] font-bold whitespace-nowrap overflow-hidden max-w-0 opacity-0 group-hover/link:max-w-[40px] group-hover/link:opacity-100 group-hover/link:ml-1.5 transition-all duration-500 ease-out uppercase">
                                                            View
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                                            <h3 className="text-xl font-bold leading-tight text-foreground">{project.title}</h3>
                                            <div className={`h-0.5 bg-primary mt-2 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                                            {isActive && (
                                                <p className="mt-2 text-[10px] text-white/60 uppercase tracking-wider font-medium">
                                                    Click to explore →
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </RadialScrollGallery>
            </section>

            {/* Modal — rendered outside section to avoid z-index / overflow clipping */}
            <ProjectExpandModal
                project={selectedProject}
                originRect={originRect}
                onClose={handleCloseModal}
            />
        </>
    );
}
