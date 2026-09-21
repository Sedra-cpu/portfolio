// State management
let cart = [];

// DOM elements
const cartCountEl = document.getElementById("cartCount");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

// Product catalog database
const products = {
  mango: { name: "Mango Slices", price: 5.99 },
  "Strawberry Chips": { name: "Strawberry Chips", price: 6.99 },
  "Apple Bites": { name: "Apple Bites", price: 4.99 },
  "orenges slices": { name: "Orange Slices", price: 2.99 }
};

/**
 * Add product to cart or increment quantity if already present
 */
function addToCart(productId) {
  const itemKey = productId.trim();
  const productData = products[itemKey] || { name: itemKey, price: 4.99 };

  const existingItem = cart.find(item => item.id === itemKey);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: itemKey,
      name: productData.name,
      price: productData.price,
      quantity: 1
    });
  }

  updateCartUI();
}

/**
 * Change item quantity or remove item if count reaches 0
 */
function changeQuantity(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  updateCartUI();
}

/**
 * Calculate totals and re-render cart display
 */
function updateCartUI() {
  // Update badge count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
  }

  // Calculate price total
  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (totalPriceEl) {
    totalPriceEl.textContent = `$${grandTotal.toFixed(2)}`;
  }

  // Render items inside cart drawer/modal if container exists
  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
      return;
    }

    cartItemsContainer.innerHTML = cart
      .map(
        item => `
        <div class="cart-item">
          <div class="item-info">
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)} each</p>
          </div>
          <div class="qty-controls">
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
      `
      )
      .join("");
  }
}

/**
 * Open cart modal
 */
function openCart() {
  if (cartOverlay) {
    cartOverlay.classList.add("active");
  }
}

/**
 * Close cart modal
 */
function closeCart() {
  if (cartOverlay) {
    cartOverlay.classList.remove("active");
  }
}

// Close cart on pressing the Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cartOverlay?.classList.contains("active")) {
    closeCart();
  }
});