import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond } from 'lucide-react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1200); // Reduced from 2500ms to 1200ms
      return () => clearTimeout(timer);
    }
  }, [clicked, onComplete]);

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014] perspective-2000"
          exit={{
            opacity: 0,
            scale: 2,
            filter: 'brightness(2)',
            transition: { 
              duration: 1, // Reduced from 2s to 1s
              ease: [0.16, 1, 0.3, 1],
              when: 'afterChildren'
            }
          }}
        >
          <motion.button
            onClick={() => setClicked(true)}
            className="relative z-10 transform-style-3d"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Ambient glow */}
            <motion.div
              className="absolute -inset-8"
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-[30px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-teal-600/10 rounded-full blur-[20px] mix-blend-screen" />
            </motion.div>

            {/* Diamond with animations */}
            <motion.div
              className="relative"
              animate={clicked ? {
                scale: [1, 1.5, 0],
                rotate: [0, 720],
                z: [0, 500],
              } : {
                scale: [1, 1.05, 1],
              }}
              transition={clicked ? {
                duration: 0.8, // Reduced from 1.5s to 0.8s
                ease: [0.16, 1, 0.3, 1],
              } : {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Diamond className="relative w-40 h-40 text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
            </motion.div>

            {/* ULTRA SUPERNOVA EFFECT */}
            {clicked && (
              <>
                {/* Massive energy burst */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{
                    scale: [1, 300],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1, // Reduced from 2s to 1s
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-conic from-white via-purple-600 to-violet-600 rounded-full blur-xl" />
                </motion.div>

                {/* Multiple shockwaves */}
                {[...Array(8)].map((_, i) => ( // Reduced from 12 to 8 waves
                  <motion.div
                    key={`wave-${i}`}
                    className="absolute inset-0"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{
                      scale: [1, 100 + i * 20],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 1.2, // Reduced from 2.5s to 1.2s
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.04, // Reduced from 0.08 to 0.04
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-radial from-white via-purple-500/50 to-transparent rounded-full blur-xl" />
                  </motion.div>
                ))}

                {/* Intense particle explosion */}
                {[...Array(60)].map((_, i) => { // Reduced from 100 to 60 particles
                  const angle = (i * Math.PI * 2) / 60;
                  const radius = Math.random() * 1500 + 800; // Reduced radius
                  return (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1 h-1 rounded-full bg-white"
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'center',
                      }}
                      initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                      animate={{
                        scale: [1, 0],
                        opacity: [1, 0],
                        x: [0, Math.cos(angle) * radius],
                        y: [0, Math.sin(angle) * radius],
                      }}
                      transition={{
                        duration: 1, // Reduced from 2s to 1s
                        ease: [0.16, 1, 0.3, 1],
                        delay: Math.random() * 0.15, // Reduced from 0.3 to 0.15
                      }}
                    />
                  );
                })}

                {/* Energy beams */}
                {[...Array(16)].map((_, i) => { // Reduced from 24 to 16 beams
                  const angle = (i * Math.PI * 2) / 16;
                  return (
                    <motion.div
                      key={`beam-${i}`}
                      className="absolute h-1 w-[200vw] bg-gradient-to-r from-white via-purple-400/80 to-transparent"
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'left',
                        rotate: `${(angle * 180) / Math.PI}deg`,
                      }}
                      initial={{ scaleX: 0, opacity: 1 }}
                      animate={{
                        scaleX: [0, 1],
                        opacity: [1, 0],
                      }}
                      transition={{
                        duration: 0.8, // Reduced from 1.5s to 0.8s
                        ease: [0.16, 1, 0.3, 1],
                        delay: i * 0.02, // Reduced from 0.03 to 0.02
                      }}
                    />
                  );
                })}

                {/* Spiral energy rings */}
                {[...Array(6)].map((_, i) => ( // Reduced from 8 to 6 rings
                  <motion.div
                    key={`ring-${i}`}
                    className="absolute inset-0"
                    initial={{ scale: 1, opacity: 0, rotate: 0 }}
                    animate={{
                      scale: [1, 50],
                      opacity: [1, 0],
                      rotate: [0, 360 + i * 90],
                    }}
                    transition={{
                      duration: 1, // Reduced from 2s to 1s
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.08, // Reduced from 0.15 to 0.08
                    }}
                  >
                    <div className="absolute inset-0 border-2 border-white/80 rounded-full blur-sm" />
                  </motion.div>
                ))}

                {/* Final flash */}
                <motion.div
                  className="fixed inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1, // Reduced from 2s to 1s
                    times: [0, 0.1, 1],
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2, // Reduced from 0.5 to 0.2
                  }}
                />
              </>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}