// Event untuk menginstall Service Worker pertama kali
self.addEventListener("install", async event => {
  // Membuka cache atau membuat cache jika belum ada dengan nama "pwa-assets"
  const cache = await caches.open("pwa-assets");
  // Menambahkan file yang dapat diakses saat offline ke dalam cache
  cache.addAll([
    "./index.html",
    "./dokter.html",
    "./departemen.html",
    "./app.js",
    "./manifest.json",
    "./assets/css/style.css",
    "./assets/js/berita.js",
    "./assets/js/testimoni-db.js",
    "./assets/img/logo_rsud.png",
    "./assets/img/logo_rsud-48.png",
    "./assets/img/logo_rsud-192.png",
    "./assets/img/logo_rsud-512.png",
    "./assets/img/hero-bg.jpg",
    "./assets/img/about.jpg",
    "./assets/img/testimonials/testimonials-1.jpg",
    "./assets/img/testimonials/testimonials-2.jpg",
    "./assets/img/testimonials/testimonials-3.jpg",
    "./assets/img/testimonials/testimonials-4.jpg",
    "./assets/img/testimonials/testimonials-5.jpg",
    "./assets/img/icon/facebook.png",
    "./assets/img/icon/instagram.png",
    "./assets/img/icon/linkedin.png",
    "./assets/img/service/service-1.jpg",
    "./assets/img/service/service-2.jpg",
    "./assets/img/service/service-3.jpg",
    "./assets/img/service/service-4.jpg",
    "./assets/img/service/service-5.jpg",
    "./assets/img/service/service-6.jpg",
    "./assets/img/doctors/doctors-1.jpg",
    "./assets/img/doctors/doctors-2.jpg",
    "./assets/img/doctors/doctors-3.jpg",
    "./assets/img/doctors/doctors-4.jpg",
    "./assets/img/doctors/doctors-5.jpg",
    "./assets/img/doctors/doctors-6.jpg",
    "./assets/img/departemen/departments-1.jpg",
    "./assets/img/departemen/departments-2.jpg",
    "./assets/img/departemen/departments-3.jpg",
    "./assets/img/departemen/departments-4.jpg",
    "./assets/img/departemen/departments-5.jpg"
  
  ]); 
});

// Event untuk menjalankan Service Worker dengan mengambil file dari cache
self.addEventListener("fetch", event => {
   event.respondWith(
    // Mencari apakah file sudah ada dalam cache
     caches.match(event.request).then(cachedResponse => {
	   // Kembalikan file dari cache jika ada, jika tidak maka kembalikan file dari server
         return cachedResponse || fetch(event.request);
     }
   )
  )
});