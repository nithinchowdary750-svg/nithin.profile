import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Total animation: 1.6s fill + 0.5s pause = 2.1s, then start exit shutter
    const timer = setTimeout(() => {
      setIsFinished(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Shutter transition upward
  const screenVariants = {
    initial: { y: 0 },
    exit: {
      y: '-100%',
      transition: {
        duration: 1.0,
        ease: [0.76, 0, 0.24, 1], // Premium luxury ease
        delay: 0.1
      }
    }
  };

  // Logo text fill transition (revealing white text from bottom to top)
  const textFillVariants = {
    initial: { clipPath: 'inset(100% 0% 0% 0%)' },
    animate: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        duration: 1.6,
        ease: [0.25, 1, 0.5, 1]
      }
    },
    exit: {
      scale: 0.85,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-primary-red select-none overflow-hidden"
          variants={screenVariants}
          initial="initial"
          exit="exit"
        >
          {/* Logo container */}
          <div className="relative text-center">
            {/* Background layer: Dark transparent text */}
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black/20 m-0 uppercase font-sans">
              Nithin.
            </h1>

            {/* Foreground layer: White text filling from bottom to top */}
            <motion.h1
              className="absolute inset-0 text-6xl md:text-8xl font-black tracking-tighter text-white m-0 uppercase font-sans"
              variants={textFillVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              Nithin.
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
