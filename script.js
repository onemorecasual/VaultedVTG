// Replace these demo items with your own inventory and image URLs.
const products = [
  { id: 1, name: "Classic Graphic Tee", category: "Vintage", price: 18, badge: "VINTAGE FIND", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Everyday Blue Denim", category: "Denim", price: 28, badge: "DENIM", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Y2K Streetwear Top", category: "Y2K", price: 22, badge: "Y2K ENERGY", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Relaxed Everyday Shirt", category: "Modern", price: 20, badge: "MODERN", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Vintage Layering Tee", category: "Vintage", price: 16, badge: "VINTAGE FIND", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Classic Denim Jacket", category: "Denim", price: 35, badge: "DENIM", image: "https://images.unsplash.com/photo-1591047139829-d91AECb6caea?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Y2K Weekend Fit", category: "Y2K", price: 24, badge: "Y2K ENERGY", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Minimal Modern Essential", category: "Modern", price: 19, badge: "MODERN", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85" }
];

const cart = [];
let activeFilter = "All";
const productGrid = document.getElementById("productGrid");
const bagOverlay = document.getElementById("bagOverlay");

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function renderProducts() {
  const visible = activeFilter === "All" ? products : products.filter(p => p.category === activeFilter);
  productGrid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="product-badge">${p.badge}</span>
        <button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button>
      </div>
      <div class="product-meta">
        <div><p class="product-name">${p.name}</p><p class="product-category">${p.category.toUpperCase()}</p></div>
        <span class="product-price">${money(p.price)}</span>
      </div>
    </article>`).join("");
}

function addToBag(id) {
  const product = products.find(p => p.id === id);
  if (product) cart.push(product);
  renderBag();
  openBag();
}

function renderBag() {
  document.getElementById("bagCount").textContent = cart.length;
  document.getElementById("bagItems").innerHTML = cart.length
    ? cart.map((p, i) => `<div class="bag-item">
        <img src="${p.image}" alt="">
        <div><strong>${p.name}</strong><small>${money(p.price)}</small><br><button class="remove-item" data-remove="${i}">REMOVE</button></div>
        <span>${money(p.price)}</span>
      </div>`).join("")
    : '<p class="bag-empty">Your bag is empty. Go find something good.</p>';
  document.getElementById("bagTotal").textContent = money(cart.reduce((sum, p) => sum + p.price, 0));
}

function openBag() {
  bagOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeBag() {
  bagOverlay.hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter").forEach(el => el.classList.toggle("active", el === button));
  renderProducts();
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToBag(Number(button.dataset.add));
});

document.getElementById("bagItems").addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  cart.splice(Number(button.dataset.remove), 1);
  renderBag();
});

document.getElementById("bagToggle").addEventListener("click", openBag);
document.getElementById("closeBag").addEventListener("click", closeBag);
document.getElementById("closeBagBackdrop").addEventListener("click", closeBag);
document.getElementById("bagVisit").addEventListener("click", closeBag);
document.addEventListener("keydown", event => { if (event.key === "Escape") closeBag(); });
document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderBag();
