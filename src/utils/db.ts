import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface VideoReview {
  id: number;
  videoUrl: string;
  thumbnail: string;
}

interface VideoReviewDB extends DBSchema {
  reviews: {
    key: number;
    value: VideoReview;
  };
}

let db: IDBPDatabase<VideoReviewDB>;

export async function initDB() {
  db = await openDB<VideoReviewDB>('videoReviews', 1, {
    upgrade(db) {
      db.createObjectStore('reviews', { keyPath: 'id' });
    },
  });
}

export async function saveReview(id: number, videoUrl: string, thumbnail: string) {
  await db.put('reviews', {
    id,
    videoUrl,
    thumbnail,
  });
}

export async function getReview(id: number) {
  return await db.get('reviews', id);
}

export async function getAllReviews() {
  return await db.getAll('reviews');
}

export async function deleteReview(id: number) {
  await db.delete('reviews', id);
}