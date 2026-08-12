let cart = [];

let buttons = document.querySelectorAll(".add-btn");
let cartItems = document.getElementById("cartItems");
let cartCount = document.getElementById("cartCount");
let total = document.getElementById("total");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    let product = button.parentElement;

    let name = product.querySelector("h2").textContent;
    let price = Number(
      product.querySelector("h3").textContent.replace("₹", ""),
    );

    let existingItem = cart.find(function (item) {
      return item.name === name;
    });

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: 1,
      });
    }

    displayCart();
  });
});

function displayCart() {
  cartItems.innerHTML = "";

  cart.forEach(function (item, index) {
    let div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
            <div>
                <p>${item.name}</p>
              <small class="item-price">₹${item.price} × ${item.quantity}</small>
            </div>

            <div class="cart-actions">
                <button onclick="decreaseItem(${index})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseItem(${index})">+</button>
                <button class="remove" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;

    cartItems.appendChild(div);
  });

  updateCart();
}

function increaseItem(index) {
  cart[index].quantity++;

  displayCart();
}

function decreaseItem(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);

  displayCart();
}

function updateCart() {
  let itemCount = 0;
  let sum = 0;

  cart.forEach(function (item) {
    itemCount = itemCount + item.quantity;

    sum = sum + item.price * item.quantity;
  });

  cartCount.textContent = itemCount;
  total.textContent = sum;
}
