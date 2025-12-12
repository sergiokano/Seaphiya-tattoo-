import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

const PeonyTransition: React.FC = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={containerRef} className="bg-ink-black py-48 md:py-64 flex flex-col items-center justify-center relative overflow-hidden border-t border-white/5">
            {/* ORGANIC FINE LINE FLOWERS SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                 <g stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    {/* Main Flowing Stem Line */}
                    <motion.path 
                        d="M-20,180 C20,170 40,190 60,150 C80,110 50,80 80,60 C110,40 140,50 160,20" 
                        strokeWidth="0.15" 
                        style={{ pathLength: scrollYProgress }} 
                    />
                    
                    {/* Organic Peony Shape 1 (Left) */}
                    <motion.path 
                        d="M50,140 C40,130 30,140 30,150 C30,165 50,170 60,160" 
                        strokeWidth="0.1" 
                        style={{ pathLength: scrollYProgress }} 
                    />
                    <motion.path 
                        d="M60,150 C70,140 80,150 75,165" 
                        strokeWidth="0.1" 
                        style={{ pathLength: scrollYProgress }} 
                    />

                    {/* Central Bloom - Fine Line Style */}
                    <motion.path 
                        d="M80,60 C70,50 70,30 90,30 C110,30 110,50 100,60 C90,70 80,70 80,60" 
                        strokeWidth="0.15" 
                        style={{ pathLength: scrollYProgress }} 
                    />
                    {/* Petals radiating */}
                    <motion.path d="M90,30 C90,10 110,0 120,20" strokeWidth="0.1" style={{ pathLength: scrollYProgress }} />
                    <motion.path d="M90,30 C70,20 60,40 65,55" strokeWidth="0.1" style={{ pathLength: scrollYProgress }} />
                    <motion.path d="M100,60 C120,70 130,50 120,40" strokeWidth="0.1" style={{ pathLength: scrollYProgress }} />

                    {/* Floating Leaves / Details */}
                    <motion.path d="M160,20 C170,10 180,30 190,10" strokeWidth="0.1" style={{ pathLength: scrollYProgress }} />
                    <motion.path d="M140,100 C150,90 160,95 155,110" strokeWidth="0.05" style={{ pathLength: scrollYProgress }} />
                    <motion.path d="M20,80 C30,70 40,85 35,95" strokeWidth="0.05" style={{ pathLength: scrollYProgress }} />
                 </g>
            </svg>

            <div className="relative z-10 text-center px-4 mix-blend-normal">
                 <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1.2, ease: "easeOut" }}
                 >
                    <h2 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] uppercase tracking-tighter text-white">
                        Where Art<br/>
                        <span className="text-transparent text-stroke tracking-normal italic font-editorial font-light">lives on skin</span>
                    </h2>
                 </motion.div>
            </div>
        </section>
    );
}

export default PeonyTransition;