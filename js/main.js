/* ============================================================
   ASTRO TEC — main.js
   Lógica compartida por todas las páginas: navbar, WhatsApp,
   modal de producto, render de tarjetas, filtros del catálogo,
   formulario de contacto y microinteracciones.
   ============================================================ */

/* ---------- CONFIGURACIÓN GENERAL ---------- */

/* IMPORTANTE: coloca aquí tu número de WhatsApp con código de país,
   sin espacios, signos ni el símbolo "+". Ejemplo Puerto Rico: "17871234567" */
const WHATSAPP_NUMBER = "5359705589";

/* Genera la URL de WhatsApp con un mensaje predefinido */
function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

const DEFAULT_WHATSAPP_MESSAGE = "Hola Astro Tec, quiero saber más sobre sus productos.";

/* ---------- INICIALIZACIÓN GENERAL (todas las páginas) ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initWhatsAppFloat();
  initBackToTop();
  initScrollReveal();
  initProductModal();
  markActiveNavLink();

  // Cada página inicializa solo lo que tiene en su HTML
  if (document.getElementById("categories-grid")) renderCategories();
  if (document.getElementById("featured-grid")) renderFeaturedProducts();
  if (document.getElementById("offers-grid")) renderOffers("offers-grid", 4);
  if (document.getElementById("offers-grid-full")) renderOffers("offers-grid-full", null);
  if (document.getElementById("catalog-grid")) initCatalogPage();
  if (document.getElementById("contact-form")) initContactForm();
});

/* ---------- NAVBAR ---------- */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cierra el menú móvil al elegir un enlace
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}

/* Marca el enlace activo del menú según la página actual */
function markActiveNavLink() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
}

/* ---------- WHATSAPP FLOTANTE ---------- */
function initWhatsAppFloat() {
  const btn = document.getElementById("whatsapp-float");
  if (!btn) return;
  btn.href = buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE);
}

/* ---------- BOTÓN VOLVER ARRIBA ---------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("is-visible", window.scrollY > 480);
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- APARICIÓN PROGRESIVA AL HACER SCROLL ---------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal-on-scroll");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- TOAST ---------- */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

/* ---------- RENDER: CATEGORÍAS ---------- */
function renderCategories() {
  const grid = document.getElementById("categories-grid");
  grid.innerHTML = CATEGORIES.map(
    (cat, i) => `
    <a href="catalogo.html?categoria=${cat.key}" class="category-card reveal-on-scroll" style="transition-delay:${i * 0.05}s">
      <div class="category-icon" aria-hidden="true">${cat.icon}</div>
      <h3>${cat.label}</h3>
    </a>`
  ).join("");

  // Activa la observación de scroll para las tarjetas recién creadas
  initScrollReveal();
}

/* ---------- RENDER: TARJETA DE PRODUCTO (reutilizable) ---------- */
function productCardHTML(product, delay = 0) {
  const badges = [];
  if (product.offer) badges.push(`<span class="badge badge-offer">OFERTA</span>`);
  if (product.isNew) badges.push(`<span class="badge badge-new">NUEVO</span>`);
  if (product.popular) badges.push(`<span class="badge badge-popular">POPULAR</span>`);

  const oldPriceHTML = product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : "";

  return `
    <article class="product-card reveal-on-scroll" style="transition-delay:${delay}s" data-id="${product.id}">
      <div class="product-media">
        <div class="badge-row">${badges.join("")}</div>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <span class="product-category">${getCategoryLabel(product.category)}</span>
        <h3>${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-price-row">
          <span class="price-now">${formatPrice(product.price)}</span>
          ${oldPriceHTML}
        </div>
        <div class="product-actions">
          <button class="btn btn-outline btn-view" data-id="${product.id}" type="button">Ver producto</button>
          <a class="btn btn-whatsapp" href="${buildWhatsAppLink(whatsappMessageFor(product))}" target="_blank" rel="noopener">Comprar</a>
        </div>
      </div>
    </article>`;
}

function whatsappMessageFor(product) {
  return `Hola Astro Tec, estoy interesado en ${product.name}. ¿Está disponible?`;
}

/* ---------- RENDER: PRODUCTOS DESTACADOS (home) ---------- */
function renderFeaturedProducts() {
  const grid = document.getElementById("featured-grid");
  const featured = products.filter((p) => p.featured);
  grid.innerHTML = featured.map((p, i) => productCardHTML(p, i * 0.05)).join("");
  attachViewButtons(grid);
  initScrollReveal();
}

/* ---------- RENDER: OFERTAS ---------- */
function renderOffers(targetId, limit) {
  const grid = document.getElementById(targetId);
  let offers = products.filter((p) => p.offer);
  if (limit) offers = offers.slice(0, limit);

  grid.innerHTML = offers
    .map((p, i) => {
      const discount = p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : null;
      return `
      <article class="product-card offer-card reveal-on-scroll" style="transition-delay:${i * 0.05}s" data-id="${p.id}">
        ${discount ? `<span class="discount-tag">-${discount}%</span>` : ""}
        <div class="product-media">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
        </div>
        <div class="product-body">
          <span class="product-category">${getCategoryLabel(p.category)}</span>
          <h3>${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-price-row">
            <span class="price-now">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
          </div>
          <p class="offer-timer">⏳ Oferta por tiempo limitado</p>
          <div class="product-actions">
            <button class="btn btn-outline btn-view" data-id="${p.id}" type="button">Ver producto</button>
            <a class="btn btn-whatsapp" href="${buildWhatsAppLink(whatsappMessageFor(p))}" target="_blank" rel="noopener">Comprar</a>
          </div>
        </div>
      </article>`;
    })
    .join("");

  if (!offers.length) {
    grid.innerHTML = `<div class="empty-state"><div class="icon">🛰️</div><p>No hay ofertas activas en este momento. Vuelve pronto.</p></div>`;
  }

  attachViewButtons(grid);
  initScrollReveal();
}

function attachViewButtons(scope) {
  scope.querySelectorAll(".btn-view").forEach((btn) => {
    btn.addEventListener("click", () => openProductModal(Number(btn.dataset.id)));
  });
}

/* ---------- MODAL DE PRODUCTO ---------- */
function initProductModal() {
  const overlay = document.getElementById("product-modal");
  if (!overlay) return;

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest(".modal-close")) {
      closeProductModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProductModal();
  });
}

function openProductModal(id) {
  const overlay = document.getElementById("product-modal");
  if (!overlay) return;
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const availabilityMap = {
    "in-stock": "Disponible",
    "low-stock": "Últimas unidades",
    "out-of-stock": "Agotado",
  };

  overlay.querySelector(".modal-media img").src = product.image;
  overlay.querySelector(".modal-media img").alt = product.name;
  overlay.querySelector(".modal-body .product-category").textContent = getCategoryLabel(product.category);
  overlay.querySelector(".modal-body h3").textContent = product.name;
  overlay.querySelector(".modal-price-row .price-now").textContent = formatPrice(product.price);

  const oldPriceEl = overlay.querySelector(".modal-price-row .price-old");
  if (product.oldPrice) {
    oldPriceEl.textContent = formatPrice(product.oldPrice);
    oldPriceEl.style.display = "inline";
  } else {
    oldPriceEl.style.display = "none";
  }

  overlay.querySelector(".modal-desc").textContent = product.description;
  overlay.querySelector(".modal-features").innerHTML = product.details.map((d) => `<li>${d}</li>`).join("");

  const availabilityEl = overlay.querySelector(".availability");
  availabilityEl.className = `availability ${product.availability}`;
  availabilityEl.innerHTML = `<span class="dot"></span> ${availabilityMap[product.availability]}`;

  const buyBtn = overlay.querySelector(".modal-buy");
  buyBtn.href = buildWhatsAppLink(whatsappMessageFor(product));

  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const overlay = document.getElementById("product-modal");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

/* ---------- CATÁLOGO: BÚSQUEDA, FILTROS Y ORDEN ---------- */
function initCatalogPage() {
  renderCategoryPills();

  const requestedCategory = getQueryParam("categoria");
  const validCategory = CATEGORIES.some((c) => c.key === requestedCategory);

  const state = {
    query: "",
    category: validCategory ? requestedCategory : "all",
    sort: "relevance",
    onlyOffers: false,
  };

  const searchInput = document.getElementById("catalog-search");
  const sortSelect = document.getElementById("catalog-sort");
  const offersToggle = document.getElementById("catalog-offers-toggle");

  if (state.category !== "all") {
    updateActivePill(state.category);
  }

  searchInput.addEventListener("input", (e) => {
    state.query = e.target.value.trim().toLowerCase();
    renderCatalog(state);
  });

  sortSelect.addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderCatalog(state);
  });

  offersToggle.addEventListener("click", () => {
    state.onlyOffers = !state.onlyOffers;
    offersToggle.classList.toggle("is-active", state.onlyOffers);
    renderCatalog(state);
  });

  document.getElementById("category-pills").addEventListener("click", (e) => {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    state.category = pill.dataset.category;
    updateActivePill(state.category);
    renderCatalog(state);
  });

  renderCatalog(state);
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderCategoryPills() {
  const wrap = document.getElementById("category-pills");
  const pills = [`<button class="pill is-active" data-category="all" type="button">Todas</button>`].concat(
    CATEGORIES.map((c) => `<button class="pill" data-category="${c.key}" type="button">${c.icon} ${c.label}</button>`)
  );
  wrap.innerHTML = pills.join("");
}

function updateActivePill(category) {
  document.querySelectorAll("#category-pills .pill").forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.category === category);
  });
}

function renderCatalog(state) {
  let list = [...products];

  if (state.category !== "all") {
    list = list.filter((p) => p.category === state.category);
  }

  if (state.onlyOffers) {
    list = list.filter((p) => p.offer);
  }

  if (state.query) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(state.query) ||
        p.description.toLowerCase().includes(state.query) ||
        getCategoryLabel(p.category).toLowerCase().includes(state.query)
    );
  }

  switch (state.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break; // relevancia = orden original
  }

  const grid = document.getElementById("catalog-grid");
  const countEl = document.getElementById("results-count");
  countEl.textContent = `${list.length} producto${list.length === 1 ? "" : "s"} encontrado${list.length === 1 ? "" : "s"}`;

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="icon">🔭</div>
        <p>No encontramos productos con esos filtros. Intenta con otra búsqueda o categoría.</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map((p, i) => productCardHTML(p, Math.min(i, 8) * 0.04)).join("");
  attachViewButtons(grid);
  initScrollReveal();
}

/* ---------- FORMULARIO DE CONTACTO ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#contact-name").value.trim();
    const email = form.querySelector("#contact-email").value.trim();
    const message = form.querySelector("#contact-message").value.trim();

    if (!name || !email || !message) {
      showToast("Por favor completa todos los campos.");
      return;
    }

    // No hay backend: se abre WhatsApp con el mensaje del formulario.
    const whatsappMessage = `Hola Astro Tec, soy ${name} (${email}). ${message}`;
    window.open(buildWhatsAppLink(whatsappMessage), "_blank", "noopener");

    showToast("¡Mensaje listo! Te llevamos a WhatsApp para enviarlo.");
    form.reset();
  });
}
