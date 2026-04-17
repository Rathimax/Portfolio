"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TextPart {
  text: string;
  color: string;
}

export interface CursorDrivenParticleTypographyProps {
  className?: string;
  text?: string;
  parts?: TextPart[];
  fontSize?: number;
  fontFamily?: string;
  particleSize?: number;
  particleDensity?: number;
  dispersionStrength?: number;
  returnSpeed?: number;
  color?: string;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  dispersion: number;
  returnSpd: number;
  isAmbient: boolean;
  driftX: number;
  driftY: number;
  opacity: number;

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
    dispersion: number,
    returnSpd: number,
    isAmbient: boolean = false
  ) {
    this.x = x + (Math.random() - 0.5) * 10;
    this.y = y + (Math.random() - 0.5) * 10;
    this.originX = x;
    this.originY = y;
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5;
    this.size = size;
    this.color = color;
    this.dispersion = dispersion;
    this.returnSpd = returnSpd;
    this.isAmbient = isAmbient;
    this.driftX = (Math.random() - 0.5) * 0.2;
    this.driftY = (Math.random() - 0.5) * 0.2;
    this.opacity = isAmbient ? 0.2 + Math.random() * 0.5 : 1;
  }

  update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const interactionRadius = 120;

    if (distance < interactionRadius && mouseX !== -1000 && mouseY !== -1000) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (interactionRadius - distance) / interactionRadius;

      const repulsionX = forceDirectionX * force * this.dispersion;
      const repulsionY = forceDirectionY * force * this.dispersion;

      this.vx -= repulsionX;
      this.vy -= repulsionY;
    }

    if (this.isAmbient) {
      this.vx += this.driftX;
      this.vy += this.driftY;
      this.vx *= 0.96; // More friction for ambient
      this.vy *= 0.96;

      // Wrap-around or return-to-origin logic for ambient
      const distFromOrigin = Math.sqrt(
        Math.pow(this.x - this.originX, 2) + Math.pow(this.y - this.originY, 2)
      );

      if (distFromOrigin > 100) {
        this.vx += (this.originX - this.x) * 0.002;
        this.vy += (this.originY - this.y) * 0.002;
      }

      // Small chance to change drift
      if (Math.random() > 0.98) {
        this.driftX = (Math.random() - 0.5) * 0.2;
        this.driftY = (Math.random() - 0.5) * 0.2;
      }

      // Pulse opacity
      this.opacity = 0.3 + Math.abs(Math.sin(Date.now() * 0.001)) * 0.4;

      // Pulse size slightly if ambient
      this.size = 0.8 + Math.abs(Math.sin(Date.now() * 0.002)) * 0.6;
    } else {
      this.vx += (this.originX - this.x) * this.returnSpd;
      this.vy += (this.originY - this.y) * this.returnSpd;

      this.vx *= 0.85;
      this.vy *= 0.85;

      const distToOrigin = Math.sqrt(
        Math.pow(this.x - this.originX, 2) +
          Math.pow(this.y - this.originY, 2)
      );

      if (distToOrigin < 1 && Math.random() > 0.99) {
        this.vx += (Math.random() - 0.5) * 0.05;
        this.vy += (Math.random() - 0.5) * 0.05;
      }
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export function CursorDrivenParticleTypography({
  className,
  text,
  parts,
  fontSize = 120,
  fontFamily = "Inter, sans-serif",
  particleSize = 1.5,
  particleDensity = 6,
  dispersionStrength = 15,
  returnSpeed = 0.08,
  color,
}: CursorDrivenParticleTypographyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buffer = 150; // Extra room for particles to fly without clipping

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    let mouseX = -1000;
    let mouseY = -1000;

    let containerWidth = 0;
    let containerHeight = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;

    const init = () => {
      const container = containerRef.current;
      if (!container) return;

      containerWidth = container.clientWidth;
      containerHeight = container.clientHeight;
      canvasWidth = containerWidth + buffer * 2;
      canvasHeight = containerHeight + buffer * 2;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      canvas.style.position = "absolute";
      canvas.style.left = `-${buffer}px`;
      canvas.style.top = `-${buffer}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const computedStyle = window.getComputedStyle(container);
      const textColor = color || computedStyle.color || "#000000";

      const offCanvas = document.createElement("canvas");
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      offCtx.scale(dpr, dpr);
      let effectiveFontSize = fontSize;
      if (containerWidth < 480) effectiveFontSize = fontSize * 0.6;
      else if (containerWidth < 768) effectiveFontSize = fontSize * 0.8;
      
      offCtx.font = `bold ${effectiveFontSize}px ${fontFamily}`;
      offCtx.textBaseline = "middle";

      const rawParts: TextPart[] = parts || (text ? [{ text, color: textColor }] : []);
      
      const lines: { parts: TextPart[], width: number }[] = [];
      let currentLineParts: TextPart[] = [];
      let currentLineWidth = 0;
      const maxWidth = containerWidth * 0.95;

      rawParts.forEach(part => {
        const words = part.text.split(/(\s+)/);
        words.forEach(word => {
          if (word === "") return;
          const wordWidth = offCtx.measureText(word).width;
          
          if (currentLineWidth + wordWidth > maxWidth && currentLineParts.length > 0 && word.trim() !== "") {
            lines.push({ parts: currentLineParts, width: currentLineWidth });
            currentLineParts = [];
            currentLineWidth = 0;
          }
          
          currentLineParts.push({ text: word, color: part.color });
          currentLineWidth += wordWidth;
        });
      });
      if (currentLineParts.length > 0) {
        lines.push({ parts: currentLineParts, width: currentLineWidth });
      }

      const lineHeight = effectiveFontSize * 1.1;
      const totalHeight = lines.length * lineHeight;
      // Start Y centered relative to the VISIBLE container, then offset by buffer
      let startY = (containerHeight - totalHeight) / 2 + effectiveFontSize / 2 + buffer;

      lines.forEach((line, lineIndex) => {
        // Start X centered relative to the VISIBLE container, then offset by buffer
        let currentX = (containerWidth - line.width) / 2 + buffer;
        const currentY = startY + lineIndex * lineHeight;
        
        line.parts.forEach(part => {
          offCtx.fillStyle = part.color;
          offCtx.fillText(part.text, currentX, currentY);
          currentX += offCtx.measureText(part.text).width;
        });
      });

      const textCoordinates = offCtx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      particles = [];

      const step = Math.max(1, Math.floor(particleDensity * dpr));

      for (let y = 0; y < textCoordinates.height; y += step) {
        for (let x = 0; x < textCoordinates.width; x += step) {
          const index = (y * textCoordinates.width + x) * 4;
          const alpha = textCoordinates.data[index + 3] || 0;

          if (alpha > 128) {
            const r = textCoordinates.data[index];
            const g = textCoordinates.data[index + 1];
            const b = textCoordinates.data[index + 2];
            const pixelColor = `rgb(${r},${g},${b})`;

            particles.push(
              new Particle(
                x / dpr,
                y / dpr,
                particleSize,
                pixelColor,
                dispersionStrength,
                returnSpeed,
                false
              )
            );
          }
        }
      }

      const ambientCount = 60;
      for (let i = 0; i < ambientCount; i++) {
        const randomBase = particles[Math.floor(Math.random() * particles.length)];
        if (randomBase && !randomBase.isAmbient) {
          particles.push(
            new Particle(
              randomBase.originX,
              randomBase.originY,
              particleSize * 0.8,
              randomBase.color,
              dispersionStrength,
              returnSpeed,
              true
            )
          );
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach((particle) => {
        particle.update(mouseX, mouseY);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) + buffer;
      mouseY = (e.clientY - rect.top) + buffer;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      init();
    };

    const timeoutId = setTimeout(() => {
      init();
      animate();
    }, 100);

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    text,
    fontSize,
    fontFamily,
    particleSize,
    particleDensity,
    dispersionStrength,
    returnSpeed,
    color,
    parts,
    className,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full min-h-[400px] flex items-center justify-center relative touch-none overflow-visible",
        className
      )}
    >
      <canvas ref={canvasRef} className="block pointer-events-none" />
    </div>
  );
}
