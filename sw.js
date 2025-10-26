const CACHE_NAME = 'dev-universal-v1';
const urlsToCache = [
  '/',
  '/fr',
  '/fr/projects',
  '/fr/blog',
  '/fr/contact',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png',
  '/icons/apple-touch-icon.png',
  '/safari-pinned-tab.svg',
  '/icons/shortcut-projects.png',
  '/icons/shortcut-contact.png',
  '/icons/shortcut-blog.png',
  '/screenshots/desktop-home.png',
  '/screenshots/mobile-home.png',
  '/videos/coding-background.mp4',
  '/images/profile-photo.png',
  '/images/project-placeholder.jpg',
  '/og-image.jpg',
  '/api/public/stats',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});