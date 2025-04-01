let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "jeans", price: 50 },
  { name: "sneakers", price: 80 },
  { name: "backspack", price: 30 },
];
console.log(shoppingCart);
let total = 0;
for (let i = 0; i < shoppingCart.length; i++) {
  total = total + shoppingCart[i].price;
  console.log("total so far is");
}
console.log("final total is", total);
let discount = 0.1;
if (total > 100) {
  let discountPrice = total - total * discount;
  console.log("discounted price is", discountPrice);
}
