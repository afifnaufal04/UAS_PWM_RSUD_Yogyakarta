let db;
const request = indexedDB.open("RSUDTestimoniDB", 1);// Membuka database RSUDTestimoniDB

// Event ketika database gagal dibuka
request.onerror = () => {
  console.error("Database gagal dibuka");
};
// Event ketika database berhasil dibuka
request.onsuccess = () => {
  db = request.result;
  console.log("Database berhasil dibuka");
  tampilkanTestimoni();// Memanggil fungsi untuk menampilkan testimoni
};

// Event ketika database berhasil dibuat
request.onupgradeneeded = e => {
  const db = e.target.result;
  const store = db.createObjectStore("testimoni", { keyPath: "id", autoIncrement: true });// Membuat objek store "testimoni"
  store.createIndex("nama", "nama", { unique: false });// Membuat index untuk kolom "nama"
  store.createIndex("pesan", "pesan", { unique: false });// Membuat index untuk kolom "pesan"
};

// Event ketika form di submit
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formTestimoni");// Mengambil elemen form
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();// Mencegah form reload halaman
      // Mengambil nilai dari input nama dan pesan
      const nama = document.getElementById("nama").value;
      const pesan = document.getElementById("pesan").value;

      // Memasukkan data testimoni ke dalam IndexedDB
      const tx = db.transaction(["testimoni"], "readwrite");
      const store = tx.objectStore("testimoni");//
      store.add({ nama, pesan });

      // Event ketika data testimoni berhasil ditambahkan
      tx.oncomplete = () => {
        console.log("Data testimoni ditambahkan");
        tampilkanTestimoni();
        this.reset();
      };

      // Event ketika data testimoni gagal ditambahkan
      tx.onerror = () => {
        console.error("Gagal menambahkan testimoni");
      };
    });
  }
});

// Fungsi untuk menampilkan testimoni
function tampilkanTestimoni() {
  const tx = db.transaction("testimoni", "readonly");
  const store = tx.objectStore("testimoni");// Mengambil objek store

  // Mengambil elemen #listTestimoniWrapper
  let wrapper = document.getElementById("listTestimoniWrapper");
  if (!wrapper) {
    // Tambahkan wrapper belum ada, buat elemen div baru dengan id "listTestimoniWrapper" , dan tambahkan class "row gy-3 mt-4"
    const testimoniSection = document.querySelector("#testimoni .container");
    wrapper = document.createElement("div");
    wrapper.id = "listTestimoniWrapper";
    wrapper.className = "row gy-3 mt-4";
    testimoniSection.appendChild(wrapper);
  } else {
    wrapper.innerHTML = "";
  }

  // Menampilkan testimoni
  store.openCursor().onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      const { nama, pesan } = cursor.value;
      const col = document.createElement("div");
      col.className = "col-md-3";
      col.innerHTML = `
        <div class="card p-4 shadow p-3 mb-3">
          <h4>${nama}</h4>
          <p class="text-dark">${pesan}</p>
        </div>
      `;
      wrapper.appendChild(col);// Menambahkan elemen col ke dalam wrapper
      cursor.continue();// Lanjutkan ke testimoni berikutnya
    }
  };
}
