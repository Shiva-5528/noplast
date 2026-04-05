// Shopping Cart
let cart = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    loadCart();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Animate stats on scroll
    observeStats();
    
    // Smooth scroll for navigation links
    initializeSmoothScroll();
    
    // Initialize product filters
    initializeProductFilters();
});

// Event Listeners
function initializeEventListeners() {
    // Cart toggle
    const cartBtn = document.getElementById('cartBtn');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSidebar = document.getElementById('cartSidebar');
    
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    const closeCart = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Show success message
        alert(`Thank you, ${name}! We've received your message and will get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing! We'll send eco-tips to ${email}.`);
        e.target.reset();
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some products first!');
            return;
        }
        
        const total = calculateTotal();
        alert(`Proceeding to checkout with ${cart.length} item(s). Total: $${total.toFixed(2)}\n\nThank you for choosing NoPlast! 🌿`);
    });
}

// Product Filters
function initializeProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter products
            const filter = btn.getAttribute('data-filter');
            renderProducts(filter);
        });
    });
}

// Shopping Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    saveCart();
    
    // Show success animation
    showAddToCartAnimation();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
        saveCart();
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                    <div class="cart-item-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button onclick="removeFromCart(${item.id})" style="margin-left: auto;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    cartTotal.textContent = `$${calculateTotal().toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('noplastCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('noplastCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function showAddToCartAnimation() {
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.style.animation = 'none';
    setTimeout(() => {
        cartBtn.style.animation = 'cartBounce 0.5s ease';
    }, 10);
}

// Smooth Scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate Stats on Scroll
function observeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateValue(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateValue = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateValue();
}

// Add cart bounce animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes cartBounce {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(0.95); }
        75% { transform: scale(1.1); }
    }
    
    @media (max-width: 1024px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 10px 30px var(--shadow-dark);
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
`;
document.head.appendChild(style);

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console welcome message
console.log('%c🌿 Welcome to NoPlast! 🌿', 'color: #4a7c25; font-size: 20px; font-weight: bold;');
console.log('%cJust Nature, Nothing Else.', 'color: #2d5016; font-size: 14px;');
console.log('%c100% Organic | Biodegradable | Sustainable', 'color: #6fa83d; font-size: 12px;');
