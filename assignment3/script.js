// Commodity data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    image: "headphone.jpg",
    description:
      "High-fidelity wireless headphones with noise-cancelling and 30-hour battery life. Perfect for music, games, and calls.",
  },
  {
    id: 2,
    name: "Portable Speaker",
    price: 29.99,
    image: "22.jpg",
    description:
      "Compact Bluetooth speaker with deep bass and water-resistant design. Take your music anywhere, anytime!",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 99.99,
    image: "33.jpg",
    description:
      "Sleek smart watch with heart-rate monitor, fitness tracking, notifications, and customizable watch faces.",
  },
  {
    id: 4,
    name: "Digital Camera",
    price: 149.99,
    image: "44.jpg",
    description: "Digital camera with 24MP resolution and 4K video recording.",
  },
  {
    id: 5,
    name: "iPad",
    price: 399.99,
    image: "55.jpg",
    description: "10.2-inch Apple iPad, latest model, Wi-Fi.",
  },
  {
    id: 6,
    name: "iPad Case",
    price: 29.99,
    image: "66.jpg",
    description: "Protective iPad case, shockproof.",
  },
  {
    id: 7,
    name: "Bluetooth Keyboard",
    price: 45.99,
    image:
      "https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/multi-keyboard-k380/gallery/k380-sand-gallery-2-us.png",
    description: "Wireless Bluetooth keyboard for tablets and laptops.",
  },
  {
    id: 8,
    name: "USB-C Charger",
    price: 25.5,
    image: "77.jpg",
    description: "Fast USB-C wall charger for multiple devices.",
  },
  {
    id: 9,
    name: "Fitness Tracker Watch",
    price: 79.9,
    image: "88.jpg",
    description: "Fitness tracker watch with heart rate monitor.",
  },
];

let currentSearchKeyword = "";

// Tool function: localStorage global cart synchronization
function loadCart() {
  let ids = [];
  try {
    ids = JSON.parse(localStorage.getItem("cartItems") || "[]");
  } catch {}
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
}
function saveCart(cartItems) {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems.map((item) => item.id))
  );
}

// Rendering the product mesh
function renderProductGrid(productList) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  productList.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("draggable", "true");
    card.setAttribute("data-id", product.id);
    card.ondragstart = (event) =>
      event.dataTransfer.setData("text/plain", product.id);

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = "product-image";
    card.appendChild(img);

    const info = document.createElement("div");
    info.className = "product-info";

    const nameEl = document.createElement("h3");
    nameEl.className = "product-name";
    nameEl.innerText = product.name;
    info.appendChild(nameEl);

    const priceEl = document.createElement("p");
    priceEl.className = "product-price";
    priceEl.innerText = `$${product.price.toFixed(2)}`;
    info.appendChild(priceEl);

    // Detail Page Jump
    const viewBtn = document.createElement("button");
    viewBtn.className = "btn btn-view";
    viewBtn.innerText = "View Details";
    viewBtn.onclick = () =>
      (window.location.href = `product.html?id=${product.id}`);
    info.appendChild(viewBtn);

    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-add";
    addBtn.innerText = "Add to Cart";
    addBtn.onclick = () => {
      addToCart(product);
    };
    info.appendChild(addBtn);

    card.appendChild(info);
    grid.appendChild(card);
  });
}

// Render cart dropdown content and quantity (always globally synchronize localStorage)
function updateCartDisplay() {
  const cartItems = loadCart();
  document.getElementById("cart-count").innerText = cartItems.length;
  const cartDropdown = document.getElementById("cart-dropdown");
  cartDropdown.innerHTML = "";

  // Priority highlighting of cart items matching keywords
  let matchedItems = [];
  let otherItems = [];
  if (currentSearchKeyword) {
    cartItems.forEach((item) => {
      if (item.name.toLowerCase().includes(currentSearchKeyword)) {
        matchedItems.push(item);
      } else {
        otherItems.push(item);
      }
    });
  } else {
    otherItems = cartItems.slice();
  }

  matchedItems.forEach((item) => {
    const el = document.createElement("div");
    el.className = "cart-item matched-item";
    el.innerHTML = `
      <strong>${item.name}</strong> - <strong>$${item.price.toFixed(2)}</strong>
      <button onclick="removeFromCart(${loadCart().indexOf(item)})">❌</button>
    `;
    cartDropdown.appendChild(el);
  });

  otherItems.forEach((item) => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button onclick="removeFromCart(${loadCart().indexOf(item)})">❌</button>
    `;
    cartDropdown.appendChild(el);
  });

  if (cartItems.length === 0) {
    cartDropdown.innerHTML = "<p>Your cart is empty.</p>";
  }
}

// Global Add to Cart
function addToCart(product) {
  let cartItems = loadCart();
  cartItems.push(product);
  saveCart(cartItems);
  updateCartDisplay();
}

// Global Delete Cart
function removeFromCart(index) {
  let cartItems = loadCart();
  cartItems.splice(index, 1);
  saveCart(cartItems);
  updateCartDisplay();
}

// Drag & Drop Shopping Cart
function allowDrop(event) {
  event.preventDefault();
  document.getElementById("cart").classList.add("drag-over");
}
function dropToCart(event) {
  event.preventDefault();
  document.getElementById("cart").classList.remove("drag-over");
  const productId = event.dataTransfer.getData("text/plain");
  const product = products.find((p) => p.id == productId);
  if (product) {
    addToCart(product);
  }
}

// Shopping cart hover dropdown display control
const cart = document.getElementById("cart");
const cartDropdown = document.getElementById("cart-dropdown");
let cartDropdownTimer = null;

cart.addEventListener("mouseenter", () => {
  clearTimeout(cartDropdownTimer);
  cartDropdown.style.display = "block";
  updateCartDisplay();
});
cart.addEventListener("mouseleave", () => {
  cartDropdownTimer = setTimeout(() => {
    cartDropdown.style.display = "none";
  }, 150);
});
cartDropdown.addEventListener("mouseenter", () => {
  clearTimeout(cartDropdownTimer);
  cartDropdown.style.display = "block";
});
cartDropdown.addEventListener("mouseleave", () => {
  cartDropdownTimer = setTimeout(() => {
    cartDropdown.style.display = "none";
  }, 150);
});

// search function
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function () {
  currentSearchKeyword = this.value.trim().toLowerCase();
  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(currentSearchKeyword)
  );
  renderProductGrid(filtered);
  updateCartDisplay();
});
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    this.value = "";
    currentSearchKeyword = "";
    renderProductGrid(products);
    updateCartDisplay();
  }
});

// initialization
renderProductGrid(products);
updateCartDisplay();
