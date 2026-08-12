let cart = [];

let buttons = document.querySelectorAll(".add-btn");
let cartItems = document.getElementById("cartItems");
let cartCount = document.getElementById("cartCount");
let total = document.getElementById("total");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let product = button.parentElement;

        let name = product.querySelector("h2").textContent;
        let price = Number(
            product.querySelector("h3").textContent.replace("₹", "")
        );

        let item = {
            name: name,
            price: price
        };

        cart.push(item);

        displayCart();

    });

});


function displayCart() {

    cartItems.innerHTML = "";

    cart.forEach(function(item) {

        let div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <p>${item.name}</p>
            <span>₹${item.price}</span>
        `;

        cartItems.appendChild(div);

    });

    cartCount.textContent = cart.length;

    let sum = 0;

    cart.forEach(function(item) {
        sum = sum + item.price;
    });

    total.textContent = sum;
}