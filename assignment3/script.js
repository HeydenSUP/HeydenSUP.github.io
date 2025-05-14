// Product data array simulating API response
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Portable Speaker",
    price: 29.99,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 99.99,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 4,
    name: "Digital Camera",
    price: 149.99,
    image: "https://via.placeholder.com/200",
  },
];

// Render products into the grid
const grid = document.getElementById("product-grid");
products.forEach((product) => {
  const card = document.createElement("div");
  card.setAttribute("draggable", "true");
  card.setAttribute("data-id", product.id);
  card.ondragstart = (event) =>
    event.dataTransfer.setData("text/plain", product.id);
  card.className = "product-card";

  // Image element
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.className = "product-image";
  card.appendChild(img);

  // Info container
  const info = document.createElement("div");
  info.className = "product-info";

  // Product name
  const nameEl = document.createElement("h3");
  nameEl.className = "product-name";
  nameEl.innerText = product.name;
  info.appendChild(nameEl);

  // Product price
  const priceEl = document.createElement("p");
  priceEl.className = "product-price";
  priceEl.innerText = `$${product.price.toFixed(2)}`;
  info.appendChild(priceEl);

  // View Details button
  const viewBtn = document.createElement("button");
  viewBtn.className = "btn btn-view";
  viewBtn.innerText = "View Details";
  viewBtn.onclick = () => console.log("Viewing details for", product);
  info.appendChild(viewBtn);

  // Add to Cart button
  const addBtn = document.createElement("button");
  addBtn.className = "btn btn-add";
  addBtn.innerText = "Add to Cart";
  addBtn.onclick = () => addToCart();
  info.appendChild(addBtn);

  card.appendChild(info);
  grid.appendChild(card);
});

// Cart logic
let cartCount = 0;
function addToCart() {
  cartCount++;
  document.getElementById("cart-count").innerText = cartCount;
  alert("Item added to cart! (" + cartCount + ")");
}

function viewCart() {
  alert("You have " + cartCount + " items in your cart.");
}

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
    addToCart();
  }
}
