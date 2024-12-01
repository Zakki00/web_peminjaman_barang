document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("idadmin") === null) {
        window.location.href = "../html/login.html"; // Redirect ke halaman login jika belum login
    }
});

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("idadmin");
    window.location.href = "../html/login.html"; // Redirect ke halaman login setelah logout
});

// Fungsi untuk fetch data dari API
async function fetchData() {
    try {
        const response = await fetch("https://webacp16.merak.web.id/API-peminjaman-barang/GET_PEMINJAMAN.php");
        const data = await response.json();

        // Panggil fungsi untuk render data
        renderData(data);
    } catch (error) {
        console.error("Kesalahan saat mengambil data:", error);
    }
}

// Fungsi untuk menampilkan data ke dalam card
function renderData(items) {
    const container = document.getElementById("dataContainer");
    container.innerHTML = ""; // Kosongkan container sebelum menambahkan elemen baru

    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Konten card
        card.innerHTML = `
            <h2>${item.nama_user}</h2>
            <h3>${item.nama_barang}</h3>
            <p>${item.jumlah}</p>
           
        `;
        // Tambahkan card ke container
        container.appendChild(card);
    });
}

// Panggil fungsi fetch data saat halaman dimuat
fetchData();
