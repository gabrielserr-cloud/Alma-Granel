// JavaScript para Alma Granel - Tienda Online

// Productos disponibles
const productos = [
    {
        id: 1,
        nombre: "Mix de Frutas Deshidratadas Premium",
        categoria: "frutas",
        precio: 2500,
        imagen: "imgs/assorted_dried_fruits_raisins_apricots_dates_catalog.jpg",
        descripcion: "Deliciosa mezcla de pasas, albaricoques y dátiles deshidratos naturalmente."
    },
    {
        id: 2,
        nombre: "Almendras y Nueces Mixtas",
        categoria: "frutos-secos",
        precio: 3500,
        imagen: "imgs/mixed_almonds_cashews_healthy_snack_product.jpg",
        descripcion: "Selección premium de almendras, anacardos y pistachos tostados naturalmente."
    },
    {
        id: 3,
        nombre: "Semillas Orgánicas Superfood",
        categoria: "semillas",
        precio: 2800,
        imagen: "imgs/sunbest_organic_super_seeds_sunflower_pumpkin_chia_store_image.jpg",
        descripcion: "Mezcla de semillas de girasol, calabaza, chía y lino, ricas en nutrientes."
    },
    {
        id: 4,
        nombre: "Mix de Frutas y Nueces Saludable",
        categoria: "mezclas",
        precio: 3200,
        imagen: "imgs/healthy_mixed_dried_fruits_nuts_seeds_trail_mix.jpg",
        descripcion: "Combinación perfecta de frutas deshidratadas, nueces y semillas para un snack saludable."
    },
    {
        id: 5,
        nombre: "Frutas Variadas Deshidratadas",
        categoria: "frutas",
        precio: 2200,
        imagen: "imgs/assorted_natural_dried_fruits_catalog.jpg",
        descripcion: "Variedad de frutas deshidratadas: higos, ciruelas, bananas y más."
    },
    {
        id: 6,
        nombre: "Mix Gourmet de Nueces",
        categoria: "frutos-secos",
        precio: 3800,
        imagen: "imgs/food_to_live_organic_almonds_cashews_healthy_snack_mix.jpg",
        descripcion: "Mezcla gourmet de almendras y anacardos orgánicos, perfectos para cualquier momento."
    },
    {
        id: 7,
        nombre: "Semillas Naturales Variadas",
        categoria: "semillas",
        precio: 2400,
        imagen: "imgs/organic_natural_healthy_seeds_chia_sunflower_pumpkin_hemp_flax.jpg",
        descripcion: "Semillas naturales certificadas: chía, girasol, calabaza, cáñamo y linaza."
    },
    {
        id: 8,
        nombre: "Frutos Secos Premium",
        categoria: "frutos-secos",
        precio: 4100,
        imagen: "imgs/daily-gourmet-nuts-healthy-mix-almonds-cashews-product-shot.jpg",
        descripcion: "Selección premium de 6 tipos de frutos secos sin sal añadida."
    }
];

// Carrito de compras
let carrito = [];

// DOM Elements
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const categoryBtns = document.querySelectorAll('.category-btn');
const productsGrid = document.getElementById('products-grid');
const orderForm = document.getElementById('order-form');
const checkoutBtn = document.getElementById('checkout-btn');
const successMessage = document.getElementById('success-message');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    updateCartDisplay();
});

// Cargar productos en el DOM
function loadProducts() {
    productsGrid.innerHTML = '';
    
    productos.forEach(producto => {
        const productCard = createProductCard(producto);
        productsGrid.appendChild(productCard);
    });
}

// Crear tarjeta de producto
function createProductCard(producto) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = producto.categoria;
    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
        <h3 class="product-title">${producto.nombre}</h3>
        <p class="product-description">${producto.descripcion}</p>
        <div class="product-price">₡${producto.precio.toLocaleString()}</div>
        <button class="add-to-cart-btn" onclick="addToCart(${producto.id})">
            <i class="fas fa-shopping-cart"></i>
            Agregar al Carrito
        </button>
    `;
    return card;
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación móvil
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cart
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    checkoutBtn.addEventListener('click', processOrder);
    
    // Category filters
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => filterProducts(btn.dataset.category));
    });
    
    // Order form
    orderForm.addEventListener('submit', handleOrderSubmit);
    
    // Close modal on outside click
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    successMessage.addEventListener('click', (e) => {
        if (e.target === successMessage) {
            closeSuccessMessage();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Toggle móvil menú
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Filtrar productos por categoría
function filterProducts(category) {
    // Update active button
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter products
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        if (category === 'todos' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Añadir al carrito
function addToCart(productId) {
    const producto = productos.find(p => p.id === productId);
    const existingItem = carrito.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    updateCartDisplay();
    showCartFeedback();
}

// Mostrar feedback al añadir al carrito
function showCartFeedback() {
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.classList.add('pulse');
    setTimeout(() => {
        cartBtn.classList.remove('pulse');
    }, 600);
}

// Actualizar visualización del carrito
function updateCartDisplay() {
    // Update cart count
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    cartTotal.textContent = total.toLocaleString();
}

// Abrir modal del carrito
function openCart() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. ¡Agrega algunos productos!');
        return;
    }
    
    cartModal.classList.add('active');
    renderCartItems();
}

// Cerrar modal del carrito
function closeCartModal() {
    cartModal.classList.remove('active');
}

// Renderizar items del carrito
function renderCartItems() {
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6B7280; padding: 2rem;">Tu carrito está vacío</p>';
        return;
    }
    
    cartItems.innerHTML = carrito.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.nombre}</h4>
                <div class="cart-item-price">₡${item.precio.toLocaleString()}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.cantidad}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Actualizar cantidad de producto
function updateQuantity(productId, change) {
    const item = carrito.find(item => item.id === productId);
    if (item) {
        item.cantidad += change;
        if (item.cantidad <= 0) {
            removeFromCart(productId);
            return;
        }
        updateCartDisplay();
        renderCartItems();
    }
}

// Remover producto del carrito
function removeFromCart(productId) {
    carrito = carrito.filter(item => item.id !== productId);
    updateCartDisplay();
    renderCartItems();
    
    if (carrito.length === 0) {
        setTimeout(() => {
            closeCartModal();
        }, 500);
    }
}

// Procesar pedido
function processOrder() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    closeCartModal();
    
    // Scroll to contact form
    document.getElementById('contacto').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Show order summary in form notes
    const orderSummary = carrito.map(item => 
        `${item.nombre} (${item.cantidad}x) - ₡${(item.precio * item.cantidad).toLocaleString()}`
    ).join('\n');
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const orderNotes = document.getElementById('order-notes');
    orderNotes.value = `RESUMEN DEL PEDIDO:\n${orderSummary}\n\nTOTAL: ₡${total.toLocaleString()}`;
}

// Manejar envío del formulario
function handleOrderSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(orderForm);
    const customerData = Object.fromEntries(formData);
    
    // Validate required fields
    const required = ['customer-name', 'customer-phone', 'customer-email', 'delivery-address'];
    const missing = required.filter(field => !customerData[field]);
    
    if (missing.length > 0) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }
    
    // Create order summary
    const orderSummary = createOrderSummary(customerData);
    
    // Simulate order processing
    processOrderAsync(orderSummary);
}

// Crear resumen del pedido
function createOrderSummary(customerData) {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    return `
=== NUEVO PEDIDO ALMA GRANEL ===

DATOS DEL CLIENTE:
Nombre: ${customerData['customer-name']}
Teléfono: ${customerData['customer-phone']}
Email: ${customerData['customer-email']}

DIRECCIÓN DE ENTREGA:
${customerData['delivery-address']}

PRODUCTOS PEDIDOS:
${carrito.map(item => 
    `• ${item.nombre} (${item.cantidad}x) - ₡${(item.precio * item.cantidad).toLocaleString()}`
).join('\n')}

TOTAL: ₡${total.toLocaleString()}

NOTAS ADICIONALES:
${customerData['order-notes'] || 'Ninguna'}

FECHA: ${new Date().toLocaleString('es-CR')}
UBICACIÓN: Ciudad Quesada, Costa Rica
`;
}

// Procesar pedido de forma asíncrona
function processOrderAsync(orderSummary) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Log order (in real app, this would be sent to server)
        console.log('NUEVO PEDIDO RECIBIDO:');
        console.log(orderSummary);
        
        // Clear cart and form
        carrito = [];
        updateCartDisplay();
        orderForm.reset();
        
    }, 2000);
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    successMessage.classList.add('active');
    setTimeout(() => {
        closeSuccessMessage();
    }, 5000);
}

// Cerrar mensaje de éxito
function closeSuccessMessage() {
    successMessage.classList.remove('active');
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('productos').scrollIntoView({
        behavior: 'smooth'
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#FFFFFF';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .feature, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// WhatsApp integration for quick contact
function contactWhatsApp() {
    const phone = '50624600000'; // WhatsApp number without + and spaces
    const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre los productos de Alma Granel.');
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Add WhatsApp button event if exists
document.addEventListener('DOMContentLoaded', () => {
    const whatsappBtns = document.querySelectorAll('[data-action="whatsapp"]');
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', contactWhatsApp);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        closeCartModal();
        closeSuccessMessage();
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{8,}$/;
    return re.test(phone);
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('customer-email');
    const phoneInput = document.getElementById('customer-phone');
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                emailInput.style.borderColor = '#DC2626';
            } else {
                emailInput.style.borderColor = '#D1D5DB';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', () => {
            if (phoneInput.value && !validatePhone(phoneInput.value)) {
                phoneInput.style.borderColor = '#DC2626';
            } else {
                phoneInput.style.borderColor = '#D1D5DB';
            }
        });
    }
});

// Loading state management
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Local storage for cart persistence
function saveCartToStorage() {
    localStorage.setItem('alma-granel-cart', JSON.stringify(carrito));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('alma-granel-cart');
    if (saved) {
        try {
            carrito = JSON.parse(saved);
            updateCartDisplay();
        } catch (e) {
            console.error('Error loading cart from storage:', e);
            carrito = [];
        }
    }
}

// Save/load cart on page load
document.addEventListener('DOMContentLoaded', loadCartFromStorage);

// Save cart on any change
const originalAddToCart = addToCart;
const originalUpdateQuantity = updateQuantity;
const originalRemoveFromCart = removeFromCart;

addToCart = function(productId) {
    originalAddToCart(productId);
    saveCartToStorage();
};

updateQuantity = function(productId, change) {
    originalUpdateQuantity(productId, change);
    saveCartToStorage();
};

removeFromCart = function(productId) {
    originalRemoveFromCart(productId);
    saveCartToStorage();
};