/*
  # Storage bucket and policies setup

  1. Changes
    - Create storage.buckets table if it doesn't exist
    - Create storage.objects table if it doesn't exist
    - Create policies for public read access and authenticated user operations
  
  2. Security
    - Enable RLS on storage tables
    - Add policies for bucket and object access control
*/

-- Create storage schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS storage;

-- Create buckets table
CREATE TABLE IF NOT EXISTS storage.buckets (
  id text PRIMARY KEY,
  name text NOT NULL,
  owner uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  public boolean DEFAULT false
);

-- Create objects table
CREATE TABLE IF NOT EXISTS storage.objects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_id text NOT NULL REFERENCES storage.buckets(id),
  name text NOT NULL,
  owner uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_accessed_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/')) STORED
);

-- Create videos1 bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos1', 'videos1', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Bucket Policies
CREATE POLICY "Public Access"
  ON storage.buckets
  FOR SELECT
  TO public
  USING (public = true);

CREATE POLICY "Authenticated users can create buckets"
  ON storage.buckets
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Object Policies
CREATE POLICY "Public Access"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'videos1');

CREATE POLICY "Authenticated users can upload objects"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'videos1');

CREATE POLICY "Authenticated users can update own objects"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (owner = auth.uid())
  WITH CHECK (bucket_id = 'videos1');

CREATE POLICY "Authenticated users can delete own objects"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (owner = auth.uid() AND bucket_id = 'videos1');