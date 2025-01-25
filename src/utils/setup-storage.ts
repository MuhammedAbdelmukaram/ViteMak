import { supabase } from '../lib/supabase';

export async function setupStorage() {
  try {
    // Check if videos1 bucket exists first
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets();

    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      return false;
    }

    const videoBucket = buckets?.find(bucket => bucket.name === 'videos1');
    
    // If bucket already exists, we're done
    if (videoBucket) {
      return true;
    }

    // Create the bucket if it doesn't exist
    const { error: createError } = await supabase
      .storage
      .createBucket('videos1', {
        public: true,
        allowedMimeTypes: ['video/mp4'],
        fileSizeLimit: 50000000 // 50MB
      });

    if (createError) {
      console.error('Error creating bucket:', createError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in setupStorage:', error);
    return false;
  }
}