// Menunggu seluruh konten halaman dimuat sebelum menjalankan fungsi
document.addEventListener("DOMContentLoaded", function () { 
  const container = document.querySelector("#berita .container .row");// Mengambil elemen #berita .container .row

  // URL API
  const apiURL = 'https://newsdata.io/api/1/latest?apikey=pub_8e905c46e8564d5f9dba066a54662db0&country=id&language=id&category=health';

  // Memuat data berita dari API
  fetch(apiURL)
    .then(response => response.json())// Mengonversi respon menjadi objek JSON
    .then(result => {
      const data = result.results;// Menyimpan data berita kedalam variabel data
      // Cek apakah data kosong
      if (!data || data.length === 0) {
        throw new Error("Data kosong");
      }

      container.innerHTML = ""; // Bersihkan isi sebelumnya

      // Menampilkan 8 berita paling pertama
      data.slice(0, 8).forEach((berita, index) => {
        const image = berita.image_url;
        const title = berita.title;
        const description = berita.description || berita.content;

        // Membuat elemen div dengan class "col-md-3"
        const card = document.createElement('div');
        card.className = 'col-md-3';
        // Membuat card dengan html yang berisi gambar, judul dan deskripsi
        card.innerHTML = `
          <a href="detail-berita.html?id=${index}" class="text-decoration-none text-dark">
            <div class="card h-100">
              <img src="${image}" class="card-img-top" alt="${title}">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description.slice(0, 100)}...</p>
              </div>
            </div>
          </a>
        `;

        container.appendChild(card);// Menambahkan card ke elemen #berita .container .row

        // Simpan berita ke localStorage agar bisa diakses di halaman detail-berita
        localStorage.setItem(`berita-${index}`, JSON.stringify(berita));
      });
    })
    .catch(error => {// Menampilkan pesan error jika terjadi kesalahan saat mengambil data dari API
      console.error("Gagal mengambil berita:", error);
      container.innerHTML = "<p class='text-danger'>Gagal memuat berita. Silakan coba beberapa saat lagi.</p>";
    });
});
