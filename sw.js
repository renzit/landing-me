const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'dist/style.css',
  'manifest.json',
  'https://source.unsplash.com/bZZp1PmHI0E/1600x900',
  'https://source.unsplash.com/VRxo0yY-gyM/1600x900',
  'https://source.unsplash.com/K2tdx2mFDHc/1600x900',
  'https://source.unsplash.com/2aAHlfDOhJM/1600x900',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'assets/favicon-32x32.png',
  'assets/favicon-16x16.png'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});