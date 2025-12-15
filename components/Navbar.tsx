import React, { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';
import { useNavigation } from '../App';

const Navbar: React.FC = () => {
  const [time, setTime] = useState("");
  const { openBooking } = useNavigation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/New_York' // Miami timezone
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    const element = document.getElementById(sectionId);
    if (lenis && element) {
      // About section needs no offset to show full content, work needs offset for navbar
      const offset = sectionId === 'about' ? 0 : -80;
      lenis.scrollTo(element, {
        offset,
        duration: 2,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 2,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:px-10 md:py-6 flex justify-between items-center z-50 text-ink-black bg-paper-white/70 backdrop-blur-xl border-b border-black/5 transition-all duration-300">
      <div className="flex flex-col">
         <a href="#" onClick={scrollToTop} className="text-2xl font-display font-semibold tracking-tighter leading-none hover:opacity-70 transition-opacity duration-300">
            seaphiya
         </a>
         <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 mt-1">Tattoo Artist</span>
      </div>

      <div className="hidden md:flex flex-col text-[10px] font-mono uppercase tracking-widest opacity-70 text-right md:text-center absolute left-1/2 -translate-x-1/2">
        <span>Miami, FL</span>
        <span>{time} EST</span>
      </div>

      <div className="flex gap-8 items-center">
        <div className="hidden md:flex gap-8 text-[11px] uppercase font-bold tracking-[0.15em]">
            <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="hover:text-coral transition-colors relative group">
                Work
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ink-black transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-coral transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ink-black transition-all duration-300 group-hover:w-full"></span>
            </a>
        </div>
        <MagneticButton
          onClick={openBooking}
          className="border border-black/20 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-ink-black hover:text-paper-white transition-all duration-500 bg-black/5 backdrop-blur-md"
        >
            Book Now
        </MagneticButton>
      </div>
    </nav>
  );
};

export default Navbar;