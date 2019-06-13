const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'landing-push-1.html',
  'css/style.css',
  'js/main.js',
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


//Handle the notificationclose event
self.addEventListener('notificationclose', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
  
    console.log('Closed notification: ' + primaryKey);
    notification.close();
});
  

  //Handle the notificationclick event
  self.addEventListener('notificationclick', event => {

    // open a custom page
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
    const action = event.action;
    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('/landing-push-'+ primaryKey +'.html');
        notification.close();
    }
    console.log('Navigted notification: ' + primaryKey);
  });

  //add push event listener
//   self.addEventListener('push', event => {
//     const options = {
//       body: 'This notification was generated from a push!',
//       icon: 'assets/android-chrome-192x192.png',
//       vibrate: [100, 50, 100],
//       data: {
//         dateOfArrival: Date.now(),
//         primaryKey: 1
//       },
//       actions: [
//         {action: 'explore', title: 'Go to the site',
//           icon: 'images/checkmark.png'},
//         {action: 'close', title: 'Close the notification',
//           icon: 'images/xmark.png'},
//       ]
//     };
  
//     event.waitUntil(
//       self.registration.showNotification('Push Notification', options)
//     );
//   });

self.addEventListener('push', event => {
    let body;
  
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Default body';
    }
  
    const options = {
      body: body,
      icon: 'assets/android-chrome-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {action: 'explore', title: 'Go to the site',
          icon: 'images/checkmark.png'},
        {action: 'close', title: 'Close the notification',
          icon: 'images/xmark.png'},
      ]
    };
  
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });