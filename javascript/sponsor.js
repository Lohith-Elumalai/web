let lastScrollY = window.scrollY;
const navbar = document.querySelector(".nav-bar");

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
        navbar.style.transform = "translateY(-100%)"; // Hide when scrolling down
    } else {
        navbar.style.transform = "translateY(0)"; // Show when scrolling up
    }
    lastScrollY = window.scrollY;
});
