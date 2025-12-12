import React from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2 }}
      onAnimationComplete={onComplete}
    >
      <div className="flex flex-col items-center">
         <div className="overflow-hidden">
            <motion.h1 
                className="text-[15vw] font-black tracking-tighter leading-none uppercase"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: "circOut" }}
            >
                SEAPHIYA
            </motion.h1>
         </div>
         
         <div className="w-full flex justify-between items-end px-2 mt-4 overflow-hidden">
             <motion.span
                className="font-mono text-xs uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
             >
                Loading Assets
             </motion.span>
             <motion.span
                className="font-mono text-xs uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
             >
                100%
             </motion.span>
         </div>
      </div>
    </motion.div>
  );
};

export default Preloader;