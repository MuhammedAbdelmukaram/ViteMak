import React from 'react';
import { motion } from 'framer-motion';
import { Diamond, MapPin, Phone, Mail } from 'lucide-react';

const InitiatePartnershipButton = () => (
  <motion.a
    href="https://wa.me/+12272366933"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex relative group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-lg opacity-75 blur-sm group-hover:opacity-100 transition-all duration-500" />
    <div className="relative px-4 py-2 bg-black/90 rounded-lg flex items-center gap-2 backdrop-blur-sm overflow-hidden border border-white/10">
      <span className="text-xs font-light tracking-ultra-wide bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 text-transparent bg-clip-text uppercase">
        Initiate Partnership
      </span>
    </div>
  </motion.a>
);

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient background with reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 backdrop-blur-[2px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-50 blur-lg animate-pulse" />
            <Diamond className="relative w-6 h-6 text-white/90" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-200/90 via-purple-200/90 to-pink-200/90">
              SCALE STREAM
            </div>
            <div className="text-[10px] tracking-[0.3em] text-blue-300/40 uppercase mt-1">
              Quantum Finance Network
            </div>
          </motion.div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 text-center sm:text-left">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center sm:items-start gap-2"
            >
              <div className="relative p-2 rounded-full bg-white/[0.02] backdrop-blur-[2px] border border-white/[0.05]">
                <MapPin className="w-4 h-4 text-purple-400/80" />
              </div>
              <div className="text-sm text-gray-400/80 font-serif">
                71-75 Shelton St<br />
                London WC2H 9JQ<br />
                United Kingdom
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center sm:items-start gap-2"
            >
              <div className="relative p-2 rounded-full bg-white/[0.02] backdrop-blur-[2px] border border-white/[0.05]">
                <Phone className="w-4 h-4 text-purple-400/80" />
              </div>
              <a 
                href="tel:+12272366933"
                className="text-sm text-gray-400/80 hover:text-purple-400/90 transition-colors font-serif"
              >
                +1 (227) 236-6933
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col items-center sm:items-start gap-2"
            >
              <div className="relative p-2 rounded-full bg-white/[0.02] backdrop-blur-[2px] border border-white/[0.05]">
                <Mail className="w-4 h-4 text-purple-400/80" />
              </div>
              <a 
                href="mailto:Support@scalestreams.com"
                className="text-sm text-gray-400/80 hover:text-purple-400/90 transition-colors font-serif"
              >
                Support@scalestreams.com
              </a>
            </motion.div>
          </div>

          {/* Initiate Partnership Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-4"
          >
            <InitiatePartnershipButton />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}