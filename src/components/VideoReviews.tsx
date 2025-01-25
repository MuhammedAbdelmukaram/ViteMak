import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Loader2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import type { VideoReview } from '../types/video';
import { getVideoReviews } from '../utils/video';

export function VideoReviews() {
  const [reviews, setReviews] = useState<VideoReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  React.useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getVideoReviews();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load video reviews');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const handleVideoToggle = useCallback((reviewId: string) => {
    const videoElement = videoRefs.current[reviewId];
    if (!videoElement) return;

    if (activeVideoId === reviewId) {
      videoElement.pause();
      setActiveVideoId(null);
    } else {
      if (activeVideoId && videoRefs.current[activeVideoId]) {
        videoRefs.current[activeVideoId].pause();
      }
      videoElement.currentTime = 0;
      videoElement.play();
      videoElement.muted = false;
      setActiveVideoId(reviewId);
    }
  }, [activeVideoId]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (error && !reviews.length) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-purple-200 to-pink-200">
              Success Stories
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-serif">
            See how our partners are transforming their businesses
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm hover:bg-black/70 transition-colors hidden sm:block"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm hover:bg-black/70 transition-colors hidden sm:block"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          >
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex-shrink-0 snap-center"
                style={{ width: '220px' }}
              >
                <div className="relative rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden">
                  <div className="relative aspect-[9/16] bg-black">
                    <video
                      ref={el => {
                        if (el) {
                          videoRefs.current[review.id] = el;
                          el.addEventListener('loadeddata', () => {
                            el.currentTime = 0;
                          });
                        }
                      }}
                      src={review.video_url}
                      className="absolute inset-0 w-full h-full object-cover"
                      playsInline
                      muted={activeVideoId !== review.id}
                      loop
                    />
                    
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300"
                      style={{ opacity: activeVideoId === review.id ? 0 : 1 }}
                    >
                      <button
                        onClick={() => handleVideoToggle(review.id)}
                        className="group/play"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 group-hover/play:bg-white/20 transition-colors duration-300"
                        >
                          {activeVideoId === review.id ? (
                            <Pause className="w-6 h-6 fill-white" />
                          ) : (
                            <Play className="w-6 h-6 fill-white" />
                          )}
                        </motion.div>
                      </button>
                    </div>

                    {activeVideoId === review.id && (
                      <button
                        onClick={() => handleVideoToggle(review.id)}
                        className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm hover:bg-black/70 transition-colors"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="p-3 text-center">
                    <h3 className="text-lg font-display tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-purple-200 to-pink-200">
                      {review.reviewer_name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}