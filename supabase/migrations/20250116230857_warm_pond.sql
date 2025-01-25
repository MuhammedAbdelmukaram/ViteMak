/*
  # Fix video reviews RLS policies

  1. Changes
    - Drop existing policies and recreate them with proper permissions
    - Add policy for anon and authenticated users to read video reviews
    - Add policy for service role to insert video reviews
  
  2. Security
    - Maintain RLS on video_reviews table
    - Allow public read access
    - Allow service role to insert records
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON video_reviews;
DROP POLICY IF EXISTS "Allow authenticated users to create reviews" ON video_reviews;

-- Recreate policies with proper permissions
CREATE POLICY "Allow anyone to read video reviews"
  ON video_reviews
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role to manage video reviews"
  ON video_reviews
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);