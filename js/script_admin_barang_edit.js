

let id_barang = null;
let nama_barang = null;
let jumlah_barang = null;

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
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
// Fungsi untuk menampilkan detail data
function renderDetail(data) {
    const container = document.getElementById("detailContainer");

    if (data) {
        container.innerHTML = `
            <form id="editForm">
                <label for="namaBarang">Nama Barang</label>
                <input type="text" id="namaBarang" value="${data.nama_barang}" />

                <label for="jumlahBarang">Jumlah Barang</label>
                <input type="number" id="jumlahBarang" value="${data.jumlah_barang}" />
                
                <button type="submit" onclick="updatedbarang(event)">Simpan</button>
            </form>
        `;
    } else {
        container.innerHTML = `
            <h2>Data tidak ditemukan</h2>
        `;
    }
}
function updatedbarang(event) {
    event.preventDefault(); // Mencegah refresh halaman

    const nama_barang = document.getElementById("namaBarang").value;
    const jumlah_barang = document.getElementById("jumlahBarang").value;

    fetch(`https://webacp16.merak.web.id/API-peminjaman-barang/PUT_barang.php?id=${id_barang}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_barang: id_barang,
            nama_barang: nama_barang,
            jumlah_barang: jumlah_barang,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Gagal memperbarui data.");
            } else {
                alert("Data berhasil diperbarui.");

                // Tambahkan indikator untuk memuat ulang di halaman sebelumnya
                localStorage.setItem("refreshNeeded", "true");
                window.location.href = "Admin_barang_hapus.html";
              

            }

            return response.json();
        })
        .catch((error) => {
            console.error("Kesalahan saat memperbarui data:", error);
            alert("Terjadi kesalahan. Silakan coba lagi.");
        });
}


