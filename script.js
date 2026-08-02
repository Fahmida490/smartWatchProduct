
const ringButtons = document.querySelectorAll(".ring-button");
const productImageBase = "./images/images/";

ringButtons.forEach((ringBtn) => {
    ringBtn.addEventListener("click", (event) => {
        const color = event.target.id.split("-").at(0);

        ringButtons.forEach((button) => {
            button.classList.remove("border-purple-600");
            button.classList.add("border-gray-300");
        });

        event.target.classList.add("border-purple-600");
        event.target.classList.remove("border-gray-300");

        const productImage = document.getElementById("product-image");
        productImage.src = `${productImageBase}${color}.png`;
    });
});

const sizes = ["S", "M", "L", "XL"];
sizes.forEach((size) => {
    const button = document.getElementById(`size-${size}`);
    button.addEventListener("click", () => {
        sizes.forEach((sizee) => {
            const btn = document.getElementById(`size-${sizee}`);
            btn.classList.remove("border-purple-600");
        });
        button.classList.add("border-purple-600");
    });
});

let quantity = 0;
const quantityButtons = document.querySelectorAll(".quantity-button");
quantityButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        if (event.target.textContent === "+") {
            quantity++;
        } else if (event.target.textContent === "-") {
            quantity--;
            if (quantity < 0) quantity = 0;
        }
        document.getElementById("quantity").textContent = quantity;
    });
});

let cartCount = 0;
let cartItems = [];

document.getElementById("add-to-cart").addEventListener("click", () => {
    const quantity = Number(document.getElementById("quantity").textContent);

    if (quantity > 0) {
        const selectedColorButton = document.querySelector(
            "button.border-purple-600.w-6"
        );
        const selectedColor = selectedColorButton
            ? selectedColorButton.id.split("-").at(0)
            : "default";

        const selectedSizeButton = document.querySelector(
            "button.border-purple-600:not(.w-6)"
        );

        if (!selectedSizeButton) {
            window.alert("Please select a size");
            return;
        }

        const selectedSize = selectedSizeButton.textContent.split(" ").at(0);
        const selectedPrice = selectedSizeButton.textContent
            .split(" ")
            .at(1)
            .split("$")
            .at(1);

        cartItems.push({
            image: `${selectedColor}.png`,
            title: "Classy Modern Smart Watch",
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
            price: quantity * Number(selectedPrice),
        });

        document.getElementById("checkout-container").classList.remove("hidden");
        cartCount += quantity;
        document.getElementById("cart-count").textContent = cartCount;

        // reset quantity after adding to cart
        document.getElementById("quantity").textContent = 0;

        console.log(cartItems);
    } else {
        window.alert("Please select a quantity");
    }
});

document.getElementById("checkout-btn").addEventListener("click", function () {
    const cartModal = document.getElementById("cart-modal");
    const cartContainer = document.getElementById("cart-items");

    cartContainer.innerHTML = ""; // clear previous rows before re-render

    for (const cartItem of cartItems) {
        const tableRow = document.createElement("tr");
        tableRow.classList.add("border-b");
        tableRow.innerHTML = `
      <td class="py-2 px-4">
        <div class="flex items-center space-x-2">
          <img class="h-12 w-12 object-cover rounded-md" src="${productImageBase}${cartItem.image}" alt="">
          <span class="font-semibold">${cartItem.title}</span>
        </div>
      </td>
      <td class="py-2 px-4">${cartItem.color}</td>
      <td class="py-2 px-4">${cartItem.size}</td>
      <td class="py-2 px-4">${cartItem.quantity}</td>
      <td class="py-2 px-4">$${cartItem.price}</td>
    `;
        cartContainer.appendChild(tableRow);
    }

    cartModal.classList.remove("hidden");
});

document
    .getElementById("continue-shopping")
    .addEventListener("click", function () {
        document.getElementById("cart-modal").classList.add("hidden");
    });

document.getElementById("checkOut").addEventListener("click", function () {
    window.alert("Checking your product");
});