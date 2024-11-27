document.getElementById("barang").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nama_barang = document.getElementById("nama_barang").value;
    const jumlah_barang = document.getElementById("jumlah_barang").value;

    tambahBarang(nama_barang, jumlah_barang);
});

function tambahBarang(nama_barang, jumlah_barang) {
    
    fetch("https://webacp16.merak.web.id/API-peminjaman-barang/POST_barang.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nama_barang: nama_barang,
            jumlah_barang: jumlah_barang
        })
    })
    .then(response => response.json())
   .then(() => {
       document.getElementById("barang").reset();
       alert("Data berhasil ditambahkan");
    })
    }
      