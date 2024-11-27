let id_barang = null;
let nama_barang = null;
let jumlah_barang = null;
let stok = null;

async function fetchData() {
    try {
        const id = localStorage.getItem("iduser");
        const response = await fetch("https://webacp16.merak.web.id/API-peminjaman-barang/GET_user_peminjaman.php?id=" + id);
        const data = await response.json();

        if (data.length > 0) {
            id_barang = data[0].idbarang;
            nama_barang = data[0].nama_barang;
            jumlah_barang = data[0].jumlah_barang;
            stok = parseInt(jumlah_barang) + parseInt(data[0].jumlah);
        }

        renderData(data);
    } catch (error) {
        console.error("Kesalahan saat mengambil data:", error);
    }
}

function renderData(items) {
    const container = document.getElementById("dataContainer");
    container.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${item.nama_barang}</h3>
            <p>Jumlah: ${item.jumlah}</p>
            <button class="btn btn-primary" onclick="pengembalian(${item.idtransaksi}, ${item.jumlah}, ${item.idbarang})">Kembalikan</button>
        `;

        container.appendChild(card);
    });
}

async function pengembalian(idtransaksi, jumlah, idbarang) {
    const konfirmasi = confirm("Apakah Anda yakin ingin mengembalikan barang ini?");
    if (!konfirmasi) {
        return;
    }

    try {
        const deleteResponse = await fetch(`https://webacp16.merak.web.id/API-peminjaman-barang/DELETE_transaksi.php?id=${idtransaksi}`, {
            method: "DELETE"
        });

        if (!deleteResponse.ok) {
            throw new Error("Gagal menghapus transaksi.");
        }

        const updatedStok = parseInt(jumlah_barang) + parseInt(jumlah);

        const updateResponse = await fetch(`https://webacp16.merak.web.id/API-peminjaman-barang/PUT_barang.php?id=${idbarang}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idbarang: idbarang,
                nama_barang: nama_barang,
                jumlah_barang: updatedStok
            })
        });

        if (!updateResponse.ok) {
            throw new Error("Gagal memperbarui stok barang.");
        }

        alert("Barang berhasil dikembalikan!");
        fetchData();
    } catch (error) {
        console.error("Kesalahan saat mengembalikan barang:", error);
        alert("Terjadi kesalahan saat memproses pengembalian barang.");
    }
}

fetchData();
