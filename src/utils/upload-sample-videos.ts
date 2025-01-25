import { uploadVideo } from './video';

const reviews = [
  {
    file: 'https://vimeo.com/1047524052/0984fb8c2a',
    metadata: {
      title: "Quantum Payment Revolution",
      description: "How we scaled payments globally with quantum technology",
      thumbnail_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?fit=crop&w=1080&h=1920",
      reviewer_name: "Sarah Chen",
      reviewer_role: "VP of Global Payments",
      reviewer_company: "TechPay Global",
      quote: "3x faster payment processing"
    }
  },
  {
    file: 'https://vimeo.com/1047524052/0984fb8c2a',
    metadata: {
      title: "Enterprise Scale Success",
      description: "Transforming enterprise payment infrastructure",
      thumbnail_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=1080&h=1920",
      reviewer_name: "Michael Rodriguez",
      reviewer_role: "CTO",
      reviewer_company: "Enterprise Solutions",
      quote: "99.99% uptime achievement"
    }
  },
  {
    file: 'https://vimeo.com/1047524052/0984fb8c2a',
    metadata: {
      title: "Startup to Scale",
      description: "From seed to series C with quantum payments",
      thumbnail_url: "https://images.unsplash.com/photo-1622151834677-70f982c9adef?fit=crop&w=1080&h=1920",
      reviewer_name: "Emily Zhang",
      reviewer_role: "Founder & CEO",
      reviewer_company: "PayFin",
      quote: "$50M processed in first month"
    }
  },
  {
    file: 'https://vimeo.com/1047524052/0984fb8c2a',
    metadata: {
      title: "Global Expansion Story",
      description: "Expanding to 100+ countries overnight",
      thumbnail_url: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?fit=crop&w=1080&h=1920",
      reviewer_name: "James Thompson",
      reviewer_role: "Head of International",
      reviewer_company: "WorldPay Solutions",
      quote: "Zero-latency global payments"
    }
  },
  {
    file: 'https://vimeo.com/1047524052/0984fb8c2a',
    metadata: {
      title: "Financial Innovation",
      description: "Revolutionizing payment infrastructure",
      thumbnail_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=1080&h=1920",
      reviewer_name: "Lisa Wang",
      reviewer_role: "Director of Innovation",
      reviewer_company: "Future Finance",
      quote: "10x ROI in first quarter"
    }
  }
];

export async function uploadSampleVideos() {
  for (const review of reviews) {
    try {
      // Fetch the video file
      const response = await fetch(review.file);
      const blob = await response.blob();
      const file = new File([blob], `video-${Date.now()}.mp4`, { type: 'video/mp4' });
      
      // Upload to Supabase videos1 bucket
      await uploadVideo(file, review.metadata);
      console.log(`Uploaded video for ${review.metadata.reviewer_name}`);
    } catch (error) {
      console.error(`Error uploading video for ${review.metadata.reviewer_name}:`, error);
    }
  }
}