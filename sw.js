var staticCacheName ='restaurant-app-v1';
//lkxkzkjsdjjsjdjks
self.addEventListener('install',function(event){
	var urlsToCache = [
		'/',
		'/index.html',
		'/restaurant.html?id=1',
		'/restaurant.html?id=2',
		'/restaurant.html?id=3',
		'/restaurant.html?id=4',
		'/restaurant.html?id=5',
		'/restaurant.html?id=6',
		'/restaurant.html?id=7',
		'/restaurant.html?id=8',
		'/restaurant.html?id=9',
		'/restaurant.html?id=10',
		'/js/dbhelper.js',
		'/js/main.js',
		'/js/service_worker_register.js',
		'/js/restaurant_info.js',
		'/css/styles.css',
		'/data/restaurants.json',
		'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
		'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
	]
	event.waitUntil(
	    caches.open(staticCacheName)
	      .then(function(cache) {
	        console.log('Opened cache');
	        return cache.addAll(urlsToCache);
	  })
  );
})


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate',function(event){
	event.waitUntil(
			caches.keys().then(function(cacheNames){
				return Promise.all(
					cacheNames.filter(function(cacheName){
					return cacheName.startsWith('restaurant-app-') 
					&& cacheName != staticCacheName
				}).map(function(cacheName){
					return caches.delete(cacheName)
				})
				)
			})
		)
})
