document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("idadmin") === null) {
        window.location.href = "../html/login.html"; // Redirect ke halaman login jika belum login
    }
});

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("idadmin");
    window.location.href = "../html/login.html"; // Redirect ke halaman login setelah logout
});
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("refreshNeeded") === "true") {
        console.log("Memuat ulang data...");
        fetchData();
    //     localStorage.removeItem("refreshNeeded");
    // } else {
    //     console.log("Memuat data seperti biasa...");
    //     fetchData();
    }
});

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
        <button class="btn btn-primary" onclick="hapus(${item.idbarang})">Hapus</button>
        <button type = "submit" class="btn btn-primary" onclick="window.location.href = '../html/Admin_barang_edit.html?id=${item.idbarang}'">Ubah</button>
    `;
        container.appendChild(card);
    });
}


async function hapus(idbarang) {
    const konfirmasi = confirm("Apakah Anda yakin ingin mengembalikan barang ini?");
    if (!konfirmasi) {
        return;
    }

    try {
        const deleteResponse = await fetch(`https://webacp16.merak.web.id/API-peminjaman-barang/DELETE_barang.php?id=${idbarang}`, {
            method: "DELETE"
        });

        if (!deleteResponse.ok) {
            throw new Error("Gagal menghapus transaksi.");
        }
        fetchData();
    } catch (error) {
        console.error("Kesalahan saat mengembalikan barang:", error);
        alert("Terjadi kesalahan saat memproses pengembalian barang.");
    }
}

// Panggil fungsi fetch data saat halaman dimuat
fetchData();
