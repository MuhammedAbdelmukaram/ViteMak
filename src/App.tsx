import React, { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene } from './components/3d/Scene';
import { Navigation } from './components/Navigation';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ProcessOverview } from './components/ProcessOverview';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import '@fontsource/cormorant';
import '@fontsource/italiana';

// Lazy load heavy components with preload
const Partners = lazy(() => import('./components/Partners').then(mod => ({ default: mod.Partners })));
const VideoReviews = lazy(() => import('./components/VideoReviews').then(mod => ({ default: mod.VideoReviews })));
const FAQ = lazy(() => import('./components/FAQ').then(mod => ({ default: mod.FAQ })));

// Preload components
if (typeof window !== 'undefined') {
  const preloadComponents = () => {
    import('./components/Partners');
    import('./components/VideoReviews');
    import('./components/FAQ');
  };
  preloadComponents();
}

const App = React.memo(function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen bg-[#030014] text-white overflow-x-hidden"
          >
            {/* Gradient Background */}
            <div className="fixed inset-0 bg-[#030014]">
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-3/4 h-1/2 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-3/4 h-1/2 bg-gradient-to-tl from-purple-500/20 via-pink-500/10 to-transparent blur-3xl" />
              </div>
            </div>

            {/* 3D Scene */}
            <div className="fixed inset-0 w-full h-full opacity-60">
              <Scene />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <Navigation />
              
              {/* Hero Section */}
              <header className="min-h-screen flex items-center justify-center border-b border-white/10">
                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                  >
                    <h1 className="relative font-['Italiana'] text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-7xl !leading-[1.1] tracking-tight mb-8">
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 font-light">Get Paid While</span>
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 font-light">7-Figure Brands</span>
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-orange-300 font-light">Use Your Payment</span>
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-orange-300 to-amber-300 font-light">Processing Accounts</span>
                    </h1>
                    
                    <p className="font-['Cormorant'] text-lg sm:text-xl lg:text-2xl text-blue-100/70 leading-relaxed backdrop-blur-sm max-w-2xl mx-auto mb-12">
                      Earn a consistent share of sales revenue by connecting your Stripe, PayPal, Square or Authorize.net account to high-revenue businesses.
                    </p>

                    <motion.a
                      href="https://wa.me/+12272366933"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex relative group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-lg opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500" />
                      <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-black/90 rounded-lg flex items-center gap-3 backdrop-blur-sm overflow-hidden border border-white/10">
                        <span className="text-sm sm:text-base font-light tracking-ultra-wide bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 text-transparent bg-clip-text uppercase">
                          Initiate Partnership
                        </span>
                      </div>
                    </motion.a>
                  </motion.div>
                </div>
              </header>

              {/* Main Content with Suspense Boundaries */}
              <main>
                <Suspense fallback={
                  <div className="py-12">
                    <LoadingSpinner />
                  </div>
                }>
                  <Partners />
                </Suspense>

                <Suspense fallback={
                  <div className="py-12">
                    <LoadingSpinner />
                  </div>
                }>
                  <VideoReviews />
                </Suspense>

                <ProcessOverview />

                <Suspense fallback={
                  <div className="py-12">
                    <LoadingSpinner />
                  </div>
                }>
                  <FAQ />
                </Suspense>
              </main>

              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default App;