// Service Worker for Khaadi Website
// Implements advanced caching strategies for optimal performance

const CACHE_NAME = 'khaadi-v1.0.0';
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/styles.min.css',
  '/script.min.js',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Fetch event - implement cache-first strategy with network fallback
self.addEventListener('fetch', event => {
  // Don't cache certain types of requests
  if (event.request.destination === 'xmlhttprequest' || 
      event.request.destination === 'eventsource' ||
      event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          // Update cache in the background (refresh strategy)
          event.waitUntil(updateCache(event.request));
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            event.waitUntil(
              caches.open(CACHE_NAME)
                .then(cache => {
                  // Only cache if the URL is not too long and is a valid cacheable resource
                  if (event.request.url.length < 2048) {
                    cache.put(event.request, responseToCache);
                  }
                })
            );

            return response;
          })
          .catch(() => {
            // If fetching from network fails, try to serve offline page
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Function to update cache in the background
function updateCache(request) {
  return fetch(request)
    .then(response => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      const responseToCache = response.clone();

      return caches.open(CACHE_NAME)
        .then(cache => {
          if (request.url.length < 2048) {
            cache.put(request, responseToCache);
          }
        });
    })
    .catch(error => {
      console.error('Failed to update cache for:', request.url, error);
    });
}

// Listen for message events from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline functionality
if ('sync' in self.registration) {
  self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
      event.waitUntil(syncData());
    }
  });
}

// Push notifications handler
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Khaadi',
    icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'192\' height=\'192\' viewBox=\'0 0 192 192\'%3E%3Crect fill=\'%23d4af37\' width=\'192\' height=\'192\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'24\' fill=\'%23ffffff\'%3EK%3C/text%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'72\' height=\'72\' viewBox=\'0 0 72 72\'%3E%3Ccircle cx=\'36\' cy=\'36\' r=\'36\' fill=\'%23d4af37\'/%3E%3C/svg%3E',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Khaadi Updates', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://khaadi.com/')
  );
});