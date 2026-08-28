import { openDB } from 'idb';

const DB_NAME = 'ruco-offline-db';
const DB_VERSION = 1;

export async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('offline_queue')) {
        db.createObjectStore('offline_queue', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('cached_manifest')) {
        db.createObjectStore('cached_manifest', { keyPath: 'key' });
      }
    },
  });
}

export async function addOfflineSettlement(settlementData) {
  const db = await getDb();
  const item = {
    ...settlementData,
    cached_at: new Date().toISOString(),
    synced: false,
  };
  return db.add('offline_queue', item);
}

export async function getOfflineQueue() {
  const db = await getDb();
  return db.getAll('offline_queue');
}

export async function clearOfflineQueue() {
  const db = await getDb();
  return db.clear('offline_queue');
}

export async function cacheManifest(manifestData) {
  const db = await getDb();
  return db.put('cached_manifest', { key: 'latest_manifest', data: manifestData, cached_at: new Date().toISOString() });
}

export async function getCachedManifest() {
  const db = await getDb();
  const entry = await db.get('cached_manifest', 'latest_manifest');
  return entry ? entry.data : null;
}
