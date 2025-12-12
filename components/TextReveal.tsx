import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className = "" }) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.25']
  });

  const words = text.split(" ");

  return (
    <p ref={element} className={`flex flex-wrap ${className}`}>
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
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-2 lg:mr-3 overflow-hidden inline-flex">
      <span className="opacity-10">{children}</span>
      <motion.span 
        style={{ opacity }}
        className="absolute top-0 left-0 text-paper-white"
      >
        {children}
      </motion.span>
    </span>
  );
});

export default TextReveal;