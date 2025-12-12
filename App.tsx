import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import PeonyTransition from './components/PeonyTransition';
import ScrollRevealText from './components/ScrollRevealText';
import { ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

const MainContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Smooth Scroll Physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 1 });

  // Parallax for Hero Text
  const heroTextY = useTransform(smoothProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  // Image assets (using stable placeholders that match the user's description)
  const images = {
    hipPeony: 'https://images.unsplash.com/photo-1562962230-16bc46364924?q=80&w=2565&auto=format&fit=crop',
    pinkCherry: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?q=80&w=1887&auto=format&fit=crop',
    artist: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1974&auto=format&fit=crop'
  };

  return (
    <motion.div 
      key="content"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-ink-black min-h-[400vh] text-pure-white selection:bg-pure-white selection:text-ink-black font-sans antialiased relative"
    >
      <Navbar />

      {/* --- HERO SECTION: MINIMALIST TYPOGRAPHY --- */}
      <section ref={heroRef} className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-ink-black">
          
          <motion.div 
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="relative z-10 flex flex-col items-center justify-center w-full"
          >
            {/* Top decorative elements - Perfectly Aligned with Title */}
            <div className="w-[80vw] md:w-[70vw] flex justify-between mb-8 md:mb-12 text-[10px] font-mono uppercase tracking-widest opacity-50 text-white">
                <span>Est. 2020</span>
                <span>Miami — New York</span>
            </div>

            {/* Main Title - Zoom Out Animation */}
            <motion.h1 
                initial={{ scale: 1.2, filter: "blur(10px)" }}
                animate={{ scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[18vw] md:text-[20vw] font-black leading-[0.8] tracking-tighter text-pure-white mix-blend-difference select-none"
            >
                SEAPHIYA
            </motion.h1>

            {/* Copywriting / Subtitle */}
            <div className="relative mt-12 md:mt-16 text-center mix-blend-difference">
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="font-editorial italic text-3xl md:text-5xl lg:text-6xl text-chrome font-light"
                >
                    "Etching silence into skin."
                </motion.p>
                
                <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 1, ease: "circOut" }}
                    className="w-24 h-[1px] bg-white/50 mx-auto my-8"
                />

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/60"
                >
                    Fine Line & Micro-Realism
                </motion.p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="absolute bottom-12 z-20 flex flex-col items-center gap-4"
          >
            <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"></div>
          </motion.div>
      </section>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="relative z-20 w-full flex flex-col gap-0">
          
          {/* 1. ABOUT / THE ARTIST SECTION */}
          <section id="about" className="relative min-h-screen flex items-center py-24 overflow-hidden bg-ink-black">
            
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 flex justify-end items-center">
                <div className="relative w-full md:w-[75vw] h-full md:h-screen group overflow-hidden">
                    {/* Noise Texture - Very Subtle */}
                    <div className="absolute inset-0 z-20 opacity-10 bg-noise bg-repeat pointer-events-none mix-blend-overlay"></div>
                    
                    {/* Minimal Gradient just to fade left edge, ensuring image is visible */}
                    <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-ink-black via-transparent to-transparent start-0 w-1/2" />
                    
                    {/* Artist Image */}
                    <img 
                        src={images.artist}
                        alt="Seaphiya Tattooing"
                        className="w-full h-full object-cover object-center md:object-right opacity-100 
                                   transition-all duration-[2s] ease-out" 
                    />
                </div>
            </div>

            <div className="relative z-20 w-full md:w-1/2 px-6 md:px-20 pointer-events-none mt-32 md:mt-0">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-[1px] bg-white"></div>
                    <span className="font-mono text-xs uppercase tracking-widest text-white">The Artist</span>
                </div>
                
                <div className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-left leading-relaxed text-gray-200 drop-shadow-2xl shadow-black">
                    <ScrollRevealText>
                        Specializing in fine line and micro-realism. Creating pieces that breathe, move, and age with grace. From intimate floral arrangements to bold abstract chrome, every line is deliberate.
                    </ScrollRevealText>
                </div>

                <div className="flex flex-col mt-16 border-l border-white/20 pl-6 backdrop-blur-sm">
                      <h4 className="font-editorial italic text-4xl text-white">Seaphiya</h4>
                      <p className="font-mono text-mono text-[10px] uppercase tracking-widest mt-2 opacity-70 leading-relaxed">
                        Artist. Based in Miami, USA.<br/>
                        Noble Art Studio.
                      </p>
                </div>
            </div>
          </section>

          {/* TRANSITION / BREATHER SECTION WITH PEONY ANIMATION */}
          <PeonyTransition />

          {/* 2. GALLERY GRID */}
          <section id="work" className="bg-ink-black border-t border-white/10 relative z-30">
            <div className="relative bg-ink-black/90 border-b border-white/10 px-6 py-6 flex justify-between items-center z-40">
                <span className="font-mono text-xs uppercase tracking-widest">[ Selected Works ]</span>
                <span className="font-mono text-xs uppercase tracking-widest">2020 — 2025</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {[
                    { 
                      id: '01', 
                      title: 'Peony Hip Flow', 
                      img: images.hipPeony 
                    },
                    { 
                      id: '02', 
                      title: 'Sakura Detail', 
                      img: images.pinkCherry
                    },
                    { 
                      id: '03', 
                      title: 'Peony Hip Flow', 
                      img: images.hipPeony
                    },
                    { 
                      id: '04', 
                      title: 'Sakura Detail', 
                      img: images.pinkCherry 
                    }
                ].map((item, idx) => (
                    <div key={idx} className="relative group border-b border-r border-white/10 h-[80vh] overflow-hidden">
                        <div className="absolute inset-0 bg-neutral-900">
                            <img 
                                src={item.img} 
                                alt={item.title}
                                className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                            />
                        </div>
                        
                        {/* Hover Overlay Info */}
                        <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="flex justify-between items-start">
                                <span className="font-mono text-xl text-white">{item.id}</span>
                                <ArrowRight className="-rotate-45 text-white" />
                            </div>
                            <div>
                                <h3 className="text-5xl font-black uppercase italic tracking-tighter text-white">{item.title}</h3>
                                <p className="font-mono text-xs uppercase mt-2 tracking-widest text-white/80">View Case Study</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* 3. BIG FOOTER NAVIGATION */}
          <footer id="contact" className="h-[70vh] bg-pure-white text-ink-black flex flex-col relative overflow-hidden">
            <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black/10">
                <a href="#" className="flex-1 flex items-center justify-center group relative overflow-hidden cursor-none">
                    <div className="absolute inset-0 bg-chrome scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="relative z-10 text-center">
                        <span className="block font-mono text-xs uppercase tracking-widest mb-4 opacity-50">Make it permanent</span>
                        <span className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">Book<br/>Now</span>
                    </div>
                </a>
                <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-1 flex items-center justify-center group relative overflow-hidden cursor-pointer hover:bg-black hover:text-white transition-colors duration-500">
                    <div className="text-center">
                        <ArrowUp className="mx-auto w-12 h-12 mb-6 group-hover:-translate-y-4 transition-transform duration-300" />
                        <span className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">Top</span>
                    </div>
                </div>
            </div>
            <div className="p-4 border-t border-black/10 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest">
                <span>© Seaphiya 2025</span>
                <div className="flex gap-4">
                    <span>IG</span>
                    <span>TW</span>
                    <span>MAIL</span>
                </div>
            </div>
          </footer>

      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    }
  }, [loading]);

  return (
    <>
      <CustomCursor />
      
      {/* GLOBAL NOISE FILTER */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.07] mix-blend-overlay bg-noise bg-repeat"></div>

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <MainContent />
        )}
      </AnimatePresence>
    </>
  );
};

export default App;