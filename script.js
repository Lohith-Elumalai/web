
document.getElementById('filter').addEventListener('change', function() {
    const filterValue = this.value;
    alert("Filter selected: " + filterValue);
});

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        alert("Added to bag!");
    });
});

document.querySelectorAll(".wishlist").forEach(button => {
    button.addEventListener("click", () => {
        alert("Added to wishlist!");
    });
});
