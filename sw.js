self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

// Chrome strictly requires a fetch listener to trigger the Install Prompt
self.addEventListener('fetch', (e) => {
  // Do nothing. Pass through normally.
});
