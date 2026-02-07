import React, { useEffect, useRef } from "react";

const ParallaxLayers: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const layers = containerRef.current.querySelectorAll('.parallax-layer');
            const scrollY = window.scrollY;

            // Much stronger parallax speeds - layers move at very different rates
            const speeds = [0.1, 0.25, 0.4, 0.55, 0.7, 0.85];

            layers.forEach((layer, index) => {
                const speed = speeds[index] || 0.1;
                (layer as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Layer 1 - Farthest: Large grid pattern (slowest) */}
            <div className="parallax-layer absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-green-500/20 dark:text-green-400/30" />
                        </pattern>
                    </defs>
                    <rect width="100" height="200" fill="url(#grid)" />
                </svg>
            </div>

            {/* Layer 2 - Large floating code symbols */}
            <div className="parallax-layer absolute inset-0">
                <div className="absolute top-[5%] left-[5%] text-[150px] font-mono text-green-500/10 dark:text-green-400/15 font-bold">&lt;</div>
                <div className="absolute top-[15%] right-[10%] text-[120px] font-mono text-green-500/10 dark:text-green-400/15 font-bold">/&gt;</div>
                <div className="absolute bottom-[30%] left-[15%] text-[100px] font-mono text-green-500/10 dark:text-green-400/15 font-bold">{"{"}</div>
                <div className="absolute bottom-[20%] right-[20%] text-[100px] font-mono text-green-500/10 dark:text-green-400/15 font-bold">{"}"}</div>
            </div>

            {/* Layer 3 - Binary rain columns */}
            <div className="parallax-layer absolute inset-0">
                <div className="absolute top-0 left-[10%] text-2xl font-mono text-green-500/15 dark:text-green-400/20 leading-relaxed whitespace-pre">
                    {"01\n10\n01\n11\n00\n01\n10\n11\n00\n01\n10\n01"}
                </div>
                <div className="absolute top-[10%] left-[30%] text-xl font-mono text-green-500/12 dark:text-green-400/18 leading-relaxed whitespace-pre">
                    {"10\n01\n11\n00\n10\n01\n11\n00\n01\n10"}
                </div>
                <div className="absolute top-0 right-[15%] text-2xl font-mono text-green-500/15 dark:text-green-400/20 leading-relaxed whitespace-pre">
                    {"11\n00\n10\n01\n11\n00\n10\n01\n11\n00\n10\n01"}
                </div>
                <div className="absolute top-[20%] right-[35%] text-lg font-mono text-green-500/12 dark:text-green-400/18 leading-relaxed whitespace-pre">
                    {"00\n11\n01\n10\n00\n11\n01\n10"}
                </div>
            </div>

            {/* Layer 4 - Geometric shapes (mid-speed) */}
            <div className="parallax-layer absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                    {/* Large Hexagon */}
                    <polygon
                        points="150,100 220,60 290,100 290,180 220,220 150,180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-green-500/20 dark:text-green-400/25"
                    />
                    {/* Triangle */}
                    <polygon
                        points="900,150 980,300 820,300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-green-500/15 dark:text-green-400/20"
                    />
                    {/* Circle */}
                    <circle
                        cx="600"
                        cy="500"
                        r="80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="10,5"
                        className="text-green-500/20 dark:text-green-400/25"
                    />
                    {/* Square rotated */}
                    <rect
                        x="100"
                        y="500"
                        width="100"
                        height="100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        transform="rotate(45, 150, 550)"
                        className="text-green-500/15 dark:text-green-400/20"
                    />
                </svg>
            </div>

            {/* Layer 5 - Floating code snippets (faster) */}
            <div className="parallax-layer absolute inset-0">
                <div className="absolute top-[20%] left-[8%] font-mono text-lg text-green-600/25 dark:text-green-400/30">
                    const dev = true;
                </div>
                <div className="absolute top-[40%] right-[12%] font-mono text-base text-green-600/20 dark:text-green-400/25">
                    function()&#123;&#125;
                </div>
                <div className="absolute bottom-[35%] left-[20%] font-mono text-xl text-green-600/25 dark:text-green-400/30">
                    &lt;Component /&gt;
                </div>
                <div className="absolute top-[60%] right-[25%] font-mono text-lg text-green-600/20 dark:text-green-400/25">
                    import React
                </div>
                <div className="absolute bottom-[20%] left-[40%] font-mono text-base text-green-600/25 dark:text-green-400/30">
                    npm run dev
                </div>
            </div>

            {/* Layer 6 - Glowing orbs (fastest - closest to viewer) */}
            <div className="parallax-layer absolute inset-0">
                <div className="absolute top-[10%] left-[20%] w-40 h-40 bg-green-400/10 dark:bg-green-400/15 rounded-full blur-3xl" />
                <div className="absolute top-[50%] right-[10%] w-60 h-60 bg-green-500/8 dark:bg-green-500/12 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] left-[10%] w-32 h-32 bg-green-400/10 dark:bg-green-400/15 rounded-full blur-2xl" />
                <div className="absolute top-[30%] left-[50%] w-24 h-24 bg-green-500/8 dark:bg-green-500/10 rounded-full blur-2xl" />
            </div>
        </div>
    );
};

export default ParallaxLayers;
