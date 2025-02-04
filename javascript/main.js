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
});
