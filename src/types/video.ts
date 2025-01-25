export interface VideoReview {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string | null;
  created_at: string;
  reviewer_name: string;
  reviewer_role: string;
  reviewer_company: string;
  quote: string;
}