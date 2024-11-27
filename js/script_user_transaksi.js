let id_barang = null;
let nama_barang = null;
let jumlah_barang = null;

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fungsi untuk fetch data detail berdasarkan ID
async function fetchDetail(id) {
    try {
        const response = await fetch(`https://webacp16.merak.web.id/API-peminjaman-barang/GET_barang{id}.php?id=${id}`);
        const data = await response.json();
        id_barang = data.idbarang;
        nama_barang = data.nama_barang;
        jumlah_barang = data.jumlah_barang;

        // Panggil fungsi untuk render detail
        renderDetail(data);
    } catch (error) {
        console.error("Kesalahan saat mengambil data detail:", error);
        document.getElementById("detailContainer").innerHTML = `
            <h2>Gagal memuat detail</h2>
            <p>Silakan coba lagi nanti.</p>
            `
        ;
    }
}

// Fungsi untuk menampilkan detail data
function renderDetail(data) {
    const container = document.getElementById("detailContainer");

    if (data) {
        container.innerHTML = `
            <h2>${data.nama_barang}</h2>
            <p>ID: ${data.idbarang}</p>
            <p>Jumlah: ${data.jumlah_barang}</p>
            `
        ;
    } else {
        container.innerHTML = `
            <h2>Data tidak ditemukan</h2>
            `
        ;
    }
}

// Ambil parameter ID dari URL
const id = getQueryParam("id");

// Fetch data detail jika ID ditemukan
if (id) {
    fetchDetail(id);
} else {
    document.getElementById("detailContainer").innerHTML = `
        <h2>ID tidak ditemukan</h2>
        <p>Silakan kembali ke halaman utama.</p>
        `
    ;
}



// Fungsi untuk melakukan transaksi
function transaksi() {
    const iduser = localStorage.getItem("iduser"); // Ambil ID user dari localStorage
    const idbarang = getQueryParam("id"); // Ambil ID barang dari URL
    const tanggal_peminjaman = document.getElementById("tanggal_peminjaman").value;
    const tanggal_pengembalian = document.getElementById("tanggal_pengembalian").value;
    const jumlah = document.getElementById("angka").value;

    if (!iduser || !idbarang || !tanggal_peminjaman || !tanggal_pengembalian) {
        alert("Semua data harus diisi dengan benar!");
        return;
    }

    fetch("https://webacp16.merak.web.id/API-peminjaman-barang/POST_transaksi.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            iduser,
            idbarang,
            tanggal_peminjaman,
            tanggal_pengembalian,
            jumlah
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Gagal memproses transaksi.");
            }
            return response.json();
        })
        .then(() => {
            alert("Barang berhasil dipinjam!");
            window.location.href = "../html/User_peminjaman.html";
        })
        .catch((error) => {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan saat memproses transaksi.");
        });
}



document.getElementById("transaksi").addEventListener("submit", function (event) {
    event.preventDefault();
   transaksi();
   stok();

   
function stok(){
    const jumlah = document.getElementById("angka").value;
    const stok = jumlah_barang - jumlah;
    fetch("https://webacp16.merak.web.id/API-peminjaman-barang/PUT_barang.php?id=" + id_barang, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_barang: id_barang,
            nama_barang: nama_barang,   
            jumlah_barang: stok,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Gagal memproses transaksi.");
            }
            return response.json();
        })
}

});
