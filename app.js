// Memanggil dan menjalankan fungsi registerSW
registerSW();

// Mendefinisikan fungsi registerSW
async function registerSW() {
  // mengecek apakah browser mendukung service worker
  // Jika ya, maka proses pendaftaran akan dilakukan.
  if ('serviceWorker' in navigator) {
    try {
      // Menunggu Mendaftarkan file sw.js sebagai service worker 
      const registration = await navigator.serviceWorker.register("sw.js");
      // Menampilkan pesan bahwa service worker berhasil terdaftar 
      console.log("Service Worker registered"); 
      //Jika terjadi kesalahan, maka akan bagian catch menampilkan pesan error 
    } catch (error) {
      showResult("Error while registering: " + error.message);
    }  
  // Jika browser tidak mendukung service worker
  // Maka akan menampilkan pesan "Service workers API not available"  
  } else {
      showResult("Service workers API not available");
  }
}; 

// Mendefinisikan fungsi showResult
function showResult(text) {
  // Mengambil elemen "output" dari dokumen HTML
  // untuk menampilkan pesan error atau berhasil
  document.querySelector("output").innerHTML = text;
}