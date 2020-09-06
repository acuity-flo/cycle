// const cacheName = 'v1'

// self.addEventListener('install', evt => {
//   // evt.waitUntil(
//   //   caches.open(cacheName)
//   //     .then(cache => {
//   //       return cache.addAll()
//   //     })
//   // )
//   console.log('this is a install request')
// })

// // self.addEventListener('activate', () => {
// //   console.log('this is a activate request')
// //   let request = indexedDB.open('CYCLE_EXAMPLE', 1), db, tx, store;

// //   request.onupgradeneeded = function(event) {
// //     db = request.result
// //     store = db.createObjectStore("CYCLE_STORE", {keyPath: "_id"})
// //   }
// //   request.onsuccess = function(event) {
// //       console.log('[onsuccess]', request.result);
// //       db = request.result
// //       tx = db.transaction('CYCLE_STORE', 'readwrite')
// //       store = tx.objectStore('CYCLE_STORE')

// //       db.onerror = function(event) {
// //         console.log('CYCLE_STORE ERROR', event.target.errorCode)
// //       }
// //       store.put({
// //         _id: 12345,
// //         username: "cherisecycles",
// //         name: "cherise",
// //         email: "cherise@dummy.com",
// //         password: "password",
// //         pronouns: "she/her/hers",
// //         period: [
// //           { date: "2020-06-05", "typeOfFlow": "heavy" },
// //           { date: "2020-06-06", "typeOfFlow": "light" },
// //         ],
// //         symptomTags: [
// //           {
// //             date: "2020-06-05",
// //             symptoms: [
// //               { "symptomName": "calm", "category": "mood" },
// //               { "symptomName": "stressed", "category": "mood" },
// //               { "symptomName": "anxious", "category": "emotion" }
// //             ]
// //           }
// //         ]
// //         })

// //       tx.oncomplete = function() {
// //         db.close()
// //       }
// //   };
// //   request.onerror = function(event) {
// //       console.log('[onerror]', request.error);
// //   };
// // })

// self.addEventListener('fetch', evt => {
//   console.log('this is a fetch request')
//   console.log('this is the event in fetch', evt)
//   console.log('this is the evt request in fetch', evt.request)

//   // evt.respondWith(
//   //   caches.match(evt.request)
//   //     .then(res => {
//   //       console.log('res in first then', res)
//   //       if (res) {
//   //         return res
//   //       }
//   //       return fetch(event.request)
//   //     })
//   //     .then(res => {
//   //       console.log('res in second then', res)
//   //       return caches.open(cacheName)
//   //         .then(cache => {
//   //           cache.put(event.request.url, res.clone());
//   //           return res;
//   //       })
//   //     })
//   //     .catch(error => {
//   //       console.log('there was an error', error)
//   //     })
//   // )
// })

// self.addEventListener('sync', evt => {
//   console.log('this is a sync request')
//   console.log('this is the event in sync', evt)
//   console.log('this is the evt request in sync', evt.request)

// })
