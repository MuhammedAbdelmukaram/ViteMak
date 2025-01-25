/*
  # Video Reviews Schema

  1. New Tables
    - `video_reviews`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `video_url` (text)
      - `thumbnail_url` (text)
      - `created_at` (timestamptz)
      - `reviewer_name` (text)
      - `reviewer_role` (text)
      - `reviewer_company` (text)
      - `quote` (text)

  2. Security
    - Enable RLS on `video_reviews` table
    - Add policies for:
      - Public read access
      - Authenticated users can create reviews
*/

-- Create the video_reviews table
CREATE TABLE IF NOT EXISTS video_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  reviewer_name text NOT NULL,
  reviewer_role text,
  reviewer_company text,
  quote text
);

-- Enable Row Level Security
ALTER TABLE video_reviews ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON video_reviews
  FOR SELECT
  TO public
  USING (true);

-- Create policy for authenticated users to create reviews
CREATE POLICY "Allow authenticated users to create reviews"
  ON video_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (true);