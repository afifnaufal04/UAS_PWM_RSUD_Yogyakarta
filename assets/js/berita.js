document.addEventListener("DOMContentLoaded", function () { 
  const container = document.querySelector("#berita .container .row");

  const apiURL = 'https://newsdata.io/api/1/latest?apikey=pub_8e905c46e8564d5f9dba066a54662db0&country=id&language=id&category=health';

  fetch(apiURL)
    .then(response => response.json())
    .then(result => {
      const data = result.results;

      if (!data || data.length === 0) {
        throw new Error("Data kosong");
      }

      container.innerHTML = ""; // Bersihkan isi sebelumnya

      data.slice(0, 8).forEach((berita, index) => {
        const image = berita.image_url;
        const title = berita.title;
        const description = berita.description || berita.content;

        const card = document.createElement('div');
        card.className = 'col-md-3';

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

        container.appendChild(card);

        // Simpan berita ke localStorage untuk halaman detail
        localStorage.setItem(`berita-${index}`, JSON.stringify(berita));
      });
    })
    .catch(error => {
      console.error("Gagal mengambil berita:", error);
      container.innerHTML = "<p class='text-danger'>Gagal memuat berita. Silakan coba beberapa saat lagi.</p>";
    });
});
