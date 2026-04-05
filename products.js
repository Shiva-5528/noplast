// Product Data
const products = [
    {
        id: 1,
        name: "Bamboo Cutlery Set",
        category: "cutlery",
        price: 24.99,
        image: "images/logo-cream.png",
        description: "Complete set of biodegradable bamboo cutlery including fork, knife, and spoon.",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Eco Spoon Pack (50pcs)",
        category: "cutlery",
        price: 15.99,
        image: "images/logo-cream.png",
        description: "Pack of 50 compostable spoons made from cornstarch. Perfect for parties.",
        badge: null
    },
    {
        id: 3,
        name: "Bamboo Fork Set (100pcs)",
        category: "cutlery",
        price: 29.99,
        image: "images/logo-cream.png",
        description: "Bulk pack of 100 sturdy bamboo forks. Ideal for catering and events.",
        badge: "Bulk Deal"
    },
    {
        id: 4,
        name: "Biodegradable Knife Pack",
        category: "cutlery",
        price: 18.99,
        image: "images/logo-cream.png",
        description: "Durable biodegradable knives that can cut through tough foods with ease.",
        badge: null
    },
    {
        id: 5,
        name: "Sugarcane Plates (25pcs)",
        category: "plates",
        price: 21.99,
        image: "images/logo-cream.png",
        description: "Sturdy 9-inch plates made from sugarcane fiber. Microwave safe.",
        badge: "Popular"
    },
    {
        id: 6,
        name: "Bamboo Bowls (20pcs)",
        category: "plates",
        price: 19.99,
        image: "images/logo-cream.png",
        description: "Deep bowls perfect for soups, salads, and pasta. Made from bamboo.",
        badge: null
    },
    {
        id: 7,
        name: "Palm Leaf Plates Set",
        category: "plates",
        price: 32.99,
        image: "images/logo-cream.png",
        description: "Premium palm leaf plates in various sizes. Elegant and eco-friendly.",
        badge: "Premium"
    },
    {
        id: 8,
        name: "Compostable Divided Plates",
        category: "plates",
        price: 24.99,
        image: "images/logo-cream.png",
        description: "3-compartment plates made from wheat straw. Great for portion control.",
        badge: null
    },
    {
        id: 9,
        name: "Bamboo Fiber Cups (50pcs)",
        category: "cups",
        price: 27.99,
        image: "images/logo-cream.png",
        description: "Leak-proof cups made from bamboo fiber. Perfect for cold beverages.",
        badge: "Eco Choice"
    },
    {
        id: 10,
        name: "Paper Straws (200pcs)",
        category: "cups",
        price: 12.99,
        image: "images/logo-cream.png",
        description: "Colorful biodegradable paper straws. Won't get soggy quickly.",
        badge: null
    },
    {
        id: 11,
        name: "Wheat Straw Cups (30pcs)",
        category: "cups",
        price: 22.99,
        image: "images/logo-cream.png",
        description: "Durable cups made from wheat straw. Suitable for hot and cold drinks.",
        badge: null
    },
    {
        id: 12,
        name: "Bamboo Drinking Straws",
        category: "cups",
        price: 16.99,
        image: "images/logo-cream.png",
        description: "Reusable bamboo straws with cleaning brush. Sustainable alternative.",
        badge: "Reusable"
    },
    {
        id: 13,
        name: "Ultimate Party Pack",
        category: "party",
        price: 89.99,
        image: "images/logo-nature.png",
        description: "Complete party set for 50 guests. Includes plates, bowls, cups, and cutlery.",
        badge: "Party Pack"
    },
    {
        id: 14,
        name: "Birthday Celebration Set",
        category: "party",
        price: 64.99,
        image: "images/logo-nature.png",
        description: "Everything you need for an eco-friendly birthday party for 30 guests.",
        badge: "Complete Set"
    },
    {
        id: 15,
        name: "Picnic Essentials Pack",
        category: "party",
        price: 45.99,
        image: "images/logo-nature.png",
        description: "Portable pack with cutlery, plates, cups, and napkins for outdoor dining.",
        badge: null
    },
    {
        id: 16,
        name: "Wedding Bundle",
        category: "party",
        price: 249.99,
        image: "images/logo-nature.png",
        description: "Elegant biodegradable tableware for 100 guests. Perfect for weddings.",
        badge: "Premium Bundle"
    },
    {
        id: 17,
        name: "Office Lunch Pack",
        category: "cutlery",
        price: 34.99,
        image: "images/logo-cream.png",
        description: "Monthly supply of eco-friendly cutlery for office use.",
        badge: "Office Special"
    },
    {
        id: 18,
        name: "Kids Meal Set",
        category: "plates",
        price: 28.99,
        image: "images/logo-cream.png",
        description: "Colorful, safe biodegradable plates and utensils designed for children.",
        badge: "Kid-Friendly"
    }
];

// Render products
function renderProducts(filterCategory = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    
    const filteredProducts = filterCategory === 'all' 
        ? products 
        : products.filter(product => product.category === filterCategory);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
