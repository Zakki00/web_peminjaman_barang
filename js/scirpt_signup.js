const nama = document.getElementById("nama").value;
const tanggal_lahir = document.getElementById("tanggal_lahir").value;
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

function login_admin() {
  fetch("https://webacp16.merak.web.id/API-peminjaman-barang/POST_admin.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama: nama,
      tanggal_lahir: tanggal_lahir,
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then

}

function login_user() {
  fetch("https://webacp16.merak.web.id/API-peminjaman-barang/POST_user.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama: nama,
      tanggal_lahir: tanggal_lahir,
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then
}


if (username === "" && password === "" && username == "" && password === "") {
    alert("Username dan password tidak boleh kosong");
}else{
    if (username === "Admin") {
        login_admin();
    } else {
        login_user();
    }
}