// Cart Functionality
let cartItems = [];
const cartBadge = document.querySelector('#cart .badge');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = {
            id: e.target.dataset.id,
            name: e.target.parentElement.querySelector('h4').innerText,
            price: e.target.parentElement.querySelector('.price').innerText
        };
        cartItems.push(product);
        updateCartBadge();
        showNotification(`${product.name} added to cart!`);
    });
});

function updateCartBadge() {
    cartBadge.textContent = cartItems.length;
}

// Wishlist Functionality
let wishlistItems = [];
const wishlistBadge = document.querySelector('#wishlist .badge');

document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        if (!wishlistItems.includes(productId)) {
            wishlistItems.push(productId);
            updateWishlistBadge();
            showNotification('Item added to wishlist!');
        }
    });
});

function updateWishlistBadge() {
    wishlistBadge.textContent = wishlistItems.length;
}

// Search Functionality
document.querySelector('.search-bar').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterProducts(searchTerm);
});

function filterProducts(searchTerm) {
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.querySelector('h4').innerText.toLowerCase();
        card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
    });
}

// Newsletter Subscription
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (validateEmail(email)) {
        showNotification('Thank you for subscribing!');
        e.target.reset();
    } else {
        showNotification('Please enter a valid email address', 'error');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize
function init() {
    updateCartBadge();
    updateWishlistBadge();
}

document.addEventListener('DOMContentLoaded', init);