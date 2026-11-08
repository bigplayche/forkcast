// Forkcast service worker: keeps the app working offline. Product lookups always go to the network.
const CACHE = 'forkcast-v4';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'vendor/zxing.min.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin === location.origin) {
    // Network first for the page so updates show up; cache first for everything else in the app.
    if (e.request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
      e.respondWith(fetch(e.request).then((res) => {
        const copy = res.clone(); caches.open(CACHE).then((c) => c.put('index.html', copy)); return res;
      }).catch(() => caches.match('index.html')));
    } else {
      e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
    }
  } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res;
    })));
  }
});
