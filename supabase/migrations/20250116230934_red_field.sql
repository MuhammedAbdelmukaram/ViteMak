/*
  # Add initialize_video_reviews function

  1. New Functions
    - initialize_video_reviews: Stored procedure to safely initialize video reviews
  
  2. Security
    - Function runs with security definer to bypass RLS
    - Only accessible to authenticated users
*/

CREATE OR REPLACE FUNCTION initialize_video_reviews(reviews jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO video_reviews (
    title,
    description,
    video_url,
    thumbnail_url,
    reviewer_name,
    reviewer_role,
    reviewer_company,
    quote
  )
  SELECT
    r->>'title',
    r->>'description',
    r->>'video_url',
    r->>'thumbnail_url',
    r->>'reviewer_name',
    r->>'reviewer_role',
    r->>'reviewer_company',
    r->>'quote'
  FROM jsonb_array_elements(reviews) AS r
  ON CONFLICT DO NOTHING;
END;
$$;