import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar: React.FC = () => {
    const { scrollYProgress } = useScroll();

    // Add spring animation for smoother movement
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
            style={{
                scaleX,
                background: "linear-gradient(90deg, #22c55e 0%, #10b981 50%, #22c55e 100%)",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
            }}
        />
    );
};

export default ScrollProgressBar;
