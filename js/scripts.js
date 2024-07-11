let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    updateCart();
});

function addToCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} - R$${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="decreaseQuantity('${item.name}')">-</button>
            <button onclick="increaseQuantity('${item.name}')">+</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

function increaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
            cart = cart.filter(item => item.name !== name);
        }
        updateCart();
    }
}
