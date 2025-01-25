import { uploadVideo } from './video';

const videos = [
  {
    file: 'https://vimeo.com/1047524052/0984fb8c2a',
    metadata: {
      title: "TechCorp Success Story",
      description: "How TechCorp achieved 3.2x ROAS with our platform",
      thumbnail_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&h=450",
      reviewer_name: "Sarah Johnson",
      reviewer_role: "Marketing Director",
      reviewer_company: "TechCorp",
      quote: "3.2x ROAS increase within 30 days"
    }
  },
  {
    file: 'https://vimeo.com/1047524052/0984fb8c2a',
    metadata: {
      title: "StartupX Growth Journey",
      description: "StartupX's path to $1M monthly ad spend",
      thumbnail_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1080&h=1920",
      reviewer_name: "Michael Chen",
      reviewer_role: "Growth Lead",
      reviewer_company: "StartupX",
      quote: "Scaled to $1M/month ad spend"
    }
  },
  {
    file: 'https://vimeo.com/1047524052/0984fb8c2a',
    metadata: {
      title: "Digital First Revolution",
      description: "Digital First's exponential growth story",
      thumbnail_url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&h=450",
      reviewer_name: "Emily Rodriguez",
      reviewer_role: "CEO",
      reviewer_company: "Digital First",
      quote: "5x revenue growth in 6 months"
    }
  },
  {
    file: 'https://vimeo.com/1047524052/0984fb8c2a',
    metadata: {
      title: "BrandX Social Success",
      description: "How BrandX achieved viral growth on TikTok",
      thumbnail_url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1080&h=1920",
      reviewer_name: "Alex Thompson",
      reviewer_role: "Social Media Manager",
      reviewer_company: "BrandX",
      quote: "2M+ reach on TikTok"
    }
  }
];

export async function uploadAllVideos() {
  for (const video of videos) {
    try {
      // Fetch the video file from Vimeo
      const response = await fetch(video.file);
      const blob = await response.blob();
      const file = new File([blob], `video-${Date.now()}.mp4`, { type: 'video/mp4' });
      
      // Upload to Supabase
      await uploadVideo(file, video.metadata);
      console.log(`Uploaded video for ${video.metadata.reviewer_name}`);
    } catch (error) {
      console.error(`Error uploading video for ${video.metadata.reviewer_name}:`, error);
    }
  }
}