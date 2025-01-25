import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, DollarSign } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  mrr: number;
  testimonial: string;
  image: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Michael Thompson',
    role: 'CTO',
    company: 'Enterprise Solutions',
    mrr: 124567,
    testimonial: 'The quantum payment processing has revolutionized our business. We\'ve seen unprecedented growth and efficiency.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'VP of Global Payments',
    company: 'TechPay Global',
    mrr: 98234,
    testimonial: 'Integration was seamless, and the results were immediate. Our processing speed increased threefold.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&h=200'
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    role: 'Founder & CEO',
    company: 'PayFin',
    mrr: 135789,
    testimonial: 'Scale Stream has transformed our payment infrastructure. The ROI has been phenomenal.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200'
  },
  {
    id: '4',
    name: 'Emily Zhang',
    role: 'Head of Partnerships',
    company: 'Global Payments',
    mrr: 112345,
    testimonial: 'The security and speed of transactions have exceeded our expectations. A game-changer for our business.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200'
  },
  {
    id: '5',
    name: 'David Kumar',
    role: 'Director of Innovation',
    company: 'Future Finance',
    mrr: 145678,
    testimonial: 'Scale Stream\'s platform has given us a competitive edge in the market. The results speak for themselves.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200'
  }
];

export function CustomerReviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const formatMRR = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-24 px-4 sm:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-serif">
            Join the ranks of industry leaders transforming their payment processing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Featured Review */}
          <motion.div
            key={reviews[activeIndex].id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-75 blur" />
                  <img
                    src={reviews[activeIndex].image}
                    alt={reviews[activeIndex].name}
                    className="relative w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-purple-200">
                    {reviews[activeIndex].name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {reviews[activeIndex].role} at {reviews[activeIndex].company}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <blockquote className="text-lg text-gray-300 font-serif leading-relaxed">
                  "{reviews[activeIndex].testimonial}"
                </blockquote>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-teal-600/20 rounded-xl opacity-75 blur-lg" />
                <div className="relative p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-gray-400">Monthly Revenue</span>
                  </div>
                  <div className="text-2xl font-display text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    {formatMRR(reviews[activeIndex].mrr)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Review List */}
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.button
                key={review.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setActiveIndex(index)}
                className={`relative group w-full text-left ${
                  index === activeIndex ? 'scale-[1.02]' : ''
                }`}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-xl opacity-0 blur transition-all duration-300 ${
                  index === activeIndex ? 'opacity-75' : 'group-hover:opacity-50'
                }`} />
                <div className={`relative p-4 rounded-xl border ${
                  index === activeIndex
                    ? 'bg-black/60 border-white/20'
                    : 'bg-black/40 border-white/10'
                } backdrop-blur-sm transition-all duration-300`}>
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-purple-200 truncate">
                        {review.name}
                      </h4>
                      <p className="text-xs text-gray-400 truncate">
                        {review.role} at {review.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-display text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                        {formatMRR(review.mrr)}
                      </span>
                      <motion.div
                        animate={{
                          x: index === activeIndex ? [0, 4, 0] : 0,
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className={`w-4 h-4 ${
                          index === activeIndex ? 'text-purple-400' : 'text-gray-600'
                        }`} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}