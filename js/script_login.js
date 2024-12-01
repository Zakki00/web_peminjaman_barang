document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah refresh halaman

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if(!username || !password){
    alert("Username dan password tidak boleh kosong");
    }else{
        if (username === "Admin") {
            login_admin(username, password);
        }else {
            login_user(username, password);
     }

    }
  
    // Fungsi login untuk admin
    function login_admin(username, password) {
        fetch("https://webacp16.merak.web.id/API-peminjaman-barang/GET_admin.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Gagal mendapatkan data admin.");
                }
                return response.json();
            })
            .then(admins => {
                const admin = admins.find(a => a.username === username && a.password === password);

                if (admin) {
                    // Simpan ID admin ke localStorage
                    localStorage.setItem("idadmin", admin.idadmin);

                    alert("Login berhasil sebagai Admin.");
                    window.location.href = "../html/Admin_beranda.html";
                } else {
                    alert("Username atau password Admin salah.");
                }
            })
            .catch(error => {
                console.error("Terjadi kesalahan:", error);
                alert("Terjadi kesalahan saat mencoba login Admin.");
            });
    }

    // Fungsi login untuk user
    function login_user(username, password) {
        fetch("https://webacp16.merak.web.id/API-peminjaman-barang/GET_user.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Gagal mendapatkan data pengguna.");
                }
                return response.json();
            })
            .then(users => {
                // Cari user yang cocok berdasarkan username dan password
                const user = users.find(u => u.username === username && u.password === password);
    
                if (user) {
                    // Simpan iduser ke localStorage
                    localStorage.setItem("iduser", user.iduser);
                    console.log("ID User Disimpan:", user.iduser);
    
                    alert("Login berhasil");
                    window.location.href = "../html/User_beranda.html";
                } else {
                    alert("Username atau password salah");
                }
            })
            .catch(error => {
                console.error("Terjadi kesalahan saat login:", error);
                alert("Terjadi kesalahan saat mencoba login.");
            });
    }
    
});
