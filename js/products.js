/* ============================================================
   ASTRO TEC — products.js
   Aquí vive el catálogo completo de productos.
   Para AGREGAR, EDITAR o ELIMINAR productos, solo edita este array.
   No es necesario tocar el HTML ni el resto del JavaScript.

   Estructura de cada producto:
   {
     id:          identificador único (número entero, no repetir)
     name:        nombre del producto
     category:    una de las categorías definidas en CATEGORIES (abajo)
     price:       precio actual (número)
     oldPrice:    precio anterior (número) o null si no aplica
     image:       ruta de la imagen del producto (ver sección "assets/products/")
     description: descripción corta (1-2 líneas, se muestra en la tarjeta)
     details:     lista de características (se muestra en el modal de producto)
     availability:"in-stock" | "low-stock" | "out-of-stock"
     featured:    true/false — aparece en "Tecnología en órbita" (home)
     offer:       true/false — aparece en "Ofertas de otra galaxia"
     isNew:       true/false — muestra la etiqueta NUEVO
     popular:     true/false — muestra la etiqueta POPULAR
   }
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

/* NOTA SOBRE IMÁGENES:
   Las imágenes de demostración se cargan desde Unsplash (fuente externa,
   solo para que el catálogo se vea completo desde el primer momento).
   Cuando tengas tus propias fotos, colócalas en assets/products/ con el
   mismo nombre de archivo sugerido en cada comentario, y cambia la ruta
   del campo "image" por, por ejemplo: "assets/products/astrocharge-pro.jpg"
   El código no necesita ningún otro cambio para usar tus imágenes. */

const products = [
  {
    id: 1,
    name: "AstroCharge Pro",
    category: "energia",
    price: 39.99,
    oldPrice: 54.99,
    image: "https://images.unsplash.com/photo-1591290619762-c384c6675479?q=80&w=800&auto=format&fit=crop", // assets/products/astrocharge-pro.jpg
    description: "Cargador inalámbrico rápido de 15W, compatible con toda tu flota de dispositivos.",
    details: ["Carga rápida 15W", "Compatible con Qi", "Indicador LED de estado", "Base antideslizante"],
    availability: "in-stock",
    featured: true,
    offer: true,
    isNew: false,
    popular: true,
  },
  {
    id: 2,
    name: "NovaPods X",
    category: "audio",
    price: 59.99,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop", // assets/products/novapods-x.jpg
    description: "Auriculares inalámbricos con cancelación activa de ruido y sonido espacial envolvente.",
    details: ["Cancelación activa de ruido", "24h de batería con estuche", "Resistencia IPX5", "Bluetooth 5.3"],
    availability: "in-stock",
    featured: true,
    offer: false,
    isNew: true,
    popular: false,
  },
  {
    id: 3,
    name: "Orbit PowerBank 20K",
    category: "energia",
    price: 49.99,
    oldPrice: 64.99,
    image: "https://images.unsplash.com/photo-1609592806596-b43bada2f4d8?q=80&w=800&auto=format&fit=crop", // assets/products/orbit-powerbank-20k.jpg
    description: "Batería portátil de 20,000mAh con carga rápida para llevar energía a cualquier misión.",
    details: ["20,000 mAh", "Carga rápida bidireccional", "3 puertos de salida", "Pantalla digital de carga"],
    availability: "low-stock",
    featured: true,
    offer: true,
    isNew: false,
    popular: false,
  },
  {
    id: 4,
    name: "AstroWatch S1",
    category: "smartwatches",
    price: 79.99,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=800&auto=format&fit=crop", // assets/products/astrowatch-s1.jpg
    description: "Smartwatch con monitor de salud, GPS y hasta 10 días de autonomía real.",
    details: ["Pantalla AMOLED 1.4\"", "Monitor de ritmo cardíaco", "GPS integrado", "Resistente al agua 5ATM"],
    availability: "in-stock",
    featured: true,
    offer: false,
    isNew: false,
    popular: true,
  },
  {
    id: 5,
    name: "Nebula Buds Mini",
    category: "audio",
    price: 29.99,
    oldPrice: 39.99,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop", // assets/products/nebula-buds-mini.jpg
    description: "Auriculares compactos con graves profundos y estuche de carga ultraligero.",
    details: ["Ultraligeros", "Graves reforzados", "Manos libres con asistente de voz", "18h de batería total"],
    availability: "in-stock",
    featured: false,
    offer: true,
    isNew: false,
    popular: false,
  },
  {
    id: 6,
    name: "Astro Hub 7-in-1",
    category: "accesorios",
    price: 34.99,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?q=80&w=800&auto=format&fit=crop", // assets/products/astro-hub-7in1.jpg
    description: "Hub USB-C 7 en 1 con HDMI, lector de tarjetas y carga pasante.",
    details: ["Salida HDMI 4K", "Lector SD/microSD", "3 puertos USB 3.0", "Carga pasante 100W"],
    availability: "in-stock",
    featured: false,
    offer: false,
    isNew: true,
    popular: false,
  },
  {
    id: 7,
    name: "Voyager Mouse Wireless",
    category: "computacion",
    price: 19.99,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop", // assets/products/voyager-mouse.jpg
    description: "Mouse inalámbrico ergonómico con sensor de alta precisión y silencioso al clic.",
    details: ["Sensor óptico 1600 DPI", "Clics silenciosos", "Batería de hasta 12 meses", "Conexión USB / Bluetooth"],
    availability: "in-stock",
    featured: false,
    offer: false,
    isNew: false,
    popular: false,
  },
  {
    id: 8,
    name: "Cosmos Keyboard Compact",
    category: "computacion",
    price: 44.99,
    oldPrice: 54.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800&auto=format&fit=crop", // assets/products/cosmos-keyboard.jpg
    description: "Teclado mecánico compacto con retroiluminación RGB y switches táctiles.",
    details: ["Switches táctiles", "Retroiluminación RGB", "Diseño 75% compacto", "Conexión tri-modo"],
    availability: "in-stock",
    featured: false,
    offer: true,
    isNew: false,
    popular: false,
  },
  {
    id: 9,
    name: "AstroPad Gamer",
    category: "gaming",
    price: 24.99,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=800&auto=format&fit=crop", // assets/products/astropad-gamer.jpg
    description: "Mousepad extendido con superficie de control y base antideslizante.",
    details: ["Superficie de control", "900 x 400 mm", "Bordes cosidos", "Base de goma antideslizante"],
    availability: "in-stock",
    featured: false,
    offer: false,
    isNew: false,
    popular: false,
  },
  {
    id: 10,
    name: "Meteor Speaker Portátil",
    category: "audio",
    price: 45.99,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop", // assets/products/meteor-speaker.jpg
    description: "Bocina portátil resistente al agua con sonido 360° y luz ambiental.",
    details: ["Sonido 360°", "Resistencia IPX7", "12h de reproducción", "Luz ambiental RGB"],
    availability: "in-stock",
    featured: false,
    offer: false,
    isNew: true,
    popular: true,
  },
  {
    id: 11,
    name: "Solaris Cargador Solar",
    category: "gadgets",
    price: 32.99,
    oldPrice: 42.99,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop", // assets/products/solaris-cargador-solar.jpg
    description: "Panel solar plegable para cargar tus dispositivos en cualquier misión al aire libre.",
    details: ["Panel solar plegable", "10,000 mAh internos", "Resistente a salpicaduras", "Linterna LED integrada"],
    availability: "low-stock",
    featured: false,
    offer: true,
    isNew: false,
    popular: false,
  },
  {
    id: 12,
    name: "AstroPhone Grip Stand",
    category: "accesorios",
    price: 14.99,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=800&auto=format&fit=crop", // assets/products/astrophone-grip-stand.jpg
    description: "Soporte y agarre plegable para smartphone, compatible con carga inalámbrica.",
    details: ["Ángulo ajustable", "Compatible con carga inalámbrica", "Adhesivo reutilizable", "Ultra delgado"],
    availability: "in-stock",
    featured: false,
    offer: false,
    isNew: false,
    popular: false,
  },
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
