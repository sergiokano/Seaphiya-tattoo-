'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'badge' | 'text';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorState, setCursorState] = useState<CursorState>('default');

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Badge hover - subtle pill effect
      if (target.classList.contains('badge-hover') || target.closest('.badge-hover')) {
        setCursorState('badge');
      }
      // Regular interactive elements
      else if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic-trigger')
      ) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const cursorVariants = {
    default: {
      scale: 1,
      opacity: 1,
    },
    hover: {
      scale: 2.5,
      opacity: 1,
    },
    badge: {
      scale: 0.5,
      opacity: 0.6,
    },
    text: {
      scale: 3,
      opacity: 0.8,
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-paper-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      variants={cursorVariants}
      animate={cursorState}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        mass: 0.5,
      }}
    />
  );
};

export default CustomCursor;
