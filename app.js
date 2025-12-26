let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* TRANSLATIONS */
const translations = {
  ka: {
    storeTitle: "🛍️ Sofi's ART",
    productA: "პროდუქტი A",
    productB: "პროდუქტი B",
    addToCart: "კალათაში დამატება",
    cartTitle: "🛒 კალათა",
    total: "სულ",
    proceedOrder: "შეკვეთის გაგრძელება",
    modalTitle: "დადასტურეთ თქვენი დეტალები",
    orderWhatsApp: "შეკვეთა WhatsApp-ზე",
    namePlaceholder: "თქვენი სახელი",
    addressPlaceholder: "მიწოდების მისამართი",
    emptyCart: "თქვენი კალათა ცარიელია",
    pleaseFill: "გთხოვთ შეიყვანეთ სახელი და მისამართი",
    orderMsg: "გთხოვთ შეუკვეთოთ:"
  },
  en: {
    storeTitle: "🛍️ Sofi's ART",
    productA: "Product A",
    productB: "Product B",
    addToCart: "Add to Cart",
    cartTitle: "🛒 Cart",
    total: "Total",
    proceedOrder: "Proceed to Order",
    modalTitle: "Confirm Your Details",
    orderWhatsApp: "Order via WhatsApp",
    namePlaceholder: "Your Name",
    addressPlaceholder: "Delivery Address",
    emptyCart: "Your cart is empty",
    pleaseFill: "Please enter name and address",
    orderMsg: "Please place an order:"
  },
  es: {
    storeTitle: "🛍️ Sofi's ART",
    productA: "Producto A",
    productB: "Producto B",
    addToCart: "Añadir al Carrito",
    cartTitle: "🛒 Carrito",
    total: "Total",
    proceedOrder: "Continuar Pedido",
    modalTitle: "Confirma Tus Datos",
    orderWhatsApp: "Pedir por WhatsApp",
    namePlaceholder: "Tu Nombre",
    addressPlaceholder: "Dirección de Entrega",
    emptyCart: "Tu carrito está vacío",
    pleaseFill: "Por favor ingresa nombre y dirección",
    orderMsg: "Por favor realiza un pedido:"
  },
  fr: {
    storeTitle: "🛍️ Sofi's ART",
    productA: "Produit A",
    productB: "Produit B",
    addToCart: "Ajouter au Panier",
    cartTitle: "🛒 Panier",
    total: "Total",
    proceedOrder: "Passer la Commande",
    modalTitle: "Confirmez Vos Informations",
    orderWhatsApp: "Commander via WhatsApp",
    namePlaceholder: "Votre Nom",
    addressPlaceholder: "Adresse de Livraison",
    emptyCart: "Votre panier est vide",
    pleaseFill: "Veuillez entrer le nom et l'adresse",
    orderMsg: "Veuillez passer une commande:"
  },
  ar: {
    storeTitle: "🛍️ Sofi's ART",
    productA: "المنتج أ",
    productB: "المنتج ب",
    addToCart: "أضف إلى السلة",
    cartTitle: "🛒 السلة",
    total: "المجموع",
    proceedOrder: "المتابعة للطلب",
    modalTitle: "تأكيد بياناتك",
    orderWhatsApp: "الطلب عبر WhatsApp",
    namePlaceholder: "اسمك",
    addressPlaceholder: "عنوان التوصيل",
    emptyCart: "سلتك فارغة",
    pleaseFill: "الرجاء إدخال الاسم والعنوان",
    orderMsg: "يرجى تقديم الطلب:"
  }
};

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("checkoutModal").style.display = "none";
  renderCart(); // Just render the cart, don't add items automatically
  translatePage();

  // Add event listeners to all add-to-cart buttons
  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.key, Number(btn.dataset.price));
    });
  });

  document.getElementById("openCheckout").onclick = openModal;
  document.getElementById("confirmOrder").onclick = orderViaWhatsApp;

  // Change language based on the user's selection
  document.getElementById("langSelect").addEventListener("change", translatePage);
});

/* TRANSLATION FUNCTION */
function translatePage() {
  const lang = document.getElementById("langSelect").value;
  const t = translations[lang];

  // RTL toggle
  if (lang === "ar") {
    document.body.classList.add("rtl");
  } else {
    document.body.classList.remove("rtl");
  }

  document.getElementById("storeTitle").innerText = t.storeTitle;
  document.querySelectorAll(".product-name").forEach(el => {
    el.innerText = t[el.dataset.key];
  });
  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.innerText = t.addToCart;
  });
  document.getElementById("cartTitle").innerText = t.cartTitle;
  document.getElementById("openCheckout").innerText = t.proceedOrder;
  document.getElementById("modalTitle").innerText = t.modalTitle;
  document.getElementById("confirmOrder").innerText = t.orderWhatsApp;
  document.getElementById("customerName").placeholder = t.namePlaceholder;
  document.getElementById("customerAddress").placeholder = t.addressPlaceholder;
  renderCart(); // Updates total and translated product names
}

/* CART LOGIC */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(key, price) {
  const item = cart.find(i => i.key === key);
  if (item) {
    item.qty++;
  } else {
    cart.push({ key, price, qty: 1 });
  }
  saveCart();
  renderCart();
}

function changeQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.key !== key);

  saveCart();
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";
  let total = 0;
  const lang = document.getElementById("langSelect").value;
  const t = translations[lang];

  cart.forEach(item => {
    total += item.price * item.qty;
    const name = t[item.key]; // translated product name
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <span>${name}</span>
      <div>
        <button class="qty-btn" data-key="${item.key}" data-delta="-1">-</button>
        ${item.qty}
        <button class="qty-btn" data-key="${item.key}" data-delta="1">+</button>
      </div>
    `;
    cartDiv.appendChild(cartItem);
  });

  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      changeQty(btn.dataset.key, Number(btn.dataset.delta));
    });
  });

  document.getElementById("totalPrice").innerText = `${t.total}: $${total}`;
}

/* MODAL */
function openModal() {
  if (!cart.length) {
    alert(translations[document.getElementById("langSelect").value].emptyCart);
    return;
  }
  document.getElementById("checkoutModal").style.display = "flex";
}

window.onclick = function (e) {
  const modal = document.getElementById("checkoutModal");
  if (e.target === modal) modal.style.display = "none";
};

/* WHATSAPP ORDER */
function orderViaWhatsApp() {
  const name = document.getElementById("customerName").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const lang = document.getElementById("langSelect").value;
  const t = translations[lang];

  if (!name || !address) {
    alert(t.pleaseFill);
    return;
  }

  let msg = `${t.orderMsg}%0A%0A`;
  msg += `Name: ${name}%0AAddress: ${address}%0A%0A`;
  let total = 0;
  cart.forEach(i => {
    const prodName = t[i.key];
    msg += `- ${prodName} x ${i.qty} = $${i.price * i.qty}%0A`;
    total += i.price * i.qty;
  });
  msg += `%0ATotal: $${total}`;

  const phone = "1234567890"; // CHANGE TO YOUR NUMBER
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");

  // AUTO CLOSE AND CLEAR
  document.getElementById("checkoutModal").style.display = "none";
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
  document.getElementById("customerName").value = "";
  document.getElementById("customerAddress").value = "";
}
