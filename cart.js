const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-items");
function displayCart() {
    container.innerHTML = "";

    let total = 0;

    cartItems.forEach((product, index) => {

        total += Math.round(product.price * 85) * product.quantity;

        container.innerHTML += `
    <div class="card">
        <img src="${product.image}">
        <h3>${product.title}</h3>
        <p>₹${Math.round(product.price * 85)}</p>

        <div>
            <button onclick="decreaseQuantity(${index})">-</button>
            <span> Quantity: ${product.quantity} </span>
            <button onclick="increaseQuantity(${index})">+</button>
        </div>

        <button onclick="removeItem(${index})">
            Remove
        </button>
    </div>
`;

    });

    document.getElementById("total-price").innerText =
        `Total: ₹${total}`;
}
function increaseQuantity(index) {
    cartItems[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cartItems));

    displayCart();
}

function decreaseQuantity(index) {

    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;

        localStorage.setItem("cart", JSON.stringify(cartItems));

        displayCart();
    }
}
function removeItem(index) {
    cartItems.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cartItems));

    displayCart();
}

displayCart();