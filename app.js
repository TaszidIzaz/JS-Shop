    import { products } from "./product.js";
    import {
    addToCart,
    removeCartItem,
    clearCart,
    getCartItems,
    calculateTotalAmount,
    } from "./cart.js";

    const productContainer = document.querySelector(".product-list");
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalAmountContainer = document.querySelector(".total-amount");
    const clearCartButton = document.getElementById("clear-cart");

    function displayProducts() {
    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
        <p>${product.name}</p>
        <p>Price: $${product.price}</p>
        <button class="add-to-cart" data-product-id="${product.id}"> Add to Cart </button>
        `;
        productContainer.appendChild(productElement);
    });
    }

    function displayCartItems() {
    cartItemsContainer.innerHTML = "";
    const cartItems = getCartItems();

    cartItems.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
        <p>${item.product.name} (${item.quantity}) - $${item.product.price}</p>
        <p>$${item.product.price * item.quantity}</p>
        <button class="remove-item" data-product-id="${item.product.id}"> Remove </button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    const totalAmount = calculateTotalAmount();
    totalAmountContainer.textContent = `Total Amount: $${totalAmount}`;
    }

    function clearCartItems() {
    clearCart();
    cartItemsContainer.innerHTML = "";
    totalAmountContainer.textContent = "";
    }

    function handleAddToCart(event) {
    const productId = event.target.dataset.productId;
    const selectedProduct = products.find((product) => product.id === parseInt(productId));
    addToCart(selectedProduct, 1);
    displayCartItems();
    }

    function handleRemoveItem(event) {
    const productId = event.target.dataset.productId;
    removeCartItem(parseInt(productId));
    displayCartItems();
    }

    displayProducts();
    displayCartItems();

    productContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        handleAddToCart(event);
    }
    });

    cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        handleRemoveItem(event);
    }
    });

    clearCartButton.addEventListener("click", clearCartItems);
