// Fungsi untuk fetch data dari API
async function fetchData() {
    try {
        const response = await fetch("https://webacp16.merak.web.id/API-peminjaman-barang/GET_barang.php");
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
            <h3>${item.nama_barang}</h3>
            <p>${item.jumlah_barang}</p>
           
        `;

        // Event klik untuk card
        card.addEventListener("click", () => {
            // Arahkan ke halaman transaksi
            window.location.href = `../html/User_transaksi.html?id=${item.idbarang}`;
        });

        // Tambahkan card ke container
        container.appendChild(card);
    });
}

// Panggil fungsi fetch data saat halaman dimuat
fetchData();
