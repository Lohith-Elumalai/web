document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.querySelector(".search-bar");
    const shopButtons = document.querySelectorAll(".shop-btn");

    // Search functionality
    searchBar.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            alert("Searching for: " + searchBar.value);
        }
    });

    // Shop Now button click effect
    shopButtons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Item added to cart!");
        });
    });
    const navBar = document.querySelector(".nav-bar");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function() {
        if (window.scrollY > lastScrollY) {
            navBar.style.top = "-60px";
        } else {
            navBar.style.top = "0";
        }
        lastScrollY = window.scrollY;
    });

    const clearFiltersBtn = document.querySelector(".clear-filters");
    clearFiltersBtn.addEventListener("click", function() {
        document.querySelectorAll(".filter-sidebar input[type=checkbox]").forEach(checkbox => checkbox.checked = false);
    });
});
