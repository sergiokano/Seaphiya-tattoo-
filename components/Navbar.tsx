import React, { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

const Navbar: React.FC = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:px-10 md:py-6 flex justify-between items-center z-50 text-white bg-black/30 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="flex flex-col">
         <a href="#" className="text-2xl font-sans font-black tracking-tighter uppercase leading-none">
            Seaphiya
         </a>
         <span className="text-[10px] uppercase tracking-widest opacity-60 mt-1">Tattoo Artist</span>
      </div>
      
      <div className="hidden md:flex flex-col text-[10px] font-mono uppercase tracking-widest opacity-70 text-right md:text-center absolute left-1/2 -translate-x-1/2">
        <span>Miami, FL</span>
        <span>{time} EST</span>
      </div>

      <div className="flex gap-8 items-center">
        <div className="hidden md:flex gap-8 text-[11px] uppercase font-bold tracking-[0.15em]">
            <a href="#work" className="hover:text-chrome transition-colors relative group">
                Work
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className="hover:text-chrome transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#journal" className="hover:text-chrome transition-colors relative group">
                Journal
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
        </div>
        <MagneticButton className="border border-white/20 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 bg-white/5 backdrop-blur-md">
            Book Now
        </MagneticButton>
      </div>
    </nav>
  );
};

export default Navbar;