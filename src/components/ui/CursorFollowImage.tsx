'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CursorFollowImageProps {
  src: string | null;
  isVisible: boolean;
  onScrollHide?: () => void;
}

// Image dimensions - larger for more impact
const IMAGE_WIDTH = 280; // w-70
const IMAGE_HEIGHT = 360; // h-90
const PADDING = 24; // Padding from screen edges

/**
 * CursorFollowImage - Awwwards 2025 style cursor-following image
 *
 * Creates a smooth, spring-animated image that follows the cursor
 * with elegant entrance/exit animations featuring scale, blur and rotation.
 * Features: boundary detection, organic spring movement, 3D tilt, shine sweep.
 */
const CursorFollowImage: React.FC<CursorFollowImageProps> = ({ src, isVisible, onScrollHide }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [nextImage, setNextImage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 100; // Hide after scrolling this many pixels

  // Motion values for cursor position
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Spring configuration - smoother, more organic feel
  const springConfig = {
    stiffness: 100,
    damping: 18,
    mass: 0.6,
    restDelta: 0.001
  };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Secondary spring for subtle 3D rotation effect
  const rotateX = useSpring(0, { stiffness: 60, damping: 20, mass: 0.2 });
  const rotateY = useSpring(0, { stiffness: 60, damping: 20, mass: 0.2 });

  // Image opacity for smooth crossfade
  const imageOpacity = useSpring(1, { stiffness: 200, damping: 25 });

  // Handle smooth image transitions
  useEffect(() => {
    if (src !== currentImage) {
      if (src && currentImage) {
        // Smooth crossfade between images
        setIsTransitioning(true);
        setNextImage(src);
        imageOpacity.set(0);

        const timeout = setTimeout(() => {
          setCurrentImage(src);
          setNextImage(null);
          imageOpacity.set(1);
          setIsTransitioning(false);
        }, 200);

        return () => clearTimeout(timeout);
      } else if (src) {
        // Initial show
        setCurrentImage(src);
        imageOpacity.set(1);
      } else {
        // Hide - let AnimatePresence handle exit
        setCurrentImage(null);
        setNextImage(null);
      }
    }
  }, [src, currentImage, imageOpacity]);

  // Calculate bounded position to keep image on screen
  const getBoundedPosition = useCallback((cursorX: number, cursorY: number) => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

    // Default: position to the right and below cursor
    let posX = cursorX + 24;
    let posY = cursorY + 24;

    // Check right boundary - flip to left side if needed
    if (posX + IMAGE_WIDTH + PADDING > windowWidth) {
      posX = cursorX - IMAGE_WIDTH - 24;
    }

    // Check bottom boundary - flip to top if needed
    if (posY + IMAGE_HEIGHT + PADDING > windowHeight) {
      posY = cursorY - IMAGE_HEIGHT - 24;
    }

    // Ensure we don't go off left edge
    if (posX < PADDING) {
      posX = PADDING;
    }

    // Ensure we don't go off top edge
    if (posY < PADDING) {
      posY = PADDING;
    }

    return { x: posX, y: posY };
  }, []);

  // Handle scroll to hide when user scrolls away
  useEffect(() => {
    if (!isVisible) {
      lastScrollY.current = window.scrollY;
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

      if (scrollDelta > scrollThreshold && onScrollHide) {
        onScrollHide();
      }
    };

    // Set initial scroll position when becoming visible
    lastScrollY.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, onScrollHide]);

  // Mouse movement tracking with boundary detection
  useEffect(() => {
    let lastCursorX = 0;
    let lastCursorY = 0;
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Cancel any pending animation frame
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        const { x: boundedX, y: boundedY } = getBoundedPosition(e.clientX, e.clientY);

        mouseX.set(boundedX);
        mouseY.set(boundedY);

        // Calculate velocity-based rotation for natural "drag" feel
        const velocityX = e.clientX - lastCursorX;
        const velocityY = e.clientY - lastCursorY;
        lastCursorX = e.clientX;
        lastCursorY = e.clientY;

        // Subtle rotation based on movement velocity
        const maxRotation = 5;
        rotateY.set(Math.max(-maxRotation, Math.min(maxRotation, velocityX * 0.2)));
        rotateX.set(Math.max(-maxRotation, Math.min(maxRotation, -velocityY * 0.2)));
      });
    };

    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, mouseX, mouseY, rotateX, rotateY, getBoundedPosition]);

  // Reset rotation when not visible
  useEffect(() => {
    if (!isVisible) {
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [isVisible, rotateX, rotateY]);

  const showImage = isVisible && (currentImage || nextImage);

  return (
    <AnimatePresence>
      {showImage && (
        <motion.div
          key="cursor-image"
          ref={containerRef}
          className="fixed top-0 left-0 z-[100] pointer-events-none will-change-transform"
          style={{
            x,
            y,
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            perspective: 1200,
          }}
          initial={{
            opacity: 0,
            scale: 0.4,
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            scale: 0.6,
            filter: 'blur(12px)',
          }}
          transition={{
            opacity: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
            filter: { duration: 0.35, ease: 'easeOut' },
          }}
        >
          {/* Soft glow effect behind image */}
          <motion.div
            className="absolute -inset-6 rounded-3xl blur-2xl"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(200,180,160,0.2) 0%, rgba(180,200,180,0.1) 40%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {/* Main image container - larger for impact */}
          <div
            className="relative w-56 h-72 md:w-[280px] md:h-[360px] rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 via-transparent to-ink-black/5 z-10 pointer-events-none" />

            {/* Inner shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] z-10 pointer-events-none rounded-2xl" />

            {/* Animated shine sweep effect - only on initial appear */}
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 58%, transparent 65%)',
              }}
              initial={{ x: '-150%' }}
              animate={{ x: '250%' }}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            />

            {/* Current image */}
            {currentImage && (
              <motion.div
                className="absolute inset-0"
                style={{ opacity: imageOpacity }}
              >
                <Image
                  src={currentImage}
                  alt="Style preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 224px, 280px"
                  priority
                />
              </motion.div>
            )}

            {/* Next image (during transition) */}
            {nextImage && isTransitioning && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Image
                  src={nextImage}
                  alt="Style preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 224px, 280px"
                  priority
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CursorFollowImage;
