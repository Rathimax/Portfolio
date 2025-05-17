import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Github, Instagram, Linkedin, Globe, FileText } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border hover:border-primary transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
          </motion.a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ContactSection = () => {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/abhayrajrathi/",
      icon: <Linkedin className="w-5 h-5 text-foreground" />,
      label: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/rathiabhayraj/",
      icon: <Instagram className="w-5 h-5 text-foreground" />,
      label: "Instagram",
    },
    {
      href: "https://portfolioanur4thi.netlify.app/",
      icon: <Globe className="w-5 h-5 text-foreground" />,
      label: "Portfolio",
    },
    {
      href: "https://github.com/Rathimax",
      icon: <Github className="w-5 h-5 text-foreground" />,
      label: "GitHub",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 md:px-8 lg:px-16 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            FIND ME ON
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Feel free to connect with me
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {socialLinks.map((link, index) => (
              <SocialLink
                key={index}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </div>

          <div className="mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 h-auto text-lg font-medium flex items-center gap-2"
                onClick={() => {
                  window.open(
                    "https://drive.google.com/file/d/1bu0YK5MNLB-v3njLdtKUv2VHBLS3GWvz/view?usp=share_link",
                    "_blank",
                  );
                }}
              >
                <FileText className="w-5 h-5" />
                Download Resume
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-20 border-t border-border pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-6">
              <div className="inline-block bg-muted text-muted-foreground px-4 py-2 rounded-md">
                <span className="font-semibold">Blogs</span> — Coming Soon
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Designed and Developed by ABHAY RAJ RATHI
              <br />
              Copyright © 2025 ARR
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
