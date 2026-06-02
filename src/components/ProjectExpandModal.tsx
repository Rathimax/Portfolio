import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ProjectModalData {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  features?: string[];
  images: string[]; // first image is hero, rest are gallery
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectExpandModalProps {
  project: ProjectModalData | null;
  originRect: DOMRect | null;
  onClose: () => void;
}

const springOpen = {
  type: "spring" as const,
  stiffness: 320,
  damping: 38,
  mass: 1,
};

const springClose = {
  type: "spring" as const,
  stiffness: 400,
  damping: 42,
  mass: 0.9,
};

export default function ProjectExpandModal({
  project,
  originRect,
  onClose,
}: ProjectExpandModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [fullscreenImage, setFullscreenImage] = React.useState<string | null>(null);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project?.id]);

  // Lock body scroll while open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Escape key  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fullscreenImage) {
          setFullscreenImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, fullscreenImage]);

  const scrollImages = (dir: "left" | "right") => {
    if (!project) return;
    const total = project.images.length;
    setCurrentImageIndex((prev) =>
      dir === "left" ? (prev - 1 + total) % total : (prev + 1) % total
    );
  };

  // Build initial rect (where the card was on screen)
  const initial = originRect
    ? {
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: "12px",
        opacity: 1,
      }
    : {
        top: "50%",
        left: "50%",
        width: 0,
        height: 0,
        borderRadius: "50%",
        opacity: 0,
      };

  // Exit: shrink back to card origin AND fade to 0 so the dark bg never
  // lingers as a bare black box after the content disappears.
  const exitState = originRect
    ? {
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: "12px",
        opacity: 0,
      }
    : { opacity: 0, scale: 0.9 };

  const target = {
    top: 0,
    left: 0,
    width: "100vw",
    height: "100dvh",
    borderRadius: "0px",
    opacity: 1,
  };

  return (
    <>
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={onClose}
          />

          {/* Expanding Card */}
          <motion.div
            key={`modal-${project.id}`}
            className="fixed z-[210] overflow-hidden bg-[#f9f6ee] dark:bg-black text-foreground"
            style={{ position: "fixed" }}
            initial={initial}
            animate={{ ...target, transition: springOpen }}
            exit={{ ...exitState, transition: { type: "tween", duration: 0.38, ease: [0.4, 0, 1, 1] } }}
            transition={springOpen}
          >
            {/* Inner content — fades in after expand, fades with outer on close */}
            <motion.div
              className="relative w-full h-full flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.22, delay: 0.2 }}
            >
              {/* ── Top Bar — floats above image with no background seam ── */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-border bg-background/80 text-foreground hover:bg-muted backdrop-blur-sm h-8 text-xs"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      asChild
                      size="sm"
                      className="bg-green-500 hover:bg-green-400 text-black h-8 text-xs font-semibold"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 border border-border backdrop-blur-sm transition-all duration-200 hover:scale-105 text-sm font-medium text-foreground"
                  aria-label="Back to projects"
                >
                  Back to projects
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* ── Main Layout ── */}
              <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
                {/* ── Image Gallery Side (Bento Grid) ── */}
                <div className="relative w-full lg:w-1/2 flex-shrink-0 lg:h-full lg:p-8 lg:pt-24 lg:pb-8 overflow-y-auto custom-scrollbar">
                  <div className="px-4 lg:px-0 mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-foreground/80 tracking-tight">Project Showcase</h3>
                  </div>
                  <div className="p-4 lg:p-0 pt-0">
                    {/* Hero Image */}
                    {project.images.length > 0 && (
                      <div 
                        className="w-full overflow-hidden rounded-2xl shadow-xl bg-[#0a0a0a] cursor-pointer ring-1 ring-white/5 hover:ring-white/20 transition-all mb-4 md:mb-6"
                        onClick={() => setFullscreenImage(project.images[0])}
                      >
                        <img
                          src={project.images[0]}
                          alt={`${project.title} screenshot 1`}
                          className="w-full h-auto block object-cover"
                        />
                      </div>
                    )}

                    {/* Masonry Layout for Remaining Images */}
                    {project.images.length > 1 && (
                      <div className="flex gap-4 md:gap-6 items-start">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4 md:gap-6 flex-1">
                          {project.images.slice(1).filter((_, i) => i % 2 === 0).map((img, i) => (
                            <div 
                              key={`left-${i}`}
                              className="w-full overflow-hidden rounded-2xl shadow-xl bg-[#0a0a0a] cursor-pointer ring-1 ring-white/5 hover:ring-white/20 transition-all"
                              onClick={() => setFullscreenImage(img)}
                            >
                              <img
                                src={img}
                                alt={`${project.title} screenshot ${i * 2 + 2}`}
                                className="w-full h-auto block object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        {/* Right Column */}
                        <div className="flex flex-col gap-4 md:gap-6 flex-1">
                          {project.images.slice(1).filter((_, i) => i % 2 === 1).map((img, i) => (
                            <div 
                              key={`right-${i}`}
                              className="w-full overflow-hidden rounded-2xl shadow-xl bg-[#0a0a0a] cursor-pointer ring-1 ring-white/5 hover:ring-white/20 transition-all"
                              onClick={() => setFullscreenImage(img)}
                            >
                              <img
                                src={img}
                                alt={`${project.title} screenshot ${i * 2 + 3}`}
                                className="w-full h-auto block object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Details Side ── */}
                <div className="flex-1 lg:w-1/2 lg:h-full lg:overflow-y-auto dotted-background custom-scrollbar">
                  <div className="px-8 md:px-16 lg:px-12 xl:px-16 py-8 lg:py-24 max-w-3xl mx-auto w-full">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        className="bg-green-500/15 text-green-400 border border-green-500/30 hover:bg-green-500/25 transition-colors duration-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                    {project.title}
                  </h2>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-green-400 mb-6 rounded-full" />

                  {/* Short description */}
                  <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Long description */}
                  {project.detailedDescription && (
                    <p className="text-base text-foreground/80 leading-relaxed mb-6">
                      {project.detailedDescription}
                    </p>
                  )}

                  {/* Features List */}
                  {project.features && project.features.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-base text-foreground/80">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {fullscreenImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            onClick={() => setFullscreenImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <motion.img
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
