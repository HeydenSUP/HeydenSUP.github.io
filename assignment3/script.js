const products = [
  { id: 1, name: "Wireless Headphones", price: 59.99, image: "headphone.jpg" },
  { id: 2, name: "Portable Speaker", price: 29.99, image: "22.jpg" },
  { id: 3, name: "Smart Watch", price: 99.99, image: "33.jpg" },
  { id: 4, name: "Digital Camera", price: 149.99, image: "44.jpg" },
  { id: 5, name: "iPad", price: 399.99, image: "55.jpg" },
  { id: 6, name: "iPad Case", price: 29.99, image: "66.jpg" },
  {
    id: 7,
    name: "Bluetooth Keyboard",
    price: 45.99,
    image:
      "https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/multi-keyboard-k380/gallery/k380-sand-gallery-2-us.png",
  },
  { id: 8, name: "USB-C Charger", price: 25.5, image: "77.jpg" },
  { id: 9, name: "Fitness Tracker Watch", price: 79.9, image: "88.jpg" },
];

// 购物车数据
let cartItems = [];
let currentSearchKeyword = "";

// 渲染商品网格（支持筛选）
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

    const viewBtn = document.createElement("button");
    viewBtn.className = "btn btn-view";
    viewBtn.innerText = "View Details";
    viewBtn.onclick = () => console.log("Viewing details for", product);
    info.appendChild(viewBtn);

    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-add";
    addBtn.innerText = "Add to Cart";
    addBtn.onclick = () => addToCart(product);
    info.appendChild(addBtn);

    card.appendChild(info);
    grid.appendChild(card);
  });
}

// 渲染购物车下拉内容和数量（含高亮搜索匹配项）
function updateCartDisplay() {
  document.getElementById("cart-count").innerText = cartItems.length;
  const cartDropdown = document.getElementById("cart-dropdown");
  cartDropdown.innerHTML = "";

  // 匹配关键词的cart商品优先高亮显示
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
      <button onclick="removeFromCart(${cartItems.indexOf(item)})">❌</button>
    `;
    cartDropdown.appendChild(el);
  });

  otherItems.forEach((item) => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button onclick="removeFromCart(${cartItems.indexOf(item)})">❌</button>
    `;
    cartDropdown.appendChild(el);
  });

  if (cartItems.length === 0) {
    cartDropdown.innerHTML = "<p>Your cart is empty.</p>";
  }
}

// 加入购物车
function addToCart(product) {
  cartItems.push(product);
  updateCartDisplay();
}

// 删除购物车商品
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartDisplay();
}

// 拖拽购物车相关
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

// 购物车hover下拉显示控制（防止消失）
const cart = document.getElementById("cart");
const cartDropdown = document.getElementById("cart-dropdown");
let cartDropdownTimer = null;

cart.addEventListener("mouseenter", () => {
  clearTimeout(cartDropdownTimer);
  cartDropdown.style.display = "block";
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

// 查看购物车
function viewCart() {
  alert("You have " + cartItems.length + " items in your cart.");
}

// 搜索功能：输入时实时筛选，按Enter清空并恢复全部，同时用于高亮
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

// 初始化
renderProductGrid(products);
updateCartDisplay();
