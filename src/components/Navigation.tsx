import React from 'react';
import { motion } from 'framer-motion';
import { Diamond } from 'lucide-react';

const DiamondLogo = () => {
  return (
    <div className="relative">
      {/* Outer glow effect */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-lg animate-pulse" />
      
      {/* Diamond icon with shimmer effect */}
      <div className="relative">
        <Diamond className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-[shimmer_2s_infinite]" 
             style={{
               backgroundSize: '200% 100%',
               animation: 'shimmer 2s infinite linear',
             }}
        />
      </div>
    </div>
  );
};

const buttonVariants = {
  initial: { 
    scale: 1,
  },
  hover: { 
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export function Navigation() {
  return (
    <nav className="relative z-50">      
      <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 sm:gap-3"
          >
            <DiamondLogo />
            <div>
              <span className="text-base sm:text-2xl font-display tracking-wider bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
                SCALE STREAM
              </span>
              <div className="text-[7px] sm:text-[10px] tracking-[0.3em] text-blue-300/80 uppercase">
                Quantum Finance Network
              </div>
            </div>
          </motion.div>

          {/* Book a Call Button */}
          <motion.a
            href="https://calendly.com/scalestreamltd/15min"
            target="_blank"
            rel="noopener noreferrer"
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            className="relative group"
          >
            {/* Premium outer glow */}
            <div className="absolute -inset-[1.5px] sm:-inset-[2px] bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-pink-600/50 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 blur-md sm:blur-lg transition-all duration-500" />
            
            {/* Animated gradient border */}
            <div className="absolute -inset-[0.5px] sm:-inset-[1px] bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Button content */}
            <div className="relative px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-black/80 backdrop-blur-sm overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-950/50 via-purple-950/50 to-pink-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute inset-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1
                  }}
                />
              </div>

              {/* Text */}
              <span className="relative font-display text-[11px] sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] bg-gradient-to-r from-white via-purple-100 to-white text-transparent bg-clip-text group-hover:from-white group-hover:via-violet-200 group-hover:to-white transition-all duration-500">
                BOOK A CALL
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </nav>
  );
}