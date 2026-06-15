let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

let allProducts = [];

async function fetchProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    allProducts = await response.json();

    displayProducts(allProducts);
}

function displayProducts(products) {
    productContainer.innerHTML = "";

    products.forEach(product => {
        productContainer.innerHTML += `
        <div class="card">
            <img src="${product.image}">
            <h3>${product.title}</h3>
            <p>₹${Math.round(product.price * 85)}</p>
            <button onclick="addToCart(${product.id})">
    Add to Cart
</button>
        </div>
        `;
    });
}

searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchValue)
    );

    displayProducts(filteredProducts);
});
document.getElementById("cart-btn").innerText =
    `Cart (${cart.length})`;
fetchProducts();

    function addToCart(id) {
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const product = allProducts.find(item => item.id === id);

        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    document.getElementById("cart-btn").innerText =
        `Cart (${totalItems})`;
}
