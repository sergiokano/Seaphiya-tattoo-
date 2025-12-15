'use client';

import { useRef, memo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrollRevealTextProps {
  children: string;
  className?: string;
}

const ScrollRevealText = ({ children, className = "" }: ScrollRevealTextProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "end 0.5"]
  });

  // Handle potential extra whitespace/newlines from JSX and filter empty strings
  const words = typeof children === 'string' ? children.trim().split(/\s+/).filter(w => w.length > 0) : [];

  return (
    <p ref={container} className={`flex flex-wrap leading-tight ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

interface WordProps {
  children: React.ReactNode;
  range: number[];
  progress: MotionValue<number>;
}

const Word = memo(({ children, range, progress }: WordProps) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
});

Word.displayName = 'Word';

export default ScrollRevealText;
