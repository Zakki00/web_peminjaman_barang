document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("iduser") === null) {
        window.location.href = "../html/login.html"; // Redirect ke halaman login jika belum login
    }
});

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("iduser");
    window.location.href = "../html/login.html"; // Redirect ke halaman login setelah logout
});