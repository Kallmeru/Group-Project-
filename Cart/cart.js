document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.querySelector("#cart-table tbody");
    let grandTotal = 0;

    cartTable.innerHTML = "";

    cart.forEach((item, index) => {
        let total = item.price * item.quantity;
        grandTotal += total;

        cartTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" 
                        onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>$${total.toFixed(2)}</td>
                <td><button onclick="removeItem(${index})">Remove</button></td>
            </tr>
        `;
    });

    document.getElementById("grand-total").textContent = grandTotal.toFixed(2);
}

function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
