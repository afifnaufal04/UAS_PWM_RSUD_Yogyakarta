let db;
const request = indexedDB.open("RSUDTestimoniDB", 1);

request.onerror = () => {
  console.error("Database gagal dibuka");
};

request.onsuccess = () => {
  db = request.result;
  console.log("Database berhasil dibuka");
  tampilkanTestimoni();
};

request.onupgradeneeded = e => {
  const db = e.target.result;
  const store = db.createObjectStore("testimoni", { keyPath: "id", autoIncrement: true });
  store.createIndex("nama", "nama", { unique: false });
  store.createIndex("pesan", "pesan", { unique: false });
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formTestimoni");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nama = document.getElementById("nama").value;
      const pesan = document.getElementById("pesan").value;

      const tx = db.transaction(["testimoni"], "readwrite");
      const store = tx.objectStore("testimoni");
      store.add({ nama, pesan });

      tx.oncomplete = () => {
        console.log("Data testimoni ditambahkan");
        tampilkanTestimoni();
        this.reset();
      };

      tx.onerror = () => {
        console.error("Gagal menambahkan testimoni");
      };
    });
  }
});

function tampilkanTestimoni() {
  const tx = db.transaction("testimoni", "readonly");
  const store = tx.objectStore("testimoni");

  let wrapper = document.getElementById("listTestimoniWrapper");
  if (!wrapper) {
    // Tambahkan wrapper di dalam section #testimoni
    const testimoniSection = document.querySelector("#testimoni .container");
    wrapper = document.createElement("div");
    wrapper.id = "listTestimoniWrapper";
    wrapper.className = "row gy-3 mt-4";
    testimoniSection.appendChild(wrapper);
  } else {
    wrapper.innerHTML = "";
  }

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
      wrapper.appendChild(col);
      cursor.continue();
    }
  };
}
