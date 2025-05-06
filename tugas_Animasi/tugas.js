document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Es Krim Vanila', flavor: 'vani', price: 15000, img: 'img/vani.jpg' },
        { id: 2, name: 'Es Krim Cokelat', flavor: 'cokelat', price: 16000, img: 'img/cokelat.jpg' },
        { id: 3, name: 'Es Krim Strawberry', flavor: 'strawberry', price: 17000, img: 'img/strawberry.jpg' },
        { id: 4, name: 'Es Krim Mangga', flavor: 'mangga', price: 16000, img: 'img/mangga.jpg' },
        { id: 5, name: 'Es Krim Matcha', flavor: 'matcha', price: 18000, img: 'img/matcha.jpg' },
        { id: 6, name: 'Es Krim Karamel', flavor: 'karamel', price: 17000, img: 'img/karamel.jpg' }
    ];

    const menuContainer = document.getElementById('menu-items');
    const filterSelect = document.getElementById('filter-flavor');
    const cartItems = document.getElementById('cart-items');
    const clearCartBtn = document.getElementById('clear-cart');
    let cart = [];

    function renderMenu(filter = "") {
        menuContainer.innerHTML = "";
        const filtered = filter ? products.filter(p => p.flavor === filter) : products;

        filtered.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            col.innerHTML = `
                <div class="card shadow-sm h-100">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Rp ${product.price.toLocaleString('id-ID')}</p>
                        <button class="btn btn-outline-primary add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
                    </div>
                </div>
            `;
            menuContainer.appendChild(col);
        });

        // Add to cart event listeners
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const product = products.find(p => p.id === id);
                cart.push(product);
                renderCart();
            });
        });
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Keranjang Anda kosong.</p>";
            return;
        }

        cartItems.innerHTML = '<ul class="list-group">';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            cartItems.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${item.name}
                    <span>Rp ${item.price.toLocaleString('id-ID')}</span>
                </li>`;
        });

        // Display total price
        cartItems.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <strong>Total</strong>
                <strong>Rp ${total.toLocaleString('id-ID')}</strong>
            </li>
        `;
        cartItems.innerHTML += '</ul>';

        // Add checkout button if cart has items
        if (cart.length > 0) {
            cartItems.innerHTML += `
                <button class="btn btn-primary btn-block mt-3" id="checkout-btn">Checkout</button>
            `;
        }
    }

    // Clear cart functionality
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        renderCart();
    });

    // Checkout functionality (optional)
    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.id === 'checkout-btn') {
            alert('Anda akan diarahkan ke halaman pembayaran!');
        }
    });

    // Filter by flavor
    filterSelect.addEventListener('change', () => {
        const selected = filterSelect.value;
        renderMenu(selected !== "Pilih Rasa" ? selected : "");
    });

    renderMenu();
});
