/* ============================================================
   ASTRO TEC — products.js
   Generado con la herramienta interna admin-productos.html
   Fecha de generación: 09/08/2026, 4:02:57 p. m.

   Para AGREGAR, EDITAR o ELIMINAR productos, vuelve a abrir
   admin-productos.html, ajusta lo necesario y genera de nuevo
   este archivo. No es obligatorio editar este archivo a mano,
   pero puedes hacerlo si lo prefieres.
   ============================================================ */

const CATEGORIES = [
  { key: "smartphones", label: "Smartphones", icon: "📱" },
  { key: "audio", label: "Audio", icon: "🎧" },
  { key: "energia", label: "Energía", icon: "🔋" },
  { key: "smartwatches", label: "Smartwatches", icon: "⌚" },
  { key: "computacion", label: "Computación", icon: "💻" },
  { key: "gaming", label: "Gaming", icon: "🎮" },
  { key: "accesorios", label: "Accesorios", icon: "🔌" },
  { key: "gadgets", label: "Gadgets", icon: "🚀" },
];

const products = [
  {
    id: 1,
    name: "Ubiquiti Litebeam-5AC-GEN2",
    category: "computacion",
    price: 190,
    oldPrice: null,
    image: "assets/products/litebeam5ac.png",
    description: "Este dispositivo CPE actúa como puente inalámbrico de largo alcance en 5 GHz para enlaces punto a punto o multipunto con alta velocidad e inmunidad al ruido. Su antena direccional de 23 dBi y diseño ultraligero permiten transmitir a más de 450 Mbps, ideal para exteriores y conexiones temporales con conexión Ethernet.",
    details: ["Marca: Ubiquiti Networks", "Nombre del modelo: LBE-5AC-GEN2", "Color: Blanco", "Estándar de comunicación inalámbrica: 802.11ac", "Clase de banda de frecuencia: Banda única (5 GHz)", "MIMO: 2x2 MIMO", "Ganancia de antena: 23 dBi", "Rendimiento máximo: 450+ Mbps", "Interfaz de red: (1) Puerto Ethernet 10/100/1000 (GigE)", "Tamaños de canal para modo PTP: 10/20/30/40/50/60/80 MHz", "Tamaños de canal para modo PTMP: 10/20/30/40 MHz", "Característica especial: Ultraligero", "Usos recomendados : Exterior", "Componentes incluidos: Lite Beam", "Tecnología de conectividad: Ethernet"],
    availability: "low-stock",
    featured: false,
    offer: false,
    isNew: true,
    popular: true,
  }
];

/* Utilidad: formatea números como precio en dólares */
function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

/* Utilidad: devuelve la etiqueta legible de una categoría */
function getCategoryLabel(key) {
  const found = CATEGORIES.find((c) => c.key === key);
  return found ? found.label : key;
}
