document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cartItems");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");

    // Load cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Function to render cart items
    function renderCart() {
        // Clear the cart items container
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        // Check if there are cart items
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = "<tr><td colspan='7' style='text-align: center;'>Your cart is empty.</td></tr>";
            subtotalElement.textContent = "$0.00";
            taxElement.textContent = "$0.00";
            totalElement.textContent = "$0.00";
            return;
        }

        // Loop through the cart items and render them
        cartItems.forEach((item, index) => {
            const price = Number(item.price);
            const itemTotal = price * 1;  // Always 1 item per product in the cart
            subtotal += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.brand}</td>
                <td>₱${price.toFixed(2)}</td>
                <td>1</td> <!-- Quantity is always 1 -->
                <td>₱${itemTotal.toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        // Calculate totals
        const tax = subtotal * 0.05;  // 5% tax
        const total = subtotal + tax;

        subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
        taxElement.textContent = `₱${tax.toFixed(2)}`;
        totalElement.textContent = `₱${total.toFixed(2)}`;
    }

    // Event listener to remove item from cart
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            const index = event.target.getAttribute("data-index");
            cartItems.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            renderCart();
        }
    });

    // Event listener for checkout button
    document.getElementById("checkoutBtn").addEventListener("click", () => {
        if (cartItems.length > 0) {
            const currentDate = new Date().toLocaleString();

            localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
            const salesData = JSON.parse(localStorage.getItem("salesData")) || [];
            const newSale = {
                orderId: "ORD" + Math.floor(Math.random() * 10000),
                products: cartItems,
                totalAmount: cartItems.reduce((acc, item) => acc + item.price * 1, 0), // Always 1 item per product
                date: currentDate
            };
            salesData.push(newSale);
            localStorage.setItem("salesData", JSON.stringify(salesData));


            cartItems = [];
            window.location.href = "payment.html";
            renderCart();
        } else {
            alert("Your cart is empty!");
        }
    });

    // Initial render of cart
    renderCart();
});
