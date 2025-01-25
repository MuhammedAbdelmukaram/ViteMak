import { supabase } from '../lib/supabase';
import type { VideoReview } from '../types/video';

// Helper function to generate random MRR between $9,500 and $89,000
function generateRandomMRR() {
  return Math.floor(Math.random() * (89000 - 9500 + 1) + 9500);
}

const SAMPLE_REVIEWS = [
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/1.mp4",
    thumbnail_url: null,
    reviewer_name: "Michael Thompson"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/2.mp4",
    thumbnail_url: null,
    reviewer_name: "Sarah Chen"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/3.mp4",
    thumbnail_url: null,
    reviewer_name: "Alex Rodriguez"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/4.mp4",
    thumbnail_url: null,
    reviewer_name: "Emily Zhang"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/5.mp4",
    thumbnail_url: null,
    reviewer_name: "David Kumar"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/6.mp4",
    thumbnail_url: null,
    reviewer_name: "Lisa Wang"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/7.mp4",
    thumbnail_url: null,
    reviewer_name: "James Wilson"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/8.mp4",
    thumbnail_url: null,
    reviewer_name: "Rachel Kim"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/9.mp4",
    thumbnail_url: null,
    reviewer_name: "Mark Johnson"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/10.mp4",
    thumbnail_url: null,
    reviewer_name: "Sophie Chen"
  },
  // Adding missing videos with appropriate names
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/11.mp4",
    thumbnail_url: null,
    reviewer_name: "Thomas Anderson"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/12.mp4",
    thumbnail_url: null,
    reviewer_name: "Jennifer Lee"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/13.mp4",
    thumbnail_url: null,
    reviewer_name: "Robert Mitchell"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/14.mp4",
    thumbnail_url: null,
    reviewer_name: "Emma Davis"
  },
  {
    description: `$${generateRandomMRR().toLocaleString()} MRR`,
    video_url: "https://ertxqixxjsfnktveegot.supabase.co/storage/v1/object/public/videos1/15.mp4",
    thumbnail_url: null,
    reviewer_name: "William Parker"
  }
];

export async function initializeVideoReviews() {
  try {
    // Check if we already have reviews
    const { data: existingReviews, error: checkError } = await supabase
      .from('video_reviews')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking existing reviews:', checkError);
      return;
    }

    // If no reviews exist, initialize with sample data
    if (!existingReviews || existingReviews.length === 0) {
      const { error: insertError } = await supabase
        .from('video_reviews')
        .insert(SAMPLE_REVIEWS.map(review => ({
          ...review,
          created_at: new Date().toISOString()
        })));

      if (insertError) {
        console.error('Error inserting reviews:', insertError);
      }
    }
  } catch (error) {
    console.error('Error in initializeVideoReviews:', error);
  }
}

export async function getVideoReviews(): Promise<VideoReview[]> {
  try {
    const { data, error } = await supabase
      .from('video_reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching video reviews:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getVideoReviews:', error);
    return [];
  }
}