document.getElementById("signup").addEventListener("submit", function (event) {
  event.preventDefault();
const nama = document.getElementById("nama").value;
const tanggal_lahir = document.getElementById("tanggal_lahir").value;
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;


  
  if (username == "" && password == "" && nama == "" && tanggal_lahir == "") {
    alert("Data Tidak Lengkap");
  
  }else{
    if (username === "Admin") {
        login_admin();
        history.back();
    } else {
        login_user();
        history.back();
    }
  }
function login_admin() {
  fetch("https://webacp16.merak.web.id/API-peminjaman-barang/POST_admin.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama_admin: nama,
      tanggal_lahir: tanggal_lahir,
      username: username,
      password: password,
    }),
  })
   .then((response) =>{
   
      if(response.ok){
       alert("Berhasil Menjadi Admin");
      }else{
        alert("Terjadi kesalahan saat mencoba Signup");
      }
      return response.json();
   })
}

function login_user() {
  fetch("https://webacp16.merak.web.id/API-peminjaman-barang/POST_user.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama_user: nama,
      tanggal_lahir: tanggal_lahir,
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("success");
      } else {
        alert("Terjadi kesalahan saat mencoba Signup");
      }
    })
    
}

});












