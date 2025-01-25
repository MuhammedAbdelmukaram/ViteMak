import React, { useRef, useState, useCallback, memo, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, TrendingUp, ArrowRight } from 'lucide-react';

const brands = [
  {
    name: 'GYMSHARK',
    founded: '2012',
    revenue: 18000000000,
    categories: ['Fitness Apparel', 'Accessories', 'Equipment'],
    mrr: '$1.5B',
    achievements: [
      'Reached unicorn status in 2020',
      'Expanded to 131 countries',
      'Over 5M active customers'
    ],
    url: 'https://www.gymshark.com'
  },
  {
    name: 'MVMT',
    founded: '2013',
    revenue: 710000000,
    categories: ['Watches', 'Sunglasses', 'Accessories'],
    mrr: '$59M',
    achievements: [
      'Acquired by Movado Group for $100M',
      '2M+ watches sold',
      'Social media following of 5M+'
    ],
    url: 'https://www.mvmt.com'
  },
  {
    name: 'BEARDBRAND',
    founded: '2012',
    revenue: 60000000,
    categories: ['Men\'s Grooming', 'Beard Care'],
    mrr: '$5M',
    achievements: [
      'Featured on Shark Tank',
      '1M+ YouTube subscribers',
      'Pioneered beard care industry'
    ],
    url: 'https://www.beardbrand.com'
  },
  {
    name: 'BOMBAS',
    founded: '2013',
    revenue: 300000000,
    categories: ['Socks', 'Apparel'],
    mrr: '$25M',
    achievements: [
      'Donated 75M+ items',
      'B Corp certified',
      '$100M annual revenue'
    ],
    url: 'https://www.bombas.com'
  },
  {
    name: 'ROTHYS',
    founded: '2016',
    revenue: 140000000,
    categories: ['Sustainable Footwear'],
    mrr: '$11.6M',
    achievements: [
      'Recycled 125M+ bottles',
      'Zero-waste certification',
      'Celebrity partnerships'
    ],
    url: 'https://www.rothys.com'
  },
  {
    name: 'MANSCAPED',
    founded: '2016',
    revenue: 285000000,
    categories: ['Men\'s Grooming', 'Personal Care'],
    mrr: '$23.7M',
    achievements: [
      'Global expansion to 38 countries',
      'Featured on Shark Tank',
      'Sports partnerships'
    ],
    url: 'https://www.manscaped.com'
  },
  {
    name: 'BAREBELLS',
    founded: '2016',
    revenue: 72000000,
    categories: ['Protein Bars', 'Nutrition'],
    mrr: '$6M',
    achievements: [
      'Expanded to 35 markets',
      'Award-winning taste',
      '100M+ bars sold'
    ],
    url: 'https://www.barebells.com'
  },
  {
    name: 'PEAKDESIGN',
    founded: '2010',
    revenue: 108000000,
    categories: ['Camera Gear', 'Travel Equipment'],
    mrr: '$9M',
    achievements: [
      '$32M+ raised on Kickstarter',
      'Design awards',
      'Sustainable practices'
    ],
    url: 'https://www.peakdesign.com'
  },
  {
    name: 'BULLETPROOF',
    founded: '2013',
    revenue: 180000000,
    categories: ['Coffee', 'Supplements'],
    mrr: '$15M',
    achievements: [
      'Created butter coffee trend',
      'Retail expansion',
      'Scientific research'
    ],
    url: 'https://www.bulletproof.com'
  },
  {
    name: 'NATIVEDEODORANT',
    founded: '2015',
    revenue: 100000000,
    categories: ['Natural Deodorant', 'Personal Care'],
    mrr: '$8.3M',
    achievements: [
      'Acquired for $100M by P&G',
      'Clean ingredients',
      'Plastic-free options'
    ],
    url: 'https://www.nativecos.com'
  },
  {
    name: 'BROOKLINEN',
    founded: '2014',
    revenue: 250000000,
    categories: ['Bedding', 'Home Essentials'],
    mrr: '$20.8M',
    achievements: [
      '$10M+ Kickstarter success',
      'Direct-to-consumer pioneer',
      'Luxury at fair price'
    ],
    url: 'https://www.brooklinen.com'
  },
  {
    name: 'MISFITSMARKET',
    founded: '2018',
    revenue: 300000000,
    categories: ['Grocery', 'Sustainable Food'],
    mrr: '$25M',
    achievements: [
      'Saved 228M lbs of food',
      '$526.5M total funding',
      'National expansion'
    ],
    url: 'https://www.misfitsmarket.com'
  },
  {
    name: 'MEUNDIES',
    founded: '2011',
    revenue: 156000000,
    categories: ['Underwear', 'Loungewear'],
    mrr: '$13M',
    achievements: [
      '25M+ pairs sold',
      'Subscription pioneer',
      'Inclusive sizing'
    ],
    url: 'https://www.meundies.com'
  },
  {
    name: 'CHUBBIES',
    founded: '2011',
    revenue: 140000000,
    categories: ['Shorts', 'Swimwear'],
    mrr: '$11.6M',
    achievements: [
      'Viral marketing success',
      'Community-driven growth',
      'Made in USA'
    ],
    url: 'https://www.chubbies.com'
  },
  {
    name: 'THREDUP',
    founded: '2009',
    revenue: 280000000,
    categories: ['Resale Fashion', 'Sustainability'],
    mrr: '$23.3M',
    achievements: [
      'Processed 125M+ items',
      'IPO success',
      'AI-powered platform'
    ],
    url: 'https://www.thredup.com'
  }
];

const brandGlowColors = {
  'GYMSHARK': {
    from: 'from-blue-600',
    via: 'via-cyan-600',
    to: 'to-teal-600'
  },
  'MVMT': {
    from: 'from-amber-600',
    via: 'via-yellow-600',
    to: 'to-orange-600'
  },
  'BEARDBRAND': {
    from: 'from-orange-600',
    via: 'via-amber-600',
    to: 'to-yellow-600'
  },
  'BOMBAS': {
    from: 'from-blue-600',
    via: 'via-indigo-600',
    to: 'to-violet-600'
  },
  'ROTHYS': {
    from: 'from-emerald-600',
    via: 'via-green-600',
    to: 'to-teal-600'
  },
  'MANSCAPED': {
    from: 'from-slate-600',
    via: 'via-gray-600',
    to: 'to-zinc-600'
  },
  'BAREBELLS': {
    from: 'from-rose-600',
    via: 'via-pink-600',
    to: 'to-red-600'
  },
  'PEAKDESIGN': {
    from: 'from-neutral-600',
    via: 'via-stone-600',
    to: 'to-slate-600'
  },
  'BULLETPROOF': {
    from: 'from-yellow-600',
    via: 'via-amber-600',
    to: 'to-orange-600'
  },
  'NATIVEDEODORANT': {
    from: 'from-lime-600',
    via: 'via-green-600',
    to: 'to-emerald-600'
  },
  'BROOKLINEN': {
    from: 'from-sky-600',
    via: 'via-blue-600',
    to: 'to-indigo-600'
  },
  'MISFITSMARKET': {
    from: 'from-green-600',
    via: 'via-emerald-600',
    to: 'to-teal-600'
  },
  'MEUNDIES': {
    from: 'from-purple-600',
    via: 'via-violet-600',
    to: 'to-indigo-600'
  },
  'CHUBBIES': {
    from: 'from-red-600',
    via: 'via-rose-600',
    to: 'to-pink-600'
  },
  'THREDUP': {
    from: 'from-teal-600',
    via: 'via-cyan-600',
    to: 'to-sky-600'
  }
};

const BrandCard = memo(function BrandCard({ brand, index }: { brand: typeof brands[0], index: number }) {
  return (
    <motion.div
      key={brand.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1]
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative snap-start"
      style={{ width: '280px', flex: '0 0 280px' }}
    >
      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${brandGlowColors[brand.name].from} ${brandGlowColors[brand.name].via} ${brandGlowColors[brand.name].to} opacity-30 blur-lg`} />
      
      <div className="relative h-[320px] p-4 sm:p-6 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-sm overflow-hidden">
        <div className="flex items-start justify-between mb-3">
          <div>
            <motion.h3 
              className="relative text-lg font-display mb-0.5"
            >
              <span className="absolute inset-0 blur-[2px] bg-gradient-to-r from-white/20 to-white/20 bg-clip-text text-transparent">
                {brand.name}
              </span>
              <span className="relative text-white">
                {brand.name}
              </span>
            </motion.h3>
            <p className="text-xs text-gray-400">Est. {brand.founded}</p>
          </div>
          <div className="text-right">
            <div className="text-base font-display text-green-400">{brand.mrr}</div>
            <p className="text-[10px] text-gray-400">Monthly Revenue</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {brand.categories.map(category => (
            <span 
              key={category} 
              className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 border border-white/10"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="space-y-1.5 mb-12">
          {brand.achievements.slice(0, 2).map((achievement, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2"
            >
              <Award className="w-3 h-3 text-purple-400 flex-shrink-0" />
              <span className="text-[11px] text-gray-300 line-clamp-1">{achievement}</span>
            </div>
          ))}
        </div>

        <a
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-4 right-4 px-4 py-2 rounded-lg bg-gradient-to-r from-black/40 to-black/40 border border-white/10 text-xs text-center overflow-hidden"
        >
          <span className="relative inline-flex items-center gap-1.5">
            Visit Store
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>
    </motion.div>
  );
});

export const Partners = memo(function Partners() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const autoScrollRef = useRef<{
    animationFrame: number | null;
    startX: number;
    isDragging: boolean;
  }>({ animationFrame: null, startX: 0, isDragging: false });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const startAutoScroll = useCallback(() => {
    if (prefersReducedMotion || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let startTime = performance.now();
    const speed = 0.03;

    const animate = (currentTime: number) => {
      if (!container || autoScrollRef.current.isDragging) {
        autoScrollRef.current.animationFrame = null;
        return;
      }

      const deltaTime = currentTime - startTime;
      const scrollAmount = deltaTime * speed;
      
      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth) / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollAmount;
      }

      startTime = currentTime;
      autoScrollRef.current.animationFrame = requestAnimationFrame(animate);
    };

    autoScrollRef.current.animationFrame = requestAnimationFrame(animate);
  }, [prefersReducedMotion]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current.animationFrame) {
      cancelAnimationFrame(autoScrollRef.current.animationFrame);
      autoScrollRef.current.animationFrame = null;
    }
  }, []);

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, [startAutoScroll, stopAutoScroll]);

  const handleTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    stopAutoScroll();
    autoScrollRef.current.isDragging = true;
    autoScrollRef.current.startX = 'touches' in e ? e.touches[0].pageX : e.pageX;
  }, [stopAutoScroll]);

  const handleTouchEnd = useCallback(() => {
    autoScrollRef.current.isDragging = false;
    startAutoScroll();
  }, [startAutoScroll]);

  const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!autoScrollRef.current.isDragging || !scrollContainerRef.current) return;

    const currentX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const diff = autoScrollRef.current.startX - currentX;
    scrollContainerRef.current.scrollLeft += diff;
    autoScrollRef.current.startX = currentX;
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 border-b border-white/10" id="partners">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              OUR TRUSTED PARTNERS
            </span>
          </h2>
          
          <div className="relative inline-block">
            <div className="relative px-6 py-4 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/5 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-pink-600/10"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className="relative flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400/80" />
                </motion.div>

                <motion.div
                  className="font-display text-lg sm:text-2xl lg:text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-300"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: '200% auto'
                  }}
                >
                  $40.7B
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative overflow-hidden">
          {!isMobile && (
            <>
              <button
                onClick={() => scroll('left')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm hover:bg-black/70 transition-colors hidden sm:block"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => scroll('right')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm hover:bg-black/70 transition-colors hidden sm:block"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 touch-pan-x"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove as any}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove as any}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            style={{
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <BrandCard key={`${brand.name}-${index}`} brand={brand} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});