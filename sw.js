const CACHE_NAME = 'scouting-cache-v1';
const FILES_TO_CACHE = [
  '/scouting-app/scouting.html', // Path to scouting.html
  '/scouting-app/form.js',
  '/scouting-app/game.js',
  '/scouting-app/preload.js',
  '/scouting-app/qrcode-creator.js',
  '/scouting-app/qrcode.js',
  '/scouting-app/styles.css',
  '/images/algae1.png',
  '/images/coral.png',
  '/images/net.png',
  '/images/processor.png'
];

// Install event: Cache the required files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting()) // Activate the Service Worker immediately
  );
});

// Fetch event: Serve cached files if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});