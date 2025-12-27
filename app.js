/***********************
 * GLOBAL STATE
 ***********************/
const state = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  lang: localStorage.getItem("lang") || "ka",
  bannerVisible: localStorage.getItem("bannerVisible") !== "false"
};

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(state.cart));
}

/***********************
 * TEST MODE BANNER
 ***********************/
const testMessages = {
  ka: "🚧 <strong>ეს ვებგვერდი ამჟამად ტესტირების რეჟიმშია.</strong> შეცდომების შემთხვევაში: <a href='mailto:User10603991@gmail.com'>User10603991@gmail.com</a>",
  en: "🚧 <strong>This website is currently in test mode.</strong> Report bugs: <a href='mailto:User10603991@gmail.com'>User10603991@gmail.com</a>",
  es: "🚧 <strong>Este sitio web está en modo de prueba.</strong> Reporta errores: <a href='mailto:User10603991@gmail.com'>User10603991@gmail.com</a>",
  fr: "🚧 <strong>Ce site est en mode test.</strong> Signalez les bugs : <a href='mailto:User10603991@gmail.com'>User10603991@gmail.com</a>",
  ar: "🚧 <strong>هذا الموقع في وضع الاختبار.</strong> الإبلاغ عن الأخطاء: <a href='mailto:User10603991@gmail.com'>User10603991@gmail.com</a>"
};

function initBanner() {
  const banner = document.getElementById("testBanner");
  if (!state.bannerVisible) {
    banner.style.display = "none";
    return;
  }
  banner.style.display = "flex";
  document.getElementById("testMessage").innerHTML =
    testMessages[state.lang] || testMessages.ka;
}

function closeBanner() {
  state.bannerVisible = false;
  localStorage.setItem("bannerVisible", "false");
  document.getElementById("testBanner").style.display = "none";
}

/***********************
 * TRANSLATIONS
 ***********************/
const translations = {
  ka: {
    storeTitle: "🛍️ Sofi's ART",
    productA: "სარკე",
    productB: "ყვავილი",
    addToCart: "კალათაში დამატება",
    cartTitle: "🛒 კალათა",
    total: "სულ",
    currency: "$",
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
    productA: "Mirror",
    productB: "Flower",
    addToCart: "Add to Cart",
    cartTitle: "🛒 Cart",
    total: "Total",
    currency: "$",
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
    productA: "Espejo",
    productB: "Flor",
    addToCart: "Añadir al carrito",
    cartTitle: "🛒 Carrito",
    total: "Total",
    currency: "$",
    proceedOrder: "Continuar pedido",
    modalTitle: "Confirma tus datos",
    orderWhatsApp: "Pedir por WhatsApp",
    namePlaceholder: "Tu nombre",
    addressPlaceholder: "Dirección de entrega",
    emptyCart: "Tu carrito está vacío",
    pleaseFill: "Por favor ingresa nombre y dirección",
    orderMsg: "Por favor realiza un pedido:"
  },
  fr: {
    storeTitle: "🛍️ Sofi's ART",
    productA: "Miroir",
    productB: "Fleur",
    addToCart: "Ajouter au panier",
    cartTitle: "🛒 Panier",
    total: "Total",
    currency: "$",
    proceedOrder: "Passer la commande",
    modalTitle: "Confirmez vos informations",
    orderWhatsApp: "Commander via WhatsApp",
    namePlaceholder: "Votre nom",
    addressPlaceholder: "Adresse de livraison",
    emptyCart: "Votre panier est vide",
    pleaseFill: "Veuillez entrer le nom et l'adresse",
    orderMsg: "Veuillez passer une commande:"
  },
  ar: {
    storeTitle: "🛍️ Sofi's ART",
    productA: "مرآة",
    productB: "ورد",
    addToCart: "أضف إلى السلة",
    cartTitle: "🛒 السلة",
    total: "المجموع",
    currency: "$",
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

/***********************
 * I18N
 ***********************/
function translatePage() {
  const t = translations[state.lang];

  document.body.classList.toggle("rtl", state.lang === "ar");

  document.getElementById("storeTitle").innerText = t.storeTitle;
  document.getElementById("cartTitle").innerText = t.cartTitle;
  document.getElementById("openCheckout").innerText = t.proceedOrder;
  document.getElementById("modalTitle").innerText = t.modalTitle;
  document.getElementById("confirmOrder").innerText = t.orderWhatsApp;

  document.getElementById("customerName").placeholder = t.namePlaceholder;
  document.getElementById("customerAddress").placeholder = t.addressPlaceholder;

  document.querySelectorAll(".product-name").forEach(el => {
    el.innerText = t[el.dataset.key];
  });

  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.innerText = t.addToCart;
  });

  initBanner();
  renderCart();
}

/***********************
 * CART
 ***********************/
function addToCart(key, price) {
  const item = state.cart.find(i => i.key === key);
  item ? item.qty++ : state.cart.push({ key, price, qty: 1 });
  saveCart();
  renderCart();
}

function changeQty(key, delta) {
  const item = state.cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.key !== key);
  }
  saveCart();
  renderCart();
}

function renderCart() {
  const t = translations[state.lang];
  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";

  let total = 0;

  state.cart.forEach(item => {
    total += item.price * item.qty;
    cartDiv.innerHTML += `
      <div class="cart-item">
        <span>${t[item.key]}</span>
        <div>
          <button class="qty-btn" onclick="changeQty('${item.key}',-1)">−</button>
          ${item.qty}
          <button class="qty-btn" onclick="changeQty('${item.key}',1)">+</button>
        </div>
      </div>
    `;
  });

  document.getElementById("totalPrice").innerText =
    `${t.total}: ${t.currency}${total}`;

  document.getElementById("openCheckout").disabled = !state.cart.length;
}

/***********************
 * MODAL
 ***********************/
function openModal() {
  if (!state.cart.length) {
    alert(translations[state.lang].emptyCart);
    return;
  }
  document.getElementById("checkoutModal").style.display = "flex";
}

window.onclick = e => {
  const modal = document.getElementById("checkoutModal");
  if (e.target === modal) modal.style.display = "none";
};

/***********************
 * WHATSAPP ORDER
 ***********************/
function orderViaWhatsApp() {
  const t = translations[state.lang];
  const name = customerName.value.trim();
  const address = customerAddress.value.trim();

  if (!name || !address) {
    alert(t.pleaseFill);
    return;
  }

  let msg = `${t.orderMsg}\n\nName: ${name}\nAddress: ${address}\n\n`;
  let total = 0;

  state.cart.forEach(i => {
    msg += `- ${t[i.key]} x ${i.qty} = ${t.currency}${i.price * i.qty}\n`;
    total += i.price * i.qty;
  });

  msg += `\n${t.total}: ${t.currency}${total}`;

  window.open(
    `https://wa.me/555135501?text=${encodeURIComponent(msg)}`,
    "_blank"
  );

  state.cart = [];
  saveCart();
  renderCart();
  checkoutModal.style.display = "none";
  customerName.value = "";
  customerAddress.value = "";
}

/***********************
 * INIT
 ***********************/
document.addEventListener("DOMContentLoaded", () => {
  langSelect.value = state.lang;
  translatePage();

  langSelect.onchange = () => {
    state.lang = langSelect.value;
    localStorage.setItem("lang", state.lang);
    checkoutModal.style.display = "none";
    translatePage();
  };

  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.onclick = () =>
      addToCart(btn.dataset.key, Number(btn.dataset.price));
  });

  document.getElementById("openCheckout").onclick = openModal;
  document.getElementById("confirmOrder").onclick = orderViaWhatsApp;
  document.getElementById("closeBanner").onclick = closeBanner;
});
