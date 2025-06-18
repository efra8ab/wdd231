document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});